function getOverlayElement(): HTMLElement {
  const elementId = 'sc-overlay'
  let overlayElement = document.querySelector('#' + elementId)
  if (!overlayElement) {
    const overlayStyleTag = document.createElement('style')
    overlayStyleTag.innerText = `
      body {
        position: relative;
      }
      #${elementId} {
        position: absolute;
        width: 100vw;
        height: 100vh;
        z-index: 1;
        pointer-events: none;
      }
      #${elementId} > * {
        pointer-events: all;
        position: absolute;
      }
    `
    document.body.appendChild(overlayStyleTag)
    overlayElement = document.createElement('div')
    overlayElement.id = elementId
    document.body.appendChild(overlayElement)
  }

  return overlayElement as HTMLElement
}

export function init(element: HTMLElement): void {
  const overlayElement = getOverlayElement()
  element.remove()
  overlayElement.appendChild(element)
}
