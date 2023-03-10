import { configureStore } from '@reduxjs/toolkit'
import { enhancer as storybookEnhancer } from '@dreamworld/addon-redux'
import counterReducer from '../features/counter/counterSlice'
import combatantCommandReducer from '../features/combatantCommands/combatantCommandsSlice'
import uiSettingsReducer from '../features/UISettings/uiSettingsSlice'
//import chosenFeatureReducer from '../features/GlobeStores/chosenFeatureSlice'
// Reference https://redux.js.org/tutorials/quick-start
const store = configureStore({
  reducer: {
    counter: counterReducer,
    combatantCommands: combatantCommandReducer,
    uiSettings: uiSettingsReducer,

    // chosenFeature: chosenFeatureReducer
  },
  enhancers: [storybookEnhancer],
})

// Infer the `RootState` and `AppDispatch` types from the store as described at
// https://redux.js.org/tutorials/typescript-quick-start#project-setup
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export default store
