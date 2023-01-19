import _ from 'lodash'
import { FrequencyBandCollection, FrequencyUnits } from "../../typings/sharedTypes"

/*
Returns an array of JSON objects in the following format:

{
    "name": "unit abbreviate, e.g. MHz",
    "value": "multiplier based on conversion of the unit into Hz. 1e3 for kHz, 1e6 for MHz, etc."
    "label" "unit name"
}
*/
export const getFrequencyUnits = (): Array<FrequencyUnits> => {
  return [
    {
      id: 'Hz',
      value: 1,
      label: 'Hz',
    },
    {
      id: 'kHz',
      value: 1e3,
      label: 'kHz',
    },
    {
      id: 'MHz',
      value: 1e6,
      label: 'MHz',
    },
    {
      id: 'GHz',
      value: 1e9,
      label: 'GHz',
    },
    {
      id: 'THz',
      value: 1e12,
      label: 'THz',
    },
  ]
}

export const getBandsAvailable = (): Array<FrequencyBandCollection> => {
  return [
    {
      id: 'User Defined',
      label: 'User Defined',
      children: [
        {
          id: 'User_Defined_Band',
          band: { low: 0, high: 0 },
          label: 'User Defined',
          units: 'none',
        },
      ],
    },
    {
      id: 'IEEE',
      label: 'IEEE',
      children: [
        {
          id: 'freqband1_IEEE',
          band: { low: 3000000, high: 30000000 },
          label: 'HF',
          units: '3 MHz \u2014  30 MHz',
        },
        {
          id: 'freqband2_IEEE',
          band: { low: 30000000, high: 300000000 },
          label: 'VHF',
          units: '30 MHz \u2014 300 MHz',
        },
        {
          id: 'freqband3_IEEE',
          band: { low: 300000000, high: 1000000000 },
          label: 'UHF',
          units: '300 MHz \u2014 1 GHz',
        },
        {
          id: 'freqband4_IEEE',
          band: { low: 1000000000, high: 2000000000 },
          label: 'L',
          units: '1 GHz \u2014 2 GHz',
        },
        {
          id: 'freqband5_IEEE',
          band: { low: 2000000000, high: 4000000000 },
          label: 'S',
          units: '2 GHz \u2014 4 GHz',
        },
        {
          id: 'freqband6_IEEE',
          band: { low: 4000000000, high: 8000000000 },
          label: 'C',
          units: '4 GHz \u2014 8 GHz',
        },
        {
          id: 'freqband7_IEEE',
          band: { low: 8000000000, high: 12400000000 },
          label: 'X',
          units: '8 GHz \u2014 12.4 GHz',
        },
        {
          id: 'freqband8_IEEE',
          band: { low: 12400000000, high: 18000000000 },
          label: 'Ku',
          units: '12.4 GHz \u2014 18 GHz',
        },
        {
          id: 'freqband9_IEEE',
          band: { low: 18000000000, high: 26500000000 },
          label: 'K',
          units: ' 18 GHz \u2014 26.5 GHz',
        },
        {
          id: 'freqband10_IEEE',
          band: { low: 26500000000, high: 40000000000 },
          label: 'Ka',
        },
        {
          id: 'freqband11_IEEE',
          band: { low: 33000000000, high: 50000000000 },
          label: 'Q',
        },
        {
          id: 'freqband12_IEEE',
          band: { low: 50000000000, high: 75000000000 },
          label: 'V',
        },
        {
          id: 'freqband13_IEEE',
          band: { low: 75000000000, high: 110000000000 },
          label: 'W',
        },
      ],
    },
    {
      id: 'DOD',
      label: 'DOD',
      children: [
        {
          id: 'freqband1_DoD',
          band: { low: 0, high: 250000000 },
          label: 'A',
        },
        {
          id: 'freqband2_DoD',
          band: { low: 250000000, high: 500000000 },
          label: 'B',
        },
        {
          id: 'freqband3_DoD',
          band: { low: 500000000, high: 1000000000 },
          label: 'C',
        },
        {
          id: 'freqband4_DoD',
          band: { low: 1000000000, high: 2000000000 },
          label: 'D',
        },
        {
          id: 'freqband5_DoD',
          band: { low: 2000000000, high: 3000000000 },
          label: 'E',
        },
        {
          id: 'freqband6_DoD',
          band: { low: 3000000000, high: 4000000000 },
          label: 'F',
        },
        {
          id: 'freqband7_DoD',
          band: { low: 4000000000, high: 6000000000 },
          label: 'G',
        },
        {
          id: 'freqband8_DoD',
          band: { low: 6000000000, high: 8000000000 },
          label: 'H',
        },
        {
          id: 'freqband9_DoD',
          band: { low: 8000000000, high: 10000000000 },
          label: 'I',
        },
        {
          id: 'freqband10_DoD',
          band: { low: 10000000000, high: 20000000000 },
          label: 'J',
        },
        {
          id: 'freqband11_DoD',
          band: { low: 20000000000, high: 40000000000 },
          label: 'K',
        },
        {
          id: 'freqband12_DoD',
          band: { low: 40000000000, high: 60000000000 },
          label: 'L',
        },
        {
          id: 'freqband13_DoD',
          band: { low: 60000000000, high: 100000000000 },
          label: 'M',
        },
      ],
    },
    {
      id: 'ITU',
      label: 'ITU',
      children: [
        {
          id: 'freqband1_ITU',
          band: { low: 3000000, high: 30000000 },
          label: 'HF',
        },
        {
          id: 'freqband2_ITU',
          band: { low: 30000000, high: 300000000 },
          label: 'VHF',
        },
        {
          id: 'freqband3_ITU',
          band: { low: 300000000, high: 3000000000 },
          label: 'UHF',
        },
        {
          id: 'freqband4_ITU',
          band: { low: 3000000000, high: 30000000000 },
          label: 'SHF',
        },
        {
          id: 'freqband5_ITU',
          band: { low: 30000000000, high: 300000000000 },
          label: 'EHF',
        },
      ],
    },
  ]
}

//Adjusting units received as Hz to user-selected display units
export const getUnitsDivisor = (units: string) => {
  switch (units) {
    case 'Hz':
      return 1
    case 'kHz':
      return 1000
    case 'MHz':
      return 1000000
    case 'GHz':
      return 1000000000
    case 'THz':
      return 1000000000000
    default:
      return 1
  }
}

const addSpace = (check: number) => {
  let numdigits = check.toString().length
  if (numdigits === 4) {
    return check
  } else if (numdigits === 3) {
    return '\u00A0' + check
  } else if (numdigits === 2) {
    return '\u00A0\u00A0' + check
  } else {
    return '\u00A0\u00A0\u00A0' + check
  }
}

export const convertUnit = (value: number) => {
  let units = ''
  if (value >= 1000000000000) {
    units = 'THz'
  } else if (value >= 1000000000) {
    units = 'GHz'
  } else if (value >= 1000000) {
    units = 'MHz'
  } else if (value >= 1000) {
    units = 'kHz'
  } else {
    units = 'Hz\u00A0'
  }
  return addSpace(value / getUnitsDivisor(units)) + ' ' + units
}
//Converting node units for labels
export const nodeConversion = (band: { low: number; high: number }) => {
  let convertedLow = convertUnit(band.low)
  let convertedHigh = convertUnit(band.high)

  return '\x20' + convertedLow + ' \u2014 ' + convertedHigh
}

//Selecting children for checkboxes based upon currently selected band options

//////////////////////////////////////////////
//CheckboxTree mandates that all elements must have a unique value, so use the id as the value, which is
//guaranteed to be unique
const getFreqBandFields = (units: string, showValues: boolean, activeFilter) => {
  const matchingBand = _.find(getBandsAvailable(), (element) => element.id === activeFilter.id)
  if (matchingBand) {
    const activeNodes = matchingBand.children

    return activeNodes.map((node) => {
      //converting units for labels
      let labelSpacer = (label) => {
        if (label.length === 1) {
          return ':\u00A0\u00A0'
        } else if (label.length === 2) {
          return ':\u00A0'
        } else {
          return ': '
        }
      }

      let explanation = node.label + labelSpacer(node.label) + nodeConversion(node.band)
      return {
        value: node.id,
        band: { low: node.band.low, high: node.band.high },
        label: showValues ? explanation : node.label,
        className: 'freq-filter-node',
      }
    })
  }
}

export const FreqNodes = (units: string, showValues: boolean, activeFilter) => {
  return getFreqBandFields(units, showValues, activeFilter)
}