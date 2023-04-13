import BaseFormElement from '../BaseFormElement'
import defaults from '../../defaults'

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
        width: 1em;
        user-select: none;
        transition: background-color 200ms ease-out;
      }
      #decrement {
        background-color: var(
          --SCInputNumber-buttons_backgroundColor,
          var(
            --SCInputNumber-decrement_backgroundColor,
            var(--SC-primaryColor, ${defaults.primaryColor})
          )
        );
        border: 1px solid var(
          --SCInputNumber-buttons_borderColor,
          var(
            --SCInputNumber-decrement_borderColor,
            var(--SC-borderColor, ${defaults.black})
          )
        );
        color: var(
          --SCInputNumber-buttons_color,
          var(
            --SCInputNumber-decrement_color,
            var(--SC-textColor, ${defaults.black})
          )
        );
        border-right: none;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }
      #increment {
        background-color: var(
          --SCInputNumber-buttons_backgroundColor,
          var(
            --SCInputNumber-increment_backgroundColor,
            var(--SC-primaryColor, ${defaults.primaryColor})
          )
        );
        border: 1px solid var(
          --SCInputNumber-buttons_borderColor,
          var(
            --SCInputNumber-increment_borderColor,
            var(--SC-borderColor, ${defaults.black})
          )
        );
        color: var(
          --SCInputNumber-buttons_color,
          var(
            --SCInputNumber-increment_color,
            var(--SC-textColor, ${defaults.black})
          )
        );
        border-left: none;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
      }
      #decrement:hover,
      #increment:hover {
        cursor: pointer;
        background-color: var(--SCInputNumber-buttons--hover_backgroundColor, var(--SC-primaryColor--hover, ${defaults['primaryColor--hover']}));
      }
      #decrement:hover {
        background-color: var(
          --SCInputNumber-buttons--hover_backgroundColor,
          var(
            --SCInputNumber-decrement--hover_backgroundColor,
            var(--SC-primaryColor--hover, ${defaults['primaryColor--hover']})
          )
        );
      }
      #increment:hover {
        background-color: var(
          --SCInputNumber-buttons--hover_backgroundColor,
          var(
            --SCInputNumber-increment--hover_backgroundColor,
            var(--SC-primaryColor--hover, ${defaults['primaryColor--hover']})
          )
        );
      }
      #control {
        min-width: 1em;
        background-color: var(--SCInputNumber-control_backgroundColor, var(--SC-backgroundColor, ${defaults.white}));
        border-width: 1px;
        border-style: solid;
        border-color: var(--SCInputNumber-control_borderColor, var(--SC-borderColor, ${defaults.black}));
        border-left: none;
        border-right: none;
        color: var(--SCInputNumber-control_color, var(--SC-color, ${defaults.black}));
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
