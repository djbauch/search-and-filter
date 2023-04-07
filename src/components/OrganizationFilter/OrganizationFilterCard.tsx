import React, { FC } from 'react'
import styles from './OrganizationFilterCard.module.css'
import { useAppSelector, useAppDispatch} from 'app/hooks'
import { setChecked, setExpanded, setEnabled } from './organizationFilterSlice'
import { Card } from 'react-bootstrap'
import JEMSIAFCardHeader from 'components/JEMSIAFCardHeader/JEMSIAFCardHeader'
import CheckboxTree from 'react-checkbox-tree'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
      icons={{
        check: <FontAwesomeIcon className="rct-icon rct-icon-check" icon="check-square" />,
        uncheck: <FontAwesomeIcon className="rct-icon rct-icon-uncheck" icon={['fas', 'square']} />,
        halfCheck: <FontAwesomeIcon className="rct-icon rct-icon-half-check" icon="check-square" />,
        expandClose: <FontAwesomeIcon className="rct-icon rct-icon-expand-close" icon="chevron-right" />,
        expandOpen: <FontAwesomeIcon className="rct-icon rct-icon-expand-open" icon="chevron-down" />,
        expandAll: <FontAwesomeIcon className="rct-icon rct-icon-expand-all" icon="plus-square" />,
        collapseAll: <FontAwesomeIcon className="rct-icon rct-icon-collapse-all" icon="minus-square" />,
        parentClose: <FontAwesomeIcon className="rct-icon rct-icon-parent-close" icon="folder" />,
        parentOpen: <FontAwesomeIcon className="rct-icon rct-icon-parent-open" icon="folder-open" />,
        leaf: <FontAwesomeIcon className="rct-icon rct-icon-leaf-close" icon="file" />
      }}
      />
    </Card.Body>
  </Card>
  )
  }

export default OrganizationFilterCard
