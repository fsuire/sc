import castToboolean from './utils/castToboolean.js';
import { d as debounce, r as removeLastChars } from './removeLastChars-92135021.js';

function init(element) {
  const drawerElement = element;
  const debouncedInitialize = debounce(initialize, 60);
  const resizeObserver = new ResizeObserver(() => {
    debouncedInitialize(drawerElement, resizeObserver);
  });
  resizeObserver.observe(drawerElement);
}
function initialize(drawerElement, resizeObserver) {
  resizeObserver.disconnect();
  drawerElement.style.transition = [
    "height 300ms ease-out",
    "padding-top 300ms ease-out",
    "padding-bottom 300ms ease-out",
    "border-top-width 300ms ease-out",
    "border-bottom-width 300ms ease-out"
  ].join(",");
  drawerElement.style.overflow = "hidden";
  requestAnimationFrame(() => {
    computeOriginalStyle(drawerElement);
    const isOpened = castToboolean(drawerElement.getAttribute("is-opened"));
    const isAnimatedOnConnection = castToboolean(drawerElement.getAttribute("is-animated-on-component-connection"));
    if (!isAnimatedOnConnection) {
      update(drawerElement, isOpened.toString());
    } else {
      update(drawerElement, (!isOpened).toString());
      setCssDisplayToNone(drawerElement);
      requestAnimationFrame(() => requestAnimationFrame(() => update(drawerElement, isOpened.toString())));
    }
  });
  drawerElement.addEventListener("transitionend", () => setCssDisplayToNone(drawerElement));
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "attributes" && mutation.attributeName === "is-opened") {
        const isOpened = drawerElement.getAttribute("is-opened");
        update(drawerElement, isOpened);
      }
    }
  });
  observer.observe(drawerElement, { attributes: true });
}
function update(element, newValue) {
  const drawerElement = element;
  if (castToboolean(newValue)) {
    applyOriginalStyle(drawerElement);
  } else {
    drawerElement.style.height = "0px";
    drawerElement.style.paddingTop = "0px";
    drawerElement.style.paddingBottom = "0px";
    drawerElement.style.borderTopWidth = "0px";
    drawerElement.style.borderBottomWidth = "0px";
  }
}
function setCssDisplayToNone(element) {
  const drawerElement = element;
  const isOpened = castToboolean(drawerElement.getAttribute("is-opened"));
  if (!isOpened) {
    drawerElement.style.display = "none";
  }
}
function computeOriginalStyle(drawerElement) {
  const computedStyle = getComputedStyle(drawerElement);
  parseFloat(removeLastChars(computedStyle.height, 2));
  drawerElement.originalStyle = {
    height: parseFloat(removeLastChars(computedStyle.height, 2)),
    paddingTop: parseFloat(removeLastChars(computedStyle.paddingTop, 2)),
    paddingBottom: parseFloat(removeLastChars(computedStyle.paddingBottom, 2)),
    borderTopWidth: parseFloat(removeLastChars(computedStyle.borderTopWidth, 2)),
    borderBottomWidth: parseFloat(removeLastChars(computedStyle.borderBottomWidth, 2)),
    display: computedStyle.display,
    transition: computedStyle.transition
  };
}
function applyOriginalStyle(drawerElement) {
  drawerElement.style.display = drawerElement.originalStyle.display;
  requestAnimationFrame(
    () => requestAnimationFrame(() => {
      drawerElement.style.height = drawerElement.originalStyle.height + "px";
      drawerElement.style.paddingTop = drawerElement.originalStyle.paddingTop + "px";
      drawerElement.style.paddingBottom = drawerElement.originalStyle.paddingBottom + "px";
      drawerElement.style.borderTopWidth = drawerElement.originalStyle.borderTopWidth + "px";
      drawerElement.style.borderBottomWidth = drawerElement.originalStyle.borderBottomWidth + "px";
    })
  );
}

var DrawerBehaviour = /*#__PURE__*/Object.freeze({
  __proto__: null,
  init: init,
  setCssDisplayToNone: setCssDisplayToNone,
  update: update
});

export { DrawerBehaviour as D, init as i, setCssDisplayToNone as s, update as u };
