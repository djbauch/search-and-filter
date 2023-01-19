import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { CombatantCommand } from '../../typings/sharedTypes'

interface CombatantCommandState {
  value: any[]
}

const initialState: CombatantCommandState = {
  value: [],
}

export const combatantCommandsSlice = createSlice({
  name: 'combatantCommands',
  initialState,
  reducers: {
    addCC: (state, action: PayloadAction<CombatantCommand>) => {
      state.value = [action.payload, ...state.value]
    },
  },
})

export const { addCC } = combatantCommandsSlice.actions
export const selectCombatantCommands = (state: RootState) => state.combatantCommands.value
export default combatantCommandsSlice.reducer
