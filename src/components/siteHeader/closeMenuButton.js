import React from 'react'
import styled from 'styled-components'

// Styled Components

const Wrapper = styled.a`
  align-items: center;
  background-color: ${props => props.theme.colors.black};
  color: ${props => props.theme.colors.white};
  cursor: pointer;
  display: flex;
  height: 73px;
  position: fixed;
  right: 0;
  text-decoration: none;
  top: 30px;
  transition: ${props => props.theme.styles.transitionAll};
  width: 0;
  z-index: 40;
  .show-main-menu & {
    width: 262px;
    @media only screen and (max-width: ${props => props.theme.breakpoints.mobile}) {
      width: 56px;
    }
  }
  @media only screen and (max-width: ${props => props.theme.breakpoints.mobile}) {
    top: 23px;
    height: 40px;
  }
`

const Text = styled.p`
  color: ${props => props.theme.colors.white};
  display: inline-block;
  font-size: 24px;
  line-height: 1.166666666666667;
  margin-bottom: 0;
  margin-right: 73px;
  position: absolute;
  left: 28px;
  text-transform: uppercase;
  @media only screen and (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: none;
  }
`

const X = styled.div`
  position: absolute;
  height: 27px;
  left: 170px;
  width: 27px;
  &::before, &::after {
    background-color: ${props => props.theme.colors.white};
    content: "";
    display: block;
    height: 4px;
    left: -20%;
    position: absolute;
    top: 50%;
    width: 38.18376618407357px;
  }
  &::before {
    transform: rotate(45deg)
  }
  &::after {
    transform: rotate(-45deg)
  }
  @media only screen and (max-width: ${props => props.theme.breakpoints.mobile}) {
    height: 17px;
    width: 17px;
    left: 15px;
    &::before, &::after {
      width: 24.04163056034262px;
    }
  }
`

const CloseMenuButton = (props) => {
  const handleClick = () => {
    document.body.classList.toggle('show-main-menu')
  }
  return (
    <Wrapper
      onClick={(e) => handleClick()}
      className={props.className}
    >
      <Text>Close</Text>
      <X />
    </Wrapper>
  )
}

export default CloseMenuButton
