export type FreqFilterType = {
  id: string
  label: string
  children: [
    {
      id: string
      band: { low: number; high: number }
      label: string
      units: string
    }
  ]
}

export type FreqStateType = {
  lowFreq: number
  highFreq: number
  units: string
  checked: Array<any>
  expanded: Array<string>
  activeFilter: FreqFilterType
  filterOn: (e: { filterId: string; eventType: string; value: any }) => void
}

export type FrequencyRange = {
  low: number
  high: number
}

export type FrequencyBand = {
  id: string
  band: FrequencyRange
  label: string
  units?: string
}

export type FrequencyBandCollection = {
  id: string
  label: string
  children: FrequencyBand[]
}

export type FrequencyUnits = {
  id: string
  value: number
  label: string
}

export type FrequencyField = {
  value: string
  band: FrequencyRange
  label: string
  className: string
}

export type FrequencyNode = {
  value: string
  label: string
  children: FrequencyField[]
}

export type FrequencyNodes = FrequencyField[]
