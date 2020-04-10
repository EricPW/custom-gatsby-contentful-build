import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

function SEO({ description, lang, meta, title, pageUrl, image, insightSEO, children }) {

  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const metaTitle = title || site.siteMetadata.title
  const metaUrl = pageUrl || site.siteMetadata.siteUrl

  return (
    <Helmet
      defer={false}
      htmlAttributes={{
        lang,
      }}
      defaultTitle={metaTitle}
      titleTemplate={`%s`}
      meta={meta}
    >
      {/* General tags */}
      {metaTitle &&
        <title>{metaTitle}</title>
      }
      {image &&
        <meta name="image" content={image} />
      }
      {metaDescription &&
        <meta name="description" content={metaDescription} />
      }

      {/* OpenGraph tags */}
      {metaTitle &&
        <meta property="og:title" content={metaTitle} />
      }
      <meta property="og:type" content={insightSEO ? `article` : `website`} />
      {metaUrl &&
        <meta property="og:url" content={metaUrl} />
      }
      {image &&
        <meta property="og:image" content={image} />
      }
      {metaDescription &&
        <meta property="og:description" content={metaDescription} />
      }

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content="Lorem Ipsum" />
      {metaTitle &&
        <meta name="twitter:title" content={metaTitle} />
      }
      {image &&
        <meta name="twitter:image" content={image} />
      }
      {metaDescription &&
        <meta name="twitter:description" content={metaDescription} />
      }

      {children}
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  pageUrl: PropTypes.string,
  image: PropTypes.string,
  insightSEO: PropTypes.bool,
}

export default SEO
