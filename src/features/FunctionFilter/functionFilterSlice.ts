import _ from 'lodash'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

interface FunctionFilterState {

}

const initialState: FunctionFilterState = {
}

export const functionFilterSlice = createSlice({
  name: 'functionFilters',
  initialState,
  reducers: {
    setFilterState: (state, action: PayloadAction<Partial<FunctionFilterState>>) => {
      _.assign(state, action.payload)
    }
  }
})

export const { setFilterState } = functionFilterSlice.actions
export const selectFilterTabs = (state: RootState) => state.functionFilters
export default functionFilterSlice.reducer
