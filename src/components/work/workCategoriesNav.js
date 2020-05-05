import React, { useState, useEffect } from 'react'
import { graphql, useStaticQuery, Link, withPrefix, navigate } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { rgba } from 'polished'

const Wrapper = styled.div`
  display: block;
  height: auto;
  margin-bottom: 54px;
  position: relative;
  width: 100%;
  @media only screen and (max-width: ${props => props.theme.breakpoints.tablet}) {
    height: 48px;
  }
  @media only screen and (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-bottom: 49px;
  }
`

const MobileWrapper = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: none;
  height: 48px;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 2;
  @media only screen and (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: block;
  }
`

const SelectLabel = styled.label`
  color: ${props => rgba(props.theme.colors.body,0.43)};
  display: block;
  font-size: 14px;
  left: 8px;
  position: absolute;
  top: 6px;
  z-index: 2;
`

const ChevronImg = styled(Img)`
  position: absolute !important;
  right: 17px;
  top: 20px;
  z-index: 3;
`

const Ul = styled.ul`
  align-items: flex-start;
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.body};
  display: flex;
  flex-wrap: wrap;
  font-family: ModernoFB, sans-serif;
  font-size: 31px;
  justify-content: space-between;
  line-height: 1;
  list-style: none;
  margin-left: -1em;
  margin-right: -1em;
  position: relative;
  transition: color ${props => props.theme.styles.transition};
  z-index: 1;

  @media only screen and (max-width: ${props => props.theme.breakpoints.tablet}) {
    border: 1px solid ${props => props.theme.colors.gray70};
    box-sizing: border-box;
    flex-direction: column;
    flex-wrap: unset;
    height: 48px;
    justify-content: flex-start;
    left: 0;
    margin: 0;
    overflow: hidden;
    padding-left: 0;
    padding-right: 0;
    padding-bottom: 6px;
    padding-top: 12px;
    position: absolute;
    right: 0;
    top: 0;
    transition: height ${props => props.theme.styles.transition};
    width: 100%;
    &.show-dropdown {
      height: 270px;
    }
  }
`

const Li = styled.li`
  align-items: center;
  display: flex;
  flex: 0 1 auto;
  padding-left: 1em;
  padding-right: 1em;
  text-align: center;
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
  @media only screen and (min-width: ${props => props.theme.breakpoints.tablet}) and (max-width: 1316px) {
    margin-bottom: 1em;
    padding-left: 10px;
    padding-right: 10px;
  }
  @media only screen and (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex: 0 0 40px;
    order: 1;
    text-align: left;
    margin: 0;
    width: calc(100% - 16px);
    &.active {
      order: 0;
    }
  }
`

const StyledLink = styled(Link)`
  color: ${props => props.theme.colors.body};
  display: block;
  font-family: ${props => props.theme.fonts.serif};
  text-decoration: none;
  transition: color ${props => props.theme.styles.transition};
  &.active, &:hover {
    color: ${props => props.theme.colors.highlight};
  }
  @media only screen and (max-width: ${props => props.theme.breakpoints.tablet}) {
    color: ${props => props.theme.colors.body};
    display: block;
    font-family: ${props => props.theme.fonts.sansSerif};
    font-size: 16px;
    width: 100%;
    &.active {
      color: ${props => props.theme.colors.body};
    }
    &:hover {
      color: ${props => props.theme.colors.highlight};
    }
  }
`

const WorkCategoriesNav = (props) => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulWorkCategory(
        sort: {fields: sortOrder, order: ASC}
      ) {
        edges {
          node {
            id
            name
            slug
            sortOrder
          }
        }
      }
      downChevron: file(relativePath: { eq: "down-chevron.png" }) {
        childImageSharp {
          fixed(width: 20, height: 10, quality: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    setLocationData(props.location)
  }, [])

  const categories = data.allContentfulWorkCategory.edges
  const [ showDropdown, setShowDropdown ] = useState(false)
  const [ locationData, setLocationData ] = useState(props.location)

  const handleDropdown = (event) => {
    console.log(showDropdown)
    setShowDropdown(!showDropdown)
  }

  return (
    <Wrapper>
      <Ul className={showDropdown ? `show-dropdown` : ``}>
        {categories.map(({node: category}, index) => (
            <Li
              key={category.slug}
              className={locationData.pathname === withPrefix(`/work/${category.slug}/`) ? `active` : ``}
            >
              <StyledLink
                to={category.slug === 'all' ? `/work/` : `/work/${category.slug}/`}
                className={locationData.pathname === withPrefix(`/work/${category.slug}/`) || (category.slug === 'all' && locationData.pathname === withPrefix(`/work/`)) ? `active` : ``}
                activeClassName={`active`}
                state={{ path: category.slug === 'all' ? `/work/` : `/work/${category.slug}/` }}
              >
                {category.name}
              </StyledLink>
            </Li>
        ))}
      </Ul>
      <MobileWrapper
        onClick={() => handleDropdown()}
      >
        <SelectLabel>Select Category</SelectLabel>
        <ChevronImg fixed={data.downChevron.childImageSharp.fixed} />
      </MobileWrapper>
    </Wrapper>
  )
}

export default WorkCategoriesNav
