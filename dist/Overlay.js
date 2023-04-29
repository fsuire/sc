import BaseElement from './BaseElement.js';
import { i as init } from './overlayBehaviour-7062c63c.js';
import './utils/kebabCaseToPascalCase.js';

var template = "<slot>";

class Overlay extends BaseElement {
  connectedCallback() {
    var _a;
    super.connectedCallback();
    if (((_a = this.parentElement) == null ? void 0 : _a.id) !== "sc-overlay") {
      this.shadow.innerHTML = template;
      init(this);
    }
  }
}

export { Overlay as default };
