import { graphql } from "gatsby"

export const query = graphql `
  fragment siteMeta on Site {
    siteMetadata {
      title
      description
    }
  }
  fragment fluidImage on File {
    childImageSharp {
      fluid(maxWidth: 1920, quality: 95) {
        ...GatsbyImageSharpFluid_withWebp
      }
    }
  }
  fragment headerLogo on File {
    childImageSharp {
      fluid(maxWidth: 209, quality: 100) {
        ...GatsbyImageSharpFluid_tracedSVG
      }
    }
  }
  fragment pwCircleLogo on File {
    childImageSharp {
      fixed(width: 47, height: 47, quality: 100) {
        ...GatsbyImageSharpFixed
      }
    }
  }
  fragment homeHero on File {
    childImageSharp {
      fluid(maxWidth: 1920, quality: 95) {
        ...GatsbyImageSharpFluid_withWebp
      }
    }
  }
  fragment workPreview on File {
    childImageSharp {
      fluid(maxWidth: 960, quality: 95) {
        ...GatsbyImageSharpFluid_withWebp
      }
    }
  }
  fragment workHero on File {
    childImageSharp {
      fluid(maxWidth: 1920, quality: 95) {
        ...GatsbyImageSharpFluid_withWebp
      }
    }
  }
  fragment workImage on File {
    childImageSharp {
      fluid(maxWidth: 1920, quality: 100) {
        ...GatsbyImageSharpFluid_withWebp
      }
    }
  }
  fragment insightsThumbnail on File {
    childImageSharp {
      fluid(maxWidth: 678, quality: 95) {
        ...GatsbyImageSharpFluid_withWebp
      }
    }
  }
  fragment menuThumbnail on File {
    childImageSharp {
      fluid(maxWidth: 540, quality: 95) {
        ...GatsbyImageSharpFluid_withWebp
      }
    }
  }
  fragment homeBrandImage on File {
    childImageSharp {
      fluid(maxWidth: 674, quality: 95) {
        ...GatsbyImageSharpFluid_withWebp
      }
    }
  }
  fragment socialIcon on File {
    childImageSharp {
      fixed(width: 21, height: 21, quality: 100) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`
