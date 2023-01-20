/* eslint-disable */
import { ComponentMeta, ComponentStory } from '@storybook/react'
import CardDropdown from './CardDropdown';

export default {
  title: "Components/CardDropdown",
  component: CardDropdown,
} as ComponentMeta<typeof CardDropdown>

const Template: ComponentStory<typeof CardDropdown> = (args) => <CardDropdown {...args} />

export const Default = () => <CardDropdown />

Default.story = {
  name: 'default',
}
