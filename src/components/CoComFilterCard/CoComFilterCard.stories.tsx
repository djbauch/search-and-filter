import * as React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import CoComFilterCard from './CoComFilterCard';
import store from '../../app/store'
import { Provider } from 'react-redux'

export default {
  title: "Components/CoComFilterCard",
  component: CoComFilterCard,
  //decorators: [(story) => <Provider store={store}>{story()}</Provider>]
} as ComponentMeta<typeof CoComFilterCard>

const Template: ComponentStory<typeof CoComFilterCard> = (args) => <CoComFilterCard />
export const Default = Template.bind({})
