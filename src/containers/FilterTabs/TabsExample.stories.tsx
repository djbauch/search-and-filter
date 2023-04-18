import * as React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import TabsExample from './TabsExample'

const meta: Meta<typeof TabsExample> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */ 
  title: 'Containers/TabsExample',
  component: TabsExample
}

export default meta
type Story = StoryObj<typeof TabsExample>

export const Default: Story = {
  render: () => <TabsExample />
}
