import { createGlobalStyle } from 'styled-components'

const asanoha = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="72" height="83" viewBox="0 0 72 83">
    <g fill="none" stroke="#c4a5e8" stroke-width="0.6" opacity="0.55">
      <path d="M36 0 L36 83 M0 20.75 L72 62.25 M72 20.75 L0 62.25"/>
      <path d="M36 0 L72 20.75 L72 62.25 L36 83 L0 62.25 L0 20.75 Z"/>
    </g>
  </svg>`,
)

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
    scroll-padding-top: 4.75rem;
    background: ${({ theme }) => theme.colors.bg};
  }

  html,
  body,
  #root {
    margin: 0;
    min-height: 100%;
  }

  body {
    color: ${({ theme }) => theme.colors.ink};
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.fontSizes.md};
    line-height: 1.65;
    background: ${({ theme }) => theme.colors.bg};
    text-rendering: optimizeLegibility;
  }

  body::before {
    content: '';
    pointer-events: none;
    position: fixed;
    inset: 0;
    z-index: 1;
    opacity: 0.07;
    background-image: url("data:image/svg+xml,${asanoha}");
    background-size: 72px 83px;
  }

  body::after {
    content: '';
    pointer-events: none;
    position: fixed;
    inset: 0;
    z-index: ${({ theme }) => theme.z.grain};
    opacity: 0.055;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  }

  ::selection {
    background: ${({ theme }) => theme.colors.purple};
    color: ${({ theme }) => theme.colors.white};
  }

  h1, h2, h3 {
    margin: 0;
    font-weight: 600;
    line-height: 1.1;
  }

  p {
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  img {
    max-width: 100%;
    display: block;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: 0;
    background: none;
    color: inherit;
  }

  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.wisteria};
    outline-offset: 3px;
  }

  .skip-link {
    position: absolute;
    left: 1rem;
    top: -4rem;
    z-index: 50;
    padding: 0.6rem 0.9rem;
    background: ${({ theme }) => theme.colors.purple};
    color: ${({ theme }) => theme.colors.white};
  }

  .skip-link:focus {
    top: 1rem;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.bg};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.purple};
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }

    *,
    *::before,
    *::after {
      animation: none !important;
      transition: none !important;
    }
  }
`
