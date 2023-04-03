import React, { useEffect, useRef } from 'react'
import CoComCard from '../../components/CoComFilterCard/CoComFilterCard'
import FrequencyCard from '../../components/FrequencyFilter/FrequencyFilterCard'
import TemporalCard from '../../components/TemporalFilter/TemporalFilterCard'
import FunctionalCard from '../../features/FunctionFilter/FunctionFilterCard'
import OrganizationFilterCard from 'components/OrganizationFilter/OrganizationFilterCard'
import FilterSummaryCard from 'components/FilterSummary/FilterSummaryCard'
import { Tabs, Tab } from 'react-bootstrap'
// If you update rc-tabs to a 12.x release instead of 11.x you'll need the following line
//import TabPane from 'rc-tabs/es/TabPanelList/TabPane';
import 'rc-tabs/assets/index.css'
import PlatformCard from '../../components/PlatformFilter/PlatformFilterCard'
import { Rnd } from 'react-rnd'
import { BiFilterAlt } from 'react-icons/bi'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { setFilterId, setActiveKey, setX, setFilterState } from './FilterTabsSlice'
export const filterId = 'tabs'

type FilterTabsProps = {
  filterState: any
  onFilterChange: any
  onDashboardChange: any
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
  let filtertabsRef = useRef<Rnd>(null)
  let filtertabs: HTMLElement
  let fTabsBg: HTMLElement
  let fTabsParent: HTMLElement
  // useEffect with empty dependency array to replace componentDidMount
  useEffect(() => {
    filtertabs = document.getElementById('filtertabs')!
    fTabsBg = document.getElementById('f-tabs-bg')!
    fTabsParent = document.getElementById('f-tabs-parent')!
    ro.observe(filtertabs)
    checkOutOfBounds()
    changeWritingMode()
    window.addEventListener('resize', checkOOBListener)
  }, [])

  //   this.threshold = 120
  //   this.filtertabsRef = React.createRef()

  const ro = new ResizeObserver((entries) => {
    // Get these from the slice then update the slice
    for (let entry of entries) {
      const cr = entry.contentRect
      dispatch(
        setFilterState({
          x: x - cr.width + width,
          y: vertical ? y : y - cr.height + height,
          width: cr.width,
          height: cr.height
        })
      )
      checkOutOfBounds()
    }
  })

  const checkOOBListener = () => checkOutOfBounds()

  const changeWritingMode = () => {
    // TODO refactor; switches tabs from writing-mode: vertical-rl to writing-mode: lr
    for (let i = 1; i <= filtertabs.getElementsByClassName('rc-tabs-tab-btn').length; i++) {
      document.getElementById('f-tabs-parent-tab-' + i)!.style.writingMode = vertical ? 'vertical-rl' : 'lr'
    }
  }

  const checkOutOfBounds = () => {
    if (filtertabsRef.current != null) {
      const boundsX = Math.min(document.documentElement.clientWidth || 0, window.innerWidth || 0)
      const boundsY = Math.min(document.documentElement.clientHeight || 0, window.innerHeight || 0)

      if (x < 0) {
        filtertabsRef.current.updatePosition({
          x: 0,
          y: y
        })
        dispatch(
          setFilterState({
            x: 0,
            y: y
          })
        )
      }
      if (x + filtertabs.offsetWidth >= boundsX) {
        filtertabsRef.current.updatePosition({
          x: boundsX - filtertabs.offsetWidth,
          y: y
        })
        dispatch(
          setFilterState({
            x: boundsX - filtertabs.offsetWidth,
            y: y
          })
        )
      }
      if (y < 0) {
        filtertabsRef.current.updatePosition({
          x: x,
          y: 0
        })
        dispatch(
          setFilterState({
            x: x,
            y: 0
          })
        )
      }
      if (y + filtertabs.offsetHeight >= boundsY) {
        filtertabsRef.current.updatePosition({
          x: x,
          y: boundsY - filtertabs.offsetHeight
        })
        dispatch(
          setFilterState({
            x: x,
            y: boundsY - filtertabs.offsetHeight
          })
        )
      }
    }
  }

  const closeTab = () => {
    dispatch(
      setFilterState({
        activeKey: -2
      })
    )
  }

  const onTabClick = (key) => {
    if (key === activeKey) {
      closeTab()
    } else {
      dispatch(
        setFilterState({
          activeKey: key
        })
      )
    }

    // this.onFilterChange({
    //   activeKey: this.state.activeKey === key ? -2 : key,
    // })
  }

  const onDrag = (e, d) => {
    fTabsParent.style.setProperty('pointer-events', 'none')
    document.body.onmousemove = (e) => {
      const yFromBottom = window.innerHeight - e.clientY

      dispatch(
        setFilterState({
          vertical: yFromBottom > threshold,
          x: d.x,
          y: d.y
        })
      )

      changeWritingMode()

      if (!vertical && filtertabsRef.current !== null) {
        filtertabsRef.current.updatePosition({
          x: window.innerWidth / 2 - filtertabs.offsetWidth / 2,
          y: window.innerHeight - filtertabs.offsetHeight - 0.08 * window.innerHeight
        })
        dispatch(
          setFilterState({
            verticalOld: vertical
          })
        )
      }

      if (vertical && !verticalOld && filtertabsRef.current) {
        filtertabsRef.current.updatePosition({
          x: e.clientX - filtertabs.offsetWidth / 2,
          y: e.clientY - (filtertabs.offsetHeight * 4) / 5
        })
        dispatch(
          setFilterState({
            bounds: ''
          })
        )
      }

      checkOutOfBounds()
    }
  }

  const onDragStop = (e, d) => {
    dispatch(
      setFilterState({
        x: d.x,
        y: d.y,
        verticalOld: vertical,
        bounds: 'window'
      })
    )

    checkOutOfBounds()

    document.getElementById('f-tabs-parent')?.style.setProperty('pointer-events', 'auto')
    document.body.onmousemove = null
  }

  const dockedStyle = { left: 'calc(50% - 0.5rem)', bottom: 0 }
  const verticalStyle = { top: 'calc(50% - 0.5rem)', right: 0, transform: 'rotate(90deg)' }
  const getTabName = (filterName: string, isVertical: boolean, isFilterOn) => {
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
    return () => {
      window.removeEventListener('resize', checkOOBListener)
    }
  }

  return (
    <Rnd
      ref={filtertabsRef}
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
            title={'Frequency' /*getTabName('Frequency', vertical, freqState.filterOn)*/}
            key="2"
            className="scroll-box__wrapper scroll-vert ps-6 pe-4 pt-3"
          >
            <FrequencyCard />
            {/* <FrequencyCard
                // onFilterChange={this.props.onFilterChange}
                // onDashboardChange={this.props.onDashboardChange}
                // freqState={this.props.freqState}
                // closeTab={this.closeTab}
                // isTab={true}
              /> */}
          </Tab>
          <Tab
            title={'Date Range' /*getTabName('Date Range', vertical, tempState.filterOn)*/}
            key="3"
            className="scroll-box__wrapper scroll-vert ps-6 pe-4 pt-3"
          >
            <TemporalCard />
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
            title={'Functional' /* getTabName('Functional', vertical, funcState.filterOn)*/}
            key="4"
            className="scroll-box__wrapper scroll-vert ps-6 pe-4 pt-3"
          >
            <FunctionalCard />
            {/* <FunctionalCard
                // onFilterChange={this.props.onFilterChange}
                // onDashboardChange={this.props.onDashboardChange}
                // funcState={this.props.funcState}
                // closeTab={this.closeTab}
                // asTab={true}
              /> */}
          </Tab>
          <Tab
            title={'Organizations' /*getTabName('Organizations', vertical, topoState.orgFilterOn)*/}
            key="5"
            className="scroll-box__wrapper scroll-vert ps-6 pe-4 pt-3"
          >
            <OrganizationFilterCard />
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
            title={'Platform' /*getTabName("Platform", vertical, topoState.platFilterOn)*/}
            key="6"
            className="scroll-box__wrapper scroll-vert ps-6 pe-4 pt-3"
          >
            <PlatformCard />
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
            <FilterSummaryCard />
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
