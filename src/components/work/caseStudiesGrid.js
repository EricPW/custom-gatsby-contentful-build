import React, { useState } from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { rgba } from 'polished'

const Wrapper = styled.div`
  overflow: hidden;
`

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin-bottom: 0;
  margin-left: -8px;
  margin-right: -8px;
`

const ListItem = styled.li`
  background-color: ${props => props.theme.colors.light};
  box-sizing: border-box;
  display: flex;
  flex: 1 1 auto;
  margin-bottom: 16px;
  margin-left: 8px;
  margin-right: 8px;
  max-height: 26vw;
  max-width: 60%;
  min-height: 400px;
  /* min-height: 34vh; */
  min-width: 300px;
  overflow: hidden;
  position: relative;
  transition: ${props => props.theme.styles.transitionAll};
  @media only screen and (max-width: 931px) {
    max-width: 100%;
  }
  @media only screen and (max-width: ${props => props.theme.breakpoints.mobile}) {
    height: 55.625vw;
    margin: 0;
    max-width: 100%;
    max-height: 178px;
    max-height: 55.625vw;
    min-height: 55.625vw;
  }
`

const Split = styled.li`
  display: none;
  flex: 1 0 100%;
  height: 0;
  overflow: hidden;
  width: 0;
  @media only screen and (min-width: 1440px) {
    &.byCustom {
      display: block;
      width: 100%;
    }
  }
  @media only screen and (max-width: 1440px) {
    &.byTwos {
      display: block;
      width: 100%;
    }
  }
`

const PreviewImage = styled(Img)`
  bottom: 0;
  height: 100%;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transform: scale(1);
  transition: transform .25s ease;
  width: 100%;
  ${ListItem}:hover & {
    transform: scale(1.333333);
    transition: transform 6s ease;
  }
`

const VideoWrapper = (props) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const onVideoLoaded = () => {
    setIsVideoLoaded(true)
  }
  return (
    <div className={props.className}>
      <video
        muted="muted"
        autoPlay="autoplay"
        loop="loop"
        playsInline
        width="100%"
        onLoadedData={onVideoLoaded}
      >
        <source src={props.localFile.publicURL} type={props.file.contentType} />
      </video>
    </div>
  )
}

const PreviewVideo = styled(VideoWrapper)`
  align-items: center;
  bottom: 0;
  display: flex;
  height: 100%;
  left: 0;
  min-height: 100%;
  min-width: 100%;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
`

const Overlay = styled(Link)`
  align-items: center;
  background-color: ${props => rgba(props.theme.colors.gray22,0.75)};
  bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  left: 25px;
  opacity: 0;
  padding: 35px 39px;
  position: absolute;
  right: 25px;
  text-align: center;
  top: 20px;
  transition: opacity ${props => props.theme.styles.transition};
  li:hover > &, &:hover {
    opacity: 1;
  }
  @media only screen and (max-width: ${props => props.theme.breakpoints.mobile}) {
    background: rgb(121,121,121);
    background: linear-gradient(180deg, rgba(121,121,121,0) 0%, rgba(96,96,96,0.4) 20%, rgba(61,61,61,1) 100%);
    bottom: 0;
    left: 0;
    opacity: 1;
    padding: 12px 25px;
    right: 0;
    text-align: left;
    top: 0;
  }
`

const Preview = styled.h2`
  color: ${props => props.theme.colors.white};
  font-size: 39px;
  line-height: 1.1;
  margin-bottom: .5em;
  span {
    color: ${props => props.theme.colors.highlight};
  }
  @media only screen and (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 28px;
    left: 0;
    line-height: 1;
    max-height: 57px;
    overflow: hidden;
    padding: 0 25px;
    position: absolute;
    top: 50%;
  }
`

const Client = styled.h3`
  color: ${props => props.theme.colors.white};
  font-size: 24px;
  line-height: 1.083333333;
  max-width: calc(100% - 100px);
  font-family: ${props => props.theme.fonts.sansSerif};
  @media only screen and (max-width: ${props => props.theme.breakpoints.mobile}) {
    bottom: 12px;
    font-size: 16px;
    left: 0;
    padding: 0 25px;
    position: absolute;
  }
`

const ReadMore = styled.div`
  position: absolute;
  bottom: 35px;
  right: 39px;
  @media only screen and (max-width: ${props => props.theme.breakpoints.mobile}) {
    display: none;
  }
`

const CaseStudiesGrid = (props) => {
  const data = useStaticQuery(graphql`
    query {
      readMore: file(relativePath: { eq: "arrow-right.png" }) {
        childImageSharp {
          fixed(width: 66, height: 66, quality: 100) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
    }
  `)
  const SplitIndexArray = []
  for (let i = 0; i < props.caseStudies.length; i++) {
    const v = (1 + Math.pow(-1, (1 + i)) + (10 * i))/4;
    SplitIndexArray.push(v)
  }

  return (
    <Wrapper>
      <List>
        {props.caseStudies.map((caseStudy, index) => {
          caseStudy = caseStudy.node || caseStudy
          const previewMedia = (caseStudy.previewMedia && Array.isArray(caseStudy.previewMedia)) ? caseStudy.previewMedia : false
          const contentType = previewMedia[0].file.contentType
          return ([
            <ListItem
              key={caseStudy.slug}
              style={{ flexGrow: caseStudy.previewWeight }}
            >
              <div key={index} style={{ height: `100%`, width: `100%` }}>
                {contentType.slice(0, contentType.indexOf("/")) === "image" &&
                  <PreviewImage fluid={previewMedia[0].localFile && previewMedia[0].localFile.childImageSharp ?
                    previewMedia[0].localFile.childImageSharp.fluid :
                    previewMedia[0].fluid
                  } key={index} />                    }
                }
                {contentType.slice(0, contentType.indexOf("/")) === "video" &&
                  <PreviewVideo {...previewMedia[0]} key={index} />
                }
              </div>
              <Overlay to={`/work/${caseStudy.slug}/`}>
                <Preview dangerouslySetInnerHTML={{__html: caseStudy.previewText}} />
                <Client>
                  {caseStudy.clientName}
                </Client>
                <ReadMore>
                  <Img fixed={data.readMore.childImageSharp.fixed} />
                </ReadMore>
              </Overlay>
            </ListItem>,
            <Split
              key={`split-${index}`}
              className={`
                ${SplitIndexArray.includes(index + 1) ? `byCustom` : ``}

                ${(index + 1) % 2 === 0 ? `byTwos` : ``}
              `}
            />
          ])
        })}
      </List>
    </Wrapper>
  )
}

export default CaseStudiesGrid
