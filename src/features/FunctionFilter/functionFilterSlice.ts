import _ from 'lodash'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from 'app/store'
import { getFunctionalOpts } from 'services/functionalOptions'
import { FunctionalOpts } from 'typings/sharedTypes'

interface FunctionFilterState {
  value: FunctionalOpts
  checked: string[]
  expanded: string[]
  filterOn: boolean
}

const initialState: FunctionFilterState = {
  value: getFunctionalOpts(),
  filterOn: false,
  checked: [],
  expanded: []
}

export const functionFilterSlice = createSlice({
  name: 'functions',
  initialState,
  reducers: {
    setFilterState: (state, action: PayloadAction<Partial<FunctionFilterState>>) => {
      _.assign(state, action.payload)
    },
    setChecked: (state, action: PayloadAction<string[]>) => {
      state.checked = action.payload
    },
    setExpanded: (state, action: PayloadAction<string[]>) => {
      state.expanded = action.payload
    },
    setEnabled: (state, action: PayloadAction<boolean>) => {
      state.filterOn = action.payload
    }
  }
})

export const { setFilterState, setEnabled, setChecked } = functionFilterSlice.actions
export const selectFilterTabs = (state: RootState) => state.functionFilters
export default functionFilterSlice.reducer
