import React from 'react'
import { graphql, Link } from 'gatsby'
import { Container, Row, Col, useScreenClass, Visible } from 'react-grid-system'
import styled from 'styled-components'

import config from '../utils/siteConfig'
import SEO from '../components/seo'
import { Helmet } from 'react-helmet'
import Layout from '../components/layout'
import Main from '../components/main'
import InsightsList from '../components/insights/insightsList'
import Pagination from '../components/pagination'
import InsightsCategoriesNav from '../components/insights/insightsCategoriesNav'
import InsightsListRecent from '../components/insights/insightsListRecent'

const Categories = (props) => {
  const {
    seoTitle,
    seoDescription,
    seoHelmet,
  } = props.data.contentfulInsightsCategory
  const posts = props.data.allContentfulInsightsPage.edges
  const categoryName = props.data.contentfulInsightsCategory.name
  const { currentPage } = props.pageContext
  const screenClass = useScreenClass()

  return (
    <Layout>
      <SEO
        title={`${seoTitle} ${currentPage > 1 ?  `- Page ${currentPage}` : `` }`}
        description={seoDescription && seoDescription.seoDescription ? seoDescription.seoDescription : false}
      />
      <Helmet>
        {seoHelmet ? seoHelmet.seoHelmet : ''}
      </Helmet>
      <Main>
        <Container style={{
          paddingLeft: ['md', 'lg', 'xl'].includes(screenClass) ? '3rem' : '1.5625rem',
          paddingRight: ['md', 'lg', 'xl'].includes(screenClass) ? '3rem' : '1.5625rem'
        }}>
          <Row>
            <Col lg={10} xl={2} offset={{ lg: 2 }} style={{
              paddingRight: ['lg', 'xl'].includes(screenClass) ? '3rem' : '.5rem'
            }}>
              <div style={{
                position: ['xl'].includes(screenClass) ? 'fixed' : '',
              }}>
                <h1 className={`headline`} style={{ marginBottom: `.2em` }}>
                  Insights:
                </h1>
                <h2 className={`highlight`} dangerouslySetInnerHTML={{ __html: categoryName }} />
              </div>
            </Col>
            <Col offset={{ lg: 2, xl: 0 }} style={{
              paddingLeft: ['md', 'lg', 'xl'].includes(screenClass) ? '2rem' : '.5rem',
              paddingRight: ['lg', 'xl'].includes(screenClass) ? '3rem' : '.5rem'
            }}>
              <InsightsList posts={posts} />
              <Pagination context={props.pageContext} />
            </Col>
            <Col lg={3}>
              <InsightsCategoriesNav {...props} />
              <Visible lg xl>
                <InsightsListRecent />
              </Visible>
            </Col>
          </Row>
        </Container>
      </Main>
    </Layout>
  )
}

// query($skip: Int!, $limit: Int!, $slug: String!) {
export const query = graphql`
  query($limit: Int!, $skip: Int!, $slug: String!) {
    contentfulInsightsCategory(slug: {eq: $slug}) {
      id
      name
      slug
      seoTitle
      seoDescription {
        seoDescription
      }
      seoHelmet {
        seoHelmet
      }
    }
    allContentfulInsightsPage(
      filter: {
        category: {slug: {eq: $slug}},
      }
      sort: { fields: [date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          title
          slug
          date
          preview
          text {
            json
          }
          image {
            localFile {
              ...insightsThumbnail
            }
          }
          category {
            slug
            name
          }
        }
      }
    }
  }
`

export default Categories
