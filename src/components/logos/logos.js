import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

import Img50 from '../../images/200x50.png'
import ImgWhite from '../../images/200x50.png'
import ImgCircle from '../../images/50.png'



const Logos = ({ ...props }) => {
  const data = useStaticQuery(graphql`
    query {
      color: file(relativePath: { eq: "200x50.png" }) {
        ...headerLogo
      }
      white: file(relativePath: { eq: "200x50.png" }) {
        ...headerLogo
      }
      circle: file(relativePath: { eq: "50.png" }) {
        ...pwCircleLogo
      }
      site {
        ...siteMeta
      }
    }
  `)
  return (
    <>
      {props.logo === "color" &&
        <Img fluid={data.color.childImageSharp.fluid} alt={data.site.siteMetadata.title} className={props.className} />
      }
      {props.logo === "white" &&
        <Img fluid={data.white.childImageSharp.fluid} alt={data.site.siteMetadata.title} className={props.className} />
      }
      {props.logo === "circle" &&
        <Img fixed={data.circle.childImageSharp.fixed} alt={data.site.siteMetadata.title} className={props.className} />
      }
    </>
  )
}

const Brand = styled.span`
  display: none;
`

const Logo = (props) => {
  const handleClick = (e) => {
    document.body.classList.remove('show-main-menu')
  }
  return (
    <Link
      to={props.to || `/`}
      className={props.className}
      onClick={(e) => handleClick()}
    >
      <img src={Img50} alt="Lorem Ipsum" />
      <Brand>Lorem Ipsum</Brand>
    </Link>
  )
}

const LogoWhite = (props) => {
  return (
    <Link to={props.to || `/`} className={props.className}>
      <img src={ImgWhite} alt="Lorem Ipsum" />
      <Brand>Lorem Ipsum</Brand>
    </Link>
  )
}

const LogoCircle = (props) => {
  return (
    <Link to={props.to || `/`} className={props.className}>
      <img src={ImgCircle} alt="Lorem Ipsum" />
      <Brand>Lorem Ipsum</Brand>
    </Link>
  )
}

export { LogoWhite, LogoCircle }

export default Logo
