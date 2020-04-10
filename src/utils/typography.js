import Typography from 'typography'
import theme from '../styles/theme'

const typography = new Typography({
  title: 'Lorem',
  baseFontSize: '20px',
  baseLineHeight: 1.5,
  headerFontFamily: [
    'ModernoFB',
    'serif',
  ],
  headerWeight: 400,
  bodyFontFamily: [
    'Omnes',
    'Helvetica Neue',
    'Segoe UI',
    'Helvetica',
    'Arial',
    'sans-serif',
  ],
  overrideStyles: ({ adjustFontSizeTo, scale, rhythm }, options) => ({
    body: {
      color: `${theme.colors.body}`,
    },
    'h1,h2,h3,h4,h5,h6': {
      lineHeight: 1,
    },
    h1: {
      fontSize: '60px',
      marginBottom: '.67em',
    },
    h2: {
      fontSize: '31px',
      marginBottom: '.67em',
    },
    h3: {
      fontSize: '20px',
      marginBottom: '.5em',
    },
    p: {
      marginBottom: '1em',
    },
    'p:last-child': {
      marginBottom: 0,
    },
    a: {
      color: `${theme.colors.highlight}`,
      textDecoration: 'none',
    },
    address: {
      fontStyle: 'normal',
    },
    dl: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    dt: {
      flex: '1 1 25%',
    },
    dd: {
      flex: '1 1 75%',
      marginBottom: '0',
    },
    '@media only screen and (max-width: 600px)': {
      html: {
        fontSize: '14px',
      },
      h1: {
        fontSize: '25px',
        lineHeight: '1.16',
      },
      h2: {
        fontSize: '18px',
        lineHeight: '1.222222',
      },
    },
  })
})

export const { scale, rhythm, options } = typography

export default typography
