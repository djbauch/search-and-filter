import React, { FC } from 'react';
import styles from './FilterSummaryCard.module.css';
import { Button, Card, Row } from 'react-bootstrap'
//import 'react-widgets/styles.css'
// import {
//   defineFreqState,
//   defineCcState,
//   defineTempState,
//   defineTopoState,
//   defineFuncState
// } from '../../../data/LocalStorageKeys'
import FalconCloseButton from '../common/FalconCloseButton'
import JEMSIAFCardHeader from 'components/JEMSIAFCardHeader/JEMSIAFCardHeader';
export const filterId = 'summ'

export const sumEventClear = 'sumEventClear'
export const sumEventDisable = 'sumEventDisable'

type SummaryCardProps = {
  //setFilterModalState(state: boolean)
}
export const FilterSummaryCard = (props: SummaryCardProps) => {
  const cardName = 'SummaryCard'

  const handleViewSummary = () => {
    //props.setFilterModalState(true)
  }

  const handleClearFilters = () => {
    // props.onFilterChange({
    //   filterId: filterId,
    //   eventType: sumEventClear,
    //   freqDefault: defineFreqState,
    //   ccDefault: defineCcState,
    //   tempDefault: defineTempState,
    //   topoDefault: defineTopoState,
    //   funcDefault: defineFuncState
    // })
  }

  const handleDisableFilters = () => {
    // props.onFilterChange({
    //   filterId: filterId,
    //   eventType: sumEventDisable
    // })
  }

  // const getCurrentFilterArray = () =>{
  //     //gather ALL checked items in ALL filter cards and put in an array of strings
  //     var filterArray = props.getAllFiltersArray;
  //     if(filterArray)
  //      return filterArray;
  //   }

  // const currentFilterArray = getCurrentFilterArray();

  // const [isOpenViewFilterModal, setIsOpenViewFilterModal] = useState(false);

  // const viewFilterModal = isOpenViewFilterModal ? <ViewFilterModal
  //     getAllFilterArray={currentFilterArray}
  //     coComFilterArray = {props.getFilterArray("CoCom")}
  //     funcFilterArray = {props.getFilterArray("Functional")}
  //     orgFilterArray = {props.getFilterArray("Organizations")}
  //     platFilterArray = {props.getFilterArray("Platform")}
  //     isOpenViewFilterModal={isOpenViewFilterModal}
  //     setIsOpenViewFilterModal={setIsOpenViewFilterModal}
  // />: null;

  return (
    <Card border="primary" className="font-weight-bold" data-testid="FilterSummaryCard">
    <JEMSIAFCardHeader title="Summary" />
      <Row>
        <Button className="mx-auto my-2 btn-sm w-auto" onClick={handleViewSummary}>
          View Active Filter Summary
        </Button>
      </Row>
      <Row>
        <Button className="mx-auto my-2 btn-sm w-auto" onClick={handleClearFilters}>
          Clear All Filters
        </Button>
      </Row>
      <Row>
        <Button className="mx-auto my-2 btn-sm w-auto" onClick={handleDisableFilters}>
          Disable All Filters
        </Button>
      </Row>
    </Card>
  )
}

export default FilterSummaryCard
