import * as React from 'react'
import { getCombatantCommands} from './CombatantCommandsData'
import { useAppSelector, useAppDispatch } from '../../app/hooks'

import { addCC } from './combatantCommandsSlice'

export function Counter() {
  const ccs = useAppSelector((state) => state.combatantCommands.value)
  const dispatch = useAppDispatch()

  return (
    <div>
      TODO: Combatant Commands List here
    </div>
  )
}
