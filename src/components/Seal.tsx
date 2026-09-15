import styled from 'styled-components'
import { profile } from '../data/profile'

const Stamp = styled.div<{ $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.colors.purple};
  color: ${({ theme }) => theme.colors.wisteria};
  display: grid;
  place-items: center;
  font-family: ${({ theme }) => theme.fonts.jp};
  font-size: ${({ $size }) => $size * 0.46}px;
  font-weight: 700;
  letter-spacing: 0;
  transform: rotate(-8deg);
  box-shadow:
    0 0 0 1px ${({ theme }) => theme.colors.wisteria} inset,
    0 0 24px ${({ theme }) => theme.colors.purple}55;
  background: radial-gradient(circle, #1a1028 0%, #07060c 70%);
  user-select: none;
`

type Props = { size?: number; className?: string }

export function Seal({ size = 72, className }: Props) {
  return (
    <Stamp $size={size} className={className} aria-hidden>
      {profile.seal}
    </Stamp>
  )
}
