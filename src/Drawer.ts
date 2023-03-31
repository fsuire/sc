import { DrawerBehaviour } from './behaviours'
import BoarzElement from './BoarzElement'

export default class Drawer extends BoarzElement {
  static get observedAttributes(): string[] {
    return ['is-opened']
  }

  protected connectedCallback(): void {
    super.connectedCallback()
    this.shadow.innerHTML = '<slot />'
    DrawerBehaviour.init(this)
  }
}
