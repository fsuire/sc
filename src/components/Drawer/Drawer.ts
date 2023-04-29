import BaseElement from '../BaseElement'
import * as drawerBehaviour from '../../behaviours/drawer/drawerBehaviour'
import castToboolean from '../../utils/castToboolean'

export default class Drawer extends BaseElement {
  static get observedAttributes(): string[] {
    return ['is-opened']
  }

  protected get isOpened(): boolean {
    return castToboolean(this.getAttribute('is-opened') ?? 'true')
  }

  protected connectedCallback(): void {
    super.connectedCallback()
    this.shadow.innerHTML = '<slot />'
    drawerBehaviour.connect(this)
  }

  protected disconnectedCallback(): void {
    drawerBehaviour.disconnect(this)
  }
}
