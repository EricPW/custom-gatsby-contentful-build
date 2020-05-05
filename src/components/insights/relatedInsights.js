import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { Container, Row, Col, useScreenClass, Visible } from 'react-grid-system'

import Insight from './insight'

const Section = styled.section`
  background-color: ${props => props.theme.colors.light};
  padding-bottom: 3.5rem;
  padding-top: 5rem;
`

const RelatedInsights = (props) => {
  const title = props.title || false
  const screenClass = useScreenClass()
  return (
    <Section className={`bg-light ${props.className}`}>
      <Container style={{
        paddingLeft: ['md', 'lg', 'xl'].includes(screenClass) ? '3rem' : '1.5625rem',
        paddingRight: ['md', 'lg', 'xl'].includes(screenClass) ? '3rem' : '1.5625rem'
      }}>
        <Row>
          <Col lg={8} offset={{ lg: 2 }}>
            <h2 className={`headline tagline`}>
              {title ? `More insights on ${title}` : `More insights`}
            </h2>
          </Col>
        </Row>
        <Row justify="center" align="stretch">
          {props.posts.map((post, index) => {
            post = post.node || post
            return (
              <Col key={index} lg={5} style={{ marginBottom: `2.25rem` }}>
                <Insight {...post} />
              </Col>
            )
          })}
        </Row>
        <Row justify="center">
          <Col lg={4} xl={2}>
            <Link to={`/insights/`} className={`button button-dark-outline full-width`}>VIEW ALL</Link>
          </Col>
        </Row>
      </Container>
    </Section>
  )
}

export default RelatedInsights
