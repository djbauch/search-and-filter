import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { PlatformType } from '../../typings/sharedTypes'
import { samplePlatformTypes } from './platformFilterData'

interface PlatformState {
  value: PlatformType[]
  checked: string[]
  expanded: string[]
  platFilterOn: boolean
}

const initialState: PlatformState = {
  value: samplePlatformTypes(),
  checked: [],
  expanded: [],
  platFilterOn: false
}

export const platformsSlice = createSlice({
  name: 'platforms',
  initialState,
  reducers: {
    setChecked: (state, action: PayloadAction<string[]>) => {
      state.checked = action.payload
    },
    setExpanded: (state, action: PayloadAction<string[]>) => {
      state.expanded = action.payload
    },
    setEnabled: (state, action: PayloadAction<boolean>) => {
      state.platFilterOn = action.payload
    }
  },
})

export const { setChecked, setExpanded, setEnabled } = platformsSlice.actions
export const selectPlatforms = (state: RootState) => state.platforms.value
export default platformsSlice.reducer
