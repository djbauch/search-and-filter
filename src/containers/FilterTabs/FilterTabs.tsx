import React, { Component, useEffect, useRef } from 'react'
import CoComCard from '../../components/CoComFilterCard/CoComFilterCard'
import FrequencyCard  from '../../components/FrequencyFilterCard/FrequencyFilterCard'
import TemporalCard  from '../../components/TemporalFilterCard/TemporalFilterCard'
import FunctionalCard  from '../../features/FunctionFilter/FunctionFilterCard'
import {Tabs, Tab} from 'react-bootstrap'
// If you update rc-tabs to a 12.x release instead of 11.x you'll need the following line
//import TabPane from 'rc-tabs/es/TabPanelList/TabPane';
import 'rc-tabs/assets/index.css'
import OrganizationsCard from '../../components/OrganizationFilter/OrganizationFilterCard'
import PlatformCard from '../../components/PlatformFilterCard/PlatformFilterCard'
import SummaryCard from '../../components/FilterSummaryCard/FilterSummaryCard'
import { Rnd } from 'react-rnd'
import { BiFilterAlt } from 'react-icons/bi'
import { CCStateType, FreqStateType, FuncStateType, TempStateType, TopoStateType } from '../../typings/sharedTypes'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { setFilterId, setActiveKey, setX, setFilterState } from './FilterTabsSlice'
export const filterId = 'tabs'

type FilterTabsProps = {
  filterState: any
  getCombatantCommands: any
  onFilterChange: any
  onDashboardChange: any
  ccState: CCStateType
  freqState: FreqStateType
  getTimeZoneOptions: any
  tempState: TempStateType
  funcState: FuncStateType
  topoState: TopoStateType
  getOrganizations: any
  getFilterArray: any
  filterModalState: any
  setFilterModalState: () => any
}

const FilterTabs = () => {
  const ftabs = useAppSelector((state) => state.filterTabs)
  const dispatch = useAppDispatch()
  const x = ftabs.x
  const y = ftabs.y
  const width = ftabs.width
  const height = ftabs.height
  const vertical = ftabs.vertical
  const activeKey = ftabs.activeKey
  const verticalOld = ftabs.verticalOld
  const bounds = ftabs.bounds
  const topoState = useAppSelector((state) => state.topologyFilters)
  const ccState = useAppSelector((state) => state.combatantCommands)
  const freqState = useAppSelector((state) => state.frequencyFilters)
  const tempState = useAppSelector((state) => state.temporalFilters)
  const funcState = useAppSelector((state) => state.functionFilters)
  const threshold = 120
  let filtertabsRef = useRef<Rnd>()
  let filtertabs: HTMLElement
  let fTabsBg: HTMLElement
  let fTabsParent: HTMLElement
  // useEffect with empty dependency array to replace componentDidMount
  useEffect(() => {
    filtertabs = document.getElementById("filtertabs")!
    fTabsBg = document.getElementById('f-tabs-bg')
    fTabsParent = document.getElementById('f-tabs-parent')
  }, [])
  // constructor(props: FilterTabsProps) {
  //   super(props)

  //   this.filterState = props.filterState
  //   this.getCombatantCommands = props.getCombatantCommands
  //   this.onFilterChange = props.onFilterChange
  //   this.onDashboardChange = props.onDashboardChange


  //   this.state = {
  //     activeKey: this.filterState.activeKey,
  //     x: this.filterState.x,
  //     y: this.filterState.y,
  //     width: this.filterState.width,
  //     height: this.filterState.height,
  //     vertical: this.filterState.vertical,
  //     verticalOld: this.filterState.vertical,
  //     bounds: 'window'
  //   }
  //   this.threshold = 120
  //   this.filtertabsRef = React.createRef()


const ro = new ResizeObserver((entries) => {
   // Get these from the slice then update the slice
    for (let entry of entries) {
      const cr = entry.contentRect
      dispatch(setFilterState({
        x: x - cr.width + width,
        y: vertical ? y : y - cr.height + height,
        width: cr.width,
        height: cr.height
      }))
      checkOutOfBounds()
    }
  })

  const checkOOBListener = () => checkOutOfBounds()

  const checkOOB = () => {
    checkOutOfBounds()
  }

  const changeWritingMode = () => {
    // TODO refactor; switches tabs from writing-mode: vertical-rl to writing-mode: lr
    for (let i = 1; i <= filtertabs.getElementsByClassName('rc-tabs-tab-btn').length; i++) {
      document.getElementById('f-tabs-parent-tab-' + i)!.style.writingMode = vertical ? 'vertical-rl' : 'lr'
    }
  }

  const checkOutOfBounds = () => {
    if (filtertabsRef != null) {
      const boundsX = Math.min(document.documentElement.clientWidth || 0, window.innerWidth || 0)
      const boundsY = Math.min(document.documentElement.clientHeight || 0, window.innerHeight || 0)

      if (x < 0) {
        filtertabsRef.current.updatePosition({
          x: 0,
          y: y
        })
        dispatch(setFilterState({
          x: 0,
          y: y
        }))
      }
      if (x + filtertabs.offsetWidth >= boundsX) {
        filtertabsRef.current.updatePosition({
          x: boundsX - filtertabs.offsetWidth,
          y: y
        })
        dispatch(setFilterState({
          x: boundsX - filtertabs.offsetWidth,
          y: y
        }))
      }
      if (y < 0) {
        filtertabsRef.current.updatePosition({
          x: x,
          y: 0
        })
        dispatch(setFilterState({
          x: x,
          y: 0
        }))
      }
      if (y + filtertabs.offsetHeight >= boundsY) {
        filtertabsRef.current.updatePosition({
          x: x,
          y: boundsY - filtertabs.offsetHeight
        })
        dispatch(setFilterState({
          x: x,
          y: boundsY - filtertabs.offsetHeight
        }))
      }
    }
  }

const closeTab = () => {
    dispatch(setFilterState({
      activeKey: -2
    }))
    // this.onFilterChange({
    //   filterId: filterId,
    //   activeKey: -2,
    //   x: this.state.x,
    //   y: this.state.y,
    //   width: this.state.width,
    //   height: this.state.height,
    //   vertical: this.state.vertical
    // })
  }

  const onTabClick = (key) => {
    if (key === activeKey) {
      closeTab()
    } else {
      dispatch(setFilterState({
        activeKey: key
      }))
    }

    // this.onFilterChange({
    //   filterId: filterId,
    //   activeKey: this.state.activeKey === key ? -2 : key,
    //   x: this.state.x,
    //   y: this.state.y,
    //   width: this.state.width,
    //   height: this.state.height,
    //   vertical: this.state.vertical
    // })
  }

  const onDrag = (e, d) => {
    fTabsParent.style.setProperty('pointer-events', 'none')
    document.body.onmousemove = (e) => {
      var yFromBottom = window.innerHeight - e.clientY

      dispatch(setFilterState({
        vertical: yFromBottom > threshold,
        x: d.x,
        y: d.y
      }))

      changeWritingMode()

      if (!vertical) {
        filtertabsRef.current.updatePosition({
          x: window.innerWidth / 2 - filtertabs.offsetWidth / 2,
          y: window.innerHeight - filtertabs.offsetHeight - 0.08 * window.innerHeight
        })
        dispatch(setFilterState({
          verticalOld: vertical
        }))
      }

      if (vertical && !verticalOld) {
        filtertabsRef.current.updatePosition({
          x: e.clientX - filtertabs.offsetWidth / 2,
          y: e.clientY - (filtertabs.offsetHeight * 4) / 5
        })
        dispatch(setFilterState({
          bounds: ''
        }))
      }

      checkOutOfBounds()
    }
  }

  const onDragStop = (e, d) => {
    dispatch(setFilterState({
      x: d.x,
      y: d.y,
      verticalOld: vertical,
      bounds: 'window'
    }))

    // this.onFilterChange({
    //   filterId: filterId,
    //   activeKey: activeKey,
    //   x: d.x,
    //   y: d.y,
    //   width: width,
    //   height: height,
    //   vertical: vertical
    // })

    checkOutOfBounds()

    document.getElementById('f-tabs-parent')?.style.setProperty('pointer-events', 'auto')
    document.body.onmousemove = null
  }

  const getTabName = (filterName, isVertical, isFilterOn) => {
    switch (filterName) {
      case 'CCMD':
        isFilterOn = isFilterOn //&& this.props.ccState.treeChecked.length > 0;
        break
      case 'Frequency':
        // not implemented
        break
      case 'Date Range':
        // not implemented
        break
      case 'Functional':
        // if (isFilterOn) {
        //     let nonBlank = false;
        //     for (var obj of this.props.funcState.functionalValues) {
        //         if (obj.value !== "") {
        //             nonBlank = true;
        //             break;
        //         }
        //     }
        //     isFilterOn = isFilterOn && nonBlank;
        // }
        isFilterOn = isFilterOn
        break
      case 'Organizations':
        isFilterOn = isFilterOn //&& this.props.topoState.treeChecked.length > 0;
        break
      case 'Platform':
        isFilterOn = isFilterOn //&& this.props.topoState.platChecked.length > 0;
        break
      default:
        console.log('unknown filter')
        break
    }

    let dockedStyle = {  left: 'calc(50% - 0.5rem)', bottom: 0 }
    let verticalStyle = { top: 'calc(50% - 0.5rem)', right: 0, transform: 'rotate(90deg)' }
    return (
      <div>
        {filterName}
        {isFilterOn ? <BiFilterAlt style={isVertical ? verticalStyle : dockedStyle} /> : ''}
      </div>
    )
  }

  const componentDidMount = () => {
    filtertabs = document.getElementById('filtertabs')!
    fTabsBg = document.getElementById('f-tabs-bg')!
    fTabsParent = document.getElementById('f-tabs-parent')!
    ro.observe(filtertabs)
    checkOutOfBounds()
    changeWritingMode()

    window.addEventListener('resize', checkOOBListener)
  }

  const componentWillUnmount = () => {
    window.removeEventListener('resize', checkOOBListener)
  }

  const dockedStyle = { position: 'absolute', left: 'calc(50% - 0.5rem)', bottom: 0 }
  const verticalStyle = { position: 'absolute', top: 'calc(50% - 0.5rem)', right: 0, transform: 'rotate(90deg)' }


  return (
      <Rnd
        ref={
          filtertabsRef
        }
        id="filtertabs"
        default={{
          x: x,
          y: y,
          width: 'auto',
          height: 'auto'
        }}
        position={{ x: x, y: y }}
        onDrag={onDrag}
        onDragStop={onDragStop}
        enableResizing={false}
        bounds={bounds}
      >
        <div id="f-tabs-bg" className={vertical ? 'f-tabs-bg-vertical' : 'f-tabs-bg-docked'}>
          <Tabs
            id="f-tabs-parent"
            //tabPosition={vertical ? 'right' : 'bottom'}
            onChange={onTabClick}
            activeKey={activeKey}
            //activeKey="2" //Uncomment to keep filter set to frequencies
          >
            <Tab
              title={getTabName('CCMD', vertical, ccState.enabled)}
              key="1"
              className="scroll-box__wrapper scroll-vert ps-6 pe-4  pt-3"
            >
              <CoComCard
                // getCombatantCommands={this.props.getCombatantCommands}
                // onFilterChange={this.props.onFilterChange}
                // onDashboardChange={this.props.onDashboardChange}
                // ccState={this.props.ccState}
                // closeTab={this.closeTab}
                // isTab={true}
              />
            </Tab>
            <Tab
              title={'Frequency'/*getTabName('Frequency', vertical, freqState.filterOn)*/}
              key="2"
              className="scroll-box__wrapper scroll-vert ps-6 pe-4 pt-3"
            >
              <p>Frequency Card</p>
              {/* <FrequencyCard
                // onFilterChange={this.props.onFilterChange}
                // onDashboardChange={this.props.onDashboardChange}
                // freqState={this.props.freqState}
                // closeTab={this.closeTab}
                // isTab={true}
              /> */}
            </Tab>
            <Tab
              title={'Date Range'/*getTabName('Date Range', vertical, tempState.filterOn)*/}
              key="3"
              className="scroll-box__wrapper scroll-vert ps-6 pe-4 pt-3"
            >
              <p>Temporal Card</p>
              {/* <TemporalCard
                // getTimeZoneOptions={this.props.getTimeZoneOptions}
                // onFilterChange={this.props.onFilterChange}
                // tempState={this.props.tempState}
                // onDashboardChange={this.props.onDashboardChange}
                // closeTab={this.closeTab}
                // isTab={true}
              /> */}
            </Tab>
            <Tab
              title={'Functional'/* getTabName('Functional', vertical, funcState.filterOn)*/}
              key="4"
              className="scroll-box__wrapper scroll-vert ps-6 pe-4 pt-3"
            >
              <p>Functional Card</p>
              {/* <FunctionalCard
                // onFilterChange={this.props.onFilterChange}
                // onDashboardChange={this.props.onDashboardChange}
                // funcState={this.props.funcState}
                // closeTab={this.closeTab}
                // asTab={true}
              /> */}
            </Tab>
            <Tab
              title={'Organizations'/*getTabName('Organizations', vertical, topoState.orgFilterOn)*/}
              key="5"
              className="scroll-box__wrapper scroll-vert ps-6 pe-4 pt-3"
            >
              <p>Organizations Card</p>
              {/* <OrganizationsCard
                // onFilterChange={this.props.onFilterChange}
                // onDashboardChange={this.props.onDashboardChange}
                // topoState={this.props.topoState}
                // getOrganizations={this.props.getOrganizations}
                // ccState={this.props.ccState}
                // closeTab={this.closeTab}
                // isTab={true}
              /> */}
            </Tab>
            <Tab
              title={'Platform'/*getTabName("Platform", vertical, topoState.platFilterOn)*/}
              key="6"
              className="scroll-box__wrapper scroll-vert ps-6 pe-4 pt-3"
            >
              <p>Platform Card</p>
              {/* <PlatformCard
                // onFilterChange={this.props.onFilterChange}
                // onDashboardChange={this.props.onDashboardChange}
                // topoState={this.props.topoState}
                // ccState={this.props.ccState}
                // closeTab={this.closeTab}
                // isTab={true}
              /> */}
            </Tab>
            <Tab title="Summary" eventKey="7" className="scroll-box__wrapper scroll-vert ps-6 pe-4 pt-3">
              <p>Summary Card</p>
              {/* <SummaryCard
                // onFilterChange={this.props.onFilterChange}
                // closeTab={this.closeTab}
                // asTab={true}
                // getFilterArray={this.getFilterArray}
                // filterModalState={this.props.filterModalState}
                // setFilterModalState={this.setFilterModalState}
              /> */}
            </Tab>
          </Tabs>
        </div>
      </Rnd>
    )
  }

export default FilterTabs
