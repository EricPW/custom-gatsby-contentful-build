import React from 'react'
import { Container as ReactContainer } from 'react-grid-system'
import styled from 'styled-components'

const StyledContainer = styled(ReactContainer)`
  padding-left: ${props => props.theme.gutters.container} !important;
  padding-right: ${props => props.theme.gutters.container} !important;
  @media only screen and (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding-left: ${props => props.theme.gutters.containerMobile} !important;
    padding-right: ${props => props.theme.gutters.containerMobile} !important;
  }
`

const Container = (props) => {
  return (
    <StyledContainer className={props.className} {...props}>{props.children}</StyledContainer>
  )
}

export default Container
