import * as React from 'react'
import { Meta, StoryObj } from '@storybook/react'
import FilterTabs from './FilterTabs'

const meta: Meta<typeof FilterTabs> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Containers/FilterTabs',
  component: FilterTabs
}

export default meta
type Story = StoryObj<typeof FilterTabs>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Default: Story = {
//  render: () => <FilterTabs />
}
