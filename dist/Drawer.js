import BoarzElement from './BaseElement.js';
import { c as connect, d as disconnect } from './DrawerBehaviour-45f7c85a.js';
import castToboolean from './utils/castToboolean.js';
import './utils/kebabCaseToPascalCase.js';
import './utils/removeLastChars.js';

class Drawer extends BoarzElement {
  static get observedAttributes() {
    return ["is-opened"];
  }
  get isOpened() {
    var _a;
    return castToboolean((_a = this.getAttribute("is-opened")) != null ? _a : "true");
  }
  connectedCallback() {
    super.connectedCallback();
    this.shadow.innerHTML = "<slot />";
    connect(this);
  }
  disconnectedCallback() {
    disconnect(this);
  }
}

export { Drawer as default };
