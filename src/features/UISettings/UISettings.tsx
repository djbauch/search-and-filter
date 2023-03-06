import * as React from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
// Note: Because we're using webpack, which supports tree-shaking, we can safely use named imports
// See: https://mui.com/material-ui/guides/minimizing-bundle-size/
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Switch,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material'

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


const NavbarPositionControl = (position: 'vertical' | 'horizontal' | 'top' | 'combo') => {
  const dispatch = useAppDispatch()
  const handleNavbarPositionChange = (event: React.MouseEvent<HTMLElement>, newPosition: 'vertical' | 'horizontal') => {
    dispatch(setNavbarPosition(newPosition))
  }

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
  const isNavbarVerticalCollapsed = uiSettings.isNavbarVerticalCollapsed
  const navbarStyle = uiSettings.navbarStyle

  // We don't really need the event for anything, but if we did, it's like this:
  const handleFluidChanged = (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    dispatch(setFluid(checked))
  }
  const handleRTLChanged = (_: any, checked: boolean) => {
    dispatch(setRTL(checked))
  }
  const handleDarkChanged = (_: any, checked: boolean) => {
    dispatch(setDark(checked))
  }
  const handleBurgerChanged = (_: any, checked: boolean) => {
    dispatch(setShowBurgermenu(checked))
  }
  const handleVerticalChanged = (_: any, checked: boolean) => {
    dispatch(setNavbarVerticalCollapsed(checked))
  }
  const handleCurrencyChanged = (event: SelectChangeEvent<string>, child: React.ReactNode) => {
    dispatch(setCurrency(event.target.value))
  }
  return (
    <FormGroup>
      <FormControlLabel control={<Switch size="small" sx={{ml: 2}} checked={isFluid} onChange={handleFluidChanged} />} label="Fluid" />
      <FormControlLabel control={<Switch size="small" sx={{ml: 2}} checked={isRTL} onChange={handleRTLChanged} />} label="RTL" />
      <FormControlLabel control={<Switch size="small" sx={{ml: 2}} checked={isDark} onChange={handleDarkChanged} />} label="Dark" />
      <FormControlLabel
        control={<Switch size="small" sx={{ml: 2}} checked={isNavbarVerticalCollapsed} onChange={handleVerticalChanged} />}
        label="Collapsed Vertical Navbar"
      />
      <FormControlLabel
        control={<Switch size="small" sx={{ml: 2}} checked={showBurgerMenu} onChange={handleBurgerChanged} />}
        label="Show Burgermenu"
      />
      <FormControl sx={{ml:2, mt: 1, width:220}}>
        <InputLabel id="currency-select-label">Currency</InputLabel>
        <Select
          labelId="currency-select-label"
          id="currency-select"
          value={currency}
          label="Currency"
          onChange={handleCurrencyChanged}
        >
          <MenuItem value="$">$ dollar or peso</MenuItem>
          <MenuItem value="€">€ euro</MenuItem>
          <MenuItem value="fr">fr franc</MenuItem>
          <MenuItem value="₴">₴ hryvnia</MenuItem>
          <MenuItem value="£">£ pound</MenuItem>
          <MenuItem value="₩">₩ won</MenuItem>
          <MenuItem value="¥">¥ yuan</MenuItem>
          <MenuItem value="¤">¤ generic</MenuItem>
        </Select>
      </FormControl>
      <FormControlLabel sx={{ml:2, mt: 1}}control={NavbarPositionControl(navbarPosition)} label="&nbsp;Navbar Position" />
    </FormGroup>
  )
}
