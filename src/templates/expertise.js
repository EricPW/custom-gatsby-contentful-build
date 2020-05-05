import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Container, Row, Col, useScreenClass, Visible } from 'react-grid-system'
import styled from 'styled-components'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import SEO from '../components/seo'
import { Helmet } from 'react-helmet'
import Layout from '../components/layout'
import Main from '../components/main'
import RelatedInsights from '../components/insights/relatedInsights'

const StyledMain = styled(Main)`
  padding-bottom: 0;
`

const Section = styled.section``

const SectionHeader = styled(Section)`
  padding-bottom: 3.5rem;
`

const PageTitle = styled.h1`
  margin-bottom: 1rem;
`

const SubTitle = styled.p`
  color: ${props => props.theme.colors.highlight};
  font-family: ${props => props.theme.fonts.serif};
  font-size: 1.57rem;
  line-height: ‭1.05;
  @media only screen and (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: 1.57rem;
    line-height: ‭1.05;
  }
`

const SectionFocus = styled(Section)`
  background-color: ${props => props.theme.colors.gray22};
  color: ${props => props.theme.colors.white};
  padding-top: 5rem;
  padding-bottom: 4rem;
`

const FocusH2 = styled.h2`
  margin-bottom: 3.5rem;
`

const FocusH3 = styled.h3`
  color: ${props => props.theme.colors.highlight};
  margin-bottom: 1.85rem;
`

const FocusHeadline = (props) => {
  return (
    <FocusH2 className={`headline ${props.className}`} {...props}>{props.children ? props.children : `Our focus`}</FocusH2>
  )
}

const Card = styled.div`
  margin-bottom: 2.75rem;
`

const CardIndex = styled.p`
  border-bottom: 1px solid ${props => props.theme.colors.highlight};
  box-sizing: border-box;
  display: inline-block;
  padding-bottom: 0.4193548387096774em;
  padding-right: 24px;
  margin-bottom: 3rem;
  margin-right: auto;
  min-width: 52px;
`

const CardTitle = styled(FocusH3)`
  margin-bottom: 1.75rem;
`

const ExpertisePage = (props) => {
  const {
    caseStudies,
    caseStudiesIntro,
    cta,
    focusElements,
    focusHeadline,
    focusSubtext,
    name,
    overview,
    relatedInsights,
    seoDescription,
    seoHelmet,
    seoTitle,
    subtitle,
  } = props.data.contentfulExpertisePage
  const screenClass = useScreenClass()
  const slug = props.pageContext.slug

  return (
    <Layout>
      <SEO
        title={seoTitle ? seoTitle : ``}
        description={seoDescription && seoDescription.seoDescription ? seoDescription.seoDescription : ``}
      />
      <Helmet>
        {seoHelmet ? seoHelmet.seoHelmet : ''}
      </Helmet>
      <StyledMain>
        <SectionHeader>
          <Container style={{
            paddingLeft: ['md', 'lg', 'xl'].includes(screenClass) ? '3rem' : '1.5625rem',
            paddingRight: ['md', 'lg', 'xl'].includes(screenClass) ? '3rem' : '1.5625rem'
          }}>
            <Row>
              <Col lg={4} offset={{ lg: 2 }}>
                <PageTitle className={`headline`}>{name}</PageTitle>
                <SubTitle>{subtitle}</SubTitle>
              </Col>
              <Col lg={5}>
                {documentToReactComponents(overview.json)}
              </Col>
            </Row>
          </Container>
        </SectionHeader>
        <SectionFocus>
          <Container style={{
            paddingLeft: ['md', 'lg', 'xl'].includes(screenClass) ? '3rem' : '1.5625rem',
            paddingRight: ['md', 'lg', 'xl'].includes(screenClass) ? '3rem' : '1.5625rem'
          }}>
            <Row>
              <Col lg={8} offset={{ lg: 2 }}>
                {focusHeadline &&
                  <FocusHeadline style={slug === 'video' ? { marginBottom: `1.85rem` } : {} }>
                    {focusHeadline}
                  </FocusHeadline>
                }
                {Array.isArray(focusElements) &&
                  <Row justify="between">
                    {focusElements.map((element, index) => (
                      <Col key={index} lg={5}>
                        {slug === 'video' ? (
                          <FocusH3>{element.name}</FocusH3>
                        ) : (
                          <Card>
                            <CardIndex className={`h2`}>{index + 1 < 10 ? `0${index + 1}` : `${index}`}</CardIndex>
                            <CardTitle>{element.name}</CardTitle>
                            {element.overview && element.overview.overview &&
                              <p dangerouslySetInnerHTML={{ __html: element.overview.overview }} />
                            }
                          </Card>
                        )}
                      </Col>
                    ))}
                  </Row>
                }
                {focusSubtext && focusSubtext.focusSubtext ? focusSubtext.focusSubtext : ``}
              </Col>
            </Row>
          </Container>
        </SectionFocus>
      </StyledMain>
      <RelatedInsights posts={relatedInsights} title={name}/>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    contentfulExpertisePage(slug: { eq: $slug }) {
      id
      slug
      name
      subtitle
      overview {
        json
      }
      focusHeadline
      focusElements {
        id
        name
        headline
        overview {
          overview
        }
      }
      focusSubtext {
        focusSubtext
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

export default ExpertisePage
