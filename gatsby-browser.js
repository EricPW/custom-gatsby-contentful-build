import "./src/styles/reset.css"
import "./src/fonts/fonts.css"

export const onRouteUpdate = ({ location, prevLocation }) => {
  const classes = document.body.className.split(" ").filter(c => !c.startsWith('is-intersecting'))
  document.body.className = classes.join(" ").trim()
  document.body.classList.remove('show-main-menu')
}