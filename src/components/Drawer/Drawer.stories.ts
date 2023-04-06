import { Story, Meta } from '@storybook/web-components'
import { html } from 'lit-html'

import Drawer from '../../../dist/Drawer'

// -- Component declaration -- //

interface DrawerPropsInterface {
  isOpened?: boolean
}

customElements.define(`sc-drawer`, Drawer)

const createComponent = ({ isOpened = false }: DrawerPropsInterface) => {
  return html`
    <sc-drawer is-opened="${isOpened}">
      drawer
    </sc-drawer>
  `
}

// -- Storybook component declaration -- //

export default {
  title: 'SC/Drawer',
  argTypes: {
    isOpened: { control: 'boolean' },
  },
} as Meta

// -- Storybook templates -- //

const Template: Story<Partial<DrawerPropsInterface>> = (args) => createComponent(args)

export const Default = Template.bind({});
Default.args = {
  isOpened: true,
}
