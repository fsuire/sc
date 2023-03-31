import BoarzElement from './BoarzElement'
import { OverlayBehaviour } from './behaviours'

export default class Overlay extends BoarzElement {
  protected connectedCallback(): void {
    super.connectedCallback()
    if (this.parentElement?.id !== 'sc-overlay') {
      this.shadow.innerHTML = '<slot />'
      OverlayBehaviour.init(this)
    }
  }
}
