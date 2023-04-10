import React, { FC } from 'react'
import styles from './TemporalFilterCard.module.css'
import { Card } from 'react-bootstrap'
import { useAppSelector, useAppDispatch } from 'app/hooks'
import { setEnabled } from './temporalFilterSlice'
import JEMSIAFCardHeader from 'components/JEMSIAFCardHeader/JEMSIAFCardHeader'
const TemporalFilterCard: FC = () => {
  const dates = useAppSelector((state) => state.dates)
  const dispatch = useAppDispatch()
  const enabled = dates.filterOn
  const filterToggled = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`Filter toggled ${event.target.checked}`)
    dispatch(setEnabled(event.target.checked))
  }
  return (
    <Card border="primary" className={styles.TemporalFilterCard} data-testid="TemporalFilterCard">
      <JEMSIAFCardHeader title="Date Range" enabled={enabled} onChange={filterToggled} />
      <Card.Body>
        
      </Card.Body>
    </Card>
  )
}

export default TemporalFilterCard
