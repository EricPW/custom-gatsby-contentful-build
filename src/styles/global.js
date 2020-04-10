/**
 * Global `Stylesheet`
 *
 * Here lies the global SASS styles, broken out by type. These
 * styles are imported into the `layout` component for global
 * rendering. See the following categories below:
 *
 * - GlobalStyle: the root of all styles
 * - Typography: text based elements
 * - Lists: ul, ol, dl, et al
 * - Images: image elements obvs.
 *
 */
import { createGlobalStyle } from 'styled-components'
import theme from '../styles/theme'

const Typography = `
  html {
    font-size: 20px;
  }
  body {
    color: ${theme.colors.body};
    font-family: ${theme.fonts.sansSerif};
    font-size: 1rem;
    line-height: 1.5;
  }
  h1,h2,h3,h4,h5,h6,
  .h1,.h2,.h3,.h4,.h5,.h6 {
    font-family: ${theme.fonts.serif};
    font-weight: 400;
    line-height: 1;
  }
  h1, .h1 {
    font-size: 3rem;
    margin-bottom: .67em;
    article & {
      font-size: 1.57rem;
      line-height: 1.18;
    }
  }
  h2, .h2 {
    font-size: 1.55rem;
    line-height: 1.05;
    margin-bottom: .67em;
  }
  h3, .h3 {
    font-size: 1.2rem;
    margin-bottom: .5em;
  }
  p {
    margin-bottom: 1em;
  }
  p:last-child {
    margin-bottom: 0;
  }
  .headline {
    position: relative;
    &::before {
      background-color: ${theme.colors.highlight};
      content: "";
      display: block;
      height: 2px;
      right: calc(100% + 16px);
      max-width: 110.6666666px;
      position: absolute;
      top: .4em;
      width: 100%;
      @media only screen and (max-width: 1640px) {
        max-width: calc((100vw - 252px) / 12);
      }
      @media only screen and (max-width: ${theme.breakpoints.mobile}) {
        max-width: calc((100vw - 252px) / 6);
        right: calc(100% + 8px);
      }
    }
  }
  .tagline {
    font-family: ${theme.fonts.serif};
    font-size: 1.8rem;
    font-weight: 400;
    line-height: 1.05;
    margin-bottom: .67em;
  }
  .sub {
    font-size: 1.57rem;
    line-height: ‭1.05;
  }
  .text-center {
    text-align: center;
  }
  a {
    color: ${theme.colors.highlight};
    text-decoration: none;
  }
  address {
    font-style: normal;
  }
  b,
  .blue,
  .highlight {
    color: ${theme.colors.highlight};
  }
  strong {
    font-weight: bolder;
  }
  .white {
    color: ${theme.colors.white};
  }
  ul {
    list-style: disc;
    > li {
      margin-bottom: 1em;
    }
  }
  blockquote, q {
    display: block;
    margin-bottom: 1em;
    position: relative;
    &::before {
      background-color: ${theme.colors.light};
      content: "";
      display: block;
      height: 100%;
      left: -1em;
      position: absolute;
      width: 4px;
    }
  }
  @media only screen and (max-width: ${theme.breakpoints.mobile}) {
    html {
      font-size: 14px
    }
    h1 {
      font-size: 1.78rem;
      line-height: 1.16;
      article & {
        font-size: 1.57rem;
        line-height: 1.18;
      }
    }
    h2 {
      font-size: 1.71rem;
      line-height: 1.222222;
    }
    .sub {
      font-size: 1.57rem;
      line-height: ‭1.05;
    }
  }
`

const Lists = `
  dl {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 2.65rem;
  }
  dt {
    flex: 1 1 25%;
  }
  dd {
    flex: 1 1 75%;
    margin-bottom: 0;
  }
`

const Images = `
  img,
  .gatsby-image-wrapper {
    &.card {
      border: 1px solid ${theme.colors.gray70};
      box-sizing: border-box;
    }
  }
`

const Scrollbar = `
  ::-webkit-scrollbar {
    height: 4px;
    width: 4px;
  }
  ::-webkit-scrollbar-button {
    height: 0px;
    width: 0px;
  }
  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.dark};
    border: 0px none ${theme.colors.white};
    border-radius: 0px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.highlight};
  }
  ::-webkit-scrollbar-thumb:active {
    background: ${theme.colors.highlight};
  }
  ::-webkit-scrollbar-track {
    background: ${theme.colors.light};
    border: 0px none ${theme.colors.white};
    border-radius: 4px;
  }
  ::-webkit-scrollbar-track:hover {
    background: ${theme.colors.light};
  }
  ::-webkit-scrollbar-track:active {
    background: ${theme.colors.light};
  }
  ::-webkit-scrollbar-corner {
    background: transparent;
  }
`

const Backgrounds = `
  .bg-dark,
  .bg-light,
  .bg-white,
  .bg-highlight {
    position: relative;
    &::before {
      bottom: 0;
      content: "";
      height: 100%;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      width: 100%;
    }
  }
  .bg-white {
    background-color: ${theme.colors.white};
    &::before {
      background-color: ${theme.colors.white};
    }
  }
  .bg-highlight {
    background-color: ${theme.colors.highlight};
    &::before {
      background-color: ${theme.colors.highlight};
    }
  }
  .bg-dark {
    background-color: ${theme.colors.dark};
    &::before {
      background-color: ${theme.colors.dark};
    }
  }
`

const Buttons = `
  .btn,
  .button {
    align-items: center;
    background-color: ${theme.colors.highlight};
    border: ${theme.borders.width} ${theme.borders.style} ${theme.colors.highlight};
    border-radius: ${theme.borders.radius};
    box-sizing: border-box;
    color: ${theme.colors.white};
    cursor: pointer;
    display: inline-flex;
    flex: 1 1 auto;
    font-size: 0.8rem;
    justify-content: center;
    min-height: 3em;
    padding-left: 2em;
    padding-right: 2em;
    text-decoration: none;
    transition: ${theme.styles.transitionAll};
    &:hover {
      background-color: ${theme.colors.dark};
      border-color: ${theme.colors.dark};
      color: ${theme.colors.white};
    }
    &-outline {
      background-color: transparent;
      color: ${theme.colors.highlight};
      &:hover {
        background-color: ${theme.colors.highlight};
        border-color: ${theme.colors.highlight};
        color: ${theme.colors.white};
      }
    }
    &-white {
      background-color: ${theme.colors.white};
      border-color: ${theme.colors.white};
      color: ${theme.colors.body};
      &:hover {
        background-color: ${theme.colors.dark};
        border-color: ${theme.colors.dark};
        color: ${theme.colors.white};
      }
      &-outline {
        background-color: transparent;
        border-color: ${theme.colors.white};
        color: ${theme.colors.white};
        &:hover {
          background-color: ${theme.colors.highlight};
          border-color: ${theme.colors.highlight};
          color: ${theme.colors.white};
        }
      }
    }
    &-dark {
      background-color: ${theme.colors.dark};
      border-color: ${theme.colors.dark};
      color: ${theme.colors.white};
      &:hover {
        background-color: ${theme.colors.highlight};
        border-color: ${theme.colors.highlight};
        color: ${theme.colors.white};
      }
      &-outline {
        background-color: transparent;
        border-color: ${theme.colors.dark};
        color: ${theme.colors.dark};
        &:hover {
          background-color: ${theme.colors.highlight};
          border-color: ${theme.colors.highlight};
          color: ${theme.colors.white};
        }
      }
    }
  }
`

const UtilityClasses = `
  .fixed {
    position: fixed !important;
  }
  .bottomed-out {
    bottom: 0;
    position: absolute;
  }
  .full-width {
    max-width: 100%;
    width: 100%;
  }
`

const GlobalStyle = createGlobalStyle`
  html {
    &.noverflow,
    &.main-menu-open {
      overflow: hidden;
      padding-right: 17px;
    }
  }
  ${Typography}
  ${Lists}
  ${Images}
  ${Scrollbar}
  ${Backgrounds}
  ${Buttons}
  ${UtilityClasses}
  address {
    font-style: normal;
  }
  @media only screen and (max-width: ${theme.breakpoints.mobile}) {
  }
`

export default GlobalStyle
