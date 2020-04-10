import React from 'react'
import WidgetWrapper from './widgetWrapper'
import styled from 'styled-components'

import PwLi from '../../images/icon-linkedin.svg'
import PwIg from '../../images/icon-instagram.svg'
import PwFb from '../../images/icon-facebook.svg'
import PwTw from '../../images/icon-twitter.svg'

const Wrapper = styled(WidgetWrapper)`
  @media only screen and (max-width: 1366px) {
    border-right: 0;
  }
  @media only screen and (max-width: ${props => props.theme.breakpoints.mobile}) {
  }
`

const IconList = styled.ul`
  list-style: none;
  display: flex;
  margin: 0;
`

const IconItem = styled.li`
  flex: 0 1 auto;
  margin-bottom: 0;
  margin-left: 0;
  margin-right: 1.1em;
  margin-top: 0;
  &:last-child {
    margin-right: 0;
  }
`

const IconLink = styled.a`
  color: ${props => props.theme.colors.body}
`

const IconTitle = styled.span`
  display: none;
`

const SocialWidget = () => {
  return (
    <Wrapper title={`Follow Us`}>
      <IconList>
        <IconItem>
          <IconLink
            href="https://www.linkedin.com/"
            target="_bank"
            rel="nofollow noreferrer"
          >
            <img src={PwLi} alt="LinkedIn" />
            <IconTitle>LinkedIn</IconTitle>
          </IconLink>
        </IconItem>
        <IconItem>
          <IconLink
            href="https://www.instagram.com/"
            target="_bank"
            rel="nofollow noreferrer"
          >
            <img src={PwIg} alt="Instagram" />
            <IconTitle>Instagram</IconTitle>
          </IconLink>
        </IconItem>
        <IconItem>
          <IconLink
            href="https://twitter.com/"
            target="_bank"
            rel="nofollow noreferrer"
          >
            <img src={PwTw} alt="Twitter" />
            <IconTitle>Twitter</IconTitle>
          </IconLink>
        </IconItem>
        <IconItem>
          <IconLink
            href="https://www.facebook.com/"
            target="_bank"
            rel="nofollow noreferrer"
          >
            <img src={PwFb} alt="Facebook" />
            <IconTitle>Facebook</IconTitle>
          </IconLink>
        </IconItem>
      </IconList>
    </Wrapper>
  )
}

export default SocialWidget
