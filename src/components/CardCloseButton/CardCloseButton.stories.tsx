import { ComponentMeta, ComponentStory } from '@storybook/react'
import CardCloseButton from './CardCloseButton'

export default {
  title: 'Components/CardCloseButton',
  component: CardCloseButton,
  argTypes: {
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'radio' }
    }
  }
} as ComponentMeta<typeof CardCloseButton>

const Template: ComponentStory<typeof CardCloseButton> = (args) => <CardCloseButton {...args} />

export const Default = Template.bind({})
