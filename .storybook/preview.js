import { MockedProvider } from '@apollo/client/testing'
import store from '../src/app/store'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    default: 'purple',
    values: [
      {
        name: 'white',
        value: '#FFFFFF',
      },
      // colors from Falcon dark theme
      {
        name: 'indigo',
        value: '#727cf5'
      },
      {
        name: 'purple',
        value: '#6b5eae',
      },
      {
        name: 'orange',
        value: '#fd7e14'
      },
      {
        name: 'gray',
        value: '#748194',
      },
      {
        name: 'black',
        value: '#000000'
      }
    ]
  },
  apolloClient: {
    MockeProvider: MockedProvider,
    // any props to pass to MockedProvider for every story
  }
}