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
    color: "#000",
    backgroundImage: "linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 1px, #000 1px, #000 2px, rgba(0, 0, 0, 0) 2px)",
  },
  'h1 a, h2 a, h3 a, h4 a, h5 a, h6 a': {
    textShadow: 'none',
    backgroundImage: 'none'
  },
  'h1 a:hover, h2 a:hover, h3 a:hover, h4 a:hover, h5 a:hover, h6 a:hover': {
    opacity: 0.7,
  },
  'blockquote': {
    borderLeft: "0.5925rem solid #000"
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
