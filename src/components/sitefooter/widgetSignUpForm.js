import React from "react"
import styled from 'styled-components'
import { rgba } from 'polished'
import { Container, Row, Col, useScreenClass } from 'react-grid-system'

import WidgetWrapper from './widgetWrapper'

const Wrapper = styled(WidgetWrapper)`
  border-right: 0;
  padding-right: 0;
  @media only screen and (max-width: 1366px) {
    border-bottom: 0;
    padding-left: 0;
    padding-right: 0;
    padding-top: 2rem;
  }
`

const StyledLabel = styled.label`
  color: ${props => rgba(props.theme.colors.body,.43)};
  font-size: 0.7rem;
  line-height: 1;
  margin-right: ${props => props.theme.gutters.normal};
  position: relative;
  span {
    position: absolute;
    left: 8px;
    top: 6px;
  }
`

const StyledInput = styled.input`
  background: transparent;
  border: 1px solid ${props => props.theme.colors.gray70};
  box-sizing: border-box;
  font-size: 0.8rem;
  height: 48px;
  margin: 0;
  padding: 19.6px 8px 4px 8px;
  width: 100%;
  &:focus {
    outline-color: ${props => props.theme.colors.highlight};
  }
  @media only screen and (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex: 1 0 auto;
  }
`

const SignUpWidget = () => {
  return (
    <Wrapper title={`Keep in touch`}>
      <Container id="mc_embed_signup" style={{ padding: 0 }}>
        <form action={`https://mailchimp.com`} method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
          <Row align="center">
            <Col >
              <div id="mc_embed_signup_scroll">
                <div className="mc-field-group">
                  <StyledLabel htmlFor="mce-EMAIL">
                    <span style={{ whiteSpace: `nowrap` }}>
                      email address
                    </span>
                    <StyledInput type="email" defaultValue="" name="EMAIL" className="required email" id="mce-EMAIL" />
                  </StyledLabel>
                </div>
                <div id="mce-responses" className="clear">
                  <div className="response" id="mce-error-response" style={{ display: `none` }}></div>
                  <div className="response" id="mce-success-response" style={{ display: `none` }}></div>
                </div>
              </div>
            </Col>
            <Col xs="content">
              <button className={`button`} type="submit">SIGN UP</button>
            </Col>
          </Row>
        </form>
      </Container>
    </Wrapper>
  )
}

export default SignUpWidget
