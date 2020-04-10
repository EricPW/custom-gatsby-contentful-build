import React from 'react'
import { Container, Row, Col, useScreenClass, Visible } from 'react-grid-system'
import styled from 'styled-components'
import CloseMenuButton from './closeMenuButton'
import Navigation from './navigation'

// Styled Components

const Wrapper = styled.div`
  background-color: ${props => props.theme.colors.darker};
  color: ${props => props.theme.colors.white};
  display: block;
  height: 100vh;
  left: 100%;
  max-height: 100vh;
  max-width: 100vw;
  overflow: hidden;
  position: fixed;
  right: 0;
  top: 0;
  transition: left .25s ease .05s;
  width: 100%;
  .show-main-menu & {
    left: 0;
  }
`

const StyledContainer = styled(Container)`
  height: 100%;
  max-height: 100%;
  padding: 0 !important;
`

const StyledRow = styled(Row)`
  height: 100%;
  max-height: 100%;
`

const LeftCol = styled(Col)`
  margin-left: 320px !important;
  max-height: 100%;
`

const RightCol = styled(Col)`
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 100%;
`

const RightRowInner = styled(Row)`
  max-width: 812px !important;
`

const MainMenu = (props) => {
  const screenClass = useScreenClass()

  return (
    <>
      <Wrapper
        className={props.className}
      >
        <StyledContainer fluid>
          <StyledRow nogutter>
            <RightCol lg={6}>
              <RightRowInner style={{
                paddingLeft: ['xs', 'sm'].includes(screenClass) ? '1.5625rem' : ['md'].includes(screenClass) ? '3rem' : '0',
                paddingRight: ['xs', 'sm'].includes(screenClass) ? '1.5625rem' : ['md'].includes(screenClass) ? '3rem' : '0',
              }}>
                <Col lg={10} offset={{ lg: 2 }}>
                  <Navigation {...props} style={{
                    marginTop: `200px`,
                  }}/>
                </Col>
              </RightRowInner>
            </RightCol>
          </StyledRow>
        </StyledContainer>
        <CloseMenuButton />
      </Wrapper>
    </>
  )
}

export default MainMenu
