import * as React from 'react'
import CoComFilterCard from './CoComFilterCard';
import store from '../../app/store'
import { Provider } from 'react-redux'

export default {
  title: "CoComFilterCard",
  component: CoComFilterCard,
  decorators: [(story) => <Provider store={store}>{story()}</Provider>]
}

export const Default = () => <CoComFilterCard />;

Default.story = {
  name: 'default',
};
