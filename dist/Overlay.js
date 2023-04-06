import BoarzElement from './BaseElement.js';
import { i as init } from './OverlayBehaviour-39d616e7.js';
import './utils/kebabCaseToPascalCase.js';

class Overlay extends BoarzElement {
  connectedCallback() {
    var _a;
    super.connectedCallback();
    if (((_a = this.parentElement) == null ? void 0 : _a.id) !== "sc-overlay") {
      this.shadow.innerHTML = "<slot />";
      init(this);
    }
  }
}

export { Overlay as default };
