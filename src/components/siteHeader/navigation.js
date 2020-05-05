import React, { useState } from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import styled from 'styled-components'

const Nav = styled.nav`
  @media only screen and (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding-left: 34px;
  }
`

const Menu = styled.ul`
  list-style: none;
  margin-left: 0;
`

const MenuItem = styled.li`
  margin-bottom: 32px;
  position: relative;
`

const StyledLink = styled(Link)`
  color: ${props => props.theme.colors.white};
  font-family: ModernoFB, serif;
  font-size: 45px;
  line-height: 1.333333333333333;
  transition: ${props => props.theme.styles.transitionAll};
  .show-dropdown & {
    color: ${props => props.theme.colors.gray58};
  }
  .show-dropdown .active > & {
    color: ${props => props.theme.colors.white};
    &::before,
    &.headline::before {
      background-color: ${props => props.theme.colors.highlight};
    }
  }
  &::before,
  &.headline::before {
    background-color: ${props => props.theme.colors.gray58};
  }
`

const SubMenu = styled.div`
  max-width: 500px;
  opacity: 0;
  overflow: hidden;
  transition: opacity .25s ease;
  ul {
    display: flex;
    flex-wrap: wrap;
    height: auto;
    justify-content: space-between;
    margin: 0;
    margin-top: 0;
    list-style: none;
    transition: all .25s ease;
    li {
      flex: 1 1 50%;
      font-size: 1rem;
      height: 0;
      line-height: 1.5;
      margin-bottom: 0;
      max-height: 0;
      transition: all .25s ease;
    }
  }
  ${Menu}.show-dropdown .active & {
    opacity: 1;
    ul {
      margin-top: 22px;
      li {
        height: 30px;
        margin-bottom: 34px;
        max-height: 30px;
      }
    }
  }
  @media only screen and (max-width: ${props => props.theme.breakpoints.mobile}) {
    .show-dropdown .active > & {
      height: auto;
      opacity: 1;
    }
    ul {
      flex-direction: column;
      flex-wrap: unset;
    }
  }
`

const SubMenuLink = styled(Link)`
  color: ${props => props.theme.colors.white};
  font-size: 20px;
  line-height: 1.5;
  transition: ${props => props.theme.styles.transitionAll};
  &:hover {
    color: ${props => props.theme.colors.highlight};
  }
`

const Navigation = (props) => {
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
      allContentfulExpertisePage(
        sort: {fields: sortOrder, order: ASC}
      ) {
        edges {
          node {
            id
            slug
            name
            sortOrder
          }
        }
      }
      allContentfulInsightsCategory {
        edges {
          node {
            id
            name
            slug
          }
        }
      }
    }
  `)
  const [activeIndex, setActiveIndex] = useState(null)
  const [dropdownIsActive, setDropdownIsActive] = useState(false)

  const allWorkCategories = data.allContentfulWorkCategory.edges
  const AllExpertise = data.allContentfulExpertisePage.edges
  const allInsightsCategories = data.allContentfulInsightsCategory.edges

  const handleSubNav = (e, index) => {
    if (e) e.preventDefault()
    setActiveIndex(activeIndex === index ? null : index)
    setDropdownIsActive(activeIndex === index ? false : true)
  }

  const handleRouteChange = () => {
    setActiveIndex(null)
    setDropdownIsActive(false)
    document.body.classList.toggle('show-main-menu')
  }

  return (
    <Nav {...props}>
      <Menu className={dropdownIsActive ? `show-dropdown` : ``}>
        <MenuItem className={activeIndex === 0 ? `active` : ``}>
          <StyledLink
            to={`/work/`}
            onClick={(e) => handleSubNav(e, 0)}
            activeClassName={`current`}
            className={`headline`}
          >
            Work
          </StyledLink>
          <SubMenu>
            <ul>
              {allWorkCategories.map(({node: category}, index) => (
                <li key={category.slug}>
                  <SubMenuLink
                    to={category.slug === 'all' ? `/work/` : `/work/${category.slug}/`}
                    onClick={handleRouteChange}
                    activeClassName={`current`}
                  >
                    {category.name}
                  </SubMenuLink>
                </li>
              ))}
            </ul>
          </SubMenu>
        </MenuItem>
        <MenuItem className={activeIndex === 1 ? `active` : ``}>
          <StyledLink
            to={`/services/`}
            onClick={(e) => handleSubNav(e, 1)}
            activeClassName={`current`}
            className={`headline`}
          >
            Expertise
          </StyledLink>
          <SubMenu>
            <ul>
              {AllExpertise.map(({node: expertise}, index) => (
                <li key={expertise.slug}>
                  <SubMenuLink
                    to={`/services/${expertise.slug}/`}
                    onClick={handleRouteChange}
                    activeClassName={`current`}
                  >
                    {expertise.name}
                  </SubMenuLink>
                </li>
              ))}
            </ul>
          </SubMenu>
        </MenuItem>
        <MenuItem className={activeIndex === 2 ? `active` : ``}>
          <StyledLink
            to={`/insights/`}
            onClick={(e) => handleSubNav(e, 2)}
            activeClassName={`current`}
            className={`headline`}
          >
            Insights
          </StyledLink>
          <SubMenu>
            <ul>
              <li>
                <SubMenuLink
                  to={`/insights/`}
                  onClick={handleRouteChange}
                  activeClassName={`current`}
                >
                  All
                </SubMenuLink>
              </li>
              {allInsightsCategories.map(({node: category}, index) => (
                <li key={category.slug}>
                  <SubMenuLink
                    to={`/insights/category/${category.slug}/`}
                    onClick={handleRouteChange}
                    activeClassName={`current`}
                  >
                    <span dangerouslySetInnerHTML={{ __html: category.name}} />
                  </SubMenuLink>
                </li>
              ))}
            </ul>
          </SubMenu>
        </MenuItem>
      </Menu>
    </Nav>
  )
}

export default Navigation