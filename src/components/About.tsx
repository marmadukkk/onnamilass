import styled from 'styled-components'
import { profile } from '../data/profile'
import { useTwitchChannel } from '../hooks/useTwitchChannel'
import { Corners } from './Corners'
import { Reveal } from './Reveal'

const Wrap = styled.section`
  position: relative;
  padding: ${({ theme }) => theme.space.xxl} 1.25rem;
  background:
    radial-gradient(ellipse at 80% 0%, #1a1230 0%, ${({ theme }) => theme.colors.bg} 55%);
`

const Inner = styled.div`
  width: min(1080px, 100%);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 0.82fr 1.18fr;
  gap: 2.4rem;
  align-items: stretch;

  ${({ theme }) => theme.media.tablet} {
    grid-template-columns: 1fr;
  }
`

const Scroll = styled.figure`
  position: relative;
  margin: 0;
  min-height: 420px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.line};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    min-height: 420px;
    filter: saturate(0.9);
  }

  ${({ theme }) => theme.media.phone} {
    height: 300px;
    min-height: 300px;

    img {
      min-height: 0;
      height: 100%;
    }
  }
`

const Copy = styled.div`
  position: relative;
  padding: 2.4rem 1.8rem 2.2rem 2rem;
  border: 1px solid ${({ theme }) => theme.colors.line};
  background: ${({ theme }) => theme.colors.bgRaised};
  overflow: hidden;
`

const Eyebrow = styled.p`
  font-family: ${({ theme }) => theme.fonts.jp};
  letter-spacing: 0.45em;
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.wisteria};
  margin-bottom: 0.55rem;
`

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2rem, 4vw, 3.1rem);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 1.2rem;
`

const Quote = styled.blockquote`
  margin: 0 0 1.3rem;
  font-family: ${({ theme }) => theme.fonts.jp};
  font-size: clamp(1.35rem, 3vw, 1.9rem);
  line-height: 1.45;
  color: ${({ theme }) => theme.colors.white};

  span {
    display: block;
    margin-top: 0.45rem;
    font-family: ${({ theme }) => theme.fonts.display};
    font-style: italic;
    font-size: 1.05rem;
    letter-spacing: 0.04em;
    color: ${({ theme }) => theme.colors.wisteria};
  }
`

const Body = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  max-width: 38rem;
  margin-bottom: 1.1rem;
`

const Last = styled.p`
  margin-top: 1.4rem;
  padding-top: 1.1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.line};
  font-size: 0.92rem;
  color: ${({ theme }) => theme.colors.ink};

  strong {
    display: block;
    font-family: ${({ theme }) => theme.fonts.jp};
    font-weight: 500;
    letter-spacing: 0.22em;
    font-size: 0.72rem;
    color: ${({ theme }) => theme.colors.wisteria};
    margin-bottom: 0.35rem;
  }
`

export function About() {
  const { live, title, game } = useTwitchChannel(profile.login)

  return (
    <Wrap id="about">
      <Inner>
        <Reveal>
          <Scroll>
            <img src="/kakejiku.jpg" alt="Какедзику: глициния и луна" />
          </Scroll>
        </Reveal>
        <Reveal delay={140}>
          <Copy>
            <Corners size={120} />
            <Eyebrow>自己紹介</Eyebrow>
            <Title>О себе</Title>
            <Quote>
              {profile.mottoJp}
              <span>
                {profile.mottoEn} · {profile.mottoRu}
              </span>
            </Quote>
            <Body>
              Канал на Twitch с августа {profile.since}. Девиз тот же, что на
              канале: без врагов, только игра и эфир.
            </Body>
            <Last>
              <strong>
                {live
                  ? '今配信中 · сейчас в эфире'
                  : '最後の配信 · последний эфир'}
              </strong>
              {game ? `${game} — «${title}»` : `«${title}»`}
            </Last>
          </Copy>
        </Reveal>
      </Inner>
    </Wrap>
  )
}
