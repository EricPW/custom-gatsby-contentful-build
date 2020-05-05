const config = require('./src/utils/siteConfig')
const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const loadInsights = new Promise((resolve, reject) => {
    graphql(`
      {
        allContentfulInsightsPage(
          sort: { fields: [date], order: DESC }
          limit: 5000
        ) {
          edges {
            node {
              id
              slug
              date
              seoTitle
              seoDescription {
                seoDescription
              }
              seoHelmet {
                seoHelmet
              }
            }
          }
          group(field: category___slug) {
            fieldValue
            edges {
              node {
                id
                slug
                title
                date
              }
            }
          }
        }
      }
    `).then(result => {
      const posts = result.data.allContentfulInsightsPage.edges
      const postsByCategory = result.data.allContentfulInsightsPage.group
      const postsPerPage = config.postsPerPage
      const numPages = Math.ceil(
        posts.length / postsPerPage
      )
      const insightsBasePath = `insights`

      // Create Insights main page
      createPage({
        path: `/${insightsBasePath}/`,
        component: path.resolve(`./src/templates/insights.js`),
        context: {
          limit: postsPerPage,
          skip: 0,
          numPages: numPages,
          currentPage: 1,
          paginationBasePath: `${insightsBasePath}`,
        },
      })

      // Create additional pagination on Insights main page as needed
      Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
          path: `/${insightsBasePath}/${i + 2}/`,
          component: path.resolve(`./src/templates/insights.js`),
          context: {
            limit: postsPerPage,
            skip: i * postsPerPage + postsPerPage,
            numPages: numPages,
            currentPage: i + 2,
            paginationBasePath: `${insightsBasePath}`,
          },
        })
      })

      // Creating insight category pages
      postsByCategory.forEach((category) => {
        const posts = category.edges
        const numPages = Math.ceil(
          posts.length / postsPerPage
        )
        const categorySlug = category.fieldValue
        const categoryBasePath = `${insightsBasePath}/category/${categorySlug}`

        // Create root category page
        createPage({
          path: `/${categoryBasePath}/`,
          component: path.resolve(`./src/templates/insightsCategories.js`),
          context: {
            limit: postsPerPage,
            skip: 0,
            slug: categorySlug,
            numPages: numPages,
            currentPage: 1,
            paginationBasePath: `${categoryBasePath}`,
          },
        })

        // Create additional pagination for category page as needed
        Array.from({ length: numPages }).forEach((_, i) => {
          createPage({
            path: `/${categoryBasePath}/${i + 2}/`,
            component: path.resolve(`./src/templates/insightsCategories.js`),
            context: {
              limit: postsPerPage,
              skip: i * postsPerPage + postsPerPage,
              slug: categorySlug,
              numPages: numPages,
              currentPage: i + 2,
              paginationBasePath: `${categoryBasePath}`,
            },
          })
        })
      })

      // Create each individual insight post
      posts.forEach((edge, i) => {
        const prev = i === 0 ? null : posts[i - 1].node
        const next = i === posts.length - 1 ? null : posts[i + 1].node
        createPage({
          path: `/insights/${edge.node.slug}/`,
          component: path.resolve(`./src/templates/insight.js`),
          context: {
            slug: edge.node.slug,
            prev,
            next,
            seo: {
              title: edge.node.seoTitle,
              description: edge.node.seoDescription.seoDescription
            }
          },
        })
      })

      resolve()
    })
  })

  const loadWork = new Promise((resolve, reject) => {
    graphql(`
      {
        allContentfulWorkCategory {
          edges {
            node {
              id
              name
              slug
            }
          }
        }
        allContentfulWorkPage {
          edges {
            node {
              id
              clientName
              slug
              category {
                name
                slug
              }
            }
          }
        }
      }
    `).then(result => {
      const work = result.data.allContentfulWorkPage.edges
      const categories = result.data.allContentfulWorkCategory.edges
      const workBasePath = `work`

      // Create Work category pages
      categories.forEach((edge, i) => {
        if (edge.node.slug === 'all') {
          createPage({
            path: `/${workBasePath}/`,
            component: path.resolve(`./src/templates/workCategories.js`),
            context: {
              slug: edge.node.slug,
            },
          })
        } else {
          createPage({
            path: `/${workBasePath}/${edge.node.slug}/`,
            component: path.resolve(`./src/templates/workCategories.js`),
            context: {
              slug: edge.node.slug,
            },
          })
        }
      })

      // Create each individual Work page
      work.forEach((edge, i) => {
        createPage({
          path: `/work/${edge.node.slug}/`,
          component: path.resolve(`./src/templates/workSingle.js`),
          context: {
            slug: edge.node.slug,
          },
        })
      })

      resolve()
    })
  })

  const loadExpertise = new Promise((resolve, reject) => {
    graphql(`
      {
        allContentfulExpertisePage {
          edges {
            node {
              id
              slug
              name
            }
          }
        }
      }
    `).then(result => {
      const allExpertise = result.data.allContentfulExpertisePage.edges
      const expertiseBasePath = `services`

      // The following is commented out because we do not have a root Expertise page
      // createPage({
      //   path: `/${expertiseBasePath}/`,
      //   component: path.resolve(`./src/templates/expertise.js`),
      //   context: {
      //     currentPage: 1,
      //     slug: ``
      //   },
      // })

      // Create Expertise category pages
      allExpertise.forEach((edge, i) => {
        createPage({
          path: `/${expertiseBasePath}/${edge.node.slug}/`,
          component: path.resolve(`./src/templates/expertise.js`),
          context: {
            slug: edge.node.slug,
          },
        })
      })

      resolve()
    })
  })

  return Promise.all([loadInsights, loadWork, loadExpertise])
}
