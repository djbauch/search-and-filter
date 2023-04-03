/* eslint-disable */
import * as React from 'react'
import FilterSummaryCard from './FilterSummaryCard';
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: "Components/FilterSummaryCard",
  component: FilterSummaryCard
};

const Template: ComponentStory<typeof FilterSummaryCard> = (args) => <FilterSummaryCard {...args}/>;
export const Default = Template.bind({})

Default.story = {
  name: 'default',
};
