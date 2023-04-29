function getOverlayElement() {
  const elementId = "sc-overlay";
  let overlayElement = document.querySelector("#" + elementId);
  if (!overlayElement) {
    const overlayStyleTag = document.createElement("style");
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
    `;
    document.body.appendChild(overlayStyleTag);
    overlayElement = document.createElement("div");
    overlayElement.id = elementId;
    document.body.appendChild(overlayElement);
  }
  return overlayElement;
}
function init(element) {
  const overlayElement = getOverlayElement();
  element.remove();
  overlayElement.appendChild(element);
}

var overlayBehaviour = /*#__PURE__*/Object.freeze({
  __proto__: null,
  init: init
});

export { init as i, overlayBehaviour as o };
