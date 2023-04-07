import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import _ from 'lodash'
import type { RootState } from 'app/store'
import type { FreqFilterType, FrequencyBand, FrequencyBandCollection, FrequencyUnits } from 'typings/sharedTypes'
import { getBandsAvailable, getFrequencyUnits } from './FrequencyFilterData'

const availableBands = getBandsAvailable()
const frequencyUnits = getFrequencyUnits()
export interface FrequencyFilterState {
  value: FrequencyBandCollection[]
  filterId: string
  bandCollection: string
  band: string
  highFreq: number
  lowFreq: number
  units: FrequencyUnits
  checked: string[]
  expanded: string[]
  filterOn: boolean
  validRange: boolean
  activeFilter: string //{id: string, value: string}
  valuesVisible: boolean
}

const initialState: FrequencyFilterState = {
  value: availableBands,
  filterId: 'freq',
  bandCollection: availableBands[0].id,
  band: availableBands[0].label,
  highFreq: 0,
  lowFreq: 0,
  units: frequencyUnits[0],
  checked: [],
  expanded: [],
  filterOn: false,
  validRange: false,
  activeFilter: availableBands[0].id,
  valuesVisible: true
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
    setBandCollection: (state, action: PayloadAction<string>) => {
      state.bandCollection = action.payload
    },
    setFrequencyBand: (state, action: PayloadAction<string>) => {
      state.band = action.payload //_.find(availableBands, { label: action.payload }).label || ''
    },
    setUnits: (state, action: PayloadAction<FrequencyUnits>) => {
      state.units = action.payload
    },
    setValuesVisible: (state, action: PayloadAction<boolean>) => {
      state.valuesVisible = action.payload
    },
    setLowFreq: (state, action: PayloadAction<number>) => {
      state.lowFreq = action.payload
    },
    setHighFreq: (state, action: PayloadAction<number>) => {
      state.highFreq = action.payload
    }
  }
})

export const {
  setBandCollection,
  setUnits,
  setChecked,
  setExpanded,
  setEnabled,
  setFilterOn,
  setFilterSwitch,
  setFrequencyBand,
  setValuesVisible,
  setLowFreq,
  setHighFreq
} = frequencyFilterSlice.actions
export const selectFrequencyFilters = (state: RootState) => state.frequencyFilters
export default frequencyFilterSlice.reducer
