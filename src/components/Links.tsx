import styled from 'styled-components'
import { profile } from '../data/profile'
import { InstagramIcon, SteamIcon, TwitchIcon, YoutubeIcon } from './icons'

const Wrap = styled.section`
  position: relative;
  padding: ${({ theme }) => `0 1.25rem ${theme.space.xxl}`};
`

const Inner = styled.div`
  width: min(1080px, 100%);
  margin: 0 auto;
`

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: clamp(2rem, 4vw, 3rem);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 1.5rem;

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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.9rem;

  ${({ theme }) => theme.media.phone} {
    grid-template-columns: 1fr;
  }
`

const Card = styled.a`
  position: relative;
  overflow: hidden;
  min-height: 150px;
  padding: 1.4rem 1.3rem;
  border: 1px solid ${({ theme }) => theme.colors.line};
  background: ${({ theme }) => theme.colors.bgRaised};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.wisteria};
    transform: translateY(-3px);
    box-shadow: 0 12px 40px #7c3aed33;
  }
`

const Jp = styled.span`
  font-family: ${({ theme }) => theme.fonts.jp};
  letter-spacing: 0.28em;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.wisteria};
`

const Label = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.7rem;
  letter-spacing: 0.06em;
`

const Handle = styled.span`
  display: block;
  margin-top: 0.2rem;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.88rem;
`

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.wisteria};
`

const Bloom = styled.img`
  position: absolute;
  right: -10%;
  bottom: -30%;
  width: 180px;
  opacity: 0.22;
  pointer-events: none;
  mix-blend-mode: screen;
`

const links = [
  {
    href: profile.twitch,
    jp: '配信',
    label: 'Twitch',
    handle: `twitch.tv/${profile.login}`,
    icon: TwitchIcon,
  },
  {
    href: profile.youtube,
    jp: '動画',
    label: 'YouTube',
    handle: profile.youtubeName,
    icon: YoutubeIcon,
  },
  {
    href: profile.instagram,
    jp: '写真',
    label: 'Instagram',
    handle: profile.instagramHandle,
    icon: InstagramIcon,
  },
  {
    href: profile.steam,
    jp: '交易',
    label: 'Steam Trade',
    handle: 'обмен',
    icon: SteamIcon,
  },
] as const

export function Links() {
  return (
    <Wrap id="links">
      <Inner>
        <Title>
          <small>縁</small>
          Связь
        </Title>
        <Grid>
          {links.map((link) => {
            const Icon = link.icon
            return (
              <Card key={link.href} href={link.href} target="_blank" rel="noreferrer">
                <Bloom src="/wisteria.jpg" alt="" />
                <Top>
                  <Jp>{link.jp}</Jp>
                  <Icon />
                </Top>
                <div>
                  <Label>{link.label}</Label>
                  <Handle>{link.handle}</Handle>
                </div>
              </Card>
            )
          })}
        </Grid>
      </Inner>
    </Wrap>
  )
}
