import { html } from 'lit-html';
import { styleMap } from 'lit-html/directives/style-map.js';

import InputNumberComponent from '../../dist/InputNumber'

export interface InputNumberPropsInterface {
  value?: number
}

customElements.define(`sc-input-number`, InputNumberComponent)

export const InputNumber = ({ value }: InputNumberPropsInterface) => {
  console.log('ho', value)
  return html`
    <sc-input-number
      value=${value}
    />
  `;
};
