import Typography from 'typography'
//import Wordpress2016 from 'typography-theme-wordpress-2016'
//import fairyGatesTheme from 'typography-theme-fairy-gates'
import oceanBeachTheme from 'typography-theme-ocean-beach'

oceanBeachTheme.baseFontSize = '21px';
//oceanBeachTheme.bodyColor = 'hsla(0,0%,0%,0.88)';

oceanBeachTheme.overrideThemeStyles = () => ({
  'a.gatsby-resp-image-link': {
    boxShadow: 'none',
    textShadow: 'none',
    backgroundImage: 'none'
  },
  'a': {
    color: "#8c4b1a"
  },
  'h1 a, h2 a, h3 a, h4 a, h5 a, h6 a': {
    textShadow: 'none',
    backgroundImage: 'none'
  }
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
