//env() variables are set in .env and injected by react-env
import env from '@beam-australia/react-env'
import _ from 'lodash'
/* Server Parameters */
export const SERVER_PROTOCOL: string = 'http'
export const SERVER_DOMAIN: string = 'localhost'
export const SERVER_PORT: string = '8000'

export const SERVER_AUTH_PATH: string = 'login'
export const SERVER_UPLOAD_PATH: string = 'upload'
export const SERVER_PROJECT_EXPORT_PATH: string = 'projectExport'

/* ArcGIS Parameters */
export const ARCGIS_ELEVATION_SERVICE_URL: string = env('ARCGIS_ELEVATION_SERVICE_URL')
export const BASEMAP_URL: string = env('BASEMAP_URL')
export const BASEMAP_TYPE: string = env('BASEMAP_TYPE')
export const ELEVATION_LAYER_URL: string = env('ELEVATION_LAYER_URL')
export const GEOJSON_LAYER_URL: string = env('GEOJSON_LAYER_URL')
export const GEOJSON_LAYER_TITLE: string = env('GEOJSON_LAYER_TITLE')

// Digital Library Paramater
export const DIGITAL_LIBRARY_URL: string = env('DIGITAL_LIBRARY_URL')

/* jemsiaf-ws Parameters */
export const JEMSIAF_WS_PATHLOSS_SERVICE_URL: string = env('JEMSIAF_WS_PATHLOSS_URL')

//DO NOT COMMIT THIS AS TRUE FOR PRODUCTION (DEVELOPMENT ONLY)!
//To use authentication, run `node server.js` in a separate terminal
export const DEV_BYPASS_LOGIN: boolean = true

//Enables the ability to log in using a CAC card
export const ENABLE_CAC_LOGIN: boolean = false
export const ENABLE_SIPR_TOKEN_LOGIN: boolean = false

/*
 * Dashboard variables
 */
export const dashboardMaxNumTopWidgets: number = 5
export const dashboardMaxNumRightWidgets: number = 5
export const dashboardTopKey: string = 'top'
export const dashboardCenterKey: string = 'center'
export const dashboardRightKey: string = 'right'

export const SYSTEM_CLASSIFICATION: string = env('JEMSIAF_SYSTEM_CLASSIFICATION')

export const classifications = [
  {
    key: 'U',
    text: 'UNCLASSIFIED',
    classes: 'unclassified'
  },
  {
    key: 'C',
    text: 'CONFIDENTIAL',
    classes: 'confidential'
  },
  {
    key: 'CUI',
    text: 'CONTROLLED (CUI)',
    classes: 'controlled-cui'
  },
  {
    key: 'S',
    text: 'SECRET',
    classes: 'secret'
  },
  {
    key: 'TS',
    text: 'TOP SECRET',
    classes: 'top-secret'
  },
  {
    key: 'TSSCI',
    text: 'TOP SECRET//SCI',
    classes: 'top-secret-sci'
  }
]

export const getClsHeaderData = (key: string) => {
  let headerData = _.find(classifications, (o) => {return o.key === key})
  return headerData
}

/*
 * Given a path, constructs a URL from the server settings. At a minimum, SERVER_DOMAIN must be declared.
 */
export const getServerUrl = (path: string) => {
  let url: string = ''
  if (SERVER_PROTOCOL) {
    url += SERVER_PROTOCOL + '://'
  }

  url += SERVER_DOMAIN

  if (SERVER_PORT) {
    url += ':' + SERVER_PORT
  }

  if (path) {
    url += '/' + path
  }

  return url
}

// current version for display on classification banner
export const currentVersion: string = env('JEMSIAF_CURRENT_VERSION')

export const version = '3.0.0'
export const navbarBreakPoint = 'xl' // Vertical navbar breakpoint
export const topNavbarBreakpoint = 'lg'

export const settings = {
  isFluid: false,
  isRTL: false,
  isDark: true,
  navbarPosition: 'vertical',
  showBurgerMenu: false, // controls showing vertical nav on mobile
  currency: '$',
  isNavbarVerticalCollapsed: false, // toggle vertical navbar collapse
  navbarStyle: 'transparent'
}

const defaults = {
  SERVER_AUTH_PATH,
  SERVER_UPLOAD_PATH,
  SERVER_PROJECT_EXPORT_PATH,
  getServerUrl,
  version,
  navbarBreakPoint,
  topNavbarBreakpoint,
  settings
}
export default defaults
