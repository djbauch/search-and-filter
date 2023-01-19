import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import combatantCommandReducer from '../features/combatantCommands/combatantCommandsSlice'

//import chosenFeatureReducer from '../features/GlobeStores/chosenFeatureSlice'
// Reference https://redux.js.org/tutorials/quick-start
const store = configureStore({
  reducer: {
    counter: counterReducer,
    combatantCommands: combatantCommandReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store as described at
// https://redux.js.org/tutorials/typescript-quick-start#project-setup
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export default store
