import React, { FC } from 'react'
import CardHeader from '@mui/material/Card'
import CardCloseButton from '../CardCloseButton/CardCloseButton'
import Tooltip from '@mui/material/Tooltip'
import Switch from '@mui/material/Switch'
import { Form as RBSForm } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'

interface JEMSIAFCardHeaderProps {
  title?: string
  enabled?: boolean
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

const JEMSIAFCardHeader: FC<JEMSIAFCardHeaderProps> = ({ title, enabled, onChange }: JEMSIAFCardHeaderProps) => {
  const isFilterActive = enabled || false
  title = title || 'Untitled Card'
  return (
    <CardHeader data-testid="JEMSIAFCardHeader">
      <CardCloseButton />
      <span style={{ fontWeight: 'bold' }}> {title} </span>
      <Tooltip title={isFilterActive ? 'Disable Filter' : 'Enable Filter'}>
        <Switch
          checked={isFilterActive}
          onChange={(event) => {
            onChange && onChange(event)
          }}
          color="primary"
          aria-label="Enable/Disable Filter"
        />
      </Tooltip>
      <ToastContainer />
    </CardHeader>
  )
}

export default JEMSIAFCardHeader
