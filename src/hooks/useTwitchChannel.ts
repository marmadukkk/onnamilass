import { useEffect, useState } from 'react'
import { profile } from '../data/profile'

export type TwitchChannel = {
  live: boolean
  title: string
  game: string
  startedAt: string | null
  ready: boolean
}

const empty: TwitchChannel = {
  live: false,
  title: '',
  game: '',
  startedAt: null,
  ready: false,
}

const TWITCH_GQL = 'https://gql.twitch.tv/gql'
const TWITCH_CLIENT_ID = 'kimne78kx3ncx6brgo4mv6wki5h1ko'
const POLL_MS = 30_000

const inflight = new Map<string, Promise<TwitchChannel>>()

type GqlUser = {
  stream: { title: string; game: { name: string } | null } | null
  lastBroadcast: {
    title: string
    startedAt: string | null
    game: { name: string } | null
  } | null
}

function pick(value: string | null | undefined) {
  const next = value?.trim()
  return next ? next : ''
}

async function fetchFromGql(login: string): Promise<TwitchChannel> {
  const res = await fetch(TWITCH_GQL, {
    method: 'POST',
    headers: {
      'Client-Id': TWITCH_CLIENT_ID,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([
      {
        query: `query ($login: String!) {
          user(login: $login) {
            stream { title game { name } }
            lastBroadcast { title startedAt game { name } }
          }
        }`,
        variables: { login },
      },
    ]),
  })

  if (!res.ok) {
    throw new Error(`Twitch GQL ${res.status}`)
  }

  const payload = (await res.json()) as Array<{
    data?: { user?: GqlUser | null }
  }>
  const user = payload[0]?.data?.user
  if (!user) {
    throw new Error('Twitch user not found')
  }

  const live = Boolean(user.stream)
  const liveTitle = pick(user.stream?.title)
  const liveGame = pick(user.stream?.game?.name)
  const lastTitle = pick(user.lastBroadcast?.title)
  const lastGame = pick(user.lastBroadcast?.game?.name)

  return {
    live,
    title: liveTitle || lastTitle || profile.lastTitle,
    game: liveGame || lastGame || profile.lastGame,
    startedAt: user.lastBroadcast?.startedAt ?? null,
    ready: true,
  }
}

async function fetchGameFallback(login: string) {
  const res = await fetch(
    `https://decapi.me/twitch/game/${encodeURIComponent(login)}`,
  )
  if (!res.ok) return ''
  const text = (await res.text()).trim()
  if (!text || /offline|not found|error/i.test(text)) return ''
  return text
}

async function fetchFromIvr(login: string): Promise<TwitchChannel> {
  const [res, game] = await Promise.all([
    fetch(`https://api.ivr.fi/v2/twitch/user?login=${encodeURIComponent(login)}`),
    fetchGameFallback(login),
  ])
  if (!res.ok) {
    throw new Error(`ivr ${res.status}`)
  }

  const users = (await res.json()) as Array<{
    stream: { title?: string } | null
    lastBroadcast: { title?: string; startedAt?: string } | null
  }>
  const user = users[0]
  if (!user) {
    throw new Error('ivr user not found')
  }

  const live = Boolean(user.stream)
  const title =
    pick(user.stream?.title) ||
    pick(user.lastBroadcast?.title) ||
    profile.lastTitle

  return {
    live,
    title,
    game: game || profile.lastGame,
    startedAt: user.lastBroadcast?.startedAt ?? null,
    ready: true,
  }
}

function loadChannel(login: string, force = false): Promise<TwitchChannel> {
  if (!force) {
    const pending = inflight.get(login)
    if (pending) return pending
  }

  const request = fetchFromGql(login)
    .catch(() => fetchFromIvr(login))
    .catch(
      (): TwitchChannel => ({
        live: false,
        title: profile.lastTitle,
        game: profile.lastGame,
        startedAt: null,
        ready: true,
      }),
    )

  inflight.set(login, request)
  return request
}

export function useTwitchChannel(login: string): TwitchChannel {
  const [channel, setChannel] = useState<TwitchChannel>(empty)

  useEffect(() => {
    let cancelled = false

    const pull = (force: boolean) => {
      void loadChannel(login, force).then((data) => {
        if (!cancelled) setChannel(data)
      })
    }

    pull(false)
    const timer = window.setInterval(() => pull(true), POLL_MS)

    const onVisible = () => {
      if (document.visibilityState === 'visible') pull(true)
    }
    document.addEventListener('visibilitychange', onVisible)

    return () => {
      cancelled = true
      window.clearInterval(timer)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [login])

  return channel
}
