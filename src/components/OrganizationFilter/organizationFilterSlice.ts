import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import _ from 'lodash'
import type { RootState } from 'app/store'
import type { Organization, OrganizationNode } from 'typings/sharedTypes'
import { Node as TreeNode } from 'react-checkbox-tree'
import { sampleOrganizations } from 'server/sampleData'
const organizationData = sampleOrganizations()
const topLevelOrganizations = _.uniq(_.map(organizationData, (o) => o.organization))
let organizationNodes: TreeNode[] =_.map(topLevelOrganizations, (o) => {return {value: o, label: o, children: _.filter(organizationData, {'organization': o})}})
interface OrganizationState {
  orgDataNodes: TreeNode[]
  checked: string[]
  expanded: string[]
  filterOn: boolean
}

const initialState: OrganizationState = {
  orgDataNodes: organizationNodes,
  checked: [],
  expanded: [],
  filterOn: false
}

export const combatantCommandsSlice = createSlice({
  name: 'combatantCommands',
  initialState,
  reducers: {
    setChecked: (state, action: PayloadAction<string[]>) => {
      state.checked = action.payload
    },
    setExpanded: (state, action: PayloadAction<string[]>) => {
      state.expanded = action.payload
    },
    setEnabled: (state, action: PayloadAction<boolean>) => {
      state.filterOn = action.payload
    }
  },
})

export const { setChecked, setExpanded, setEnabled } = combatantCommandsSlice.actions
export const selectCombatantCommands = (state: RootState) => state.combatantCommands.value
export default combatantCommandsSlice.reducer
