import * as React from 'react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import FilterTabs from './FilterTabs'

export default {
  title: 'Components/CardDropdown',
  component: FilterTabs
} as ComponentMeta<typeof FilterTabs>

const Template: ComponentStory<typeof FilterTabs> = (args) => <FilterTabs {...args} />

export const Default = Template.bind({})

Default.story = {
  name: 'default'
}
