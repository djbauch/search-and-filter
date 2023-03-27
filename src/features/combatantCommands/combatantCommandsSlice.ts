import _ from 'lodash'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { CombatantCommand } from '../../typings/sharedTypes'
import { getCombatantCommands } from './CombatantCommandsData'

interface CombatantCommandState {
  value: CombatantCommand[]
  checked: string[]
  expanded: string[]
}

const initialState: CombatantCommandState = {
  value:getCombatantCommands(),
  checked: ['AFRICOM'],
  expanded: ['CYBERCOM']
}

export const combatantCommandsSlice = createSlice({
  name: 'combatantCommands',
  initialState,
  reducers: {
    addCC: (state, action: PayloadAction<CombatantCommand>) => {
      state.value = [action.payload, ...state.value]
    },
    setChecked: (state, action: PayloadAction<string[]>) => {
      console.log(`setChecked ${JSON.stringify(action.payload)}`)
      state.checked = action.payload
    },
    setExpanded: (state, action: PayloadAction<string[]>) => {
      console.log('setExpanded')
      state.expanded.push(action.payload as any)
    }
  },
})

export const { addCC, setChecked, setExpanded } = combatantCommandsSlice.actions
export const selectCombatantCommands = (state: RootState) => state.combatantCommands.value
export default combatantCommandsSlice.reducer
