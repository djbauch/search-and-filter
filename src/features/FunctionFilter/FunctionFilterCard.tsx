import React, { FC } from 'react'
import styles from './FunctionFilterCard.module.css'
import {useAppSelector, useAppDispatch} from 'app/hooks'
import { setChecked, setEnabled } from './functionFilterSlice'
import { Button, Card, Container, Col, Form, Row } from 'react-bootstrap'
import JEMSIAFCardHeader from 'components/JEMSIAFCardHeader/JEMSIAFCardHeader'
import CheckboxTree from 'react-checkbox-tree'
//import 'react-widgets/styles.css'
import { FuncItemType, FuncStateType } from 'typings/sharedTypes'

export const filterId = 'func'
export const funcEventAdd = 'funcEventAdd'
export const funcEventRemove = 'funcEventRemove'
export const funcEventDropdown = 'funcEventDropdown'
export const funcEventFilterSwitch = 'funcEventFilterSwitch'
interface FunctionFilterCardProps {}

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
  }
  return (
    <Card border="primary" className={styles.FunctionFilterCard} data-testid="FunctionFilterCard">
      <JEMSIAFCardHeader title="Functions" enabled={enabled} onChange={filterToggled} />
    </Card>
  )
}

export default FunctionFilterCard
