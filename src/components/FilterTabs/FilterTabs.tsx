import React, { Component } from 'react'
import CoComCard from '../CoComFilterCard/CoComFilterCard'
import FrequencyCard  from '../FrequencyFilterCard/FrequencyFilterCard'
import TemporalCard  from '../TemporalFilterCard/TemporalFilterCard'
import FunctionalCard  from '../FunctionFilterCard/FunctionFilterCard'
import Tabs from 'rc-tabs'
// If you update rc-tabs to a 12.x release instead of 11.x you'll need the following line
import TabPane from 'rc-tabs/es/TabPanelList/TabPane';
import 'rc-tabs/assets/index.css'
import OrganizationsCard from '../OrganizationFilterCard/OrganizationFilterCard'
import PlatformCard from '../PlatformFilterCard/PlatformFilterCard'
import SummaryCard from '../SummaryCard/SummaryCard'
import { Rnd } from 'react-rnd'
import { BiFilterAlt } from 'react-icons/bi'
import { CCStateType, FreqStateType, FuncStateType, TempStateType, TopoStateType } from '../../typings/sharedTypes'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
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
  const ftabs = useAppSelector((state) => state.filterTabs)
  const dispatch = useAppDispatch()
  const x = ftabs.x
  const y = ftabs.y
  const width = ftabs.width
  const height = ftabs.height
  const vertical = ftabs.vertical

   // Get these from the slice then update the slice
    for (let entry of entries) {
      const cr = entry.contentRect
      dispatch(setFilterState({
        x: x - cr.width + width,
        y: vertical ? y : y - cr.height + height,
        width: cr.width,
        height: cr.height
      })
      this.checkOutOfBounds()
    }
  })

  checkOOBListener = () => this.checkOutOfBounds()

  checkOOB = () => {
    this.checkOutOfBounds()
  }

  changeWritingMode = () => {
    // TODO refactor; switches tabs from writing-mode: vertical-rl to writing-mode: lr
    for (var i = 1; i <= this.filtertabs.getElementsByClassName('rc-tabs-tab-btn').length; i++) {
      document.getElementById('f-tabs-parent-tab-' + i)!.style.writingMode = this.state.vertical ? 'vertical-rl' : 'lr'
    }
  }

  checkOutOfBounds = () => {
    if (this.filtertabsRef != null) {
      const boundsX = Math.min(document.documentElement.clientWidth || 0, window.innerWidth || 0)
      const boundsY = Math.min(document.documentElement.clientHeight || 0, window.innerHeight || 0)

      if (this.state.x < 0) {
        this.filtertabsRef.updatePosition({
          x: 0,
          y: this.state.y
        })
        this.setState({
          x: 0,
          y: this.state.y
        })
      }
      if (this.state.x + this.filtertabs.offsetWidth >= boundsX) {
        this.filtertabsRef.updatePosition({
          x: boundsX - this.filtertabs.offsetWidth,
          y: this.state.y
        })
        this.setState({
          x: boundsX - this.filtertabs.offsetWidth,
          y: this.state.y
        })
      }
      if (this.state.y < 0) {
        this.filtertabsRef.updatePosition({
          x: this.state.x,
          y: 0
        })
        this.setState({
          x: this.state.x,
          y: 0
        })
      }
      if (this.state.y + this.filtertabs.offsetHeight >= boundsY) {
        this.filtertabsRef.updatePosition({
          x: this.state.x,
          y: boundsY - this.filtertabs.offsetHeight
        })
        this.setState({
          x: this.state.x,
          y: boundsY - this.filtertabs.offsetHeight
        })
      }
    }
  }

const closeTab = () => {
    this.setState({
      activeKey: -2
    })
    this.onFilterChange({
      filterId: filterId,
      activeKey: -2,
      x: this.state.x,
      y: this.state.y,
      width: this.state.width,
      height: this.state.height,
      vertical: this.state.vertical
    })
  }

  onTabClick = (key) => {
    if (key === this.state.activeKey) {
      this.closeTab()
    } else {
      this.setState({
        activeKey: key
      })
    }

    this.onFilterChange({
      filterId: filterId,
      activeKey: this.state.activeKey === key ? -2 : key,
      x: this.state.x,
      y: this.state.y,
      width: this.state.width,
      height: this.state.height,
      vertical: this.state.vertical
    })
  }

  onDrag = (e, d) => {
    this.fTabsParent.style.setProperty('pointer-events', 'none')
    document.body.onmousemove = (e) => {
      var yFromBottom = window.innerHeight - e.clientY

      this.setState({
        vertical: yFromBottom > this.threshold,
        x: d.x,
        y: d.y
      })

      this.changeWritingMode()

      if (!this.state.vertical) {
        this.filtertabsRef.updatePosition({
          x: window.innerWidth / 2 - this.filtertabs.offsetWidth / 2,
          y: window.innerHeight - this.filtertabs.offsetHeight - 0.08 * window.innerHeight
        })
        this.setState({
          verticalOld: this.state.vertical
        })
      }

      if (this.state.vertical && !this.state.verticalOld) {
        this.filtertabsRef.updatePosition({
          x: e.clientX - this.filtertabs.offsetWidth / 2,
          y: e.clientY - (this.filtertabs.offsetHeight * 4) / 5
        })
        this.setState({
          bounds: ''
        })
      }

      this.checkOutOfBounds()
    }
  }

  onDragStop = (e, d) => {
    this.setState({
      x: d.x,
      y: d.y,
      verticalOld: this.state.vertical,
      bounds: 'window'
    })

    this.onFilterChange({
      filterId: filterId,
      activeKey: this.state.activeKey,
      x: d.x,
      y: d.y,
      width: this.state.width,
      height: this.state.height,
      vertical: this.state.vertical
    })

    this.checkOutOfBounds()

    document.getElementById('f-tabs-parent')?.style.setProperty('pointer-events', 'auto')
    document.body.onmousemove = null
  }

  getTabName = (filterName, isVertical, isFilterOn) => {
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

    let dockedStyle = { position: 'absolute', left: 'calc(50% - 0.5rem)', bottom: 0 }
    let verticalStyle = { position: 'absolute', top: 'calc(50% - 0.5rem)', right: 0, transform: 'rotate(90deg)' }
    return (
      <div>
        {filterName}
        {isFilterOn ? <BiFilterAlt style={isVertical ? verticalStyle : dockedStyle} /> : ''}
      </div>
    )
  }

  componentDidMount() {
    this.filtertabs = document.getElementById('filtertabs')!
    this.fTabsBg = document.getElementById('f-tabs-bg')!
    this.fTabsParent = document.getElementById('f-tabs-parent')!
    this.ro.observe(this.filtertabs)
    this.checkOutOfBounds()
    this.changeWritingMode()

    window.addEventListener('resize', this.checkOOBListener)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkOOBListener)
  }

  render() {
    return (
      <Rnd
        ref={(c) => {
          this.filtertabsRef = c
        }}
        id="filtertabs"
        default={{
          x: this.filterState.x,
          y: this.filterState.y,
          width: 'auto',
          height: 'auto'
        }}
        position={{ x: this.state.x, y: this.state.y }}
        onDrag={this.onDrag}
        onDragStop={this.onDragStop}
        enableResizing={false}
        bounds={this.state.bounds}
      >
        <div id="f-tabs-bg" className={this.state.vertical ? 'f-tabs-bg-vertical' : 'f-tabs-bg-docked'}>
          <Tabs
            id="f-tabs-parent"
            tabPosition={this.state.vertical ? 'right' : 'bottom'}
            onChange={this.onTabClick}
            activeKey={this.state.activeKey}
            //activeKey="2" //Uncomment to keep filter set to frequencies
          >
            <TabPane
              tab={this.getTabName('CCMD', this.state.vertical, this.props.ccState.ccmdFilterOn)}
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
            </TabPane>
            <TabPane
              tab={this.getTabName('Frequency', this.state.vertical, this.props.freqState.filterOn)}
              key="2"
              className="scroll-box__wrapper scroll-vert ps-6 pe-4 pt-3"
            >
              <FrequencyCard
                // onFilterChange={this.props.onFilterChange}
                // onDashboardChange={this.props.onDashboardChange}
                // freqState={this.props.freqState}
                // closeTab={this.closeTab}
                // isTab={true}
              />
            </TabPane>
            <TabPane
              tab={this.getTabName('Date Range', this.state.vertical, this.props.tempState.filterOn)}
              key="3"
              className="scroll-box__wrapper scroll-vert ps-6 pe-4 pt-3"
            >
              <TemporalCard
                // getTimeZoneOptions={this.props.getTimeZoneOptions}
                // onFilterChange={this.props.onFilterChange}
                // tempState={this.props.tempState}
                // onDashboardChange={this.props.onDashboardChange}
                // closeTab={this.closeTab}
                // isTab={true}
              />
            </TabPane>
            <TabPane
              tab={this.getTabName('Functional', this.state.vertical, this.props.funcState.filterOn)}
              key="4"
              className="scroll-box__wrapper scroll-vert ps-6 pe-4 pt-3"
            >
              <FunctionalCard
                onFilterChange={this.props.onFilterChange}
                onDashboardChange={this.props.onDashboardChange}
                funcState={this.props.funcState}
                closeTab={this.closeTab}
                asTab={true}
              />
            </TabPane>
            <TabPane
              tab={this.getTabName('Organizations', this.state.vertical, this.props.topoState.orgFilterOn)}
              key="5"
              className="scroll-box__wrapper scroll-vert ps-6 pe-4 pt-3"
            >
              <OrganizationsCard
                onFilterChange={this.props.onFilterChange}
                onDashboardChange={this.props.onDashboardChange}
                topoState={this.props.topoState}
                getOrganizations={this.props.getOrganizations}
                ccState={this.props.ccState}
                closeTab={this.closeTab}
                isTab={true}
              />
            </TabPane>
            <TabPane
              tab={this.getTabName('Platform', this.state.vertical, this.props.topoState.platFilterOn)}
              key="6"
              className="scroll-box__wrapper scroll-vert ps-6 pe-4 pt-3"
            >
              <PlatformCard
                onFilterChange={this.props.onFilterChange}
                onDashboardChange={this.props.onDashboardChange}
                topoState={this.props.topoState}
                ccState={this.props.ccState}
                closeTab={this.closeTab}
                isTab={true}
              />
            </TabPane>
            <TabPane tab="Summary" key="7" className="scroll-box__wrapper scroll-vert ps-6 pe-4 pt-3">
              <SummaryCard
                onFilterChange={this.props.onFilterChange}
                onDashboardChange={this.props.onDashboardChange}
                topoState={this.props.propstopoState}
                ccState={this.props.ccState}
                freqState={this.props.freqState}
                funcState={this.props.funcState}
                tempState={this.props.tempState}
                closeTab={this.closeTab}
                asTab={true}
                getFilterArray={this.getFilterArray}
                filterModalState={this.props.filterModalState}
                setFilterModalState={this.setFilterModalState}
              />
            </TabPane>
          </Tabs>
        </div>
      </Rnd>
    )
  }
}

export default FilterTabs
