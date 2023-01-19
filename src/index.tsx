import * as React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './app/store'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import SearchRoot, {
  loader as rootLoader,
  action as rootAction,
} from './routes/SearchRoot'

// Routing is with react-router v6
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  LoaderFunction,
  ActionFunction,
} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'

// Roboto font installed in the project for Material UI
// Material UI's default typography only uses the 300,400,500, and 700 font weights
import '@fontsource/roboto'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route
      path="/"
      element={<SearchRoot />}
      loader={rootLoader}
    >

    </Route>
  ])
)
const root = ReactDOM.createRoot(
  document.getElementById('root')
)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
