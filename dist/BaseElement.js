import kebabCaseToPascalCase from './utils/kebabCaseToPascalCase.js';

class BaseElement extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }
  get css() {
    return "";
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

export { BaseElement as default };
