type IconProps = { size?: number }

const svg = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function TwitchIcon({ size = 22 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden {...svg}>
      <path d="M4 3h16v11l-4 4h-4l-2 2H8v-2H4V3z" />
      <path d="M10 7v5M15 7v5" />
    </svg>
  )
}

export function YoutubeIcon({ size = 22 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden {...svg}>
      <path d="M3 8.5c0-1.8 1.4-3.3 3.2-3.5C8.8 4.7 15.2 4.7 17.8 5c1.8.2 3.2 1.7 3.2 3.5v7c0 1.8-1.4 3.3-3.2 3.5-2.6.3-9 .3-11.6 0C4.4 18.8 3 17.3 3 15.5v-7z" />
      <path d="M10 9.5v5l5-2.5-5-2.5z" />
    </svg>
  )
}

export function InstagramIcon({ size = 22 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden {...svg}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function SteamIcon({ size = 22 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden {...svg}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="15.5" cy="9" r="2.3" />
      <path d="M13.6 10.6 8.2 14.2a2.2 2.2 0 1 0 2.1 3.7l5.6-3.3" />
    </svg>
  )
}

export function ArrowIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden {...svg}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}
