import type { Action } from 'svelte/action'
export const scroll: Action<HTMLElement, { getSelector: () => string }> = function (el, { getSelector }) {
  $effect(() => {
    const selector = getSelector()
    if (!selector) {
      return
    }
    const child = el.querySelector(selector) as HTMLElement
    if (!child) {
      return
    }
    if (isScrollable(el)) {
      maintainScrollVisibility(child, el)
    }
    if (!isElementInView(child)) {
      child.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  })

  function isScrollable(element: HTMLElement) {
    return element && element.clientHeight < element.scrollHeight
  }

  function isElementInView(element: HTMLElement) {
    const bounding = element.getBoundingClientRect()
    return (
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  function maintainScrollVisibility(child: HTMLElement, parent: HTMLElement) {
    const { offsetHeight, offsetTop } = child
    const { offsetHeight: parentOffsetHeight, scrollTop } = parent

    const isAbove = offsetTop < scrollTop
    const isBelow = offsetTop + offsetHeight > scrollTop + parentOffsetHeight

    if (isAbove) {
      parent.scrollTo(0, offsetTop)
    } else if (isBelow) {
      parent.scrollTo(0, offsetTop - parentOffsetHeight + offsetHeight)
    }
  }
}
