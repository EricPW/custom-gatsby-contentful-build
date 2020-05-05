import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 37px;
  padding-top: 23px;
  @media only screen and (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding-bottom: 0;
  }
`

const PageLink = styled(Link)`
  color: ${props => props.theme.colors.body};
  flex: 0 1 auto;
  font-family: ${props => props.theme.fonts.serif};
  font-size: 24px;
  line-height: 1.583333333333333;
  text-decoration: none;
  transition: color ${props => props.theme.styles.transition};
  &:hover {
    color: ${props => props.theme.colors.highlight};
  }
`

const Span = styled.span`
  flex: 0 1 auto;
  font-family: ${props => props.theme.fonts.serif};
  font-size: 24px;
  line-height: 1.583333333333333;
  color: ${props => props.theme.colors.body};
`


class Pagination extends React.Component {
  render() {
    const { numPages, currentPage, slug, paginationBasePath } = this.props.context
    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const isNotPaginated = isFirst & isLast

    const prevPageNum = currentPage - 1 === 1 ? `` : currentPage - 1
    const nextPageNum = currentPage + 1

    const prevPageLink = isFirst ? null : `/${paginationBasePath}/${prevPageNum}/`
    const nextPageLink = isLast ? null : `/${paginationBasePath}/${nextPageNum}/`

    return (
      <Wrapper>
        {!isFirst && (
          <PageLink to={prevPageLink}>Previous</PageLink>
        )}
        {isFirst && (
          <Span />
        )}
        {!isNotPaginated && (
          <Span>
            {currentPage} of {numPages}
          </Span>
        )}
        {!isLast && (
          <PageLink to={nextPageLink}>Next</PageLink>
        )}
        {isLast && (
          <Span />
        )}
      </Wrapper>
    )
  }
}

export default Pagination
