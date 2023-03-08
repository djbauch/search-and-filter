/* eslint-disable */
import { ComponentMeta, ComponentStory } from '@storybook/react'
import FalconCloseButton from './FalconCloseButton'

export default {
  title: "Components/FalconCloseButton",
  component: FalconCloseButton,
  argTypes: {
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'radio'}
    }
  }
} as ComponentMeta<typeof FalconCloseButton>

const Template: ComponentStory<typeof FalconCloseButton> =(args) => <FalconCloseButton {...args} />

export const Default = Template.bind({})
