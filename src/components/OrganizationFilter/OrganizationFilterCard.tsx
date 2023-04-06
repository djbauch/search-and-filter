import React, { FC } from 'react'
import styles from './OrganizationFilterCard.module.css'
import { useAppSelector, useAppDispatch} from 'app/hooks'
import { setChecked, setExpanded, setEnabled } from './organizationFilterSlice'
import { Card } from 'react-bootstrap'
import JEMSIAFCardHeader from 'components/JEMSIAFCardHeader/JEMSIAFCardHeader'
import CheckboxTree from 'react-checkbox-tree'
interface OrganizationFilterCardProps {}

const OrganizationFilterCard: FC = () => {
  const orgs = useAppSelector((state) => state.organizations)
  const dispatch = useAppDispatch()
  const orgDataNodes = orgs.orgDataNodes
  const checked = orgs.checked
  const expanded = orgs.expanded
  const enabled = orgs.orgFilterOn
  const checkChanged = (checked: string[]) => {
    dispatch(setChecked(checked))
  }
  const expandChanged = (expanded: string[]) => {
    console.log(`Expanded ${JSON.stringify(expanded)}`)
    dispatch(setExpanded(expanded))
  }
  const filterToggled = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`Filter toggled ${event.target.checked}`)
    dispatch(setEnabled(event.target.checked))
  }
  return(
  <Card border="primary" data-testid="OrganizationFilterCard">
    <JEMSIAFCardHeader title="Organizations" enabled={enabled} onChange={filterToggled}/>
    <Card.Body>
      <CheckboxTree nodes={orgDataNodes}
      checked={checked}
      expanded={expanded}
      onCheck={checkChanged}
      onExpand={expandChanged}
      checkModel="all"
      showExpandAll={true}
      nativeCheckboxes={true}
      />
    </Card.Body>
  </Card>
  )
  }

export default OrganizationFilterCard
