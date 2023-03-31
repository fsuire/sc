function kebabCaseToPascalCase(kebabString) {
  return kebabString.split("-").reduce((acc, current) => {
    acc += current.charAt(0).toUpperCase() + current.slice(1);
    return acc;
  }, "");
}

class BoarzElement extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    const connectedEvent = new Event("connection");
    this.dispatchEvent(connectedEvent);
  }
  disconnectedCallback() {
    const disconnectedEvent = new Event("disconnection");
    this.dispatchEvent(disconnectedEvent);
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.isConnected) {
      return;
    }
    const updateFunctionName = `on${kebabCaseToPascalCase(name)}Updated`;
    if (typeof this[updateFunctionName] === "function") {
      this[updateFunctionName](newValue, oldValue);
    }
    const event = new Event(`${name}-update`);
    this.dispatchEvent(event);
  }
}

class BoarzFormElement extends BoarzElement {
  constructor() {
    super(...arguments);
    this.isValid = true;
  }
  static get observedAttributes() {
    return ["placeholder", "value"];
  }
  set value(value) {
    this._value = value;
    this.dispatchEvent(new Event("value-update"));
    this.dispatchEvent(new Event("input"));
  }
  get value() {
    var _a;
    return (_a = this._value) !== null && _a !== void 0 ? _a : null;
  }
  get form() {
    let recursiveParentElement = this.parentElement;
    while (!(recursiveParentElement instanceof HTMLFormElement)) {
      recursiveParentElement = recursiveParentElement === null || recursiveParentElement === void 0 ? void 0 : recursiveParentElement.parentElement;
      if (!recursiveParentElement) {
        return null;
      }
    }
    return recursiveParentElement;
  }
  get name() {
    return this.getAttribute("name");
  }
  get type() {
    return this.localName;
  }
  checkValidity() {
    return this.isValid;
  }
}
BoarzFormElement.formAssociated = true;

function castToboolean(source) {
  return ![false, null, void 0, 0, "", "false", "null", "undefined", "0"].includes(source);
}

function debounce(func, waitFor) {
  let timeoutId = null;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, waitFor);
  };
}

function removeLastChars(str, numberOfCharsToRemove) {
  return str.substring(0, str.length - numberOfCharsToRemove);
}

function init$1(element) {
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
  requestAnimationFrame(() => requestAnimationFrame(() => {
    drawerElement.style.height = drawerElement.originalStyle.height + "px";
    drawerElement.style.paddingTop = drawerElement.originalStyle.paddingTop + "px";
    drawerElement.style.paddingBottom = drawerElement.originalStyle.paddingBottom + "px";
    drawerElement.style.borderTopWidth = drawerElement.originalStyle.borderTopWidth + "px";
    drawerElement.style.borderBottomWidth = drawerElement.originalStyle.borderBottomWidth + "px";
  }));
}

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
  top: 0;
  left: 0;
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

class Drawer extends BoarzElement {
  static get observedAttributes() {
    return ["is-opened"];
  }
  connectedCallback() {
    super.connectedCallback();
    this.shadow.innerHTML = "<slot />";
    init$1(this);
  }
}

class InputNumber extends BoarzFormElement {
  connectedCallback() {
    super.connectedCallback();
    this.shadow.innerHTML = `
    <style>
      :host {
        display: inline-flex;
        flex-direction: row;
        font-size: 1em;
        align-items: center;
        justify-content: center;
      }
      #decrement,
      #increment {
        display: flex;
        justify-content: center;
        padding: 0.25em;
        background-color: var(--color-foreground-3);
        border: 1px solid transparent;
        color: var(--color-background-3);
        width: 1em;
        user-select: none;
        transition: background-color 200ms ease-out;
      }
      #decrement {
        border-right: none;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }
      #increment {
        border-left: none;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
      }
      #decrement:hover,
      #increment:hover {
        cursor: pointer;
        background-color: var(--color-foreground-2);
      }
      #control {
        min-width: 1em;
        background-color: var(--color-background-3);
        border: 1px solid var(--color-foreground-3);
        border-left: none;
        border-right: none;
        color: var(--color-foreground-3);
        padding: 0.25em;
        text-align: center;
      }
    </style>
    <div id="decrement">-</div>
    <div id="control" contenteditable="true"></div>
    <div id="increment">+</div>
    `;
    this.incrementElement = this.shadow.querySelector("#increment");
    this.decrementElement = this.shadow.querySelector("#decrement");
    this.controlElement = this.shadow.querySelector("#control");
    this.incrementElement.addEventListener("click", () => {
      var _a;
      this.value = ((_a = this.value) !== null && _a !== void 0 ? _a : 0) + 1;
      this.updateControlElement();
    });
    this.decrementElement.addEventListener("click", () => {
      var _a;
      this.value = ((_a = this.value) !== null && _a !== void 0 ? _a : 0) - 1;
      this.updateControlElement();
    });
    this.controlElement.addEventListener("input", () => {
      var _a, _b, _c, _d;
      const inputValue = this.controlElement.innerHTML;
      const nextValue = inputValue !== "" ? parseFloat(inputValue) : 0;
      if (!isNaN(nextValue)) {
        this.value = nextValue;
      }
      const valueLength = (_b = (_a = this.value) === null || _a === void 0 ? void 0 : _a.toString().length) !== null && _b !== void 0 ? _b : 0;
      let startOffset = this.value ? this.value.toString().length : 0;
      let endOffset = startOffset;
      const selection = getSelection();
      if (selection.rangeCount) {
        const range = selection.getRangeAt(0);
        startOffset = range === null || range === void 0 ? void 0 : range.startOffset;
        endOffset = range === null || range === void 0 ? void 0 : range.startOffset;
      }
      if (startOffset > valueLength) {
        startOffset = valueLength;
      }
      if (endOffset > valueLength) {
        endOffset = valueLength;
      }
      this.updateControlElement();
      try {
        const nextRange = document.createRange();
        nextRange.setStart(this.controlElement.childNodes[0], startOffset);
        nextRange.setEnd(this.controlElement.childNodes[0], endOffset);
        selection.removeAllRanges();
        selection.addRange(nextRange);
      } catch (e) {
        console.error(e);
        console.error(this.controlElement.childNodes[0], startOffset, endOffset, (_c = this.value) === null || _c === void 0 ? void 0 : _c.toString(), (_d = this.value) === null || _d === void 0 ? void 0 : _d.toString().length);
      }
    });
    requestAnimationFrame(() => requestAnimationFrame(() => this.updateControlElement()));
  }
  updateControlElement() {
    var _a, _b;
    this.controlElement.innerHTML = (_b = (_a = this.value) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "0";
  }
}

class Overlay extends BoarzElement {
  connectedCallback() {
    var _a;
    super.connectedCallback();
    if (((_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.id) !== "sc-overlay") {
      this.shadow.innerHTML = "<slot />";
      init(this);
    }
  }
}

export { BoarzElement, BoarzFormElement, Drawer, InputNumber, Overlay };
