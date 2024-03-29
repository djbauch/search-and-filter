/* eslint-disable */
import React from 'react'
import JEMSIAFCardHeader from './JEMSIAFCardHeader'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: "Components/JEMSIAFCardHeader",
  component: JEMSIAFCardHeader
} as ComponentMeta<typeof JEMSIAFCardHeader>

const Template: ComponentStory<typeof JEMSIAFCardHeader> = args => <JEMSIAFCardHeader {...args} />

export const Default = Template.bind({})

Default.story = {
  name: 'default',
}

export const Titled = Template.bind({})
Titled.story = {
  name: 'Titled'
}
Titled.args = {
  title: 'COCOMs'
}

const toggled = (event: React.ChangeEvent<HTMLInputElement>) => {
  toast(`Toggle state is ${event.target.checked? "ON" : "OFF"}`)
}

export const Responsive = Template.bind({})
Responsive.story = {
  name: 'Responsive'
}

Responsive.args = {
  title: 'Flip the toggle',
  onChange: toggled
}
