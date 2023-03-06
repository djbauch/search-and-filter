// Use this as an exemplar of how to define Slice State and Action Types in TypeScript
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

// Define a type for the slice state
interface SettingsState {
  isFluid: boolean
  isRTL: boolean
  isDark: boolean
  navbarPosition: 'vertical' | 'horizontal' /* and */ | 'top' | 'combo'
  showBurgerMenu: boolean
  currency: string
  isNavbarVerticalCollapsed: boolean
  isNavbarCollapsed: boolean
  navbarStyle: string // 'transparent' or something else, but I don't know what
}

// Define the initial state using that type
const initialState: SettingsState = {
  isFluid: false,
  isRTL: false,
  isDark: true,
  navbarPosition: 'vertical',
  showBurgerMenu: false, // controls showing vertical nav on mobile
  currency: '$',
  isNavbarVerticalCollapsed: false, // toggle vertical navbar collapse
  isNavbarCollapsed: false,
  navbarStyle: 'transparent'
}

// Make sure the Immer library is copying over the state correctly!
export const settingsSlice = createSlice({
  name: 'settings',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setFluid: (state, action: PayloadAction<boolean>) => {
      state.isFluid = action.payload
    },
    setRTL: (state, action: PayloadAction<boolean>) => {
      state.isRTL = action.payload
    },
    setDark: (state, action: PayloadAction<boolean>) => {
      state.isDark = action.payload
    },
    setNavbarPosition: (state, action: PayloadAction<'vertical' | 'horizontal'>) => {
      state.navbarPosition = action.payload
    },
    setShowBurgermenu: (state, action: PayloadAction<boolean>) => {
      state.showBurgerMenu = action.payload
    },
    setCurrency: (state, action: PayloadAction<string>) => {
      state.currency = action.payload
    },
    setNavbarVerticalCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isNavbarVerticalCollapsed = action.payload
    },
    setNavbarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isNavbarCollapsed = action.payload
    },
    setNavbarStyle: (state, action: PayloadAction<string>) => {
      state.navbarStyle = action.payload
    }
  }
})

export const {
  setFluid,
  setRTL,
  setDark,
  setNavbarPosition,
  setShowBurgermenu,
  setCurrency,
  setNavbarVerticalCollapsed,
  setNavbarCollapsed,
  setNavbarStyle
} = settingsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectSettings = (state: RootState) => state.uiSettings

export default settingsSlice.reducer
