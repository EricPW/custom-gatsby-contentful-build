import React, { useState } from 'react'
import styled from 'styled-components'

// Custom styled components
const Wrapper = styled.div`
  background-color: transparent;
  color: ${props => props.theme.colors.body};
  display: block;
  height: 29px;
  position: fixed;
  right: 60px;
  top: 30px;
  width: 44px;
  @media only screen and (max-width: ${props => props.theme.breakpoints.mobile}) {
    height: 15px;
    right: 23px;
    top: 23px;
    width: 23px;
  }
`

const Bun = styled.button`
  background-color: transparent;
  border: 0;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  padding: 0;
  text-decoration: none;
  width: 100%;
  @media only screen and (max-width: ${props => props.theme.breakpoints.mobile}) {
  }
`

const Bar = styled.div`
  background-color: ${props => props.theme.colors.body};
  display: block;
  flex: 1 1 100%;
  height: 4px;
  max-height: 4px;
  width: 100%;
  width: 44px;
  transition: background-color ${props => props.theme.styles.transition};
  .inverted-header &,
  body[class*='is-intersecting'] & {
    background-color: ${props => props.theme.colors.white};
  }
  body[class*='is-intersecting__home__main'] & {
    background-color: ${props => props.theme.colors.body};
  }
  @media only screen and (max-width: ${props => props.theme.breakpoints.mobile}) {
    height: 2px;
    max-height: 2px;
    width: 23px;
  }
`

const Hamburger = (props) => {
  const handleClick = () => {
    document.body.classList.toggle('show-main-menu')
  }
  return (
    <Wrapper
      onClick={() => handleClick()}
      className={props.className}
    >
      <Bun aria-label="main menu">
        <Bar />
        <Bar />
        <Bar />
      </Bun>
    </Wrapper>
  )
}

export default Hamburger
