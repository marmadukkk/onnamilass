import type { ReactNode } from 'react'
import styled from 'styled-components'
import { useInView } from '../hooks/useInView'

export type RevealFrom = 'up' | 'right' | 'left'

const hiddenOffset: Record<RevealFrom, string> = {
  up: 'translate3d(0, 1.85rem, 0)',
  right: 'translate3d(4.5rem, 0, 0)',
  left: 'translate3d(-3rem, 0, 0)',
}

const Shell = styled.div<{
  $visible: boolean
  $delay: number
  $from: RevealFrom
  $fill: boolean
}>`
  width: 100%;
  height: ${({ $fill }) => ($fill ? '100%' : 'auto')};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible, $from }) =>
    $visible ? 'translate3d(0, 0, 0)' : hiddenOffset[$from]};
  transition:
    opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1) ${({ $delay }) => $delay}ms,
    transform 0.85s cubic-bezier(0.22, 1, 0.36, 1) ${({ $delay }) => $delay}ms;

  ${({ $fill }) =>
    $fill &&
    `
    > * {
      height: 100%;
      box-sizing: border-box;
    }
  `}

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    transform: none;
  }
`

type Props = {
  children: ReactNode
  delay?: number
  from?: RevealFrom
  fill?: boolean
  className?: string
}

export function Reveal({
  children,
  delay = 0,
  from = 'up',
  fill = true,
  className,
}: Props) {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <Shell
      ref={ref}
      className={className}
      data-reveal
      $visible={inView}
      $delay={delay}
      $from={from}
      $fill={fill}
    >
      {children}
    </Shell>
  )
}
