import BoarzElement from './BaseElement.js';
import './utils/kebabCaseToPascalCase.js';

class BaseFormElement extends BoarzElement {
  constructor() {
    super(...arguments);
    this.isValid = true;
  }
  static get observedAttributes() {
    return ["placeholder", "value"];
  }
  set value(value) {
    var _a, _b;
    if (value !== this._value) {
      this._value = value;
      this.dispatchEvent(new Event("value-update"));
      this.dispatchEvent(new InputEvent("input", { data: (_b = (_a = this.value) == null ? void 0 : _a.toString()) != null ? _b : "" }));
    }
  }
  get value() {
    var _a;
    return (_a = this._value) != null ? _a : null;
  }
  get form() {
    let recursiveParentElement = this.parentElement;
    while (!(recursiveParentElement instanceof HTMLFormElement)) {
      recursiveParentElement = recursiveParentElement == null ? void 0 : recursiveParentElement.parentElement;
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
BaseFormElement.formAssociated = true;

export { BaseFormElement as default };
