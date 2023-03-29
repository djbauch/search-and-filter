import * as React from 'react'
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import '../../bootstrap.css'

// Note: Because we're using webpack, which supports tree-shaking, we can safely use named imports
// See: https://mui.com/material-ui/guides/minimizing-bundle-size/

import { Form, ToggleButton } from 'react-bootstrap'

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

const NavbarPositionControl = () => {
  const dispatch = useAppDispatch()
  const uiSettings = useAppSelector((state) => state.uiSettings)
  const navbarPosition = uiSettings.navbarPosition
  const handleNavbarPositionChange = (newPosition: 'vertical' | 'horizontal', event: React.MouseEvent<HTMLElement>) => {
    dispatch(setNavbarPosition(newPosition))
  }
  const handleVerticalButton = () => {
    dispatch(setNavbarPosition('vertical'))
  }
  const handleHorizontalButton = () => {
    dispatch(setNavbarPosition('horizontal'))
  }
  return (
    <div key="inline-navbar-position" className="mb-3" color="primary" aria-label="Navbar Position">
      <Form.Label>Navbar Position&nbsp;</Form.Label>
      <ToggleButton
        onClick={handleVerticalButton}
        checked={navbarPosition === 'vertical'}
        name="navbar"
        type="radio"
        value="vertical"
      >
        Vertical
      </ToggleButton>
      <ToggleButton
        onClick={handleHorizontalButton}
        checked={navbarPosition === 'horizontal'}
        name="navbar"
        type="radio"
        value="horizontal"
      >
        Horizontal
      </ToggleButton>
    </div>
  )
}

export const UISettings = () =>{
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
  const handleFluidChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFluid(e.target.checked))
  }
  const handleRTLChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setRTL(e.target.checked))
  }
  const handleDarkChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setDark(e.target.checked))
  }
  const handleBurgerChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setShowBurgermenu(e.target.checked))
  }
  const handleVerticalChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setNavbarVerticalCollapsed(e.target.checked))
  }
  const handleCurrencyChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setCurrency(event.target.value))
  }
  return (
    <Form>
      <Form.Group style={{ marginLeft: 8 }}>
        <Form.Switch size={12} checked={isFluid} onChange={handleFluidChanged} label="Fluid" />
        <Form.Switch size={12} checked={isRTL} onChange={handleRTLChanged} label="RTL" />
        <Form.Switch size={12} checked={isDark} onChange={handleDarkChanged} label="Dark" />
        <Form.Switch
          size={12}
          checked={isNavbarVerticalCollapsed}
          onChange={handleVerticalChanged}
          label="Collapsed Vertical Navbar"
        />
        <Form.Switch size={12} checked={showBurgerMenu} onChange={handleBurgerChanged} label="Show Burgermenu" />
        <Form.Label htmlFor="currency-select" id="currency-select-label">
          Currency
        </Form.Label>
        <Form.Select
          size="sm"
          style={{ width: 220 }}
          id="currency-select"
          value={currency}
          onChange={handleCurrencyChanged}
        >
          <option value="$">$ dollar or peso</option>
          <option value="€">€ euro</option>
          <option value="fr">fr franc</option>
          <option value="₴">₴ hryvnia</option>
          <option value="£">£ pound</option>
          <option value="₩">₩ won</option>
          <option value="¥">¥ yuan</option>
          <option value="¤">¤ generic</option>
        </Form.Select>

        <NavbarPositionControl />
      </Form.Group>
    </Form>
  )
}
export default UISettings