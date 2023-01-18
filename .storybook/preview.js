import { MockedProvider } from '@apollo/client/testing'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  apolloClient: {
    MockeProvider: MockedProvider,
    // any props to pass to MockedProvider for every story
  }
}