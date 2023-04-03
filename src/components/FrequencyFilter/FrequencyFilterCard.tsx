import React, { FC, useState } from 'react'
import styles from './FrequencyFilterCard.module.css'
import { Container, UncontrolledTooltip, Col, Form, FormGroup, Label, Input, Row } from 'reactstrap'
import { Form as RBSForm } from 'react-bootstrap'
import { getFrequencyUnits, getBandsAvailable, FreqNodes } from 'services/frequencyBands'
import CheckboxTree from 'react-checkbox-tree'
import 'react-checkbox-tree/lib/react-checkbox-tree.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare, faCheckSquare, faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FaSquare, FaCheckSquare, FaChevronRight, FaChevronDown } from 'react-icons/fa'
import { FreqFilterType, FreqStateType, FrequencyBand } from 'typings/sharedTypes'
import { AiOutlineWarning } from 'react-icons/ai'
import { MDBSwitch } from 'mdb-react-ui-kit'
import CardCloseButton from 'components/CardCloseButton/CardCloseButton'
import _ from 'lodash'
import { useAppSelector, useAppDispatch } from 'app/hooks'
import {
  setChecked,
  setExpanded,
  setEnabled,
  FrequencyFilterState,
  setFilterSwitch
} from 'components/FrequencyFilter/frequencyFilterSlice'

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
  const freqState = useAppSelector<FrequencyFilterState>((state) => state.frequencyFilters)
  const onChange = (e: string) => {
    //if the value is in Hz, it should be an integer. Other units can be entered as decimals.
    const newValue = () => (freqState.units === 'Hz' ? parseInt(e) : parseFloat(e))

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
    return freqState.units === 'Hz' ? '1' : 'any'
  }

  return (
    <Row>
      <Label className="filter-label my-auto" sm={2}>
        {props.label}:{' '}
      </Label>
      <Col sm={10}>
        <Input
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
  const freqState = useAppSelector<FrequencyFilterState>((state) => state.frequencyFilters)
  //Get the corresponding freqUnit object based on the dropdown option selected
  const saveConvertedValue = (name: string) => {
    const unit = _.find(freqUnits, (u) => u.label === name) || freqUnits[0]

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
      title="Freq"
      name="freq"
      id={freqState.filterId}
      disabled={!freqState.filterOn}
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
  const freqState = useAppSelector((state) => state.frequencyFilters)
  //Get the corresponding freqUnit object based on the dropdown option selected
  const saveConvertedValue = (name: string) => {
    const band = _.find(bandsAvailable, (b) => b.label === name)

    // props.onFilterChange({
    //   filterId: filterId,
    //   eventType: freqBandSelectionChanged,
    //   id: props.id,
    //   value: freqState.band
    // })
  }

  ////Convert value to the unit selected in the dropdown

  let options = bandsAvailable.map((band) => {
    const isCurrentSelection = band.id === freqState.band.id
    return (
      <option key={band.id} selected={isCurrentSelection}>
        {band.label}
      </option>
    )
  })

  return (
    <RBSForm.Select
      className="custom-select-sm enabled bands-dropdown mx-3 w-auto light"
      title="Freq"
      name="freq"
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
  const freqState = useAppSelector<FrequencyFilterState>((state) => state.frequencyFilters)
  let unitsDropdown = (
    <FreqDropdown
      id="units"
      value={freqState.units}
      //onFilterChange={() => {}} //{props.onFilterChange}
    />
  )
  return (
    <Form>
      <Row>
        <p className="filter-subtitle ms-3 px-0 w-auto">{props.label}</p>
        {props.warningIcon}
      </Row>
      <Row>
        <Label className="filter-label my-auto" for="units" sm={2}>
          Units:{' '}
        </Label>
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
    </Form>
  )
}

const PredefinedBands = (props: BandsProps) => {
  const freqState = useAppSelector<FrequencyFilterState>((state) => state.frequencyFilters)
  const [valuesVisible, setValuesVisible] = useState(true)

  const showValue = (
    <MDBSwitch
      id="enableTooltips"
      label={'Show Values'}
      onChange={() => setValuesVisible(!valuesVisible)}
      checked={valuesVisible}
      className="ms-1 me-2 mb-2"
      disabled={!freqState.filterOn}
    />
  )

  const [freqStore, setFreqStore] = useState(setInitFreqStore(retNodes('', true, freqState?.activeFilter)))
  const onExpand = (expanded) => {
    // props.onFilterChange({
    //   filterId: filterId,
    //   eventType: freqEventExpandChanged,
    //   value: expanded
    // })
  }

  const onCheck = (checked) => {
    let { newStore } = freqToggled(checked, freqStore)
    setFreqStore(newStore)
    // props.onFilterChange({
    //   filterId: filterId,
    //   eventType: freqEventCheckedChanged,
    //   value: checked
    // })
  }

  const clearPreDefined = () => {
    let { newStore } = freqCleared(freqStore)
    setFreqStore(newStore)
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
          nodes={retNodes(freqUnits[freqArrVal].label, valuesVisible, freqState?.activeFilter)}
          checked={freqState.checked}
          expanded={freqState.expanded}
          onCheck={(checked) => onCheck(checked)}
          onExpand={(expanded) => onExpand(expanded)}
          checkModel="all"
          iconsClass="fa5"
          optimisticToggle={false}
          disabled={!freqState.filterOn}
          icons={{
            check: <FaCheckSquare />,
            uncheck: <FaSquare />,
            halfCheck: <FaCheckSquare />,
            expandClose: <FaChevronRight />,
            expandOpen: <FaChevronDown />,
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
  const freqState = useAppSelector((state) => state.frequencyFilters)
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

  const onFC = props.onFilterChange
  const bandOptionReducer = (activeFilter: FreqFilterType) => {
    const bandOptionArgs: BandsProps = {
      label: activeFilter.label,
      warningIcon,
      validRange,
    }
    return activeFilter.id === 'User Defined' ? UserSelectedBands(bandOptionArgs) : PredefinedBands(bandOptionArgs)
  }

  const handleFilterSwitch = (filterOn) => {
    // props.onFilterChange({
    //   filterId: filterId,
    //   eventType: freqEventFilterSwitch,
    //   value: filterOn
    // })
  }
  const switchOnOff = (
    <Container>
      <UncontrolledTooltip placement="bottom" target="filterOnFreq">
        Enable/Disable Filter
      </UncontrolledTooltip>
      <MDBSwitch
        id="filterOnFreq"
        className="light"
        checked={freqState.filterOn}
        onChange={() => {
          const enabled = !freqState.filterOn
          dispatch(setFilterSwitch(enabled))
        }}
      />
    </Container>
  )

  return (
    <div className={styles.FrequencyFilterCard} data-testid="FrequencyFilterCard">
      <table>
        <tr>
          <th>
            <CardCloseButton size="small" onClick={props.closeTab} className={'m-2'} />
          </th>
          <th>
            <h4 className="mb-0 f-tabs-title">Frequency</h4>
          </th>
          <th>{switchOnOff}</th>
        </tr>
      </table>
      <hr className="filter-title-underline" />
      <Form>
        <Row>
          <Label className="filter-label my-auto" for="bands" sm={2}>
            Bands:{' '}
          </Label>
          <Col sm={10}>{bandsDropdown}</Col>
        </Row>
      </Form>
      {bandOptionReducer(freqState.activeFilter)}
    </div>
  )
}

export default FrequencyFilterCard
