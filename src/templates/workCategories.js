import React, { useState } from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { rgba } from 'polished'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Container, Row, Col, useScreenClass } from 'react-grid-system'

import SEO from '../components/seo'
import { Helmet } from 'react-helmet'
import Layout from '../components/layout'
import Main from '../components/main'
import WorkCategoriesNav from '../components/work/workCategoriesNav'
import CaseStudiesGrid from '../components/work/caseStudiesGrid'

const StyledMain = styled(Main)`
  padding-bottom: 0;
`

const CategoryOverview = styled.div`
  margin-bottom: 50px;
  max-width: 753px;
  @media only screen and (max-width: ${props => props.theme.breakpoints.tablet}) {
    max-width: 100%;
  }
  @media only screen and (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-bottom: 10px;
  }
`

const WorkCategoryPage = (props) => {
  const {
    caseStudies,
    categoryName,
    categoryOverview,
    cta,
    seoDescription,
    seoHelmet,
    seoTitle,
  } = props.data.contentfulWorkCategory
  const screenClass = useScreenClass()
  return (
    <Layout>
      <SEO
        title={`${seoTitle}`}
        description={seoDescription && seoDescription.seoDescription ? seoDescription.seoDescription : false}
      />
      <Helmet>
        {seoHelmet ? seoHelmet.seoHelmet : ''}
      </Helmet>
      <StyledMain>
        <Container style={{
          paddingLeft: ['md', 'lg', 'xl'].includes(screenClass) ? '3rem' : '1.5625rem',
          paddingRight: ['md', 'lg', 'xl'].includes(screenClass) ? '3rem' : '1.5625rem'
        }}>
          <Row>
            <Col lg={6} offset={{ lg: 2 }}>
              <h1 className={`headline`}>Work: <span className={`highlight`}>{categoryName}</span></h1>
              <CategoryOverview>
                {documentToReactComponents(categoryOverview.json)}
              </CategoryOverview>
            </Col>
          </Row>
          <Row>
            <Col>
              <WorkCategoriesNav {...props} />
            </Col>
          </Row>
        </Container>
        <CaseStudiesGrid caseStudies={caseStudies} />
      </StyledMain>
    </Layout>
  )
}

export const data = graphql`
  query($slug: String!) {
    contentfulWorkCategory(slug: {eq: $slug}) {
      categoryName: name
      categoryOverview: overview {
        json
      }
      seoTitle
      seoDescription {
        seoDescription
      }
      seoHelmet {
        seoHelmet
      }
      caseStudies {
        id
        clientName
        previewText
        previewMedia {
          file {
            contentType
          }
          localFile {
            publicURL
            ...workPreview
          }
          fluid(maxWidth: 920, quality: 95) {
            ...GatsbyContentfulFluid_withWebp
          }
        }
        previewWeight
        category {
          name
          slug
        }
        slug
      }
    }
  }
`

export default WorkCategoryPage
