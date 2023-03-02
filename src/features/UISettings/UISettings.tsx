import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'

import {
  setFluid,
  setRTL,
  setDark,
  setNavbarPosition,
  setShowBurgermenu,
  setCurrency,
  setNavbarVerticalCollapsed,
  setNavbarStyle
} from './uiSettingsSlice'

const handleNavbarPositionChange = (event: React.MouseEvent<HTMLElement>, newPosition: 'vertical' | 'horizontal') => {
  setNavbarPosition(newPosition)
}

const NavbarPositionControl = (position: 'vertical' | 'horizontal') => {
  return (
    <ToggleButtonGroup
      color="primary"
      value={position}
      exclusive
      onChange={handleNavbarPositionChange}
      aria-label="Navbar Position"
    >
      <ToggleButton value="vertical">Vertical</ToggleButton>
      <ToggleButton value="horizontal>">Horizontal</ToggleButton>
    </ToggleButtonGroup>
  )
}
export function UISettings() {
  const uiSettings = useAppSelector((state) => state.uiSettings)
  const dispatch = useAppDispatch()
  const isFluid = uiSettings.isFluid
  const isRTL = uiSettings.isRTL
  const isDark = uiSettings.isDark
  const navbarPosition = uiSettings.navbarPosition
  const showBurgerMenu = uiSettings.showBurgerMenu
  const currency = uiSettings.currency
  const navbarVerticalCollapsed = uiSettings.isNavbarVerticalCollapsed
  const navbarStyle = uiSettings.navbarStyle

  return (
    <FormGroup>
      <FormControlLabel control={isFluid ? <Switch defaultChecked /> : <Switch />} label="Fluid" />
      <FormControlLabel control={isRTL ? <Switch defaultChecked /> : <Switch />} label="RTL" />
      <FormControlLabel control={isDark ? <Switch defaultChecked /> : <Switch />} label="Dark" />
      <FormControlLabel control={showBurgerMenu ? <Switch defaultChecked /> : <Switch />} label="Show Burgermenu" />
      <FormControlLabel control={NavbarPositionControl(navbarPosition)} label="Navbar Position" />
    </FormGroup>
  )
}
