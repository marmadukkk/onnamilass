import styled from 'styled-components'
import { profile } from '../data/profile'
import { Seal } from './Seal'

const Bar = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.colors.line};
  padding: 2rem 1.25rem 7rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.85rem;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  text-align: center;
`

const Motto = styled.p`
  font-family: ${({ theme }) => theme.fonts.jp};
  letter-spacing: 0.4em;
  color: ${({ theme }) => theme.colors.wisteria};
`

export function Footer() {
  return (
    <Bar>
      <Seal size={64} />
      <Motto>{profile.mottoJp}</Motto>
      <p>
        © {new Date().getFullYear()} {profile.name} · オンナミラス
      </p>
    </Bar>
  )
}
