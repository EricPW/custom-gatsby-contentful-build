import React, { useEffect } from 'react'
import { graphql, Link } from 'gatsby'
import { useInView, InView } from 'react-intersection-observer'
import { Container, Row, Col, useScreenClass, Visible, Hidden } from 'react-grid-system'
import styled from 'styled-components'
import Img from 'gatsby-image'
import { Controller, Scene } from 'react-scrollmagic'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import SEO from '../components/seo'
import { Helmet } from 'react-helmet'
import Layout from '../components/layout'
import ExpertiseList from '../components/expertise/expertiseList'
import RelatedInsights from '../components/insights/relatedInsights'

//
// Main content section
//

const StyledMain = styled.div`
  background-color: ${props => props.theme.colors.white};
  margin-top: 0;
  padding-top: 200px;
`

const SectionTop = styled.div`
  margin-bottom: 9.75rem;
  overflow: hidden;
  @media only screen and (max-width: ${props => props.theme.breakpoints.tablet}) {
    margin-bottom: 2.72rem;
  }
`

const ColPush = styled(Col)`
  order: 1;
  @media only screen and (max-width: ${props => props.theme.breakpoints.mobile}) {
    order: 1;
  }
`

const ColPull = styled(Col)`
  order: 1;
  @media only screen and (max-width: ${props => props.theme.breakpoints.mobile}) {
    order: 0;
  }
`

const SidebarImage = styled.div`
  height: auto;
  position: relative;
  width: 50vw;
  @media only screen and (max-width: ${props => props.theme.breakpoints.tablet}) {
    margin-top: 1.5rem;
    width: calc(100vw - 60px);
  }
  @media only screen and (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-bottom: 1.5rem;
    margin-top: 0;
    width: calc(100vw - 23px);
  }
`

const SidebarImageBg = styled(Img)`
  width: 100%;
`

const SidebarImageFg = styled(Img)`
  bottom: 2.5rem;
  height: auto;
  left: 3.75rem;
  max-width: 674px;
  position: absolute !important;
  top: 2.5rem;
  width: 100%;
  @media only screen and (max-width: ${props => props.theme.breakpoints.tablet}) {
    max-width: calc(100vw - 270px);
  }
  @media only screen and (max-width: ${props => props.theme.breakpoints.mobile}) {
    bottom: 1.43rem;
    left: 1.8rem;
    max-width: calc(100vw - 92px);
    top: 1.43rem;
  }
`

const SectionExpertise = styled.div``

const ExpertiseWrapper = styled.div`
  margin-top: 3rem;
  @media only screen and (max-width: ${props => props.theme.breakpoints.tablet}) {
    margin-top: 0;
  }
`

//
// HERO slides
//

const Heroes = styled.section``

const HeroSlide = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  height: 100vh;
  margin-top: 0;
  max-width: 100%;
  position: relative;
  width: 100%;
`

const HeroImg = styled(Img)`
  height: 100%;
  min-height: 100vh;
  width: 100%;
`

const HeroContent = styled.div`
  color: ${props => props.theme.colors.white};
  position: absolute;
  width: 100%;
`

const HeroIndex = styled.p`
  font-family: ${props => props.theme.fonts.serif};
  font-size: 1.55rem;
  line-height: 1.05;
  margin-bottom: 1em;
  @media only screen and (max-width: ${props => props.theme.breakpoints.mobile}) {}
`

const HeroHeadline = styled.h1`
  margin-bottom: 1rem;
  @media only screen and (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-bottom: 2em;
    &::before {
      display: none;
    }
  }
`

const HeroText = styled.div`
  margin-bottom: 1rem;
`

const HeroCta = styled.a`
  box-sizing: border-box;
  max-width: 260px;
  width: 260px;
  @media only screen and (max-width: ${props => props.theme.breakpoints.mobile}) {
    max-width: 100%;
    width: 100%;
  }
`

//
// Page export
//

const HomePage = (props) => {
  const {
    relatedInsights,
    seoTitle,
    seoDescription,
    seoHelmet,
  } = props.data.contentfulPage

  const screenClass = useScreenClass()
  const heroCount = props.data.allContentfulHeroImages.edges.length
  const [refMain, inView, entry] = useInView({
    rootMargin: '0px 0px -99% 0px',
  })

  useEffect(() => {
    console.log('Inview: ', inView)
    if (inView) {
      document.body.classList.add('is-intersecting__home__main')
    } else {
      document.body.classList.remove('is-intersecting__home__main')
    }
  }, [inView])

  return (
    <Layout className="home">
      <SEO
        title={seoTitle || ``}
        description={seoDescription.seoDescription || false}
      />
      <Helmet>
        {seoHelmet ? seoHelmet.seoHelmet : ''}
      </Helmet>
      <Heroes>
        <Controller globalSceneOptions={{ triggerHook: 'onLeave' }}>
          {props.data.allContentfulHeroImages.edges.map(({ node: hero }, index) => (
            <Scene
              key={index}
              pin
              classToggle={[`body`, `is-intersecting__hero-${index}`]}
            >
              <HeroSlide key={index} >
                <Visible md lg xl>
                  <HeroImg fluid={hero.desktop.fluid} />
                </Visible>
                <Visible xs sm>
                  <HeroImg fluid={hero.mobile.fluid} />
                </Visible>
                <HeroContent>
                  <Container style={{
                    paddingLeft: ['md', 'lg', 'xl'].includes(screenClass) ? '3rem' : '1.5625rem',
                    paddingRight: ['md', 'lg', 'xl'].includes(screenClass) ? '3rem' : '1.5625rem',
                  }}>
                    <Row>
                      <Col lg={8} offset={{ lg: 2 }}>
                        <HeroIndex>{`0${index + 1} / 0${heroCount}`}</HeroIndex>
                        <HeroHeadline dangerouslySetInnerHTML={{ __html: hero.headline }} className={`headline`} />
                        <Visible md lg xl>
                          <HeroText>
                            {documentToReactComponents(hero.text.json)}
                          </HeroText>
                        </Visible>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={6} offset={{ lg: 2 }}>
                        <HeroCta href={hero.ctaLink} className={`button button-white-outline`}>{hero.cta}</HeroCta>
                      </Col>
                    </Row>
                  </Container>
                </HeroContent>
              </HeroSlide>
            </Scene>
          ))}
        </Controller>
      </Heroes>
      <StyledMain
        ref={refMain}
        id={`home__main`}
        className={`bg-white`}
      >
        <SectionTop>
          <Container style={{
            paddingLeft: ['md', 'lg', 'xl'].includes(screenClass) ? '3rem' : '1.5625rem',
            paddingRight: ['md', 'lg', 'xl'].includes(screenClass) ? '3rem' : '1.5625rem'
          }}>
            <Row>
              <ColPush lg={5} xl={4} offset={{ lg: 1, xl: 2 }} style={{
                paddingRight: ['lg', 'xl'].includes(screenClass) ? '2rem' : '8px'
              }}>
                <h1 className={`headline`}>
                  {props.data.contentfulPage.mainHeadline &&
                    props.data.contentfulPage.mainHeadline
                  }
                  {!props.data.contentfulPage.mainHeadline &&
                    <span>
                      Lorem. Ipsum. Dolor. <b>Sit.</b>
                    </span>
                  }
                </h1>
                {props.data.contentfulPage.text && props.data.contentfulPage.text.json &&
                  documentToReactComponents(props.data.contentfulPage.text.json)
                }
                {!props.data.contentfulPage.text &&
                  <>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  </>
                }
                <Link to={`/`} className={`button`}>Lorem Ipsum</Link>
              </ColPush>
              <ColPull lg={6}>
                <SidebarImage>
                  <SidebarImageBg
                    fluid={props.data.homeNurtureBackground.childImageSharp.fluid}
                    sizes={{ ...props.data.homeNurtureBackground.childImageSharp.fluid, aspectRatio: 3 / 2 }}
                  />
                  <SidebarImageFg fluid={props.data.homeNurtureForeground.childImageSharp.fluid} />
                </SidebarImage>
              </ColPull>
            </Row>
          </Container>
        </SectionTop>
        <SectionExpertise>
          <Container style={{
            paddingLeft: ['md', 'lg', 'xl'].includes(screenClass) ? '3rem' : '1.5625rem',
            paddingRight: ['md', 'lg', 'xl'].includes(screenClass) ? '3rem' : '1.5625rem'
          }}>
            <Row>
              <Col xl={3} offset={{ lg: 2 }}>
                <h1 className={`headline`}>Expertise</h1>
              </Col>
              <Col lg={8} xl={6} offset={{ lg: 2, xl: 0 }}>
                <ExpertiseWrapper>
                  <ExpertiseList />
                </ExpertiseWrapper>
              </Col>
            </Row>
          </Container>
        </SectionExpertise>
        {relatedInsights &&
          <RelatedInsights posts={relatedInsights}/>
        }
      </StyledMain>
    </Layout>
  )
}

export const query = graphql`
  query {
    homeNurtureBackground: file(relativePath: { eq: "960x640.png" }) {
      childImageSharp {
        fluid(maxWidth: 960, quality: 95) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    homeNurtureForeground: file(relativePath: { eq: "674x533.png" }) {
      ...homeBrandImage
    }
    allContentfulHeroImages(
      sort: {fields: sortOrder, order: ASC}
    ) {
      edges {
        node {
          id
          sortOrder
          name
          headline
          text {
            json
          }
          desktop {
            title
            fluid(maxWidth: 1920, quality: 95) {
              ...GatsbyContentfulFluid_withWebp_noBase64
            }
          }
          mobile {
            title
            fluid(maxWidth: 480, quality: 95) {
              ...GatsbyContentfulFluid_withWebp_noBase64
            }
          }
          cta
          ctaLink
        }
      }
      totalCount
    }
    contentfulPage(slug: {eq: "home"}) {
      id
      slug
      name
      mainHeadline
      text {
        json
      }
      relatedInsights: insights {
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

export default HomePage
