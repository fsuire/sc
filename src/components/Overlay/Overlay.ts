import BaseElement from '../BaseElement'
import * as OverlayBehaviour from '../../behaviours/overlay/overlayBehaviour'

import template from './Overlay.html'

export default class Overlay extends BaseElement {
  protected connectedCallback(): void {
    super.connectedCallback()
    if (this.parentElement?.id !== 'sc-overlay') {
      this.shadow.innerHTML = template
      OverlayBehaviour.init(this)
    }
  }
}
