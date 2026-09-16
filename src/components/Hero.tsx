import styled, { keyframes } from 'styled-components'
import { profile } from '../data/profile'
import { useTwitchChannel } from '../hooks/useTwitchChannel'
import { ArrowIcon } from './icons'
import { Reveal } from './Reveal'
import { Seal } from './Seal'

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(196, 165, 232, 0.55); }
  50% { box-shadow: 0 0 0 8px rgba(196, 165, 232, 0); }
`

const spin = keyframes`
  from { transform: rotate(0deg) scale(1.18); }
  to { transform: rotate(360deg) scale(1.18); }
`

const Stage = styled.section`
  position: relative;
  min-height: 100svh;
  display: grid;
  place-items: center;
  overflow: hidden;
  isolation: isolate;
`

const Bg = styled.div`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(7, 6, 12, 0.18) 0%, rgba(7, 6, 12, 0.55) 55%, #07060c 100%),
    url('/hero-night.jpg') center / cover no-repeat;
  z-index: 0;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 35% 45%, transparent 0%, #07060c 78%);
  }
`

const Layout = styled.div`
  position: relative;
  z-index: ${({ theme }) => theme.z.content};
  width: min(1180px, calc(100% - 2.5rem));
  display: grid;
  grid-template-columns: auto 1.05fr 1.15fr;
  gap: 2.2rem;
  align-items: center;
  padding: 6.5rem 0 4rem;
  z-index: 1;

  ${({ theme }) => theme.media.tablet} {
    grid-template-columns: 1fr;
    justify-items: center;
    text-align: center;
    gap: 1.4rem;
    padding-top: 6rem;
  }
`

const Vertical = styled.p`
  writing-mode: vertical-rl;
  font-family: ${({ theme }) => theme.fonts.jp};
  font-size: 1.05rem;
  letter-spacing: 0.55em;
  color: ${({ theme }) => theme.colors.wisteria};
  opacity: 0.9;
  margin: 0;
  height: 22rem;

  ${({ theme }) => theme.media.tablet} {
    writing-mode: horizontal-tb;
    letter-spacing: 0.35em;
    height: auto;
    font-size: 0.85rem;
  }
`

const Portrait = styled.div`
  position: relative;
  width: min(380px, 78vw);
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  overflow: visible;
`

const Aura = styled.img`
  position: absolute;
  inset: -12%;
  width: 124%;
  height: 124%;
  object-fit: contain;
  pointer-events: none;
  animation: ${spin} 48s linear infinite;
  filter: drop-shadow(0 0 28px #7c3aed88);
`

const Avatar = styled.img`
  width: 62%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 50%;
  position: relative;
  z-index: 1;
  box-shadow:
    0 0 0 2px ${({ theme }) => theme.colors.white},
    0 0 0 8px ${({ theme }) => theme.colors.purple}55,
    0 0 48px ${({ theme }) => theme.colors.purpleGlow};
`

const Copy = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;

  ${({ theme }) => theme.media.tablet} {
    align-items: center;
  }
`

const Kana = styled.span`
  font-family: ${({ theme }) => theme.fonts.jp};
  letter-spacing: 0.5em;
  font-size: 0.82rem;
  color: ${({ theme }) => theme.colors.wisteria};
`

const Name = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.hero};
  font-weight: 600;
  letter-spacing: 0.08em;
  line-height: 0.9;
  text-transform: uppercase;
  text-shadow: 0 0 40px ${({ theme }) => theme.colors.purple}88;
`

const Motto = styled.p`
  font-family: ${({ theme }) => theme.fonts.display};
  font-style: italic;
  font-size: clamp(1.15rem, 2.4vw, 1.7rem);
  color: ${({ theme }) => theme.colors.white};
`

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  margin-top: 0.2rem;

  ${({ theme }) => theme.media.tablet} {
    justify-content: center;
  }
`

const Chip = styled.span`
  border: 1px solid ${({ theme }) => theme.colors.line};
  background: rgba(17, 14, 24, 0.7);
  padding: 0.35rem 0.75rem;
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
  border-radius: ${({ theme }) => theme.radii.pill};
`

const Live = styled(Chip)`
  color: ${({ theme }) => theme.colors.white};
  border-color: ${({ theme }) => theme.colors.wisteria};
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;

  i {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.wisteria};
    animation: ${pulse} 1.6s ease-out infinite;
  }
`

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 0.6rem;

  ${({ theme }) => theme.media.tablet} {
    justify-content: center;
  }
`

const Primary = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.95rem 1.55rem;
  background: linear-gradient(180deg, #d7c2f5 0%, #8b5cf6 100%);
  color: #0a0810;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
  transition: filter 0.2s ease, transform 0.2s ease;

  &:hover {
    filter: brightness(1.08);
    transform: translateY(-1px);
  }
`

const Ghost = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.9rem 1.4rem;
  border: 1px solid ${({ theme }) => theme.colors.wisteria};
  color: ${({ theme }) => theme.colors.wisteria};
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  clip-path: polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px);
  transition: background 0.2s ease, color 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.wisteria};
    color: #0a0810;
  }
`

const Stamp = styled(Seal)`
  position: absolute;
  right: 4%;
  bottom: 7%;
  z-index: ${({ theme }) => theme.z.content};

  ${({ theme }) => theme.media.phone} {
    display: none;
  }
`

const ScrollHint = styled.a`
  position: absolute;
  bottom: 1.4rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: ${({ theme }) => theme.z.content};
  font-family: ${({ theme }) => theme.fonts.jp};
  font-size: 0.75rem;
  letter-spacing: 0.4em;
  color: ${({ theme }) => theme.colors.muted};
`

export function Hero() {
  const { live, game } = useTwitchChannel(profile.login)

  return (
    <Stage id="top">
      <Bg />
      <Layout>
        <Vertical>{profile.mottoJp}</Vertical>
        <Portrait>
          <Aura src="/ink-burst.png" alt="" />
          <Avatar src="/avatar.png" alt={profile.name} />
        </Portrait>
        <Copy>
          <Reveal from="right" fill={false} delay={80}>
            <Kana>{profile.kana}</Kana>
          </Reveal>
          <Reveal from="right" fill={false} delay={220}>
            <Name>{profile.name}</Name>
          </Reveal>
          <Reveal from="right" fill={false} delay={360}>
            <Motto>{profile.mottoEn}</Motto>
          </Reveal>
          <Reveal from="right" fill={false} delay={500}>
            <Meta>
              {live ? (
                <Live>
                  <i />
                  生放送 · live
                </Live>
              ) : (
                <Chip>オフライン · offline</Chip>
              )}
              <Chip>{game ? `Twitch · ${game}` : 'Twitch'}</Chip>
              <Chip>since {profile.since}</Chip>
            </Meta>
          </Reveal>
          <Reveal from="right" fill={false} delay={640}>
            <Actions>
              <Primary href="#stream">
                視聴する · смотреть
                <ArrowIcon />
              </Primary>
              <Ghost href={profile.twitch} target="_blank" rel="noreferrer">
                Twitch
              </Ghost>
            </Actions>
          </Reveal>
        </Copy>
      </Layout>
      <Stamp size={78} />
      <ScrollHint href="#about">下</ScrollHint>
    </Stage>
  )
}
