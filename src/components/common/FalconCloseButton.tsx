import React from 'react'
import { CloseButton } from 'react-bootstrap'
import classNames from 'classnames'
import { useAppSelector } from '../../app/hooks'

type Props = {
  size?: 'sm' | 'lg'
  noOutline?: boolean
  variant?: 'white'
  onClick?: React.MouseEventHandler
  className?: string
}
const FalconCloseButton = ({ size, onClick, noOutline, variant, className, ...rest }: Props) => {
  const uiSettings = useAppSelector((state) => state.uiSettings)
  const isDark = uiSettings.isDark
  return (
    <CloseButton
      variant={variant ? variant : isDark ? 'white' : undefined}
      className={classNames(className, {
        [`btn-${size}`]: size,
        'outline-none': noOutline
        // [className]: className
      })}
      onClick={onClick}
      {...rest}
    />
  )
}

export default FalconCloseButton
