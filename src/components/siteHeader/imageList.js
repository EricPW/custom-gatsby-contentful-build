import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { rgba } from 'polished'

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  min-height: 100%;
  height: 100%;
`

const Li = styled.li`
  flex: 1 1 33.333333%;
  height: 33.3333333%;
  margin-bottom: 0;
  position: relative;
  width: 100%;
`

const Image = styled(Img)`
  min-height: 100%;
  min-width: 100%;
  object-fit: cover;
`

const Overlay = styled.div`
  background: -moz-linear-gradient(top, ${props => rgba(props.theme.colors.black,0)} 35%, ${props => rgba(props.theme.colors.black,0.5)} 75%, ${props => rgba(props.theme.colors.black,.75)} 100%);
  background: -webkit-linear-gradient(top, ${props => rgba(props.theme.colors.black,0)} 35%,${props => rgba(props.theme.colors.black,0.5)} 75%,${props => rgba(props.theme.colors.black,.75)} 100%);
  background: linear-gradient(to bottom, ${props => rgba(props.theme.colors.black,0)} 35%,${props => rgba(props.theme.colors.black,0.5)} 75%,${props => rgba(props.theme.colors.black,.75)} 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00797979', endColorstr='#3d3d3d',GradientType=0 );
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1rem;
`

const PostTitle = styled.h3`
  color: ${props => props.theme.colors.white};
  font-size: 18px;
  line-height: 1;
`

const ImageList = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulWorkPage(
        limit: 3
      ) {
        edges {
          node {
            id
            slug
            clientName
            previewText
            heroImages {
              localFile {
                ...menuThumbnail
              }
              fluid(maxWidth: 1920, quality: 95) {
                ...GatsbyContentfulFluid_withWebp
              }
            }
          }
        }
      }
    }
  `)

  const works = data.allContentfulWorkPage.edges

  return (
    <>
      <Ul>
        {works.map(({ node: work }, index) => (
          Array.isArray(work.heroImages) && work.heroImages[0].localFile &&
            <Li key={work.id}>
              <Link to={`/work/${work.slug}`}>
                <Image fluid={work.heroImages[0].localFile && work.heroImages[0].localFile.childImageSharp ?
                  work.heroImages[0].localFile.childImageSharp.fluid :
                  work.heroImages[0].fluid
                } />
                <Overlay>
                  <PostTitle>
                    {work.previewText}
                  </PostTitle>
                </Overlay>
              </Link>
            </Li>
          )
        )}
      </Ul>
    </>
  )
}

export default ImageList;
