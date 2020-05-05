import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Container, Row, Col, useScreenClass } from 'react-grid-system'
import Slider from 'react-slick'
import { useInView, InView } from 'react-intersection-observer'
import { rgba } from 'polished'

import SEO from '../components/seo'
import { Helmet } from 'react-helmet'
import Layout from '../components/layout'
import Main from '../components/main'

const StyledMain = styled(Main)`
  margin-top: 0;
  padding-bottom: 0;
  padding-top: 0;
`

const SectionHero = styled.section`
  padding-bottom: 3.55rem;
`

const Section = styled.section`
  padding-bottom: 5rem;
`

const Hero = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  .slick-slider {
    flex-grow: 1;
  }
`

const PageTitle = styled.h1`
  color: ${props => props.theme.colors.white};
  position: absolute;
  z-index: 1;
`

const H2 = styled.h2``

const H3 = styled.h3`
  margin-bottom: 0.71em;
`

const Content = styled.div`
  margin-bottom: 3.1rem;
`

const WrapperWwd = styled.div`
  margin-bottom: 5rem;
`

const TitleWwd = styled.p`
  font-weight: 500;
  line-height: 1.5rem;
  margin-bottom: 1rem;
`

const UlWwd = styled.ul`
  list-style: none;
  line-height: 0.75rem;
  margin: 0;
`

const WhatWeDid = ({ services }) => {
  return (
    Array.isArray(services) &&
      <WrapperWwd>
        <TitleWwd>What we did:</TitleWwd>
        <UlWwd>
          {services.map((service, index) =>(
            <li key={index}>{service.name}</li>
          ))}
        </UlWwd>
      </WrapperWwd>
  )
}

const WorkPage = ({ data }) => {
  const {
    clientName,
    slug,
    heroImages,
    images1,
    images2,
    headline2,
    description2,
    results,
    resultsStat1,
    resultsStat1Text,
    resultsStat2,
    resultsStat2Text,
    resultsStat3,
    resultsStat3Text,
    situation,
    tagline,
    whatWeDid,
    seoTitle,
    seoHelmet,
    seoDescription,
  } = data.contentfulWorkPage


  const screenClass = useScreenClass()
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  const [ref, inView, entry] = useInView({
    rootMargin: '0px 0px -99% 0px',
  })

  useEffect(() => {
    if (inView) {
      document.body.classList.add('is-intersecting__true')
    } else {
      document.body.classList.remove('is-intersecting__true')
    }
  }, [inView])

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
        <SectionHero ref={ref} id={`work__hero__${slug}`}>
          <Container style={{ padding: 0, maxWidth: '100%' }}>
              <Row nogutter>
                <Col>
                  <Hero>
                    <PageTitle>{clientName}</PageTitle>
                    {heroImages && Array.isArray(heroImages) &&
                      <Slider {...settings}>
                        {heroImages.map(({ localFile, fluid }, index) => (
                          localFile?.childImageSharp &&
                          <Img
                            key={index}
                            fluid={localFile.childImageSharp.fluid}
                            sizes={{ ...localFile.childImageSharp.fluid, aspectRatio: 1920 / 733 }}
                            style={{ minWidth: `100%`, minHeight: `600px` }}
                          />
                        ))}
                      </Slider>
                    }
                  </Hero>
                </Col>
              </Row>
          </Container>
        </SectionHero>

        {(tagline || situation || whatWeDid || Array.isArray(images1)) ?
          <Section>
            <Container style={{
              paddingLeft: ['md', 'lg', 'xl'].includes(screenClass) ? '3rem' : '1.5625rem',
              paddingRight: ['md', 'lg', 'xl'].includes(screenClass) ? '3rem' : '1.5625rem'
            }}>
              <Row>
                <Col lg={6} offset={{ lg: 2 }} style={{
                  paddingRight: ['lg', 'xl'].includes(screenClass) ? '3rem' : '.5rem'
                }}>
                  <p className={`headline tagline`}><span dangerouslySetInnerHTML={{ __html: tagline }} /></p>
                  <H3 className={`highlight`}>The Situation</H3>
                  <Content>
                    {documentToReactComponents(situation.json)}
                  </Content>
                </Col>
                <Col col={2} style={{
                  marginLeft: ['lg', 'xl'].includes(screenClass) ? '3rem' : '0'
                }}>
                  <WhatWeDid services={whatWeDid} />
                </Col>
              </Row>
            </Container>
            {Array.isArray(images1) &&
              <Container style={{ padding: 0, maxWidth: '100%' }}>
                <Row nogutter>
                  {images1.map((image, index) => (
                    <Col
                      key={index}
                      md={12}
                    >
                      {image.file.contentType.slice(0, image.file.contentType.indexOf("/")) === "image" &&
                        image?.localFile?.childImageSharp &&
                          <Img fluid={image.localFile.childImageSharp.fluid} />
                      }
                    </Col>
                  ))}
                </Row>
              </Container>
            }
          </Section>
        : null}

        {(headline2 || description2 || Array.isArray(images2)) ?
          <Section>
            {(headline2 || description2) ?
              <Container style={{
                paddingLeft: ['md', 'lg', 'xl'].includes(screenClass) ? '3rem' : '1.5625rem',
                paddingRight: ['md', 'lg', 'xl'].includes(screenClass) ? '3rem' : '1.5625rem'
              }}>
                <Row>
                  <Col lg={8} offset={{ lg: 2 }}>
                    {headline2 &&
                      <H3><span dangerouslySetInnerHTML={{ __html: headline2 }} /></H3>
                    }
                    {description2 &&
                      <Content>
                        <span dangerouslySetInnerHTML={{ __html: description2 }} />
                      </Content>
                    }
                  </Col>
                </Row>
              </Container>
            : null}
            {Array.isArray(images2) &&
              <Container style={{ padding: 0, maxWidth: '100%' }}>
                <Row nogutter>
                  {images2.map((image, index) => (
                    <Col
                      key={index}
                      md={12}
                    >
                      {image.file.contentType.slice(0, image.file.contentType.indexOf("/")) === "image" &&
                        image?.localFile?.childImageSharp &&
                          <Img fluid={image.localFile.childImageSharp.fluid} />
                      }
                    </Col>
                  ))}
                </Row>
              </Container>
            }
          </Section>
        : null}

        {(results && results.json) || (resultsStat1 || resultsStat2 || resultsStat3) ?
          <Section>
            <Container style={{
              paddingLeft: ['md', 'lg', 'xl'].includes(screenClass) ? '3rem' : '1.5625rem',
              paddingRight: ['md', 'lg', 'xl'].includes(screenClass) ? '3rem' : '1.5625rem'
            }}>
              <Row>
                <Col lg={8} offset={{ lg: 2 }}>
                  <H3 className={`headline highlight`}>The Results</H3>
                  {results && results.json &&
                    <Content>
                      {documentToReactComponents(results.json)}
                    </Content>
                  }
                </Col>
              </Row>
              <Row>
                <Col lg={8} offset={{ lg: 2 }}>
                  <Row justify="between">
                    {resultsStat1 &&
                      <Col>
                        <p className={`h1 highlight text-center`}>
                          {resultsStat1}
                        </p>
                        {resultsStat1Text &&
                          <p className={`text-center`}>
                            {resultsStat1Text}
                          </p>
                        }
                      </Col>
                    }
                    {resultsStat2 &&
                      <Col>
                        <p className={`h1 highlight text-center`}>
                          {resultsStat2}
                        </p>
                        {resultsStat2Text &&
                          <p className={`text-center`}>
                            {resultsStat2Text}
                          </p>
                        }
                      </Col>
                    }
                    {resultsStat3 &&
                      <Col>
                        <p className={`h1 highlight text-center`}>
                          {resultsStat3}
                        </p>
                        {resultsStat3Text &&
                          <p className={`text-center`}>
                            {resultsStat3Text}
                          </p>
                        }
                      </Col>
                    }
                  </Row>
                </Col>
              </Row>
            </Container>
          </Section>
        : null}

      </StyledMain>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    contentfulWorkPage(slug: { eq: $slug }) {
      id
      clientName
      slug
      heroImages {
        localFile {
          ...workHero
        }
        fluid(maxWidth: 1920, quality: 95) {
          ...GatsbyContentfulFluid_withWebp
        }
      }
      tagline
      situation {
        json
      }
      whatWeDid {
        name
      }
      results {
        json
      }
      headline2
      description2
      resultsStat1
      resultsStat1Text
      resultsStat2
      resultsStat2Text
      resultsStat3
      resultsStat3Text
      images1 {
        file {
          contentType
        }
        localFile {
          ...workImage
          publicURL
        }
        fluid(maxWidth: 1920, quality: 95) {
          ...GatsbyContentfulFluid_withWebp
        }
      }
      images2 {
        file {
          contentType
        }
        localFile {
          ...workImage
          publicURL
        }
        fluid(maxWidth: 1920, quality: 95) {
          ...GatsbyContentfulFluid_withWebp
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

export default WorkPage
