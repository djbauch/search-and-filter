import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import _ from 'lodash'
import type { RootState } from 'app/store'
import type { Organization, OrganizationNode } from 'typings/sharedTypes'
import { Node as TreeNode } from 'react-checkbox-tree'
import { sampleOrganizations } from './organizationFilterData'
const organizationData = sampleOrganizations()
const topLevelOrganizations = _.uniq(_.map(organizationData, (o) => o.organization))
let organizationNodes: TreeNode[] =_.map(topLevelOrganizations, (o) => {return {value: o, label: o, children: _.filter(organizationData, {'organization': o})}})
interface OrganizationState {
  orgDataNodes: TreeNode[]
  checked: string[]
  expanded: string[]
  orgFilterOn: boolean
}

const initialState: OrganizationState = {
  orgDataNodes: organizationNodes,
  checked: [],
  expanded: [],
  orgFilterOn: false
}

export const organizationsSlice = createSlice({
  name: 'organizations',
  initialState,
  reducers: {
    setChecked: (state, action: PayloadAction<string[]>) => {
      state.checked = action.payload
    },
    setExpanded: (state, action: PayloadAction<string[]>) => {
      state.expanded = action.payload
    },
    setEnabled: (state, action: PayloadAction<boolean>) => {
      state.orgFilterOn = action.payload
    }
  },
})

export const { setChecked, setExpanded, setEnabled } = organizationsSlice.actions
export const selectOrganizations = (state: RootState) => state.organizations.value
export default organizationsSlice.reducer
