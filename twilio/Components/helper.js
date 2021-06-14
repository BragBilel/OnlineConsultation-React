import { select } from 'lib/selectors'

const headerWrapper = select('.js-header')
const footerWrapper = select('.js-footer')
const heroWrapper = select('.hero__container')
const hero = select('.hero')

// Follow accessibility specifications to add visibility hidden style over the document
function hideDomElements() {
  headerWrapper.classList.add('is-hidden')
  hero.classList.add('is-hidden')
  heroWrapper.classList.add('is-hidden')
  footerWrapper.classList.add('is-hidden')
}

// Follow accessibility specifications to remove visibility hidden style over the document
function showDomElements() {
  headerWrapper.classList.remove('is-hidden')
  footerWrapper.classList.remove('is-hidden')
  heroWrapper.classList.remove("is-hidden")
  hero.classList.remove('is-hidden')
}

export {
  hideDomElements,
  showDomElements
}
