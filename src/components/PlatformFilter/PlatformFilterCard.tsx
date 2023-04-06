import React, { FC } from 'react'
import './PlatformFilterCard.css'
import {useAppSelector, useAppDispatch} from 'app/hooks'
import {setChecked, setExpanded, setEnabled } from './platformFilterSlice'
import { Card }  from 'react-bootstrap'
import JEMSIAFCardHeader from 'components/JEMSIAFCardHeader/JEMSIAFCardHeader'
import CheckboxTree from 'react-checkbox-tree'

const PlatformFilterCard: FC = () => {
  const platforms = useAppSelector((state) => state.platforms)
  const dispatch = useAppDispatch()
  const checked = platforms.checked
  const expanded = platforms.expanded
  const enabled = platforms.platFilterOn

  const filterToggled = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`Filter toggled ${event.target.checked}`)
    dispatch(setEnabled(event.target.checked))
  }
  const checkChanged = (checked: string[]) => {
    dispatch(setChecked(checked))
  }
  return (
<Card border="primary" className="PlatformFilterCard" data-testid="PlatformFilterCard">
    <JEMSIAFCardHeader title="Platforms" enabled={enabled} onChange={filterToggled} />
    <Card.Body>
      <CheckboxTree nodes={platforms.value} 
      checked={checked}
      expanded={expanded}
      onCheck={checkChanged}
      nativeCheckboxes={true}
      showNodeIcon={false}
      />
    </Card.Body>
  </Card>
)}

export default PlatformFilterCard
