/* eslint-disable */
import { ComponentMeta, ComponentStory } from '@storybook/react'
import EsriGlobe from './EsriGlobe'

export default {
  title: "Components/EsriGlobe",
  component: EsriGlobe,
  argTypes: {
    size: {
      options: ['small', 'medium', 'large'],
      control: { type: 'radio'}
    }
  }
} as ComponentMeta<typeof EsriGlobe>

const Template: ComponentStory<typeof EsriGlobe> =(args) => <EsriGlobe {...args} />

export const Default = Template.bind({})
