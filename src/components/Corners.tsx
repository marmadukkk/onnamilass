import styled from 'styled-components'

const Img = styled.img<{ $corner: 'tl' | 'tr' | 'bl' | 'br'; $size: number }>`
  position: absolute;
  width: ${({ $size }) => $size}px;
  pointer-events: none;
  mix-blend-mode: screen;
  opacity: 0.72;
  ${({ $corner }) =>
    ({
      tl: 'top: 0; left: 0; transform: scale(-1);',
      tr: 'top: 0; right: 0; transform: scaleY(-1);',
      bl: 'bottom: 0; left: 0; transform: scaleX(-1);',
      br: 'bottom: 0; right: 0;',
    })[$corner]}

  ${({ theme }) => theme.media.phone} {
    width: 88px;
  }
`

type Props = { size?: number }

export function Corners({ size = 150 }: Props) {
  return (
    <>
      <Img src="/corner.jpg" alt="" $corner="tl" $size={size} />
      <Img src="/corner.jpg" alt="" $corner="tr" $size={size} />
      <Img src="/corner.jpg" alt="" $corner="bl" $size={size} />
      <Img src="/corner.jpg" alt="" $corner="br" $size={size} />
    </>
  )
}
