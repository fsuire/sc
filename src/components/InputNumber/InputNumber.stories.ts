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
      value=${value}
    />
  `;
};

// -- Storybook component declaration -- //

export default {
  title: 'SC/Form elements/InputNumber',
  argTypes: {
    value: { control: 'number' },
  },
} as Meta

// -- Storybook templates -- //

const Template: Story<Partial<InputNumberPropsInterface>> = (args) => createComponent(args)

export const Primary = Template.bind({});
Primary.args = {
  value: 5,
  // primary: true,
  // label: 'Button',
}

// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: 'Button',
// };

// export const Large = Template.bind({});
// Large.args = {
//   size: 'large',
//   label: 'Button',
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: 'small',
//   label: 'Button',
// };
