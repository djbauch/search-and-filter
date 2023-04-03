import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import _ from 'lodash'
import type { RootState } from 'app/store'
import type { FrequencyBand, FrequencyBandCollection, FrequencyUnits } from 'typings/sharedTypes'
import { getBandsAvailable } from './FrequencyFilterData'

const availableBands = getBandsAvailable()
export interface FrequencyFilterState {
  value: FrequencyBandCollection[]
  filterId: string
  band: FrequencyBandCollection
  highFreq: number
  lowFreq: number
  units: string
  checked: string[]
  expanded: string[]
  filterOn: boolean
  validRange: boolean
}

const initialState: FrequencyFilterState = {
  value: availableBands,
  filterId: 'freq',
  band: availableBands[0],
  highFreq: 0,
  lowFreq: 0,
  units: 'Hz',
  checked: [],
  expanded: [],
  filterOn: false,
  validRange: false
}

export const frequencyFilterSlice = createSlice({
  name: 'frequencyFilters',
  initialState,
  reducers: {
    setChecked: (state, action: PayloadAction<string[]>) => {
      state.checked = action.payload
    },
    setExpanded: (state, action: PayloadAction<string[]>) => {
      state.expanded = action.payload
    },
    setEnabled: (state, action: PayloadAction<boolean>) => {
      state.filterOn = action.payload
    },
    setFilterOn: (state, action: PayloadAction<boolean>) => {
      state.filterOn = action.payload
    },
    setFilterSwitch: (state, action: PayloadAction<boolean>) => {
      state.filterOn = action.payload
    },
    setFrequencyBand: (state, action: PayloadAction<string>) => {
      state.band = _.find(availableBands, { label: action.payload })
    }
  }
})

export const { setChecked, setExpanded, setEnabled, setFilterOn, setFilterSwitch, setFrequencyBand } = frequencyFilterSlice.actions
export const selectFrequencyFilters = (state: RootState) => state.frequencyFilters
export default frequencyFilterSlice.reducer
