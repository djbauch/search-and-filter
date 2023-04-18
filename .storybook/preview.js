import * as React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCheckSquare,
  faSquare,
  faChevronRight,
  faChevronDown,
  faPlusSquare,
  faMinusSquare,
  faFolder,
  faFolderOpen,
  faFile
} from '@fortawesome/free-solid-svg-icons'
import { MockedProvider } from '@apollo/client/testing'
import { Provider } from 'react-redux'
import store from '../src/app/store'
import { ToastContainer} from 'react-toastify'
import esriConfig from '@arcgis/core/config'

import * as bootstrap from 'bootstrap'
import '../bootstrap/dist/css/bootstrap.min.css'
import ThemeProvider from 'react-bootstrap/ThemeProvider'

import '../src/scss/styles.scss'
import '@fontsource/roboto'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import 'react-toastify/dist/ReactToastify.css'

esriConfig.assetsPath = '../src/assets'
library.add( faCheckSquare, faSquare, faChevronRight, faPlusSquare, faChevronDown, faMinusSquare, faFolder, faFolderOpen, faFile)
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  backgrounds: {
    default: 'purple',
    values: [
      {
        name: 'white',
        value: '#FFFFFF'
      },
      // colors from Falcon dark theme
      {
        name: 'indigo',
        value: '#727cf5'
      },
      {
        name: 'purple',
        value: '#6b5eae'
      },
      {
        name: 'orange',
        value: '#fd7e14'
      },
      {
        name: 'gray',
        value: '#748194'
      },
      {
        name: 'black',
        value: '#000000'
      }
    ]
  },
  apolloClient: {
    MockeProvider: MockedProvider
    // any props to pass to MockedProvider for every story
  }
}
export const decorators = [
  (Story) => {
    return (
      <Provider store={store}>
        <ThemeProvider>
        <ToastContainer />
        <Story />
        </ThemeProvider>
      </Provider>
    )
  }
]
