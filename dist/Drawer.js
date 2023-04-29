import BaseElement from './BaseElement.js';
import { c as connect, d as disconnect } from './drawerBehaviour-450742b2.js';
import castToboolean from './utils/castToboolean.js';
import './utils/kebabCaseToPascalCase.js';
import './utils/removeLastChars.js';

class Drawer extends BaseElement {
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
