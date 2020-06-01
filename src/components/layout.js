import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { ThemeProvider } from 'styled-components'
import { setConfiguration } from 'react-grid-system'

import theme from '../styles/theme'
import GlobalStyle from '../styles/global'
import SiteHeader from './siteHeader/siteHeader'
import SiteFooter from './sitefooter/siteFooter'

setConfiguration({
  breakpoints: [576, 768, 1028, 1366],
  containerWidths: [768, 1028, 1366, 1640],
  gutterWidth: 16,
})

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        ...siteMeta
      }
    }
  `)

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <SiteHeader
        siteTitle={data.site.siteMetadata.title}
      />
      {children}
      <SiteFooter />
    </ThemeProvider>
  )
}


export default Layout
