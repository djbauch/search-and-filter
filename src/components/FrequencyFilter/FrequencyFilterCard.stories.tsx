/* eslint-disable */
import * as React from 'react'
import FrequencyFilterCard from './FrequencyFilterCard';
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: "Components/FrequencyFilterCard",
  component: FrequencyFilterCard
} as ComponentMeta<typeof FrequencyFilterCard>

const Template: ComponentStory<typeof FrequencyFilterCard> = args => <FrequencyFilterCard {...args}/>
export const Default = Template.bind({})

Default.story = {
  name: 'default',
};
