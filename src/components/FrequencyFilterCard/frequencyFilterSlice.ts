import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from 'app/store'
import type { FrequencyBandCollection, FrequencyUnits } from 'typings/sharedTypes'
import {getBandsAvailable  } from './FrequencyFilterData'

interface FrequencyFilterState {
  value: FrequencyBandCollection[]
  checked: string[]
  expanded: string[]
  enabled: boolean
}

const initialState: FrequencyFilterState = {
  value:getBandsAvailable(),
  checked: ['AFRICOM'],
  expanded: ['CYBERCOM'],
  enabled: false
}

export const combatantCommandsSlice = createSlice({
  name: 'combatantCommands',
  initialState,
  reducers: {
    setChecked: (state, action: PayloadAction<string[]>) => {
      state.checked = action.payload
    },
    setExpanded: (state, action: PayloadAction<string[]>) => {
      state.expanded = action.payload
    },
    setEnabled: (state, action: PayloadAction<boolean>) => {
      state.enabled = action.payload
    }
  },
})

export const { setChecked, setExpanded, setEnabled } = combatantCommandsSlice.actions
export const selectCombatantCommands = (state: RootState) => state.combatantCommands.value
export default combatantCommandsSlice.reducer
