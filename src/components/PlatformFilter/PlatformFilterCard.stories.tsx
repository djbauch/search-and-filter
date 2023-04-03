/* eslint-disable */
import * as React from 'react'
import PlatformFilterCard from './PlatformFilterCard';
import { ComponentMeta, ComponentStory } from '@storybook/react'


export default {
  title: "Components/PlatformFilterCard",
  component: PlatformFilterCard,
} as ComponentMeta<typeof PlatformFilterCard>

const Template: ComponentStory<typeof PlatformFilterCard> = args => <PlatformFilterCard {...args} />

export const Default = Template.bind({})

Default.story = {
  name: 'default',
};
