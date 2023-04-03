import { i as init } from './DrawerBehaviour-aafb2ae6.js';
import BoarzElement from './BoarzElement.js';
import './utils/castToboolean.js';
import './utils/debounce.js';
import './utils/removeLastChars.js';
import './utils/kebabCaseToPascalCase.js';

class Drawer extends BoarzElement {
  static get observedAttributes() {
    return ["is-opened"];
  }
  connectedCallback() {
    super.connectedCallback();
    this.shadow.innerHTML = "<slot />";
    init(this);
  }
}

export { Drawer as default };
