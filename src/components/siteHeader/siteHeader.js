import React from 'react'
import styled from 'styled-components'
import Logo from '../logos/logos'
import MainMenu from './mainMenu'
import Hamburger from './hamburger'

// Custom styled components

const HeaderBg = styled.div`
  background-color: ${props => props.theme.colors.white};
  height: 100px;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  transition: background-color ${props => props.theme.styles.transition};
  z-index: 10;
  .inverted-header &,
  body[class*='is-intersecting'] & {
    background-color: transparent;
  }
  body[class*='is-intersecting__home__main'] & {
    background-color: ${props => props.theme.colors.white};
  }
  @media only screen and (max-width: ${props => props.theme.breakpoints.mobile}) {
    height: 66px;
  }
`

const Header = styled.header`
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 20;
`

const StyledLogo = styled(Logo)`
  filter: brightness(1) invert(0);
  left: 60px;
  position: absolute;
  top: 30px;
  transition: filter ${props => props.theme.styles.transition};
  width: 209px;
  z-index: 40;
  .show-main-menu &,
  body[class*='is-intersecting'] & {
    filter: brightness(0) invert(1);
  }
  body[class*='is-intersecting__home__main']:not(.show-main-menu) & {
    filter: brightness(1) invert(0);
  }
  @media only screen and (max-width: ${props => props.theme.breakpoints.mobile}) {
    left: 23px;
    top: 23px;
    width: 117px;
  }
`
const StyledHamburger = styled(Hamburger)`
  z-index: 30;
`

const StyledMainMenu = styled(MainMenu)`
  z-index: 35;
`

const SiteHeader = (props) => {
  return (
    <>
      <HeaderBg />
      <Header>
        <StyledLogo />
        <StyledHamburger />
        <StyledMainMenu {...props} />
      </Header>
    </>
  )
}

export default SiteHeader
