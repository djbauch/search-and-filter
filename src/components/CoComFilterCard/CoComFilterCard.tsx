import React, { FC } from 'react'
import Tooltip from 'react-bootstrap/Tooltip'
import Card from 'react-bootstrap/Card'
import CheckboxTree from 'react-checkbox-tree'
import 'react-checkbox-tree/lib/react-checkbox-tree.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare, faCheckSquare, faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import JEMSIAFCardHeader from '../JEMSIAFCardHeader/JEMSIAFCardHeader'
import CardDropdown from '../CardDropdown/CardDropdown'
import { useAppSelector, useAppDispatch } from 'app/hooks'
import styles from './CoComFilterCard.module.css'
import { setChecked, setExpanded, setEnabled } from 'features/combatantCommands/combatantCommandsSlice'
export type CoComFilterCardProps = {}

const CoComFilterCard: FC = () => {
  const ccs = useAppSelector((state) => state.combatantCommands)
  const dispatch = useAppDispatch()
  const value = ccs.value
  const checked = ccs.checked
  const expanded = ccs.expanded
  const enabled = ccs.enabled
  const checkChanged = (checked: string[]) => {
    console.log(`Checked ${JSON.stringify(checked)}`)
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
  return (
    <Card border="primary" data-testid="CoComFilterCard">
      <JEMSIAFCardHeader title="COCOMs" enabled={enabled} onChange={filterToggled}/>
      <Card.Body>
      <CheckboxTree
        nodes={value}
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

export default CoComFilterCard
