import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { UISettings } from '../features/UISettings/UISettings'

export default {
  title: 'Example/UISettings',
  component: UISettings,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen'
  }
} as ComponentMeta<typeof UISettings>

const Template: ComponentStory<typeof UISettings> = (args) => <UISettings />

export const Default = Template.bind({})
