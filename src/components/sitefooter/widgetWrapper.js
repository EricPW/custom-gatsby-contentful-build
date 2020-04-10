import React from "react"
import { Container, Row, Col, useScreenClass } from 'react-grid-system'

import styled from 'styled-components'
import { rgba } from 'polished'

const Wrapper = styled.div`
  border-right: 1px solid ${props => rgba(props.theme.colors.body, 0.5)};
  box-sizing: border-box;
  max-width: 100%;
  padding-bottom: 0;
  padding-left: 27px;
  padding-right: 30px;
  padding-top: 16.5px;
  position: relative;
  height: 100%;
  @media only screen and (max-width: ${props => props.theme.breakpoints.tablet}) {
    border-bottom: 1px solid ${props => rgba(props.theme.colors.body, 0.5)};
    border-right: 0;
    padding-bottom: 31.5px;
    padding-left: 0;
    padding-right: 0;
    padding-top: 31.5px;
  }
`

const Title = styled.h3`
  margin-bottom: 16px;
`

const WidgetWrapper = (props) => (
  <Wrapper className={props.className}>
    {props.title &&
      <Title>{props.title}</Title>
    }
    {props.children}
  </Wrapper>
)

export default WidgetWrapper
