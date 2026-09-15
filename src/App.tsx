import { ThemeProvider } from 'styled-components'
import { About } from './components/About'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Links } from './components/Links'
import { Nav } from './components/Nav'
import { Petals } from './components/Petals'
import { Stream } from './components/Stream'
import { GlobalStyle } from './styles/GlobalStyle'
import { theme } from './styles/theme'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Petals />
      <a href="#about" className="skip-link">
        К содержимому
      </a>
      <Nav />
      <main>
        <Hero />
        <About />
        <Stream />
        <Links />
      </main>
      <Footer />
    </ThemeProvider>
  )
}
