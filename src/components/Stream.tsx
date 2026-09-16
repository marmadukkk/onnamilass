import { useMemo } from 'react'
import styled from 'styled-components'
import { profile } from '../data/profile'
import { useTwitchChannel } from '../hooks/useTwitchChannel'
import { Corners } from './Corners'
import { Reveal } from './Reveal'

const Wrap = styled.section`
  position: relative;
  padding: ${({ theme }) => `${theme.space.xl} 1.25rem ${theme.space.xxl}`};
`

const Head = styled.div`
  width: min(1180px, 100%);
  margin: 0 auto 1.4rem;
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 1rem;
`

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2rem, 4vw, 3rem);
  letter-spacing: 0.1em;
  text-transform: uppercase;

  small {
    display: block;
    font-family: ${({ theme }) => theme.fonts.jp};
    font-size: 0.78rem;
    letter-spacing: 0.45em;
    color: ${({ theme }) => theme.colors.wisteria};
    margin-bottom: 0.35rem;
    text-transform: none;
  }
`

const Status = styled.a<{ $live: boolean }>`
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ $live, theme }) =>
    $live ? theme.colors.white : theme.colors.muted};

  &:hover {
    color: ${({ theme }) => theme.colors.wisteria};
  }
`

const Frame = styled.div`
  position: relative;
  width: min(1180px, 100%);
  margin: 0 auto;
  padding: 1.15rem;
  border: 1px solid ${({ theme }) => theme.colors.line};
  background: ${({ theme }) => theme.colors.bgRaised};
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.7fr 0.9fr;
  gap: 0.7rem;
  min-height: 420px;

  ${({ theme }) => theme.media.tablet} {
    grid-template-columns: 1fr;
  }
`

const Player = styled.iframe`
  width: 100%;
  min-height: 420px;
  border: 0;
  background: #0e0e10;

  ${({ theme }) => theme.media.phone} {
    min-height: 220px;
  }
`

const Chat = styled.iframe`
  width: 100%;
  min-height: 420px;
  border: 0;
  background: #0e0e10;

  ${({ theme }) => theme.media.tablet} {
    display: none;
  }
`

export function Stream() {
  const { live } = useTwitchChannel(profile.login)
  const parent = useMemo(
    () => (typeof window === 'undefined' ? 'localhost' : window.location.hostname),
    [],
  )

  return (
    <Wrap id="stream">
      <Reveal>
        <Head>
          <Title>
            <small>配信</small>
            Стрим
          </Title>
          <Status $live={live} href={profile.twitch} target="_blank" rel="noreferrer">
            {live ? 'сейчас в эфире →' : 'открыть на twitch →'}
          </Status>
        </Head>
      </Reveal>
      <Reveal delay={120}>
        <Frame>
          <Corners size={110} />
          <Grid>
            <Player
              src={`https://player.twitch.tv/?channel=${profile.login}&parent=${parent}&muted=true`}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title={`Twitch — ${profile.name}`}
            />
            <Chat
              src={`https://www.twitch.tv/embed/${profile.login}/chat?parent=${parent}&darkpopout`}
              title="Twitch chat"
            />
          </Grid>
        </Frame>
      </Reveal>
    </Wrap>
  )
}
