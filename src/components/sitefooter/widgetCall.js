import React from "react"

import WidgetWrapper from './widgetWrapper'
import styled from 'styled-components'

const Wrapper = styled(WidgetWrapper)`
  flex: 2 1 auto;
`

const PhoneLink = (props) => {
  return (
    <a
      href={`tel:${props.number}`}
      className={props.className}
    >{props.number}</a>
  )
}

const Phone = styled(PhoneLink)`
  color: ${props => props.theme.colors.body};
  margin-bottom: 0;
  text-decoration: none;
`

const CallWidget = () => (
  <Wrapper title={`Give us a call`}>
    <Phone number={`800-555-0001`} />
  </Wrapper>
)

export default CallWidget
