import { castToboolean, createDeferredPromise, debounce, removeLastChars } from '../utils'

import DrawerOriginalStyleInterface from './DrawerOriginalStyleInterface'

type DrawerElement = HTMLElement & { originalStyle: DrawerOriginalStyleInterface, mutationObserver: MutationObserver }

export function connect(element: HTMLElement): void {
  const drawerElement = element as DrawerElement
  const transitionDuration = '200ms'
  const transitionTimingFunction = 'ease-out'
  drawerElement.mutationObserver = new MutationObserver((mutationList, observer) => {
    for (const mutation of mutationList) {
      if (mutation.type === "attributes" && mutation.attributeName === 'is-opened') {
        update(drawerElement)
      }
    }
  })

  computeOriginalStyle(drawerElement)
  
  drawerElement.style.transition = [
    `height var(--Drawer_transitionDuration, ${transitionDuration}) var(--Drawer_transitionTimingFunction, ${transitionTimingFunction})`,
    `margin-top var(--Drawer_transitionDuration, ${transitionDuration}) var(--Drawer_transitionTimingFunction, ${transitionTimingFunction})`,
    `margin-bottom var(--Drawer_transitionDuration, ${transitionDuration}) var(--Drawer_transitionTimingFunction, ${transitionTimingFunction})`,
    `padding-top var(--Drawer_transitionDuration, ${transitionDuration}) var(--Drawer_transitionTimingFunction, ${transitionTimingFunction})`,
    `padding-bottom var(--Drawer_transitionDuration, ${transitionDuration}) var(--Drawer_transitionTimingFunction, ${transitionTimingFunction})`,
    `border-top-width var(--Drawer_transitionDuration, ${transitionDuration}) var(--Drawer_transitionTimingFunction, ${transitionTimingFunction})`,
    `border-bottom-width var(--Drawer_transitionDuration, ${transitionDuration}) var(--Drawer_transitionTimingFunction, ${transitionTimingFunction})`,
  ].join(',')
  drawerElement.style.overflow = 'hidden'
  drawerElement.style.display = 'block'

  update(drawerElement)
  drawerElement.mutationObserver.observe(drawerElement, { attributes: true })
}

export function disconnect(element: HTMLElement): void {
  const drawerElement = element as DrawerElement
  drawerElement.mutationObserver.disconnect()
}

export function update(drawerElement: DrawerElement): void {
  const isOpened = castToboolean(drawerElement.getAttribute('is-opened'))
  drawerElement.style.height = (isOpened ? drawerElement.originalStyle.height : 0) + 'px'
  drawerElement.style.marginTop = (isOpened ? drawerElement.originalStyle.marginTop : 0) + 'px'
  drawerElement.style.marginBottom = (isOpened ? drawerElement.originalStyle.marginBottom : 0) + 'px'
  drawerElement.style.paddingTop = (isOpened ? drawerElement.originalStyle.paddingTop : 0) + 'px'
  drawerElement.style.paddingBottom = (isOpened ? drawerElement.originalStyle.paddingBottom : 0) + 'px'
  drawerElement.style.borderTopWidth = (isOpened ? drawerElement.originalStyle.borderTopWidth : 0) + 'px'
  drawerElement.style.borderBottomWidth = (isOpened ? drawerElement.originalStyle.borderBottomWidth : 0) + 'px'
}

function computeOriginalStyle(drawerElement: DrawerElement): void {
  drawerElement.style.position = 'absolute'

  const computedStyle = window.getComputedStyle(drawerElement)
  const boundingClientRect = drawerElement.getBoundingClientRect()
  const borderBottomWidth = parseFloat(removeLastChars(computedStyle.borderBottomWidth, 2))
  const borderTopWidth = parseFloat(removeLastChars(computedStyle.borderTopWidth, 2))
  const paddingBottom = parseFloat(removeLastChars(computedStyle.paddingBottom, 2))
  const paddingTop = parseFloat(removeLastChars(computedStyle.paddingTop, 2))
  const marginBottom = parseFloat(removeLastChars(computedStyle.marginBottom, 2))
  const marginTop = parseFloat(removeLastChars(computedStyle.marginTop, 2))
  const height = boundingClientRect.height
    - borderBottomWidth
    - borderTopWidth
    - paddingBottom
    - paddingTop

  drawerElement.originalStyle = {
    borderBottomWidth,
    borderTopWidth,
    paddingBottom,
    paddingTop,
    marginBottom,
    marginTop,
    height,
  }

  drawerElement.style.removeProperty('position')
}
