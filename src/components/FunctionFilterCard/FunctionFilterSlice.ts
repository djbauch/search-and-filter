import _ from 'lodash'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

interface FunctionFilterState {
  filterId: string
  activeKey: number
  x: number
  y: number
  width: number
  height: number
  vertical: boolean
  verticalOld?: boolean
  bounds?: string
}

const initialState: FunctionFilterState = {
  filterId: '',
  activeKey: -2,
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  vertical: true
}

export const functionFilterSlice = createSlice({
  name: 'functionFilters',
  initialState,
  reducers: {
    setFilterId: (state, action: PayloadAction<string>) => {
      state.filterId = action.payload
    },
    setActiveKey: (state, action: PayloadAction<number>) => {
      state.activeKey = action.payload
    },
    setX: (state, action: PayloadAction<number>) => {
      state.x = action.payload
    },
    setFilterState: (state, action: PayloadAction<Partial<FunctionFilterState>>) => {
      _.assign(state, action.payload)
    }
  }
})

export const { setFilterId, setActiveKey, setX, setFilterState } = functionFilterSlice.actions
export const selectFilterTabs = (state: RootState) => state.functionFilters
export default functionFilterSlice.reducer
