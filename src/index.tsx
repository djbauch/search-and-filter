/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from 'app/store'
import 'index.css'
import App from './App'
import reportWebVitals from 'reportWebVitals'
import SearchRoot, { loader as rootLoader, action as rootAction } from 'routes/SearchRoot'
import esriConfig from '@arcgis/core/config'
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

// Routing is with react-router v6
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  LoaderFunction,
  ActionFunction
} from 'react-router-dom'

import './bootstrap.css'

// Roboto font installed in the project for Material UI
// Material UI's default typography only uses the 300,400,500, and 700 font weights
import '@fontsource/roboto'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import ErrorPage from 'ErrorPage'
import UISettings from 'features/UISettings/UISettings'
import { CoComFilterCard } from 'components'
import { DoubleCoComs, loader as repLoader } from 'components/CoComFilterCard/DoubleCoComs'
import FilterTabs from 'containers/FilterTabs/FilterTabs'
esriConfig.assetsPath = './assets'
library.add( faCheckSquare, faSquare, faChevronRight, faPlusSquare, faChevronDown, faMinusSquare, faFolder, faFolderOpen, faFile)

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route key="SearchRoot" path="/" element={<SearchRoot />} loader={rootLoader} errorElement={<ErrorPage />}>
      <Route key="UISettings" path="uisettings" element={<UISettings />} />
      <Route key="CoComFilterCard" path="cocoms" element={<CoComFilterCard />}/>
      <Route key="DoubleCoComs" path="doublecocoms/:reps" element={<DoubleCoComs />} loader={repLoader}/>
      <Route key="FilterTabs" path="filtertabs" element={<FilterTabs />} />
    </Route>
  ])
)
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
