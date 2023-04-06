import BaseElement from './BaseElement'

type ValueType = string | { toString: () => string }

export default abstract class BaseFormElement<T extends ValueType> extends BaseElement {
  static get observedAttributes(): string[] {
    return ['placeholder', 'value']
  }
  static formAssociated = true

  protected isValid = true

  protected _value?: T | null
  public set value(value: T | null) {
    if (value !== this._value) {
      this._value = value
      this.dispatchEvent(new InputEvent('input', { data: this.value?.toString() ?? '' }))
    }
  }
  public get value(): T | null {
    return this._value ?? null
  }

  public get form(): HTMLFormElement | null {
    let recursiveParentElement: HTMLElement | null | undefined = this.parentElement
    while (!(recursiveParentElement instanceof HTMLFormElement)) {
      recursiveParentElement = recursiveParentElement?.parentElement
      if (!recursiveParentElement) {
        return null
      }
    }
    return recursiveParentElement
  }

  public get name(): string | null {
    return this.getAttribute('name')
  }

  public get type(): string {
    return this.localName
  }

  public checkValidity(): boolean {
    return this.isValid
  }
}
