import { FeatureCollection, GeoJSON } from 'geojson'
import JGlobe from '../components/globe/JGlobe'
import Map from '@arcgis/core/Map'
import View from '@arcgis/core/views/View'
import SceneView from '@arcgis/core/views/SceneView'

export type DashboardStateType = {
  widgetKey: string
  location: string //top, center, right
}

export type Project = {
  id: string
  name: string
  description: string
  data: {}
  owner: string
  shared: boolean
  sharedUsers: string[]
  sharedGroups: string[]
  editable: string[]
  created: string
  modified: string
}

export type GeoFeature = {
  type: string
  features: Array<{
    geometry: {
      type: string
      coordinates: number[][]
    }
    properties: {
      id: string
      name: string
      tooltip: string
      range: number
      iconCode: string
    }
  }>
}

export type AOR = {
  type: string
  geometry: {
    type: string
    coordinates: number[][][]
  }
  properties: { COMMAND: string }
}

export type CCItem = {
  key?: string
  ccmd: string
  checked: boolean
  focus: string //any
}

export type CCOrg = {
  ccmd: string
  organizations: string[]
}

//Note: org and plat are held in the same topoState object of type CCState
//so they need separate on/off identifiers, ccState just needs one, could
//reuse one of the others but made ccmdFilterOn for clarity
export type CCStateType = {
  treeChecked: Array<string>
  treeExpanded: Array<string>
  ccStore: Array<CCItem>
  platChecked: string[]
  ccmdFilterOn?: boolean
  orgFilterOn?: boolean
  platFilterOn?: boolean
}

export type CCState = CCStateType

export type CombatantCommand = {
  key?: string
  value: string
  label: string
  focus: {
    latitude: number
    longitude: number
    altitude: number
  }
  children?: Array<PlanChild>
}

export type PlatformType = {
  id: string
  value: string
  label: string
  fontColor?: string
}

export type FreqFilterType = {
  id: string
  label: string
  children: [
    {
      id: string
      band: { low: number; high: number }
      label: string
      units: string
    }
  ]
}

export type FreqStateType = {
  lowFreq: number
  highFreq: number
  units: string
  checked: Array<any>
  expanded: Array<string>
  activeFilter: FreqFilterType
  filterOn: (e: { filterId: string; eventType: string; value: any }) => void
}

export type TempStateType = {
  startDate: string
  endDate: string
  timeZone: string
  filterOn: (e: { filterId: string; eventType: string; value: any }) => void
}

export type FuncStateType = {
  functionalValues: Array<FuncItemType>
  filterOn: (e: { filterId: string; eventType: string; value: any }) => void
}

export type FuncItemType = {
  id: string
  value: string
  dropdownOpen: boolean
}

export type TopoStateType = {
  ccStore: Array<string>
  platChecked: Array<string>
  treeChecked: Array<string>
  treeExpanded: Array<string>
  orgFilterOn?: boolean
  platFilterOn?: boolean
  ccmdFilterOn?: boolean
}

export type GlobeLayoutProps = {
  handleLogout: () => Promise<void>
  handleHelp: () => Promise<void>
  handleElib: () => Promise<void>
  getCombatantCommands: () => CombatantCommand[]
  getCoComAORs: (arg0: CCItem[]) => FeatureCollection
  saveCurrentProject: () => any
  getPlatformTypes: () => PlatformType[]
  getOrganizations: () => Organization[]
  getTimeZoneOptions: () => TimezoneOption[]
  getUsers: () => UserAndGroups[]
  getGroups: () => { group: string }[]
  saveAsProject: (projectInfo: Project, sourceProjectId: string) => boolean
  deleteProject: (projectId: string) => boolean
  editProjectDetails: (projectInfo: Project) => boolean
  saveProject: (project: any) => Promise<boolean>
  shareProject: (project: Project) => boolean
  unshareProject: (projectId: string) => boolean
  exportProject: any
  loadProject: (projectId: string) => void
  newProject: any
  getProjectById: any
  getProjectDetailsById: any
  getProjectList: () => Project[]
  isProjectNameUnique: any
  getExportProjectDataTypes: any
  getDocumentList: any
  getImportDataTypes: () => ImportDataTypes
  getExportDataTypes: () => ExportDataTypes
  getExportImageFormats: () => ExportDataTypes
  getExportDataFormats: () => ExportDataTypes
  getExportSnapshotFormats: () => ExportDataTypes
  doDataExport: (format: string, data: Object) => void
  doImageExport: (format: string, canvas: Object) => void
  doSnapshotExport: (format: string, canvas: Object) => void
  getIconImage: any
  getGlobeDataGeoJSON: () => FeatureCollection
  loadShapefileFromURL: any
  loadShapefileFromFile: any
  getTopNavSearchJSON: (filter: string) => SearchItem[]
  showProjectName: boolean
  setShowProjectName: (boolean) => void
  geojsonLayerVisible: boolean
  setGeojsonLayerVisible: (boolean) => void
  surfaceShapeLayerVisible: boolean
  setSurfaceShapeLayerVisible: (boolean) => void
  getSubscriptionLists: SubscriptionListType
  handleSubscriptionChange: any
  reorderSubscriptionList: any
  subscribedNewsList: Array<NewsBlurb>
  handleNewsListChange: any
  getSceneView: (sceneView: SceneView) => void
  setSelectedMenuItem: any
  dashboardActiveTab: any
  setDashboardActiveTab: any
  monumentPosition: any
}

export type PositionHistory = {
  ccmd: string
  latitude: number
  longitude: number
  altitude: number
}

export type JGlobeProps = {
  ref: any
  widgetKey: string
  tabName: string
  latitude: number // +/-90 degrees
  longitude: number // +/-180 degrees
  altitude: number // meters above sea level (MSL)
  importShapefile?: (map: Map, view: View, url: string) => void
  importLayerURL?: (url: string, title: string) => void
  layersVisible: boolean
  getIconImage: () => string
  getGlobeDataGeoJSON: () => FeatureCollection
  loadShapefileFromURL: (map: Object, view: Object, url: string, title: string) => void
  loadShapefileFromFile: (map: Object, view: Object, filename: string, title: string) => void
  handleCameraUpdate: any
}

export type Organization = {
  id: string
  organization: string
  value: string
  label: string
  children?: Array<{
    value: string
    label: string
  }>
}

export type PlanChild = {
  value: string
  label: string
  children?: Array<PlanChild>
}

export type Plan = {
  ccmd: string
  children: Array<PlanChild>
}

export type OrganizationNode = {
  value: string
  label: string
  children: Array<any>
  disabled?: boolean
}

export type ProjectDescription = {
  id: string
  name: string
  description: string
  edit?: boolean
}

export type ProjectType = {
  id: string
  name: string
  description: string
  data: ProjectDataType // JSON representation
  owner: string
  shared: boolean
  sharedUsers: Array<string>
  sharedGroups: Array<string>
  editable: string[]
  created: string
  modified: string
  exportProjectDataType?: string
}

export type ProjectDataType = {
  ccPersistState?: CCStateType
  freqPersistState?: FreqStateType
  filterPersistState?: FilterPositionType
  funcPersistState?: FuncStateType
  tempPersistState?: TempStateType
  topoPersistState?: TopoStateType
  dashboardActiveTabPersistState?: string
  dashboardPersistState?: Array<DashboardWidgetKeyType>
  cameraPersistState?: CameraStateType
  iconSetPersistState?: string
  mapViewPersistState?: MapViewType
  projectLayerListPersistState?: Array<ProjectLayerType>
}

export type ProjectLayerType = {
  layerID: string
  layerTitle: string
  layerURL: string
  visible: boolean
}

export type CameraStateType = {
  heading: number
  tilt: number
  position: {
    longitude: number
    latitude: number
    altitude: number
  }
}

export type GlobeLocationType = {
  ccmd: string
  lattitude: number
  longitude: number
  altitude: number
}

export type MapViewType = {
  lattitude: number
  longitude: number
  altitude: number
}

export type DashboardWidgetKeyType = {
  widgetKey: string
  location: string
}

export type FilterPositionType = {
  activeKey: string
  height: number
  vertical: boolean
  width: number
  x: number
  y: number
}

export type ProjectsCardProps = {
  key: string
  getUsers: () => UserAndGroups[]
  getGroups: () => { group: string }[]
  saveAsProject: (projectData: Project, id: string) => void
  deleteProject: (id: string) => void
  editProjectDetails: (projectData: Project) => void
  saveCurrentProject
  saveProject: (project: Project) => Promise<boolean>
  shareProject: (project: Project) => void
  unshareProject
  exportProject
  loadProject: (id: string) => void
  newProject
  getProjectById
  getProjectDetailsById
  isProjectNameUnique
  getExportProjectDataTypes
  onDashboardChange
  getProjectList: () =>  Project[]
  handleProjectAction?
}

export type Document = {
  id: string
  name: string
  description: string
  created: string
  modified: string
}

export type SearchItem = {
  categories: string
  url: string
  key: string
  text: string
  type?: string
  title?: string
}

export type TimezoneOption = {
  id: string
  value: string
  label: string
}

export type IconLibraryDesc = {
  id: number
  title: string
  value: string
}

export type ExportDataType = {
  id: string
  value: string
  label: string
}
export type ExportDataTypes = ExportDataType[]

export type ImportDataType = ExportDataType
export type ImportDataTypes = ImportDataType[]

export type ExportProjectDataType = {
  id: string
  value: string
  mimeType: string
  label: string
}

export type ExportProjectDataTypes = ExportProjectDataType[]

export interface ImportedFile extends File {
  name: string
}

export type ImportedFiles = ImportedFile[]

export interface FileSpec extends File {
  id: string
  src: string
  base64: any
  path: string
}

//type to define information expected for each point/platform on the esri globe
export type TooltipType = {
  nomenclature: string
  documents: Array<{ documentTitle: string; documentRef: string }>
  summary: string
  frequencies: Array<{ low: number; high: number }>
  details: Array<{ fieldName: string; value: string }>
  description: string
}

//type to define information expected for each point/platform on the esri globe
export type MapFeatureType = {
  type: string
  geometry: { type: string; coordinates: number[][] } //is this only a point?
  properties: MapFeaturePropertiesType
}

export type MapFeaturePropertiesType = {
  id: string
  name: string
  iconCode: string
  ccmd: string
  dateStart: Date
  dateStop: Date
  platformtype: string
  organization: string
  tooltip: string
  range: number
  nomenclature: string
  description: string
  documents: Array<{ documentTitle: string; documentRef: string }>
  frequencies: Array<{ low: number; high: number }>
  details: Array<{ fieldName: string; value: string }>
  rcs: any
}

export type TopNavBarSearchItem = {
  categories: string
  url: string
  key?: string
  title?: string
  text: string
  type?: string
}

export type TopNavBarSearchItems = TopNavBarSearchItem[]

export type ImportExportDropDownProps = {
  jglobeRef: React.RefObject<JGlobe>
  getImportDataTypes: () => ImportDataTypes
  getExportDataTypes: () => ExportDataTypes
  getExportImageFormats: () => ExportDataTypes
  getExportDataFormats: () => ExportDataTypes
  getExportSnapshotFormats: () => ExportDataTypes
  doDataExport: (format: string, data: Object) => void
  doImageExport: (format: string, canvas: Object) => void
  doSnapshotExport: (format: string, canvas: Object) => void
  freqState: FreqStateType
  tempState: TempStateType
  funcState: FuncStateType
  topoState: TopoStateType
  ccState: CCStateType
  getPlatformTypes: () => PlatformType[]
  getGlobeDataGeoJSON: any
}

export type NavBarTopProps = {
  selectedMenuItem: string
  handleLogout: () => Promise<void>
  onMenuSelectionChange: any
  handleHelp: () => Promise<void>
  handleElib: () => Promise<void>
  onSearchChange: (value: string) => void
  getTopNavSearchJSON: (searchFilter: string) => SearchItem[]
  getExportDataTypes: () => ExportDataTypes
  getExportImageFormats: () => ExportDataTypes
  getExportDataFormats: () => ExportDataTypes
  getExportSnapshotFormats: () => ExportDataTypes
  doDataExport: (format: string, data: Object) => void
  doImageExport: (format: string, canvas: Object) => void
  doSnapshotExport: (format: string, canvas: Object) => void
  getImportDataTypes: () => ImportDataTypes
  jglobeRef: React.RefObject<JGlobe>
  showProjectName: boolean
  projectName: string
  handleNewsListChange: any
}

export type TreeNode = {
  value: string
  children?: Array<TreeNode>
}
export type UserAndGroups = {
  user: string
  groups: string[]
}

export type Group = {
  group: string
}

export type FrequencyRange = {
  low: number
  high: number
}

export type FrequencyBand = {
  id: string
  band: FrequencyRange
  label: string
  units?: string
}

export type FrequencyBandCollection = {
  id: string
  label: string
  children: FrequencyBand[]
}

export type FrequencyUnits = {
  id: string
  value: number
  label: string
}

export type FrequencyField = {
  value: string
  band: FrequencyRange
  label: string
  className: string
}

export type FrequencyNode = {
  value: string
  label: string
  children: FrequencyField[]
}

export type FrequencyNodes = FrequencyField[]

export type FunctionalOpt = {
  id: string
  value: string
  label: string
}

export type FunctionalOpts = FunctionalOpt[]

export type LatLon = {
  lat: number
  lng: number
}

export type Polygon = {
  id: string
  name: string
  closed: boolean
  points: LatLon[]
}

export type Polygons = Polygon[]

export type RFSource = {
  id: string
  name: string
  location: LatLon
  iconCode: string
  range: number
}

export type RFSources = RFSource[]

export type UserPassCredentials = {
  username: string
  password: string
}

export type NewsBlurb = {
  title: string
  titleTag: string
  summary: string
  content: string
  backgroundColor?: string
  image?: any
  col?: number
  time?: any
  children?: any
  tags: Array<string>
}

export type AvailableSubscription = {
  title: string
  tags: Array<string>
  alert: boolean
}

export type SubscriptionListType = {
  available: Array<AvailableSubscription>
  subscribed: Array<AvailableSubscription>
}

export type LogoProps = {
  at: 'navbar-vertical' | 'navbar-top' | 'auth'
  width: number
  className: string
}
