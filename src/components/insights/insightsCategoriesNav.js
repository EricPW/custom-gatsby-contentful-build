import React, { useState, useEffect } from 'react'
import { graphql, useStaticQuery, Link, withPrefix, navigate } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { rgba } from 'polished'

const Wrapper = styled.div`
  display: block;
  height: 48px;
  margin-bottom: 27px;
  position: relative;
  width: 100%;
  @media only screen and (max-width: ${props => props.theme.breakpoints.mobile}) {
    margin-bottom: 49px;
  }
`

const MobileWrapper = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: block;
  height: 48px;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 2;
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
  border: 1px solid ${props => props.theme.colors.gray70};
  box-sizing: border-box;
  color: ${props => props.theme.colors.body};
  display: flex;
  flex-direction: column;
  flex-wrap: unset;
  font-family: ModernoFB, sans-serif;
  font-size: 31px;
  height: 48px;
  justify-content: flex-start;
  left: 0;
  line-height: 1;
  list-style: none;
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
  z-index: 1;
  &.show-dropdown {
    height: 420px;
  }
`

const Li = styled.li`
  align-items: center;
  display: flex;
  flex: 0 0 40px;
  height: 0;
  order: 1;
  padding-left: 8px;
  padding-right: 8px;
  margin-bottom: 0;
  text-align: left;
  width: calc(100% - 16px);
  &.active {
    order: 0;
  }
`

const StyledLink = styled(Link)`
  color: ${props => props.theme.colors.body};
  display: block;
  font-family: Omnes, Helvetica Neue, Segoe UI, Helvetica, Arial, sans-serif;
  font-size: 16px;
  text-decoration: none;
  transition: color ${props => props.theme.styles.transition};
  width: 100%;
  &.active {
    color: ${props => props.theme.colors.body};
  }
  &:hover {
    color: ${props => props.theme.colors.highlight};
  }
`

const InsightsCategoriesNav = (props) => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulInsightsCategory(
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

  const categories = data.allContentfulInsightsCategory.edges
  const [ showDropdown, setShowDropdown ] = useState(false)
  const [ locationData, setLocationData ] = useState(props.location)

  const handleDropdown = (event) => {
    console.log(showDropdown)
    setShowDropdown(!showDropdown)
  }

  return (
    <Wrapper>
      <Ul className={showDropdown ? `show-dropdown` : ``}>
        <Li
          className={locationData.pathname === withPrefix(`/insights/`) ? `active` : ``}
        >
          <StyledLink
            to={`/insights/`}
            className={locationData.pathname === withPrefix(`/insights/`) ? `active` : ``}
            activeClassName={`active`}
            state={{ path: `/insights/` }}
          >
            <span>All</span>
          </StyledLink>
        </Li>
        {categories.map(({node: category}, index) => (
            <Li
              key={category.slug}
              className={locationData.pathname === withPrefix(`/insights/category/${category.slug}/`) ? `active` : ``}
            >
              <StyledLink
                to={locationData.pathname === withPrefix(`/insights/category/${category.slug}/`) ? '/insights/' : `/insights/category/${category.slug}/`}
                className={locationData.pathname === withPrefix(`/insights/category/${category.slug}/`) ? `active` : ``}
                activeClassName={`active`}
                state={{ path: `/insights/category/${category.slug}/` }}
              >
                <span dangerouslySetInnerHTML={{ __html: category.name }} />
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

export default InsightsCategoriesNav
