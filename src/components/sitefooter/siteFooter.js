import React from "react"
import styled from 'styled-components'
import { Container, Row, Col, useScreenClass } from 'react-grid-system'

import AddressWidget from './widgetAddress'
import CallWidget from './widgetCall'
import SocialWidget from './widgetSocial'
import SignUpWidget from './widgetSignUpForm'
import { LogoCircle } from '../logos/logos'

const Footer = styled.footer`
  padding-bottom: 66px;
  padding-top: 46.5px;
  position: relative;
`

const StyledLogo = styled(LogoCircle)`
  margin: auto;
`

const SiteFooter = () => {
  const screenClass = useScreenClass()

  return (
    <Footer className={`bg-white`}>
      <Container style={{
        paddingLeft: ['md', 'lg', 'xl'].includes(screenClass) ? '3rem' : '1.5625rem',
        paddingRight: ['md', 'lg', 'xl'].includes(screenClass) ? '3rem' : '1.5625rem'
      }}>
        <Row align="center">
          <Col xs={0} xl={1} style={{display: ['xs', 'sm', 'md', 'lg'].includes(screenClass) ? 'none' : 'flex'}}>
            <StyledLogo />
          </Col>
          <Col xs={12} xl={10}>
            <Row>
              <Col md={12} lg={4} xl="content">
                <AddressWidget />
              </Col>
              <Col md={12} lg={4} xl="content">
                <CallWidget />
              </Col>
              <Col md={12} lg={4} xl="content">
                <SocialWidget />
              </Col>
              <Col>
                <SignUpWidget />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Footer>
  )
}

export default SiteFooter
