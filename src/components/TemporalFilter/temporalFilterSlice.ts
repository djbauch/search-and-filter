import { TimezoneOption } from 'typings/sharedTypes'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
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
    value: TimezoneOption
    filterOn: boolean
}

const initialState: TemporalState = {
    value: sampleTimeZones[0],
    filterOn: false
}
export const temporalSlice = createSlice({
  name: 'times',
  initialState,
  reducers: {
    setEnabled: (state, action: PayloadAction<boolean>) => {
      state.filterOn = action.payload
    }
  }
})

export const { setEnabled } = temporalSlice.actions
export const selectTimes = (state: RootState) => state.times
export default temporalSlice.reducer
