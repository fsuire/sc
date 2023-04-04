import BaseFormElement from './BaseFormElement'

export default class InputNumber extends BaseFormElement<number> {
  protected incrementElement!: HTMLElement
  protected decrementElement!: HTMLElement
  protected controlElement!: HTMLElement

  protected connectedCallback(): void {
    super.connectedCallback()
    this.shadow.innerHTML = `
    <style>
      :host {
        display: inline-flex;
        flex-direction: row;
        font-size: 1em;
        align-items: center;
        justify-content: center;
      }
      #decrement,
      #increment {
        display: flex;
        justify-content: center;
        padding: 0.25em;
        background-color: var(--color-foreground-3, SkyBlue);
        border: 1px solid transparent;
        color: var(--color-background-3);
        width: 1em;
        user-select: none;
        transition: background-color 200ms ease-out;
      }
      #decrement {
        border-right: none;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }
      #increment {
        border-left: none;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
      }
      #decrement:hover,
      #increment:hover {
        cursor: pointer;
        background-color: var(--color-foreground-2, LightBlue);
      }
      #control {
        min-width: 1em;
        background-color: var(--color-background-3);
        border: 1px solid var(--color-foreground-3);
        border-left: none;
        border-right: none;
        color: var(--color-foreground-3);
        padding: 0.25em;
        text-align: center;
      }
    </style>
    <div id="decrement">-</div>
    <div id="control" contenteditable="true"></div>
    <div id="increment">+</div>
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
