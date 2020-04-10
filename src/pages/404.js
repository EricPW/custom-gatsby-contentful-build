import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import { Container, Row, Col, useScreenClass, Hidden } from 'react-grid-system'
import styled from 'styled-components'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import SEO from '../components/seo'
import { Helmet } from 'react-helmet'
import Layout from '../components/layout'
import Main from '../components/main'

const Page404 = (props) => {
  const {
    seoTitle,
    seoDescription,
    seoHelmet,
  } = props.data.contentfulPage
  const screenClass = useScreenClass()
  return (
    <Layout>
      <SEO
        title={seoTitle ? seoTitle : ``}
        description={seoDescription && seoDescription.seoDescription ? seoDescription.seoDescription : false}
      />
      <Helmet>
        {seoHelmet ? seoHelmet.seoHelmet : ''}
      </Helmet>
      <Main>
        <section>
          <Container style={{
            paddingLeft: ['md', 'lg', 'xl'].includes(screenClass) ? '3.4rem' : '33px',
            paddingRight: ['md', 'lg', 'xl'].includes(screenClass) ? '3.4rem' : '33px',
          }}>
            <Row>
              <Col lg={8} offset={{ lg: 2 }}>
                <h1 className={`headline`}>{props.data.contentfulPage.mainHeadline}</h1>
                {documentToReactComponents(props.data.contentfulPage.text.json)}
              </Col>
            </Row>

          </Container>
        </section>
      </Main>
    </Layout>
  )
}

export const query = graphql`
  query {
    contentfulPage(slug: {eq: "404"}) {
      id
      slug
      name
      mainHeadline
      text {
        json
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

export default Page404
