import { Story, Meta } from '@storybook/web-components'
import { InputNumber, InputNumberPropsInterface } from './InputNumber'


export default {
  title: 'SC/Form elements/InputNumber',
  argTypes: {
    value: { control: 'number' },
  },
} as Meta

const Template: Story<Partial<InputNumberPropsInterface>> = (args) => InputNumber(args)

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
