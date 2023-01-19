import React, { FC } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import classNames from 'classnames'

interface CardCloseButtonProps {
  size?: 'small' | 'medium' | 'large'
  noOutline?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  className?: string
}

const CardCloseButton: FC<CardCloseButtonProps> =
 ({size = 'small', onClick = ()=>{}, noOutline, className='button', ...rest}: CardCloseButtonProps) => (
  <IconButton size={size}
      className={classNames(className, {
        [`btn-${size}`]: size,
        'outline-none': noOutline || false,
      })}
      onClick={onClick}
      aria-label="Close"
      data-testid="CardCloseButton"
      {...rest}
    >
      <CloseIcon/>
    </IconButton>
)

export default CardCloseButton;
