import kebabCaseToPascalCase from '../utils/kebabCaseToPascalCase'

export default abstract class BaseElement extends HTMLElement {
  public shadow!: ShadowRoot

  protected abstract get template(): string

  protected get css(): string {
    return ''
  }

  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  protected connectedCallback(): void {
    const connectedEvent = new Event('connection')
    this.dispatchEvent(connectedEvent)
  }

  protected disconnectedCallback(): void {
    const disconnectedEvent = new Event('disconnection')
    this.dispatchEvent(disconnectedEvent)
  }

  protected attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (!this.isConnected) {
      return
    }

    const updateFunctionName = `on${kebabCaseToPascalCase(name)}Updated`

    /* eslint-disable @typescript-eslint/no-explicit-any */
    if (typeof (this as any)[updateFunctionName] === 'function') {
      ;(this as any)[updateFunctionName](newValue, oldValue)
    }
    /* eslint-enable @typescript-eslint/no-explicit-any */

    const event = new Event(`${name}-update`)
    this.dispatchEvent(event)
  }
}
