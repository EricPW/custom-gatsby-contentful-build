import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { Container, Row, Col, useScreenClass, Visible } from 'react-grid-system'

const Article = styled.article`
  border-bottom: 1px solid ${props => props.theme.colors.body};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: 1.375rem;
  position: relative;
  &.aside {
    margin-bottom: 18.5px;
    padding-bottom: 18.5px;
  }
`

const InsightImageWrapper = styled.div`
  height: 0;
  margin-bottom: 27px;
  max-width: 100%;
  overflow: hidden;
  padding-bottom: 66.66666666667%;
  width: 100%;
`

const InsightImage = styled(Img)`
  height: auto;
  width: 100%;
  .aside & {
    margin-bottom: 0;
  }
`

const InsightImageAnimated = styled(InsightImage)`
  transform: scale(1);
  transition: transform .25s ease;
  ${Article}:hover & {
    transform: scale(1.333333);
    transition: transform 6s ease;
  }
`

const PostTitle = styled.h1`
  margin-bottom: 1rem;
  .aside & {
    font-family: ${props => props.theme.fonts.sansSerif};
    font-size: 1rem;
    margin-bottom: 0;
  }
`

const PostExcerpt = styled.div`
  flex: 1 0 auto;
`

const ReadMoreLink = styled(Link)`
  display: flex;
  height: 0;
  justify-content: flex-end;
  margin-bottom: 33px;
  margin-left: auto;
  margin-top: .5rem;
  position: unset;
  &::after {
    bottom: 0;
    content: "";
    display: block;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }
`

const ReadMoreIcon = styled(Img)`
  opacity: 1;
  position: absolute !important;
  transition: opacity ${props => props.theme.styles.transition};
  ${Article}:hover & {
    opacity: 0;
  }
`
const ReadMoreIconHover = styled(ReadMoreIcon)`
  opacity: 0;
  ${Article}:hover & {
    opacity: 1;
  }
`

const Insight = (props) => {
  const data = useStaticQuery(graphql`
    query {
      blue: file(relativePath: { eq: "arrow-right.png" }) {
        childImageSharp {
          fixed(width: 33, height: 33, quality: 100) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
      gray: file(relativePath: { eq: "arrow-right-gray.png" }) {
        childImageSharp {
          fixed(width: 33, height: 33, quality: 100) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
    }
  `)
  const post = props
  if (props.aside) {
    return (
      <Article className={`${props.className} aside`}>
        <Container>
          <Row>
            <Col xs={4}>
              {post.image && post.image.localFile && post.image.localFile.childImageSharp &&
                <InsightImage
                  fluid={post.image.localFile.childImageSharp.fluid}
                  sizes={{ ...post.image.localFile.childImageSharp.fluid, aspectRatio: 3 / 2 }}
                />
              }
            </Col>
            <Col xs={8}>
              <PostTitle dangerouslySetInnerHTML={{ __html: post.title }} />
            </Col>
          </Row>
        </Container>
        <ReadMoreLink to={`/insights/${post.slug}/`}>
          <ReadMoreIcon fixed={data.blue.childImageSharp.fixed} />
          <ReadMoreIconHover fixed={data.gray.childImageSharp.fixed} />
        </ReadMoreLink>
      </Article>
    )
  } else {
    return (
      <Article className={props.className}>
        {post.image && post.image.localFile && post.image.localFile.childImageSharp &&
          <InsightImageWrapper>
            <InsightImageAnimated
              fluid={post.image.localFile.childImageSharp.fluid}
              sizes={{ ...post.image.localFile.childImageSharp.fluid, aspectRatio: 3 / 2 }}
            />
          </InsightImageWrapper>
        }
        <PostTitle dangerouslySetInnerHTML={{ __html: post.title }} />
        <PostExcerpt dangerouslySetInnerHTML={{ __html: post.preview }} />
        <ReadMoreLink to={`/insights/${post.slug}/`}>
          <ReadMoreIcon fixed={data.blue.childImageSharp.fixed} />
          <ReadMoreIconHover fixed={data.gray.childImageSharp.fixed} />
        </ReadMoreLink>
      </Article>
    )
  }
}

export default Insight
