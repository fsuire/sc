import * as DrawerBehaviour from '../../behaviours/DrawerBehaviour'
import BaseElement from '../BaseElement'

export default class Drawer extends BaseElement {
  static get observedAttributes(): string[] {
    return ['is-opened']
  }

  protected connectedCallback(): void {
    super.connectedCallback()
    this.shadow.innerHTML = '<slot />'
    DrawerBehaviour.init(this)
  }
}
