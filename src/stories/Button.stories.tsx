import React from 'react'
import { Meta, StoryObj } from '@storybook/react'

import { Button } from './Button'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Button> = {
  title: 'Example/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' }
  }
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {
    primary: true,
    label: 'Button'
  }
}

export const Secondary: Story = {
  args: {
    label: 'Button',
    className: 'btn btn-secondary'
  }
}

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Button'
  }
}
export const Small: Story = {
  args: {
    size: 'small',
    label: 'Button'
  }
}
