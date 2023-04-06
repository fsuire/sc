import { Story, Meta } from '@storybook/web-components'
import { html } from 'lit-html'

import Overlay from '../../../dist/Overlay'

// -- Component declaration -- //

interface OverlayPropsInterface {
  isOpened?: boolean
}

customElements.define(`sc-overlay`, Overlay)

const createComponent = ({ isOpened = false }: OverlayPropsInterface) => {
  return html`
    <sc-overlay is-opened="${isOpened}">
      Overlay
    </sc-overlay>
  `
}

// -- Storybook component declaration -- //

export default {
  title: 'SC/Overlay',
  argTypes: {
    isOpened: { control: 'boolean' },
  },
} as Meta

// -- Storybook templates -- //

const Template: Story<Partial<OverlayPropsInterface>> = (args) => createComponent(args)

export const Default = Template.bind({});
Default.args = {
  isOpened: true,
}
