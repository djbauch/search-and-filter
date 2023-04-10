import React, { FC } from 'react'
import styles from './FunctionFilterCard.module.css'
import { useAppSelector, useAppDispatch } from 'app/hooks'
import { setChecked, setEnabled } from './functionFilterSlice'
import { Card, Container, Col, Form, Row } from 'react-bootstrap'
import JEMSIAFCardHeader from 'components/JEMSIAFCardHeader/JEMSIAFCardHeader'
import CheckboxTree from 'react-checkbox-tree'
import { toast } from 'react-toastify'

export const filterId = 'func'
export const funcEventDropdown = 'funcEventDropdown'
export const funcEventFilterSwitch = 'funcEventFilterSwitch'

const funcToastId = 'func'
const FunctionFilterCard: FC = () => {
  const functions = useAppSelector((state) => state.functions)
  const dispatch = useAppDispatch()
  const checked = functions.checked
  const expanded = functions.expanded
  const enabled = functions.filterOn
  const filterToggled = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`Filter toggled ${event.target.checked}`)
    dispatch(setEnabled(event.target.checked))
  }
  const checkChanged = (checked: string[]) => {
    dispatch(setChecked(checked))
    if (!enabled) {
      toast.warn('Enable filter to see the effect of changes', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        toastId: funcToastId
      })
    }
  }
  return (
    <Card border="primary" className={styles.FunctionFilterCard} data-testid="FunctionFilterCard">
      <JEMSIAFCardHeader title="Functions" enabled={enabled} onChange={filterToggled} />
      <Card.Body>
        <CheckboxTree
          nodes={functions.value}
          checked={checked}
          expanded={expanded}
          onCheck={checkChanged}
          nativeCheckboxes={true}
          showNodeIcon={false}
        />
      </Card.Body>
    </Card>
  )
}

export default FunctionFilterCard
