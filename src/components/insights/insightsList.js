import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'

import Insight from './insight'

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

const InsightsList = (props) => {
  return (
    <List className={props.className}>
      {props.posts.map((post, index) => {
        post = post.node || post
        return (
          <ListItem key={post.index} style={{  marginBottom: `1.925rem` }}>
            <Insight {...post} />
          </ListItem>
        )
      })}
    </List>
  )
}

export default InsightsList
