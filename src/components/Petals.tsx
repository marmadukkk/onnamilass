import type { CSSProperties } from 'react'
import styled, { keyframes } from 'styled-components'

const fall = keyframes`
  0% {
    transform: translate3d(0, -12vh, 0) rotate(0deg);
    opacity: 0;
  }
  12% { opacity: 0.85; }
  100% {
    transform: translate3d(var(--drift), 110vh, 0) rotate(360deg);
    opacity: 0;
  }
`

const Layer = styled.div`
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.z.petals};
  overflow: hidden;
`

const Petal = styled.span`
  position: absolute;
  top: -8vh;
  left: var(--x);
  width: var(--w);
  height: calc(var(--w) * 1.7);
  background: linear-gradient(180deg, #fbf8ff, #c4a5e8 55%, #7c3aed);
  border-radius: 80% 0 80% 0;
  opacity: 0.7;
  filter: blur(0.2px);
  animation: ${fall} var(--dur) linear var(--delay) infinite;
`

const petals = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  x: `${(i * 7.1 + 3) % 100}%`,
  w: `${8 + (i % 5) * 2}px`,
  dur: `${16 + (i % 6) * 3}s`,
  delay: `${(i * 1.3) % 12}s`,
  drift: `${i % 2 === 0 ? 40 : -50}px`,
}))

export function Petals() {
  return (
    <Layer aria-hidden>
      {petals.map((p) => (
        <Petal
          key={p.id}
          style={
            {
              '--x': p.x,
              '--w': p.w,
              '--dur': p.dur,
              '--delay': p.delay,
              '--drift': p.drift,
            } as CSSProperties
          }
        />
      ))}
    </Layer>
  )
}
