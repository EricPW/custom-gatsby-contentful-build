import React from 'react'
import styled from 'styled-components'

const MainWrapper = styled.main`
  display: block;
  margin-top: 101px;
  padding-bottom: 68px;
  padding-top: 90px;
  position: relative;
  width: 100%;
  @media only screen and (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-top: 0;
    padding-bottom: 20px;
    padding-top: 80px;
  }
`

const Main = ( props ) => {
  return (
    <MainWrapper {...props}>{props.children}</MainWrapper>
  )
}

export default Main
