import React from 'react'
import { graphql, Link } from 'gatsby'
import { Container, Row, Col, useScreenClass, Visible } from 'react-grid-system'

// import config from '../utils/siteConfig'
import SEO from '../components/seo'
import { Helmet } from 'react-helmet'
import Layout from '../components/layout'
import Main from '../components/main'
import InsightsList from '../components/insights/insightsList'
import Pagination from '../components/pagination'
// import CtaBanner from '../components/ctaBanner'
import InsightsCategoriesNav from '../components/insights/insightsCategoriesNav'
import InsightsListRecent from '../components/insights/insightsListRecent'

const Insights = (props) => {
  const {
    seoTitle,
    seoDescription,
    seoHelmet,
  } = props.data.contentfulPage
  const posts = props.data.allContentfulInsightsPage.edges
  const { currentPage } = props.pageContext
  const screenClass = useScreenClass()

  return (
    <Layout>
      <SEO
        title={`${seoTitle} ${currentPage > 1 ?  `- Page ${currentPage}` : `` }`}
        description={seoDescription?.seoDescription ? seoDescription.seoDescription : false}
      >
        {seoHelmet ? seoHelmet.seoHelmet : ''}
      </SEO>
      <Main>
        <Container style={{
          paddingLeft: ['md', 'lg', 'xl'].includes(screenClass) ? '3rem' : '1.5625rem',
          paddingRight: ['md', 'lg', 'xl'].includes(screenClass) ? '3rem' : '1.5625rem'
        }}>
          <Row>
            <Col lg={10} xl={2} offset={{ lg: 2 }}>
              <h1
                className={`headline`}
                style={{
                  position: ['xl'].includes(screenClass) ? 'fixed' : '',
                }}
              >Insights</h1>
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

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    contentfulPage(slug: {eq: "insights"}) {
      id
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
            name
            slug
          }
        }
      }
    }
  }
`

export default Insights
