import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from 'react-bootstrap'

const meta: Meta<typeof Button> =  {
  title: 'RBButton',
  component: Button,
  argTypes: {
    variant: { control: 'text' }
  }
}
export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
render: () => <Button variant="primary">Primary</Button>
}

export const Secondary: Story = {
  render: () => <Button variant="secondary">Secondary</Button>
}

export const Success: Story = {
  render: () => <Button variant="success">Success</Button>
}

export const Warning: Story = {
  render: () => <Button variant="warning">Warning</Button>
}

export const Danger: Story = {
  render: () => <Button variant="danger">Danger</Button>
}

export const Info: Story = {
  render: () => <Button variant="info">Info</Button>
}

export const Light: Story = {
  render: () => <Button variant="light">Light</Button>
}

export const Dark: Story = {
  render: () => <Button variant="dark">Dark</Button>
}

export const Link: Story = {
  render: () => <Button variant="link">Link</Button>
}