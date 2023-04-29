import BaseElement from '../BaseElement'
import * as OverlayBehaviour from '../../behaviours/overlay/overlayBehaviour'

import template from './Overlay.html'

export default class Overlay extends BaseElement {
  protected get template(): string {
    return template
  }

  protected connectedCallback(): void {
    super.connectedCallback()
    if (this.parentElement?.id !== 'sc-overlay') {
      this.shadow.innerHTML = this.template
      OverlayBehaviour.init(this)
    }
  }
}
