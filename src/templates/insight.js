import React, { useEffect, useState, useRef } from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Container, Row, Col, useScreenClass, Visible } from 'react-grid-system'
import styled from 'styled-components'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import SEO from '../components/seo'
import Layout from '../components/layout'
import Main from '../components/main'
import RelatedInsights from '../components/insights/relatedInsights'

const PageTitle = styled.h1`
  font-size: 1.8rem;
  line-height: 1.05;
  margin-bottom: 2.5rem;
`

const Content = styled.div`
  b {
    color: ${props => props.theme.colors.darker};
    font-weight: 500;
  }
  ul {
    padding-left: 1em;
  }
`

const StickyWrapper = styled.div`
  display: flex;
  position: sticky;
  top: 100px;
  z-index: -1;
  @media only screen and (max-width: ${props => props.theme.breakpoints.mobile}) {
    top: 0;
  }
`

const Insight = (props) => {
  const {
    date,
    image,
    relatedInsights,
    seoTitle,
    seoDescription,
    seoHelmet,
    title,
    text,
  } = props.data.contentfulInsightsPage

  const seo = {
    title: props.pageContext.seo.title || seoTitle || '',
    description: props.pageContext.seo.description || seoDescription?.seoDescription || ''
  }

  const contentSectionRef = useRef()
  const fixedImageRef = useRef()
  const screenClass = useScreenClass()
  const [fixImage, setFixImage] = useState(true)

  return (
    <Layout>
      <SEO
        title={seo.title}
        description={seo.description}
        insightSEO
        pageUrl={props?.location?.href}
        image={image?.file?.url}
      >
        {seoHelmet?.seoHelmet || null}
      </SEO>
      <Main>
        <Container style={{
          paddingLeft: ['md', 'lg', 'xl'].includes(screenClass) ? '3rem' : '1.5625rem',
          paddingRight: ['md', 'lg', 'xl'].includes(screenClass) ? '3rem' : '1.5625rem'
        }}>
          <Row>
            <Col lg={6} offset={{ lg: 1 }}>
              <PageTitle className={`headline`}><span dangerouslySetInnerHTML={{ __html: title }} /></PageTitle>
              <p>{date}</p>
              <Content ref={contentSectionRef}>{documentToReactComponents(text.json)}</Content>
            </Col>
            <Col lg={4}>
              {image && image.localFile && image.localFile.childImageSharp &&
                <StickyWrapper
                  className={['lg', 'xl'].includes(screenClass) ? (fixImage ? `sticky` : `bottomed-out`) : ``}
                  ref={fixedImageRef}
                >
                  <Img
                    fluid={image.localFile.childImageSharp.fluid}
                    style={{
                      width: ['xl'].includes(screenClass) ? '624px' : ['lg'].includes(screenClass) ? '370px' : '100%',
                    }}
                  />
                </StickyWrapper>
              }
            </Col>
          </Row>
        </Container>
      </Main>
      {relatedInsights &&
        <RelatedInsights posts={relatedInsights}/>
      }
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    contentfulInsightsPage(slug: { eq: $slug }) {
      title
      date(formatString: "MMMM DD, YYYY")
      dateISO: date(formatString: "YYYY-MM-DD")
      text {
        json
      }
      image {
        localFile {
          ...insightsThumbnail
        }
        file {
          url
        }
      }
      relatedInsights {
        id
        slug
        title
        preview
        image {
          localFile {
            ...insightsThumbnail
          }
        }
      }
      seoTitle
      seoDescription {
        seoDescription
      }
      seoHelmet {
        seoHelmet
      }
    }
  }
`

export default Insight
