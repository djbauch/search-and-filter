import * as React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import CardDropdown from './CardDropdown';

export default {
  title: "Components/CardDropdown",
  component: CardDropdown,
} as ComponentMeta<typeof CardDropdown>

const Template: ComponentStory<typeof CardDropdown> = (args) => <CardDropdown {...args} />

export const Default = Template.bind({})

Default.story = {
  name: 'default',
}
