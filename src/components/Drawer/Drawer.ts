import BaseElement from '../BaseElement'
import * as DrawerBehaviour from '../../behaviours/DrawerBehaviour'
import DrawerOriginalStyleInterface from '../../behaviours/DrawerOriginalStyleInterface'
import castToboolean from '../../utils/castToboolean'

export default class Drawer extends BaseElement {
  static get observedAttributes(): string[] {
    return ['is-opened']
  }

  public originalStyle!: DrawerOriginalStyleInterface

  protected get isOpened(): boolean {
    return castToboolean(this.getAttribute('is-opened') ?? 'true')
  }

  protected connectedCallback(): void {
    super.connectedCallback()
    this.shadow.innerHTML = '<slot />'
    DrawerBehaviour.connect(this)
  }

  protected disconnectedCallback(): void {
    DrawerBehaviour.disconnect(this)
  }
}
