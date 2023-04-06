import { Story, Meta } from '@storybook/web-components'
import { html } from 'lit-html'

import InputNumber from '../../../dist/InputNumber'

// -- Component declaration -- //

interface InputNumberPropsInterface {
  value?: number
}

customElements.define(`sc-input-number`, InputNumber)

const createComponent = ({ value }: InputNumberPropsInterface) => {
  return html`
    <sc-input-number
      value="${value}"
    />
  // `
}

// -- Storybook component declaration -- //

export default {
  title: 'SC/Form elements/InputNumber',
  argTypes: {
    value: { control: 'number' },
  },
} as Meta

// -- Storybook templates -- //

const Template: Story<Partial<InputNumberPropsInterface>> = (args) => createComponent(args)

export const Default = Template.bind({});
Default.args = {
  value: 5,
}