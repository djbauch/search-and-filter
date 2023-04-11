import { TimezoneOption } from 'typings/sharedTypes'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from 'app/store'
import _ from 'lodash'
/*
Queries for the list of timezone options for the dateRange filter. Returns an
array of JSON objects in the following format:
{
    "id": "unique identifier, e.g. datatype1",
    "value": {"Timezone to be used"},
    "label": "the name of the data type, e.g. Local"
}
*/
export const sampleTimeZones = (): TimezoneOption[] => {
  return [
    {
      id: 'timezone1',
      value: 'UTC',
      label: 'UTC'
    },

    {
      id: 'timezone2',
      value: 'Local',
      label: 'Local'
    }
  ]
}

interface TemporalState {
  timeZoneOptions: TimezoneOption[]
  timeZone: TimezoneOption
  filterOn: boolean
  start: Date
  end: Date
}

const initialState: TemporalState = {
  timeZoneOptions: sampleTimeZones(),
  timeZone: sampleTimeZones[0],
  filterOn: false,
  start: new Date(),
  end: new Date()
}

export const temporalSlice = createSlice({
  name: 'dates',
  initialState,
  reducers: {
    setEnabled: (state, action: PayloadAction<boolean>) => {
      state.filterOn = action.payload
    },
    setStart: (state, action: PayloadAction<Date>) => {
      state.start = action.payload
    },
    setEnd: (state, action: PayloadAction<Date>) => {
      state.end = action.payload
    },
    setTimeZone: (state, action: PayloadAction<string>) => {
      state.timeZone = _.find(state.timeZoneOptions, { value: action.payload }) || state.timeZone
    }
  }
})

export const { setEnabled, setStart, setEnd } = temporalSlice.actions
export const selectTimes = (state: RootState) => state.times
export default temporalSlice.reducer
