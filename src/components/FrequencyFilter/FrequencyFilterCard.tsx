import React, { FC, useState } from 'react'
import styles from './FrequencyFilterCard.module.css'
import { Container, Col, Form, FormGroup, Row } from 'react-bootstrap'
//import { Label, Input } from 'react-bootstrap'
import { Card, Form as RBSForm, ToggleButton } from 'react-bootstrap'
import { getFrequencyUnits, getBandsAvailable, FreqNodes } from 'components/FrequencyFilter/frequencyBands'
import CheckboxTree from 'react-checkbox-tree'
import 'react-checkbox-tree/lib/react-checkbox-tree.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare, faCheckSquare, faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FaSquare, FaCheckSquare, FaChevronRight, FaChevronDown } from 'react-icons/fa'
import { FreqFilterType, FreqStateType, FrequencyBand } from './index'
import { AiOutlineWarning } from 'react-icons/ai'
import CardCloseButton from 'components/CardCloseButton/CardCloseButton'
import _ from 'lodash'
import { useAppSelector, useAppDispatch } from 'app/hooks'
import {
  setChecked,
  setExpanded,
  setEnabled,
  FrequencyFilterState,
  setFilterSwitch,
  setBandCollection,
  setUnits,
  setValuesVisible,
  setLowFreq,
  setHighFreq
} from 'components/FrequencyFilter/frequencyFilterSlice'
import JEMSIAFCardHeader from 'components/JEMSIAFCardHeader/JEMSIAFCardHeader'

export const filterId = 'freq'
export const freqEventLowChanged = 'freqEventLowChanged'
export const freqEventHighChanged = 'freqEventHighChanged'
export const freqEventUnitChanged = 'freqEventUnitChanged'
export const freqEventExpandChanged = 'freqEventExpandChanged'
export const freqEventCheckedChanged = 'freqEventCheckedChanged'
export const freqEventChecksCleared = 'freqEventChecksCleared'
export const freqBandSelectionChanged = 'freqBandSelectionChanged'
export const freqEventFilterSwitch = 'freqEventFilterSwitch'

type FilterChangeEvent = {
  filterId: string
  eventType: string
  id?: string
  value: any
}
const freqUnits = getFrequencyUnits()
const bandsAvailable = getBandsAvailable()
let freqArrVal = 0

export const initializeFreqStore = () => {}

/*
A text box that accepts a numerical value.
*/

export type FreqTextProps = {
  name: string
  id: string
  label: string
  value: string
  eventType: string
  // onFilterChange: (e: FilterChangeEvent) => void
  // setValidUserFilter: any //function
  // freqState: FreqStateType
  // validRange: boolean
  // filterOn: boolean
}

export const FreqText = (props: FreqTextProps) => {
  console.log(`ID: ${props.id} label: ${props.label} name: ${props.name}`)
  const freqState = useAppSelector<FrequencyFilterState>((state) => state.frequencies)
  const dispatch = useAppDispatch()
  const onChange = (e: string) => {
    //if the value is in Hz, it should be an integer. Other units can be entered as decimals.
    const newValue = (freqState.units.id === 'Hz' ? parseInt(e) : parseFloat(e))
    if (props.id === 'lowFreq') {
      console.log('Setting low')
      dispatch(setLowFreq(newValue))
    } else {
      console.log('Setting high')
      dispatch(setHighFreq(newValue))
    }
    // props.onFilterChange({
    //   filterId: filterId,
    //   eventType: props.eventType,
    //   id: props.id,
    //   value: newValue()
    // })
    // props.setValidUserFilter(props.validRange)
  }

  let altText = freqState.validRange ? props.name : 'High Frequency must be higher than low frequency'

  let classNames = freqState.validRange ? 'mx-3 frequency-text' : 'mx-3 red-border frequency-text'

  const stepForUnits = () => {
    return freqState.units.id === 'Hz' ? '1' : 'any'
  }

  return (
    <Row>
      <Form.Label className="filter-label my-auto" sm={2}>
        {props.label}:{' '}
      </Form.Label>
      <Col sm={10}>
        <Form.Control
          htmlSize={12}
          className={classNames}
          type="number"
          step={stepForUnits()}
          name={props.name}
          min={0}
          id={props.id}
          onChange={(e) => onChange(`${e.target.value}`)}
          value={props.value}
          alt={altText}
          disabled={!freqState.filterOn}
        />
      </Col>
    </Row>
  )
}

export type FreqDropdownPropsType = {
  id: string
  value: string
}

/*
A dropdown box containing the various frequency units.
*/
const FreqDropdown = (props: FreqDropdownPropsType) => {
  const freqState = useAppSelector<FrequencyFilterState>((state) => state.frequencies)
  const dispatch = useAppDispatch()
  //Get the corresponding freqUnit object based on the dropdown option selected
  const saveConvertedValue = (name: string) => {
    const unit = _.find(freqUnits, (u) => u.label === name) || freqUnits[0]
    dispatch(setUnits(unit))
    // props.onFilterChange({
    //   filterId: filterId,
    //   eventType: freqEventUnitChanged,
    //   id: props.id,
    //   value: unit,
    // })
  }

  ////Convert value to the unit selected in the dropdown
  let options = freqUnits.map((fu) => {
    const isCurrentSelection = fu.id === props.value
    return (
      <option key={fu.id} selected={isCurrentSelection}>
        {fu.label}
      </option>
    )
  })

  return (
    <RBSForm.Select
      className="custom-select-sm enabled bands-dropdown mx-3 w-auto light"
      title="FreqUnits"
      name="freqUnits"
      aria-label="Frequency Units"
      id={freqState.filterId}
      disabled={!freqState.filterOn}
      value={props.value}
      onChange={(e) => saveConvertedValue(`${e.target.value}`)}
    >
      {options}
    </RBSForm.Select>
  )
}

/*
A dropdown box containing the various band types
*/
type BandSelectionDropdownProps = {
  id: string
  value: string
  onFilterChange: (event: FilterChangeEvent) => void
  filterOn: boolean
}

const BandSelectionDropdown = () => {
  const freqState = useAppSelector((state) => state.frequencies)
  const dispatch = useAppDispatch()
  //Get the corresponding freqUnit object based on the dropdown option selected
  const saveConvertedValue = (name: string) => {
    const band = _.find(bandsAvailable, (b) => b.label === name)
    dispatch(setBandCollection(name))
    // props.onFilterChange({
    //   filterId: filterId,
    //   eventType: freqBandSelectionChanged,
    //   id: props.id,
    //   value: freqState.band
    // })
  }

  ////Convert value to the unit selected in the dropdown

  let options = bandsAvailable.map((bandCollection) => {
    const isCurrentSelection = bandCollection.id === freqState.bandCollection
    return (
      <option key={bandCollection.id} selected={isCurrentSelection}>
        {bandCollection.label}
      </option>
    )
  })

  return (
    <RBSForm.Select
      className="custom-select-sm enabled bands-dropdown mx-3 w-auto light"
      title="FreqBandCollection"
      name="freqBandCollection"
      aria-label="Frequency Band Collection"
      id={freqState.filterId}
      disabled={!freqState.filterOn}
      onChange={(e) => saveConvertedValue(`${e.target.value}`)}
    >
      {options}
    </RBSForm.Select>
  )
}

type CheckedItem = {
  value: string
  checked: boolean
}

//Clearing local store of checked items

export const freqCleared = (freqStore: CheckedItem[]) => {
  const newStore = _.clone(freqStore)
  return { newStore }
}

//Updating local store of checked items
export const freqToggled = (checked, freqStore: Array<CheckedItem>) => {
  const newStore: Array<CheckedItem> = []
  // Assumes only one top level checkbox can toggle at a time.
  let itemChanged: CheckedItem | null = null
  for (let freq of freqStore) {
    if (!freq.checked && checked.includes(freq.value)) {
      // freq went from unchecked to checked.
      itemChanged = {
        value: freq.value,
        checked: true
      }
      newStore.push(itemChanged)
    } else if (freq.checked && !checked.includes(freq.value)) {
      // freq went from checked to unchecked.
      itemChanged = {
        value: freq.value,
        checked: false
      }
      newStore.push(itemChanged)
    } else {
      // Send along unchanged.
      newStore.push({
        value: freq.value,
        checked: freq.checked
      })
    }
  }
  return { itemChanged, newStore }
}

export const setInitFreqStore = (fData) => {
  // Store in the state what is needed to set globe focus.
  const fStore: Array<CheckedItem> = []
  //console.log(fData)
  for (const freq of fData) {
    fStore.push({
      value: freq.id,
      checked: false
    })
  }
  return fStore
}

const currentNodes = (units: string, showVals: boolean, activeFilter) => FreqNodes(units, showVals, activeFilter)
//can't return undefined, so assuming GHz

export const retNodes = (units: string, showVals: boolean, activeFilter) => {
  return currentNodes(units, showVals, activeFilter)
}
type BandsProps = {
  label: string
  warningIcon: JSX.Element | null
  validRange: boolean
}
//Filter When "User Defined" is selected
const UserSelectedBands = (props: BandsProps) => {
  const freqState = useAppSelector<FrequencyFilterState>((state) => state.frequencies)
  const dispatch = useAppDispatch()
  let unitsDropdown = (
    <FreqDropdown
      id="units"
      value={freqState.units.id}
      //onFilterChange={() => {}} //{props.onFilterChange}
    />
  )
  return (
    <RBSForm>
      <Row>
        <p className="filter-subtitle ms-3 px-0 w-auto">{props.label}</p>
        {props.warningIcon}
      </Row>
      <Row>
        <Form.Label className="filter-label my-auto" htmlFor="units" sm={2}>
          Units:{' '}
        </Form.Label>
        <Col sm={10}>{unitsDropdown}</Col>
      </Row>
      <FreqText
        name="freq"
        id="lowFreq"
        label="Low"
        eventType={freqEventLowChanged}
        value={'' + freqState.lowFreq}
        //setValidUserFilter={.setValidUserFilter}
      />

      <FreqText
        name="freq"
        id="highFreq"
        label="High"
        eventType={freqEventHighChanged}
        value={'' + freqState.highFreq}
      />
    </RBSForm>
  )
}

const PredefinedBands = (props: BandsProps) => {
  const freqState = useAppSelector<FrequencyFilterState>((state) => state.frequencies)
  const dispatch = useAppDispatch()
  const valuesVisible = freqState.valuesVisible
  const showValue = (
    <Form.Switch
      id="showValues"
      value="showValues"
      onChange={() => dispatch(setValuesVisible(!valuesVisible))}
      checked={valuesVisible}
      className="ms-1 me-2 mb-2"
      disabled={!freqState.filterOn}
      label="Show Values"
    />
  )

  const checkChanged = (checked: string[]) => {
    dispatch(setChecked(checked))
  }
  const expandChanged = (expanded: string[]) => {
    dispatch(setExpanded(expanded))
  }
  const clearPreDefined = () => {
    dispatch(setChecked([]))
   // let { newStore } = freqCleared(freqStore)
   // setFreqStore(newStore)
    // props.onFilterChange({
    //   filterId: filterId,
    //   eventType: freqEventChecksCleared,
    //   value: []
    // })
  }

  return (
    <Form>
      <Row>
        <p className="filter-subtitle ms-3">{props.label}</p>
      </Row>
      <Row>{showValue}</Row>
      <Row>
        <button
          type="button"
          className="btn btn-sm btn-secondary filter-clear-button font-weight-light mt-0 ms-3 w-auto"
          onClick={() => clearPreDefined()}
          disabled={!freqState.filterOn}
        >
          Clear
        </button>
      </Row>
      <Row className="">
        <CheckboxTree
          nodes={retNodes(freqUnits[freqArrVal].label, valuesVisible, freqState.bandCollection)}
          checked={freqState.checked}
          expanded={freqState.expanded}
          onCheck={checkChanged}
          onExpand={expandChanged}
          checkModel="all"
          //iconsClass="fa5"
          nativeCheckboxes={true}
          optimisticToggle={false}
          disabled={!freqState.filterOn}
          icons={{
            check: <FontAwesomeIcon className="rct-icon rct-icon-check" icon="check-square" />,
            uncheck: <FontAwesomeIcon className="rct-icon rct-icon-uncheck" icon={['fas', 'square']} />,
            halfCheck: <FontAwesomeIcon className="rct-icon rct-icon-half-check" icon="check-square" />,
            expandClose: <FontAwesomeIcon className="rct-icon rct-icon-expand-close" icon="chevron-right" />,
            expandOpen: <FontAwesomeIcon className="rct-icon rct-icon-expand-open" icon="chevron-down" />,
            expandAll: <FontAwesomeIcon className="rct-icon rct-icon-expand-all" icon="plus-square" />,
            collapseAll: <FontAwesomeIcon className="rct-icon rct-icon-collapse-all" icon="minus-square" />,

            parentOpen: null,
            parentClose: null,
            leaf: null
          }}
        />
      </Row>
      <Row></Row>
    </Form>
  )
}

type FrequencyFilterCardProps = {
  onFilterChange?: (e: FilterChangeEvent) => void
  onDashboardChange?: any
  freqState?: FreqStateType
  closeTab?: any
  isTab?: any
}

const FrequencyFilterCard: FC<FrequencyFilterCardProps> = (props: FrequencyFilterCardProps) => {
  const freqState = useAppSelector((state) => state.frequencies)
  const enabled = freqState.filterOn
  const dispatch = useAppDispatch()
  //State
  const [validUserFilter, setValidUserFilter] = useState(freqState.highFreq >= freqState.lowFreq)

  let bandsDropdown = (
    <BandSelectionDropdown
    // id="bands"
    // value={freqState.activeFilter.label}
    // onFilterChange={props.onFilterChange}
    // filterOn={freqState.filterOn}
    />
  )

  const validRange = freqState.highFreq >= freqState.lowFreq
  const warningIcon = !validRange ? (
    <AiOutlineWarning className="filter-alert px-0 w-auto" title="High frequency must meet or exceed low frequency" />
  ) : null

   const bandOptionReducer = (activeFilter: string) => {
    const bandOptionArgs: BandsProps = {
      label: activeFilter,
      warningIcon,
      validRange,
    }
    return activeFilter === 'User Defined' ? UserSelectedBands(bandOptionArgs) : PredefinedBands(bandOptionArgs)
  }

  const handleFilterSwitch = (filterOn) => {
    // props.onFilterChange({
    //   filterId: filterId,
    //   eventType: freqEventFilterSwitch,
    //   value: filterOn
    // })
  }

  const filterToggled = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEnabled(event.target.checked))
  }

  return (
    <Card border="primary" className={styles.FrequencyFilterCard} data-testid="FrequencyFilterCard">
      <JEMSIAFCardHeader title="Frequency" enabled={enabled} onChange={filterToggled}/>
      <Card.Body>
      <hr className="filter-title-underline" />
      <Form>
        <Row>
          <Form.Label className="filter-label my-auto" htmlFor="bands" sm={2}>
            Bands:{' '}
          </Form.Label>
          <Col sm={10}><BandSelectionDropdown/></Col>
        </Row>

      {bandOptionReducer(freqState.bandCollection)}
      </Form>
      </Card.Body>
    </Card>
  )
}

export default FrequencyFilterCard
