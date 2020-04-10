import React from 'react'
import styled from 'styled-components'
import WidgetWrapper from './widgetWrapper'

const Wrapper = styled(WidgetWrapper)`
  padding-left: 0;
  padding-top: 1em;
`

const Address = styled.address`
  margin-bottom: 0;
  white-space: nowrap;
`

const AddressWidget = () => (
  <Wrapper>
    <Address>123 Main St<br />
    City, State 00001</Address>
  </Wrapper>
)

export default AddressWidget
