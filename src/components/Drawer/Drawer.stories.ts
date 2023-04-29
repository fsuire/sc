import { Story, Meta } from '@storybook/web-components'
import { html } from 'lit-html'

import Drawer from './Drawer'

// -- Component declaration -- //

interface DrawerPropsInterface {
  isOpened?: boolean
}

customElements.define(`sc-drawer`, Drawer)

const createComponent = ({ isOpened = false }: DrawerPropsInterface) => {
  return html`
    <style>
      sc-drawer {
        background-color: SkyBlue;
        border: 4px solid LightSteelBlue;
        margin: 4px;
      }
      .aroundDrawer {
        background-color: LightBlue;
      }
    </style>
    <div class="aroundDrawer">
      a div before the drawer
    </div>
    <sc-drawer is-opened="${isOpened}">
      <div>drawer</div>
    </sc-drawer>
    <div class="aroundDrawer">
      a div after the drawer
    </div>
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
