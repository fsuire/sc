import BaseFormElement from '../BaseFormElement'
import defaults from '../../defaults'

import style from './InputNumber.scss'
import template from './InputNumber.html'

export default class InputNumber extends BaseFormElement<number> {
  protected incrementElement!: HTMLElement
  protected decrementElement!: HTMLElement
  protected controlElement!: HTMLElement

  protected connectedCallback(): void {
    super.connectedCallback()
    this.shadow.innerHTML = `
    <style>
      ${style}
    </style>
    ${template}
    `
    this.incrementElement = this.shadow.querySelector('#increment')!
    this.decrementElement = this.shadow.querySelector('#decrement')!
    this.controlElement = this.shadow.querySelector('#control')!

    const updateValue = () => {
      const valueAttribute = parseFloat(this.getAttribute('value') ?? '0')
      this.value = isNaN(valueAttribute) ? 0 : valueAttribute
      this.updateControlElement()
    }
    updateValue()

    this.addEventListener('value-update', (...args) => {
      updateValue()
    })

    this.incrementElement.addEventListener('click', () => {
      this.value = (this.value ?? 0) + 1
      this.updateControlElement()
    })
    this.decrementElement.addEventListener('click', () => {
      this.value = (this.value ?? 0) - 1
      this.updateControlElement()
    })
    this.controlElement.addEventListener('input', () => {
      const inputValue = this.controlElement.innerHTML
      const nextValue = inputValue !== '' ? parseFloat(inputValue) : 0
      if (!isNaN(nextValue)) {
        this.value = nextValue
      }
      const valueLength = this.value?.toString().length ?? 0
      let startOffset = this.value ? this.value.toString().length : 0
      let endOffset = startOffset
      const selection = getSelection()!
      if (selection.rangeCount) {
        const range = selection.getRangeAt(0)
        startOffset = range?.startOffset
        endOffset = range?.startOffset
      }

      if (startOffset > valueLength) {
        startOffset = valueLength
      }
      if (endOffset > valueLength) {
        endOffset = valueLength
      }
      this.updateControlElement()
      try {
        const nextRange = document.createRange()
        nextRange.setStart(this.controlElement.childNodes[0], startOffset)
        nextRange.setEnd(this.controlElement.childNodes[0], endOffset)
        selection.removeAllRanges()
        selection.addRange(nextRange)
      } catch (e) {
        console.error(e)
        console.error(
          this.controlElement.childNodes[0],
          startOffset,
          endOffset,
          this.value?.toString(),
          this.value?.toString().length
        )
      }
    })

    requestAnimationFrame(() => requestAnimationFrame(() => this.updateControlElement()))
  }

  protected updateControlElement(): void {
    this.controlElement.innerHTML = this.value?.toString() ?? '0'
  }
}
