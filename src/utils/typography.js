import Typography from 'typography'
import oceanBeachTheme from 'typography-theme-ocean-beach'

oceanBeachTheme.baseFontSize = '22px';

oceanBeachTheme.overrideThemeStyles = () => ({
  'a.gatsby-resp-image-link': {
    boxShadow: 'none',
    textShadow: 'none',
    backgroundImage: 'none'
  },
  'a': {
    color: "#003380",
    backgroundImage: "linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 1px, #003380 1px, #003380 2px, rgba(0, 0, 0, 0) 2px)",
  },
  'h1 a, h2 a, h3 a, h4 a, h5 a, h6 a': {
    textShadow: 'none',
    backgroundImage: 'none'
  },
})

delete oceanBeachTheme.googleFonts

const typography = new Typography(oceanBeachTheme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
