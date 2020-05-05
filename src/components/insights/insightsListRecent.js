import React, { useState } from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { Container, Row, Col, useScreenClass, Visible } from 'react-grid-system'

import Insight from './insight'

const Wrapper = styled.div``

const Tabs = styled.ul`
  border-bottom: 2px solid ${props => props.theme.colors.body};
  display: flex;
  margin-bottom: 18px;
`

const Tab = styled.li`
  border-bottom: 12px solid transparent;
  line-height: 1;
  padding-right: 30px;
  list-style: none;
  &.active {
    border-bottom-color: ${props => props.theme.colors.highlight};
  }
`

const TabButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-family: ${props => props.theme.fonts.serif};
  font-size: 1.55rem;
  padding: 0;
`

const TabContent = styled.div``

const List = styled.ul`
  list-style: none;
`

const ListItem = styled.li`
  &:last-child {
    article {
      margin-bottom: 0;
    }
  }
`

const InsightsListRecent = () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "arrow-right.png" }) {
        childImageSharp {
          fixed(width: 33, height: 33, quality: 100) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
      allContentfulInsightsPage(
        sort: {
          fields: [date],
          order: DESC
        },
        limit: 6
      ) {
        edges {
          node {
            id
            title
            slug
            date
            image {
              localFile {
                ...insightsThumbnail
              }
            }
          }
        }
      }
    }
  `)
  const posts = data.allContentfulInsightsPage.edges
  const [ tabSelect, setTabSelect ] = useState('recent')

  const handleTabClick = (tabName) => {
    setTabSelect(tabName)
  }

  return (
    <Wrapper>
      <Tabs>
        <Tab className={tabSelect === `recent` ? `active` : ``}>
          <TabButton onClick={() => handleTabClick('recent')}>Recent</TabButton>
        </Tab>
      </Tabs>
      <TabContent name={`Tab-1`}>
        <List>
          {posts.map(({ node: post }, index) => (
            <ListItem key={post.id}>
              <Insight {...post} aside />
            </ListItem>
          ))}
        </List>
      </TabContent>
    </Wrapper>
  )
}

export default InsightsListRecent
