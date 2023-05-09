import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from 'app/store'
import { CombatantCommand } from 'typings'
import { getCombatantCommands } from './CombatantCommandsData'

interface CombatantCommandState {
  value: CombatantCommand[]
  checked: string[]
  expanded: string[]
  enabled: boolean
}

const initialState: CombatantCommandState = {
  value:getCombatantCommands(),
  checked: ['AFRICOM'],
  expanded: ['CYBERCOM'],
  enabled: false
}

export const combatantCommandsSlice = createSlice({
  name: 'combatantCommands',
  initialState,
  reducers: {
    addCC: (state, action: PayloadAction<CombatantCommand>) => {
      state.value = [action.payload, ...state.value]
    },
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

export const { addCC, setChecked, setExpanded, setEnabled } = combatantCommandsSlice.actions
export const selectCombatantCommands = (state: RootState) => state.combatantCommands.value
export default combatantCommandsSlice.reducer
