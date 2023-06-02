import _ from 'lodash'
import { Node as CheckBoxNode} from 'react-checkbox-tree'
import type { FrequencyBandCollection, FrequencyUnits } from './index'
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
      label: 'Hz'
    },
    {
      id: 'kHz',
      value: 1e3,
      label: 'kHz'
    },
    {
      id: 'MHz',
      value: 1e6,
      label: 'MHz'
    },
    {
      id: 'GHz',
      value: 1e9,
      label: 'GHz'
    },
    {
      id: 'THz',
      value: 1e12,
      label: 'THz'
    }
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
          units: 'none'
        }
      ]
    },
    {
      id: 'IEEE',
      label: 'IEEE',
      children: [
        {
          id: 'IEEE_HF',
          band: { low: 3E6, high: 3E7 },
          label: 'HF',
          units: '3 MHz \u2014  30 MHz'
        },
        {
          id: 'IEEE_VHF',
          band: { low: 3E7, high: 3E8 },
          label: 'VHF',
          units: '30 MHz \u2014 300 MHz'
        },
        {
          id: 'IEEE_UHF',
          band: { low: 3E8, high: 1E9 },
          label: 'UHF',
          units: '300 MHz \u2014 1 GHz'
        },
        {
          id: 'IEEE_L',
          band: { low: 1E9, high: 2E9 },
          label: 'L',
          units: '1 GHz \u2014 2 GHz'
        },
        {
          id: 'IEEE_S',
          band: { low: 2E9, high: 4E9 },
          label: 'S',
          units: '2 GHz \u2014 4 GHz'
        },
        {
          id: 'IEEE_C',
          band: { low: 4E9, high: 8E9 },
          label: 'C',
          units: '4 GHz \u2014 8 GHz'
        },
        {
          id: 'IEEE_X',
          band: { low: 8E9, high: 124E8 },
          label: 'X',
          units: '8 GHz \u2014 12.4 GHz'
        },
        {
          id: 'IEEE_Ku',
          band: { low: 124E8, high: 18E9 },
          label: 'Ku',
          units: '12.4 GHz \u2014 18 GHz'
        },
        {
          id: 'IEEE_K',
          band: { low: 18E9, high: 265E8 },
          label: 'K',
          units: ' 18 GHz \u2014 26.5 GHz'
        },
        {
          id: 'IEEE_Ka',
          band: { low: 265E8, high: 4E10 },
          label: 'Ka'
        },
        {
          id: 'IEEE_Q',
          band: { low: 33E9, high: 5E10 },
          label: 'Q'
        },
        {
          id: 'IEEE_V',
          band: { low: 5E10, high: 75E9 },
          label: 'V'
        },
        {
          id: 'IEEE_W',
          band: { low: 75E9, high: 11E10 },
          label: 'W'
        }
      ]
    },
    {
      id: 'DOD',
      label: 'DOD',
      children: [
        {
          id: 'DoD_A',
          band: { low: 0, high: 250E6 },
          label: 'A'
        },
        {
          id: 'DoD_B',
          band: { low: 250E6, high: 500E6 },
          label: 'B'
        },
        {
          id: 'DoD_C',
          band: { low: 500E6, high: 1E9 },
          label: 'C'
        },
        {
          id: 'DoD_D',
          band: { low: 1E9, high: 2E9 },
          label: 'D'
        },
        {
          id: 'DoD_E',
          band: { low: 2E9, high: 3E9 },
          label: 'E'
        },
        {
          id: 'DoD_F',
          band: { low: 3E9, high: 4E9 },
          label: 'F'
        },
        {
          id: 'DoD_G',
          band: { low: 4E9, high: 6E9 },
          label: 'G'
        },
        {
          id: 'DoD_H',
          band: { low: 6E9, high: 8E9 },
          label: 'H'
        },
        {
          id: 'DoD_I',
          band: { low: 8E9, high: 10E9 },
          label: 'I'
        },
        {
          id: 'DoD_J',
          band: { low: 10E9, high: 20E9 },
          label: 'J'
        },
        {
          id: 'DoD_K',
          band: { low: 20E9, high: 40E9 },
          label: 'K'
        },
        {
          id: 'DoD_L',
          band: { low: 40E9, high: 60E9 },
          label: 'L'
        },
        {
          id: 'freqband13_DoD',
          band: { low: 60E9, high: 100E9 },
          label: 'M'
        }
      ]
    },
    {
      id: 'ITU',
      label: 'ITU',
      children: [
        {
          id: 'ITU_HF',
          band: { low: 3E6, high: 30E6 },
          label: 'HF'
        },
        {
          id: 'ITU_VHF',
          band: { low: 30E6, high: 300E6 },
          label: 'VHF'
        },
        {
          id: 'ITU_UHF',
          band: { low: 300E6, high: 3E9 },
          label: 'UHF'
        },
        {
          id: 'ITU_SHF',
          band: { low: 3E9, high: 30E9 },
          label: 'SHF'
        },
        {
          id: 'ITU_EHF',
          band: { low: 30E9, high: 300E9 },
          label: 'EHF'
        }
      ]
    }
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
  let len = check.toString().length
  if (len === 4) {
    return check
  } else if (len === 3) {
    return '\u00A0' + check
  } else if (len === 2) {
    return '\u00A0\u00A0' + check
  } else {
    return '\u00A0\u00A0\u00A0' + check
  }
}

export const convertUnit = (value: number) => {
  let units = ''
  if (value >= 1E12) {
    units = 'THz'
  } else if (value >= 1E9) {
    units = 'GHz'
  } else if (value >= 1E6) {
    units = 'MHz'
  } else if (value >= 1E3) {
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
const getFreqBandFields = (units: string, showValues: boolean, activeFilter: string) => {
  let matchingBand = activeFilter
    ? _.find(getBandsAvailable(), (element) => element.id === activeFilter)
    : getBandsAvailable()[0]
  if (matchingBand) {
    const activeNodes = matchingBand.children

    return activeNodes.map((node) => {
      //converting units for labels
      const labelSpacer = (label: string) => {
        if (label.length === 1) {
          return ':\u00A0\u00A0'
        } else if (label.length === 2) {
          return ':\u00A0'
        } else {
          return ': '
        }
      }

      const explanation = node.label + labelSpacer(node.label) + nodeConversion(node.band)
      return {
        value: node.id,
        band: { low: node.band.low, high: node.band.high },
        label: showValues ? explanation : node.label,
        className: 'freq-filter-node'
      } as CheckBoxNode
    })
  } else {
    return []
  }
}

export const FreqNodes = (units: string, showValues: boolean, activeFilter: string) => {
  return getFreqBandFields(units, showValues, activeFilter)
}