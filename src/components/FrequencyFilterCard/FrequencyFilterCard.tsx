import React, { FC, useState } from 'react';
import styles from './FrequencyFilterCard.module.css';
import { Container, UncontrolledTooltip, Col, Form, FormGroup, Label, Input, Row } from 'reactstrap'
import { Form as RBSForm } from 'react-bootstrap'
import { getFrequencyUnits, getBandsAvailable, FreqNodes } from '../../services/filter'
import CheckboxTree from 'react-checkbox-tree'
import 'react-checkbox-tree/lib/react-checkbox-tree.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare, faCheckSquare, faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FreqStateType, FrequencyBand } from '../../typings/sharedTypes'
import { AiOutlineWarning } from 'react-icons/ai'
import { MDBSwitch } from 'mdb-react-ui-kit'
import CardCloseButton from '../CardCloseButton/CardCloseButton'
import _ from 'lodash'

export const filterId = 'freq'
export const freqEventLowChanged = 'freqEventLowChanged'
export const freqEventHighChanged = 'freqEventHighChanged'
export const freqEventUnitChanged = 'freqEventUnitChanged'
export const freqEventExpandChanged = 'freqEventExpandChanged'
export const freqEventCheckedChanged = 'freqEventCheckedChanged'
export const freqEventChecksCleared = 'freqEventChecksCleared'
export const freqBandSelectionChanged = 'freqBandSelectionChanged'
export const freqEventFilterSwitch = 'freqEventFilterSwitch'

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
  onFilterChange: any
  setValidUserFilter: any //function
  freqState: FreqStateType
  validRange: boolean
  filterOn: boolean
}

export const FreqText = (props: FreqTextProps) => {
  const onChange = (e: string) => {
    //if the value is in Hz, it should be an integer. Other units can be entered as decimals.
    const newValue = () => {
      return props.freqState.units === 'Hz' ? parseInt(e) : parseFloat(e)
    }

    props.onFilterChange({
      filterId: filterId,
      eventType: props.eventType,
      id: props.id,
      value: newValue(),
    })
    props.setValidUserFilter(props.validRange)
  }

  let altText = props.validRange ? props.name : 'High Frequency must be higher than low frequency'

  let classNames = props.validRange ? 'mx-3 frequency-text' : 'mx-3 red-border frequency-text'

  const stepForUnits = () => {
    switch (props.freqState.units) {
      case 'Hz':
        return '1'
      default:
        return 'any'
    }
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
          disabled={!props.filterOn}
        />
      </Col>
    </Row>
  )
}

export type FreqDropdownPropsType = {
  id: string
  value: string
  onFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  filterOn: (e: { filterId: string; eventType: string; value: any }) => void
}

/*
A dropdown box containing the various frequency units.
*/
const FreqDropdown = (props: FreqDropdownPropsType) => {
  //Get the corresponding freqUnit object based on the dropdown option selected
  const saveConvertedValue = (name) => {
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
      name="freq"
      id={props.id}
      disabled={!props.filterOn}
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
  onFilterChange: any
  filterOn: boolean
}
const BandSelectionDropdown = (props: BandSelectionDropdownProps) => {
  //Get the corresponding freqUnit object based on the dropdown option selected
  const saveConvertedValue = (name: string) => {
    const band = _.find(bandsAvailable, (b) => b.label === name)

    props.onFilterChange({
      filterId: filterId,
      eventType: freqBandSelectionChanged,
      id: props.id,
      value: band,
    })
  }

  ////Convert value to the unit selected in the dropdown

  let options = bandsAvailable.map((band) => {
    const isCurrentSelection = band.id === props.value
    return (
      <option key={band.id} selected={isCurrentSelection}>
        {band.label}
      </option>
    )
  })

  return (
    <RBSForm.Select
      className="custom-select-sm enabled bands-dropdown mx-3 w-auto light"
      name="freq"
      id={props.id}
      disabled={!props.filterOn}
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
        checked: true,
      }
      newStore.push(itemChanged)
    } else if (freq.checked && !checked.includes(freq.value)) {
      // freq went from checked to unchecked.
      itemChanged = {
        value: freq.value,
        checked: false,
      }
      newStore.push(itemChanged)
    } else {
      // Send along unchanged.
      newStore.push({
        value: freq.value,
        checked: freq.checked,
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
      checked: false,
    })
  }
  return fStore
}

const currentNodes = (units: string, showVals: boolean, activeFilter) => FreqNodes(units, showVals, activeFilter)
//can't return undefined, so assuming GHz

export const retNodes = (units: string, showVals: boolean, activeFilter) => {
  return currentNodes(units, showVals, activeFilter)
}

type FrequencyFilterCardProps = {
  onFilterChange?: (e: { filterId: string; eventType: string; value: any }) => void
  onDashboardChange?: any
  freqState?: FreqStateType
  closeTab?: any
  isTab?: any
}

const FrequencyFilterCard: FC<FrequencyFilterCardProps> = (props: FrequencyFilterCardProps) => {
  //State
  const [valuesVisible, setValuesVisible] = useState(true)
  const [freqStore, setFreqStore] = useState(
    setInitFreqStore(retNodes('', valuesVisible, props.freqState.activeFilter))
  )
  const [validUserFilter, setValidUserFilter] = useState(props.freqState.highFreq >= props.freqState.lowFreq)

  const clearPreDefined = () => {
    let { newStore } = freqCleared(freqStore)
    setFreqStore(newStore)
    props.onFilterChange({
      filterId: filterId,
      eventType: freqEventChecksCleared,
      value: [],
    })
  }

  const onExpand = (expanded) => {
    props.onFilterChange({
      filterId: filterId,
      eventType: freqEventExpandChanged,
      value: expanded,
    })
  }

  const onCheck = (checked) => {
    let { newStore } = freqToggled(checked, freqStore)
    setFreqStore(newStore)
    props.onFilterChange({
      filterId: filterId,
      eventType: freqEventCheckedChanged,
      value: checked,
    })
  }

  const onDashboardChange = (e, cardName, isOnDashboard) => {
    props.onDashboardChange(e, cardName, isOnDashboard)
  }

  let unitsDropdown = (
    <FreqDropdown
      id="units"
      value={props.freqState.units}
      onFilterChange= {() => {}} //{props.onFilterChange}
      filterOn={props.freqState.filterOn}
    />
  )

  let bandsDropdown = (
    <BandSelectionDropdown
      id="bands"
      value={props.freqState.activeFilter.label}
      onFilterChange={props.onFilterChange}
      filterOn= {false} //{props.freqState.filterOn}
    />
  )

  const showValue = (
    <MDBSwitch
      id="enableTooltips"
      label={'Show Values'}
      onChange={() => setValuesVisible(!valuesVisible)}
      checked={valuesVisible}
      className="ms-1 me-2 mb-2"
      disabled={!props.freqState.filterOn}
    />
  )

  //Filter When "User Defined" is selected
  const UserSelectedBands = (label: string) => {
    const x = props.freqState
    return (
      <Form>
        <Row>
          <p className="filter-subtitle ms-3 px-0 w-auto">{label}</p>
          {warningIcon}
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
          value={'' + props.freqState.lowFreq}
          onFilterChange={props.onFilterChange}
          setValidUserFilter={setValidUserFilter}
          freqState={props.freqState}
          validRange={validRange}
          filterOn= {false} //{props.freqState.filterOn}
        />

        <FreqText
          name="freq"
          id="highFreq"
          label="High"
          eventType={freqEventHighChanged}
          value={'' + props.freqState.highFreq}
          onFilterChange={props.onFilterChange}
          setValidUserFilter={setValidUserFilter}
          freqState={props.freqState}
          validRange={validRange}
          filterOn= {false} //{props.freqState.filterOn}
        />
      </Form>
    )
  }

  const PredefinedBands = (title: string) => {
    return (
      <Form>
        <Row>
          <p className="filter-subtitle ms-3">{title}</p>
        </Row>
        <Row>{showValue}</Row>
        <Row>
          <button
            type="button"
            className="btn btn-sm btn-secondary filter-clear-button font-weight-light mt-0 ms-3 w-auto"
            onClick={() => clearPreDefined()}
            disabled={!props.freqState.filterOn}
          >
            Clear
          </button>
        </Row>
        <Row className="">
          <CheckboxTree
            nodes={retNodes(freqUnits[freqArrVal].label, valuesVisible, props.freqState.activeFilter)}
            checked={props.freqState.checked}
            expanded={props.freqState.expanded}
            onCheck={(checked) => onCheck(checked)}
            onExpand={(expanded) => onExpand(expanded)}
            checkModel="all"
            iconsClass="fa5"
            optimisticToggle={false}
            disabled={!props.freqState.filterOn}
            icons={{
              check: <FontAwesomeIcon className="rct-icon rct-icon-check" icon={faCheckSquare} />,
              uncheck: <FontAwesomeIcon className="rct-icon rct-icon-uncheck" icon={faSquare} />,
              halfCheck: <FontAwesomeIcon className="rct-icon rct-icon-half-check" icon={faCheckSquare} />,
              expandClose: <FontAwesomeIcon icon={faChevronRight} className="rct-icon rct-icon-expand-close" />,
              expandOpen: <FontAwesomeIcon icon={faChevronDown} className="rct-icon rct-icon-expand-open" />,
              parentOpen: null,
              parentClose: null,
              leaf: null,
            }}
          />
        </Row>
        <Row></Row>
      </Form>
    )
  }

  let validRange = validUserFilter
  if (props.freqState.highFreq >= props.freqState.lowFreq) {
    validRange = true
  } else {
    validRange = false
  }

  const bandOptionReducer = (activeFilter) => {
    return activeFilter.id === 'User Defined' ? UserSelectedBands(activeFilter.label) : PredefinedBands(activeFilter.label)
  }

  const warningIcon = !validRange ? (
    <AiOutlineWarning className="filter-alert px-0 w-auto" title="High frequency must meet or exceed low frequency" />
  ) : null

  const handleFilterSwitch = (filterOn) => {
    props.onFilterChange({
      filterId: filterId,
      eventType: freqEventFilterSwitch,
      value: filterOn,
    })
  }
  const switchOnOff = (
    <Container>
      <UncontrolledTooltip placement="bottom" target="filterOnFreq">
        Enable/Disable Filter
      </UncontrolledTooltip>
      <MDBSwitch
        id="filterOnFreq"
        className="light"
        checked = {false} //{props.freqState.filterOn}
        onChange={() => {
          let enabled = !props.freqState.filterOn
          handleFilterSwitch(enabled)
          props.onFilterChange({ filterId: filterId, eventType: freqEventFilterSwitch, value: enabled })
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
      {bandOptionReducer(props.freqState.activeFilter)}
      {/*UserSelectedBands(props.freqState.activeFilter.label)*/}
    </div>
  )
}

export default FrequencyFilterCard;
