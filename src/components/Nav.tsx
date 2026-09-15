import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { navItems, profile } from '../data/profile'

const Bar = styled.header<{ $solid: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.z.nav};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  transition: background 0.3s ease, border-color 0.3s ease;
  background: ${({ $solid }) =>
    $solid ? 'rgba(7, 6, 12, 0.94)' : 'transparent'};
  border-bottom: 1px solid
    ${({ $solid, theme }) => ($solid ? theme.colors.line : 'transparent')};

  ${({ theme }) => theme.media.phone} {
    padding: 0.75rem 1rem;
  }
`

const Brand = styled.a`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: 1.15rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
`

const Mark = styled.span`
  width: 28px;
  height: 28px;
  border: 1.5px solid ${({ theme }) => theme.colors.wisteria};
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-family: ${({ theme }) => theme.fonts.jp};
  font-size: 0.85rem;
  letter-spacing: 0;
  color: ${({ theme }) => theme.colors.wisteria};
`

const Menu = styled.nav<{ $open: boolean }>`
  display: flex;
  align-items: center;
  gap: 1.6rem;

  ${({ theme }) => theme.media.phone} {
    position: fixed;
    top: 58px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: ${({ theme }) => theme.z.nav};
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding: 0.75rem 1.25rem 1.5rem;
    background: ${({ theme }) => theme.colors.bg};
    border-bottom: 0;
    display: ${({ $open }) => ($open ? 'flex' : 'none')};
  }
`

const Item = styled.a`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
  transition: color 0.2s ease;

  small {
    font-family: ${({ theme }) => theme.fonts.jp};
    font-size: 0.7rem;
    letter-spacing: 0.28em;
    color: ${({ theme }) => theme.colors.wisteria};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.ink};
  }

  ${({ theme }) => theme.media.phone} {
    align-items: flex-start;
    padding: 0.85rem 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.line};
  }
`

const Burger = styled.button`
  display: none;
  width: 40px;
  height: 40px;
  position: relative;

  span,
  span::before,
  span::after {
    content: '';
    position: absolute;
    left: 10px;
    width: 20px;
    height: 1.5px;
    background: ${({ theme }) => theme.colors.ink};
  }

  span {
    top: 19px;
  }

  span::before {
    top: -6px;
  }

  span::after {
    top: 6px;
  }

  ${({ theme }) => theme.media.phone} {
    display: block;
  }
`

export function Nav() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <Bar $solid={solid}>
      <Brand href="#top">
        <Mark>{profile.seal}</Mark>
        {profile.name}
      </Brand>
      <Burger
        aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
      </Burger>
      <Menu $open={open}>
        {navItems.map((item) => (
          <Item key={item.href} href={item.href} onClick={() => setOpen(false)}>
            <small>{item.jp}</small>
            {item.ru}
          </Item>
        ))}
      </Menu>
    </Bar>
  )
}
