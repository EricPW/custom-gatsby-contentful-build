import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Container, Row, Col, useScreenClass, Hidden, Visible } from 'react-grid-system'

const Wrapper = styled.div`
  overflow: hidden;
`

const Item = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.gray48};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  margin-bottom: 16px;
  overflow: hidden;
  padding-bottom: .7rem;
  position: relative;
`

const H2 = styled.h2`
  font-size: 36px;
  @media only screen and (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.57rem;
  }
`

const PreviewText = styled.div`
  margin-bottom: .5rem;
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
  ${Item}:hover & {
    opacity: 0;
  }
`
const ReadMoreIconHover = styled(ReadMoreIcon)`
  opacity: 0;
  ${Item}:hover & {
    opacity: 1;
  }
`

const ReadMoreLinkTitle = styled.span`
  display: none;
`

const ExpertiseList = () => {
  const data = useStaticQuery(graphql`
    query {
      blue: file(relativePath: { eq: "arrow-right.png" }) {
        childImageSharp {
          fixed(width: 33, height: 33, quality: 100) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
      dark: file(relativePath: { eq: "arrow-right-gray.png" }) {
        childImageSharp {
          fixed(width: 33, height: 33, quality: 100) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
      allContentfulExpertisePage(
        sort: {fields: sortOrder, order: ASC}
      ) {
        edges {
          node {
            id
            name
            slug
            previewText {
              previewText
            }
            overview {
              json
            }
            sortOrder
          }
        }
      }
    }
  `)
  const allExpertise = data.allContentfulExpertisePage.edges
  const screenClass = useScreenClass()
  return (
    <Wrapper>
      <Row align="stretch">
        {allExpertise.map(({ node: expertise }, index) => (
          <Col md={6} key={index} style={{
            paddingBottom: '1.75rem',
          }}>
            <Item>
              <div>
                <H2>
                  {expertise.name}
                </H2>
                <PreviewText dangerouslySetInnerHTML={{__html: expertise.previewText.previewText}} />
              </div>
              <ReadMoreLink to={`/services/${expertise.slug}/`}>
                <ReadMoreIcon fixed={data.blue.childImageSharp.fixed} />
                <ReadMoreIconHover fixed={data.dark.childImageSharp.fixed} />
                <ReadMoreLinkTitle>{expertise.name}</ReadMoreLinkTitle>
              </ReadMoreLink>
            </Item>
          </Col>
        ))}
      </Row>
    </Wrapper>
  )
}

export default ExpertiseList
