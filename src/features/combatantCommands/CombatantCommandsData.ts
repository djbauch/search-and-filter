import { toast } from 'react-toastify'
import type { CombatantCommand, Plan } from '../../typings/sharedTypes'


 const sampleCombatantCommands = (): CombatantCommand[] => {
  return [
    {
      value: 'AFRICOM',
      label: 'AFRICOM',
      // Comment out focus point that is the headquarters of the CCMD.
      // "focus": { "latitude": "48.722572327563334", "longitude": "9.179987160512763", "altitude": "10e3" }
      // Now use (roughly) the center of the CCMD boundary.
      focus: { latitude: -19.1, longitude: 20.5, altitude: 20e6 },
    },
    {
      value: 'CENTCOM',
      label: 'CENTCOM',
      // Comment out focus point that is the headquarters of the CCMD.
      // "focus": { "latitude": "27.85873304942704", "longitude": "-82.48820149594036", "altitude": "10e3" }
      // Now use (roughly) the center of the CCMD boundary.
      focus: { latitude: 26.9, longitude: 56.0, altitude: 20e6 },
    },
    {
      value: 'CYBERCOM',
      label: 'CYBERCOM',
      focus: { latitude: 39.100461859153924, longitude: -76.72889792116956, altitude: 10e3 },
    },
    {
      value: 'EUCOM',
      label: 'EUCOM',
      // Comment out focus point that is the headquarters of the CCMD.
      // "focus": { "latitude": "48.73598582711045", "longitude": "9.080594084331562", "altitude": "10e3" }
      // Now use (roughly) the center of the CCMD boundary.
      focus: { latitude: 55.0, longitude: 30.0, altitude: 20e6 },
    },
    {
      value: 'INDOPACOM',
      label: 'INDOPACOM',
      // Comment out focus point that is the headquarters of the CCMD.
      // "focus": { "latitude": "21.386228474065085", "longitude": "-157.90838613838628", "altitude": "10e3" }
      // Now use (roughly) the center of the CCMD boundary.
      focus: { latitude: 0.0, longitude: 180.0, altitude: 20e6 },
    },
    {
      value: 'NORTHCOM',
      label: 'NORTHCOM',
      // Comment out focus point that is the headquarters of the CCMD.
      // "focus": { "latitude": "38.82500236275303", "longitude": "-104.70008541970759", "altitude": "10e3" }
      // Now use (roughly) the center of the CCMD boundary.
      focus: { latitude: 48.5, longitude: -110.0, altitude: 20e6 },
    },
    {
      value: 'SOUTHCOM',
      label: 'SOUTHCOM',
      // Comment out focus point that is the headquarters of the CCMD.
      // "focus": { "latitude": "25.818948255136018", "longitude": "-80.34541843316126", "altitude": "10e3" }
      // Now use (roughly) the center of the CCMD boundary.
      focus: { latitude: -27.3, longitude: -59.6, altitude: 20e6 },
    },
    {
      value: 'SPACECOM',
      label: 'SPACECOM',
      focus: { latitude: 38.82460116221239, longitude: -104.70025707219637, altitude: 10e3 },
    },
    {
      value: 'STRATCOM',
      label: 'STRATCOM',
      focus: { latitude: 41.118121484813365, longitude: -95.91524603738601, altitude: 10e3 },
    },
    {
      value: 'SOCOM',
      label: 'SOCOM',
      // come back and enter coordinates for socom
      focus: { latitude: 48.5, longitude: -110.0, altitude: 20e6 },
    },
    {
      value: 'TRANSCOM',
      label: 'TRANSCOM',
      // come back and enter coordinates for TRANSCOM
      focus: { latitude: -27.3, longitude: -59.6, altitude: 20e6 },
    },
  ]
}
/*
Queries for the AFRICOM plans. Returns a JSON object
as defined in the return statement. ccmd must match
a Combatant Command "value" attribute (see getCombatantCommands).
The children attribute is used in react-checkbox-tree, and all
value attributes must be unique. The value attribute can not
match a value attribute in the list of Combatant Commmands either.
The label is displayed on the UI.
*/
 const sampleAfricomPlans = (): Plan => {
  return {
    ccmd: 'AFRICOM',
    children: [
      {
        value: 'AFRICOM_OPLAN',
        label: 'OPLAN',
        children: [
          {
            value: 'AFRICOM_OPLAN_Alpha.docx',
            label: 'AFRICOM OPLAN Alpha',
          },
          {
            value: 'AFRICOM_OPLAN_Bravo.docx',
            label: 'AFRICOM OPLAN Bravo',
          },
          {
            value: 'AFRICOM_OPLAN_Charlie.docx',
            label: 'AFRICOM OPLAN Charlie',
          },
        ],
      },
      {
        value: 'AFRICOM_CONPLAN',
        label: 'CONPLAN',
        children: [
          {
            value: 'AFRICOM_CONPLAN_Alpha.docx',
            label: 'AFRICOM CONPLAN Alpha',
          },
          {
            value: 'AFRICOM_CONPLAN_Bravo.docx',
            label: 'AFRICOM CONPLAN Bravo',
          },
          {
            value: 'AFRICOM_CONPLAN_Charlie.docx',
            label: 'AFRICOM CONPLAN Charlie',
          },
          {
            value: 'AFRICOM_CONPLAN_Delta.docx',
            label: 'AFRICOM CONPLAN Delta',
          },
        ],
      },
      {
        value: 'AFRICOM_IC_REPORT',
        label: 'IC REPORT',
        children: [
          {
            value: 'AFRICOM_IC_REPORT_Alpha.docx',
            label: 'AFRICOM IC REPORT Alpha',
          },
          {
            value: 'AFRICOM_IC_REPORT_Bravo.docx',
            label: 'AFRICOM IC REPORT Bravo',
          },
        ],
      },
    ],
  }
}

/*
Queries for the CENTCOM plans. Returns a JSON object
as defined in the return statement. ccmd must match
a Combatant Command "value" attribute (see getCombatantCommands).
The children attribute is used in react-checkbox-tree, and all
value attributes must be unique. The value attribute can not
match a value attribute in the list of Combatant Commmands either.
The label is displayed on the UI.
*/
 const sampleCentcomPlans = (): Plan => {
  return {
    ccmd: 'CENTCOM',
    children: [
      {
        value: 'CENTCOM_OPLAN',
        label: 'OPLAN',
        children: [
          {
            value: 'CENTCOM_OPLAN_Alpha.docx',
            label: 'CENTCOM OPLAN Alpha',
          },
        ],
      },
      {
        value: 'CENTCOM_CONPLAN',
        label: 'CONPLAN',
        children: [
          {
            value: 'CENTCOM_CONPLAN_Alpha.doc',
            label: 'CENTCOM CONPLAN Alpha',
          },
          {
            value: 'CENTCOM_CONPLAN_Bravo.doc',
            label: 'CENTCOM CONPLAN Bravo',
          },
        ],
      },
      {
        value: 'CENTCOM_IC_REPORT',
        label: 'IC REPORT',
        children: [
          {
            value: 'CENTCOM_IC_REPORT_Alpha.doc',
            label: 'CENTCOM IC REPORT Alpha',
          },
          {
            value: 'CENTCOM_IC_REPORT_Bravo.doc',
            label: 'CENTCOM IC REPORT Bravo',
          },
          {
            value: 'CENTCOM_IC_REPORT_Charlie.doc',
            label: 'CENTCOM IC REPORT Charlie',
          },
        ],
      },
    ],
  }
}

/*
Queries for the CYBERCOM plans. Returns a JSON object
as defined in the return statement. ccmd must match
a Combatant Command "value" attribute (see getCombatantCommands).
The children attribute is used in react-checkbox-tree, and all
value attributes must be unique. The value attribute can not
match a value attribute in the list of Combatant Commmands either.
The label is displayed on the UI.
*/
const sampleCybercomPlans = (): Plan => {
  return {
    ccmd: 'CYBERCOM',
    children: [
      {
        value: 'CYBERCOM_OPLAN',
        label: 'OPLAN',
        children: [
          {
            value: 'CYBERCOM_OPLAN_Alpha.docx',
            label: 'CYBERCOM OPLAN Alpha',
          },
          {
            value: 'CYBERCOM_OPLAN_Bravo.docx',
            label: 'CYBERCOM OPLAN Bravo',
          },
          {
            value: 'CYBERCOM_OPLAN_Charlie.docx',
            label: 'CYBERCOM OPLAN Charlie',
          },
          {
            value: 'CYBERCOM_OPLAN_Delta.docx',
            label: 'CYBERCOM OPLAN Delta',
          },
          {
            value: 'CYBERCOM_OPLAN_Echo.docx',
            label: 'CYBERCOM OPLAN Echo',
          },
        ],
      },
      {
        value: 'CYBERCOM_CONPLAN',
        label: 'CONPLAN',
        children: [
          {
            value: 'CYBERCOM_CONPLAN_Alpha.doc',
            label: 'CYBERCOM CONPLAN Alpha',
          },
          {
            value: 'CYBERCOM_CONPLAN_Bravo.doc',
            label: 'CYBERCOM CONPLAN Bravo',
          },
          {
            value: 'CYBERCOM_CONPLAN_Charlie.docx',
            label: 'CYBERCOM CONPLAN Charlie',
          },
          {
            value: 'CYBERCOM_CONPLAN_Delta.docx',
            label: 'CYBERCOM CONPLAN Delta',
          },
        ],
      },
      {
        value: 'CYBERCOM_IC_REPORT',
        label: 'IC REPORT',
        children: [
          {
            value: 'CYBERCOM_IC_REPORT_Alpha.doc',
            label: 'CYBERCOM IC REPORT Alpha',
          },
          {
            value: 'CYBERCOM_IC_REPORT_Bravo.doc',
            label: 'CYBERCOM IC REPORT Bravo',
          },
          {
            value: 'CYBERCOM_IC_REPORT_Charlie.docx',
            label: 'CYBERCOM IC REPORT Charlie',
          },
        ],
      },
    ],
  }
}

/*
Queries for the EUCOM plans. Returns a JSON object
as defined in the return statement. ccmd must match
a Combatant Command "value" attribute (see getCombatantCommands).
The children attribute is used in react-checkbox-tree, and all
value attributes must be unique. The value attribute can not
match a value attribute in the list of Combatant Commmands either.
The label is displayed on the UI.
*/
const sampleEucomPlans = (): Plan => {
  return {
    ccmd: 'EUCOM',
    children: [
      {
        value: 'EUCOM_OPLAN',
        label: 'OPLAN',
        children: [
          {
            value: 'EUCOM_OPLAN_Alpha.docx',
            label: 'EUCOM OPLAN Alpha',
          },
        ],
      },
      {
        value: 'EUCOM_CONPLAN',
        label: 'CONPLAN',
        children: [
          {
            value: 'EUCOM_CONPLAN_Alpha.doc',
            label: 'EUCOM CONPLAN Alpha',
          },
        ],
      },
      {
        value: 'EUCOM_IC_REPORT',
        label: 'IC REPORT',
        children: [
          {
            value: 'EUCOM_IC_REPORT_Alpha.doc',
            label: 'EUCOM IC REPORT Alpha',
          },
          {
            value: 'EUCOM_IC_REPORT_Bravo.doc',
            label: 'EUCOM IC REPORT Bravo',
          },
        ],
      },
    ],
  }
}

/*
Queries for the INDOPACOM plans. Returns a JSON object
as defined in the return statement. ccmd must match
a Combatant Command "value" attribute (see getCombatantCommands).
The children attribute is used in react-checkbox-tree, and all
value attributes must be unique. The value attribute can not
match a value attribute in the list of Combatant Commmands either.
The label is displayed on the UI.
*/
export const sampleIndopacomPlans = (): Plan => {
  return {
    ccmd: 'INDOPACOM',
    children: [
      {
        value: 'INDOPACOM_OPLAN',
        label: 'OPLAN',
        children: [
          {
            value: 'INDOPACOM_OPLAN_Alpha.docx',
            label: 'INDOPACOM OPLAN Alpha',
          },
        ],
      },
      {
        value: 'INDOPACOM_CONPLAN',
        label: 'CONPLAN',
        children: [
          {
            value: 'INDOPACOM_CONPLAN_Alpha.doc',
            label: 'INDOPACOM CONPLAN Alpha',
          },
          {
            value: 'INDOPACOM_CONPLAN_Bravo.doc',
            label: 'INDOPACOM CONPLAN Bravo',
          },
          {
            value: 'INDOPACOM_CONPLAN_Charlie.docx',
            label: 'INDOPACOM CONPLAN Charlie',
          },
          {
            value: 'INDOPACOM_CONPLAN_Delta.docx',
            label: 'INDOPACOM CONPLAN Delta',
          },
        ],
      },
      {
        value: 'INDOPACOM_IC_REPORT',
        label: 'IC REPORT',
        children: [
          {
            value: 'INDOPACOM_IC_REPORT_Alpha.doc',
            label: 'INDOPACOM IC REPORT Alpha',
          },
          {
            value: 'INDOPACOM_IC_REPORT_Bravo.doc',
            label: 'INDOPACOM IC REPORT Bravo',
          },
          {
            value: 'INDOPACOM_IC_REPORT_Charlie.docx',
            label: 'INDOPACOM IC REPORT Charlie',
          },
        ],
      },
    ],
  }
}

/*
Queries for the NORTHCOM plans. Returns a JSON object
as defined in the return statement. ccmd must match
a Combatant Command "value" attribute (see getCombatantCommands).
The children attribute is used in react-checkbox-tree, and all
value attributes must be unique. The value attribute can not
match a value attribute in the list of Combatant Commmands either.
The label is displayed on the UI.
*/
export const sampleNorthcomPlans = (): Plan => {
  return {
    ccmd: 'NORTHCOM',
    children: [
      {
        value: 'NORTHCOM_OPLAN',
        label: 'OPLAN',
        children: [
          {
            value: 'NORTHCOM_OPLAN_Alpha.docx',
            label: 'NORTHCOM OPLAN Alpha',
          },
          {
            value: 'NORTHCOM_OPLAN_Bravo.docx',
            label: 'NORTHCOM OPLAN Bravo',
          },
          {
            value: 'NORTHCOM_OPLAN_Charlie.docx',
            label: 'NORTHCOM OPLAN Charlie',
          },
          {
            value: 'NORTHCOM_OPLAN_Delta.docx',
            label: 'NORTHCOM OPLAN Delta',
          },
          {
            value: 'NORTHCOM_OPLAN_Echo.docx',
            label: 'NORTHCOM OPLAN Echo',
          },
        ],
      },
      {
        value: 'NORTHCOM_CONPLAN',
        label: 'CONPLAN',
        children: [
          {
            value: 'NORTHCOM_CONPLAN_Alpha.doc',
            label: 'NORTHCOM CONPLAN Alpha',
          },
        ],
      },
      {
        value: 'NORTHCOM_IC_REPORT',
        label: 'IC REPORT',
        children: [
          {
            value: 'NORTHCOM_IC_REPORT_Alpha.doc',
            label: 'NORTHCOM IC REPORT Alpha',
          },
          {
            value: 'NORTHCOM_IC_REPORT_Bravo.doc',
            label: 'NORTHCOM IC REPORT Bravo',
          },
        ],
      },
    ],
  }
}

/*
Queries for the SOUTHCOM plans. Returns a JSON object
as defined in the return statement. ccmd must match
a Combatant Command "value" attribute (see getCombatantCommands).
The children attribute is used in react-checkbox-tree, and all
value attributes must be unique. The value attribute can not
match a value attribute in the list of Combatant Commmands either.
The label is displayed on the UI.
*/
export const sampleSouthcomPlans = (): Plan => {
  return {
    ccmd: 'SOUTHCOM',
    children: [
      {
        value: 'SOUTHCOM_OPLAN',
        label: 'OPLAN',
        children: [
          {
            value: 'SOUTHCOM_OPLAN_Alpha.docx',
            label: 'SOUTHCOM OPLAN Alpha',
          },
          {
            value: 'SOUTHCOM_OPLAN_Bravo.docx',
            label: 'SOUTHCOM OPLAN Bravo',
          },
        ],
      },
      {
        value: 'SOUTHCOM_CONPLAN',
        label: 'CONPLAN',
        children: [
          {
            value: 'SOUTHCOM_CONPLAN_Alpha.doc',
            label: 'SOUTHCOM CONPLAN Alpha',
          },
          {
            value: 'SOUTHCOM_CONPLAN_Bravo.doc',
            label: 'SOUTHCOM CONPLAN Bravo',
          },
        ],
      },
      {
        value: 'SOUTHCOM_IC_REPORT',
        label: 'IC REPORT',
        children: [
          {
            value: 'SOUTHCOM_IC_REPORT_Alpha.doc',
            label: 'SOUTHCOM IC REPORT Alpha',
          },
        ],
      },
    ],
  }
}

/*
Queries for the SPACECOM plans. Returns a JSON object
as defined in the return statement. ccmd must match
a Combatant Command "value" attribute (see getCombatantCommands).
The children attribute is used in react-checkbox-tree, and all
value attributes must be unique. The value attribute can not
match a value attribute in the list of Combatant Commmands either.
The label is displayed on the UI.
*/
export const sampleSpacecomPlans = (): Plan => {
  return {
    ccmd: 'SPACECOM',
    children: [
      {
        value: 'SPACECOM_OPLAN',
        label: 'OPLAN',
        children: [
          {
            value: 'SPACECOM_OPLAN_Alpha.docx',
            label: 'SPACECOM OPLAN Alpha',
          },
          {
            value: 'SPACECOM_OPLAN_Bravo.docx',
            label: 'SPACECOM OPLAN Bravo',
          },
          {
            value: 'SPACECOM_OPLAN_Charlie.docx',
            label: 'SPACECOM OPLAN Charlie',
          },
          {
            value: 'SPACECOM_OPLAN_Delta.docx',
            label: 'SPACECOM OPLAN Delta',
          },
          {
            value: 'SPACECOM_OPLAN_Echo.docx',
            label: 'SPACECOM OPLAN Echo',
          },
        ],
      },
      {
        value: 'SPACECOM_CONPLAN',
        label: 'CONPLAN',
        children: [
          {
            value: 'SPACECOM_CONPLAN_Alpha.doc',
            label: 'SPACECOM CONPLAN Alpha',
          },
          {
            value: 'SPACECOM_CONPLAN_Bravo.doc',
            label: 'SPACECOM CONPLAN Bravo',
          },
          {
            value: 'SPACECOM_CONPLAN_Charlie.docx',
            label: 'SPACECOM CONPLAN Charlie',
          },
          {
            value: 'SPACECOM_CONPLAN_Delta.docx',
            label: 'SPACECOM CONPLAN Delta',
          },
          {
            value: 'SPACECOM_CONPLAN_Echo.docx',
            label: 'SPACECOM CONPLAN Echo',
          },
          {
            value: 'SPACECOM_CONPLAN_Foxtrot.docx',
            label: 'SPACECOM CONPLAN Foxtrot',
          },
          {
            value: 'SPACECOM_CONPLAN_Golf.docx',
            label: 'SPACECOM CONPLAN Golf',
          },
        ],
      },
      {
        value: 'SPACECOM_IC_REPORT',
        label: 'IC REPORT',
        children: [
          {
            value: 'SPACECOM_IC_REPORT_Alpha.doc',
            label: 'SPACECOM IC REPORT Alpha',
          },
          {
            value: 'SPACECOM_IC_REPORT_Bravo.doc',
            label: 'SPACECOM IC REPORT Bravo',
          },
          {
            value: 'SPACECOM_IC_REPORT_Charlie.docx',
            label: 'SPACECOM IC REPORT Charlie',
          },
          {
            value: 'SPACECOM_IC_REPORT_Delta.docx',
            label: 'SPACECOM IC REPORT Delta',
          },
          {
            value: 'SPACECOM_IC_REPORT_Echo.docx',
            label: 'SPACECOM IC REPORT Echo',
          },
          {
            value: 'SPACECOM_IC_REPORT_Foxtrot.docx',
            label: 'SPACECOM IC REPORT Foxtrot',
          },
        ],
      },
    ],
  }
}

/*
Queries for the STRATCOM plans. Returns a JSON object
as defined in the return statement. ccmd must match
a Combatant Command "value" attribute (see getCombatantCommands).
The children attribute is used in react-checkbox-tree, and all
value attributes must be unique. The value attribute can not
match a value attribute in the list of Combatant Commmands either.
The label is displayed on the UI.
*/
export const sampleStratcomPlans = (): Plan => {
  return {
    ccmd: 'STRATCOM',
    children: [
      {
        value: 'STRATCOM_OPLAN',
        label: 'OPLAN',
        children: [
          {
            value: 'STRATCOM_OPLAN_Alpha.docx',
            label: 'STRATCOM OPLAN Alpha',
          },
        ],
      },
      {
        value: 'STRATCOM_CONPLAN',
        label: 'CONPLAN',
        children: [
          {
            value: 'STRATCOM_CONPLAN_Alpha.doc',
            label: 'STRATCOM CONPLAN Alpha',
          },
        ],
      },
      {
        value: 'STRATCOM_IC_REPORT',
        label: 'IC REPORT',
        children: [
          {
            value: 'STRATCOM_IC_REPORT_Alpha.doc',
            label: 'STRATCOM IC REPORT Alpha',
          },
          {
            value: 'STRATCOM_IC_REPORT_Bravo.doc',
            label: 'STRATCOM IC REPORT Bravo',
          },
        ],
      },
    ],
  }
}

/*
Queries for the SOCOM plans. Returns a JSON object
as defined in the return statement. ccmd must match
a Combatant Command "value" attribute (see getCombatantCommands).
The children attribute is used in react-checkbox-tree, and all
value attributes must be unique. The value attribute can not
match a value attribute in the list of Combatant Commmands either.
The label is displayed on the UI.
*/
export const sampleSocomPlans = (): Plan => {
  return {
    ccmd: 'SOCOM',
    children: [
      {
        value: 'SOCOM_OPLAN',
        label: 'OPLAN',
        children: [
          {
            value: 'SOCOM_OPLAN_Alpha.docx',
            label: 'SOCOM OPLAN Alpha',
          },
        ],
      },
      {
        value: 'SOCOM_CONPLAN',
        label: 'CONPLAN',
        children: [
          {
            value: 'SOCOM_CONPLAN_Alpha.doc',
            label: 'SOCOM CONPLAN Alpha',
          },
        ],
      },
      {
        value: 'SOCOM_IC_REPORT',
        label: 'IC REPORT',
        children: [
          {
            value: 'SOCOM_IC_REPORT_Alpha.doc',
            label: 'SOCOM IC REPORT Alpha',
          },
          {
            value: 'SOCOM_IC_REPORT_Bravo.doc',
            label: 'SOCOM IC REPORT Bravo',
          },
        ],
      },
    ],
  }
}

/*
Queries for the TRANSCOM plans. Returns a JSON object
as defined in the return statement. ccmd must match
a Combatant Command "value" attribute (see getCombatantCommands).
The children attribute is used in react-checkbox-tree, and all
value attributes must be unique. The value attribute can not
match a value attribute in the list of Combatant Commmands either.
The label is displayed on the UI.
*/
export const sampleTranscomPlans = (): Plan => {
  return {
    ccmd: 'TRANSCOM',
    children: [
      {
        value: 'TRANSCOM_OPLAN',
        label: 'OPLAN',
        children: [
          {
            value: 'TRANSCOM_OPLAN_Alpha.docx',
            label: 'TRANSCOM OPLAN Alpha',
          },
        ],
      },
      {
        value: 'TRANSCOM_CONPLAN',
        label: 'CONPLAN',
        children: [
          {
            value: 'TRANSCOM_CONPLAN_Alpha.doc',
            label: 'TRANSCOM CONPLAN Alpha',
          },
        ],
      },
      {
        value: 'TRANSCOM_IC_REPORT',
        label: 'IC REPORT',
        children: [
          {
            value: 'TRANSCOM_IC_REPORT_Alpha.doc',
            label: 'TRANSCOM IC REPORT Alpha',
          },
          {
            value: 'TRANSCOM_IC_REPORT_Bravo.doc',
            label: 'TRANSCOM IC REPORT Bravo',
          },
        ],
      },
    ],
  }
}
const _isRealServer = false

const getCombatantCommands = () => {
  let data: CombatantCommand[] = []
  if (_isRealServer) {
    //data = ??
  } else {
    data = sampleCombatantCommands()
    data = mergePlan(data, getAfricomPlans())
    data = mergePlan(data, getCentcomPlans())
    data = mergePlan(data, getCybercomPlans())
    data = mergePlan(data, getEucomPlans())
    data = mergePlan(data, getIndopacomPlans())
    data = mergePlan(data, getNorthcomPlans())
    data = mergePlan(data, getSouthcomPlans())
    data = mergePlan(data, getSpacecomPlans())
    data = mergePlan(data, getStratcomPlans())
    data = mergePlan(data, getSocomPlans())
    data = mergePlan(data, getTranscomPlans())
  }
  return data
}

const mergePlan = (ccList: CombatantCommand[], plan: Plan) => {
  const newCc: CombatantCommand[] = []
  for (const cc of ccList) {
    if (cc.value === plan.ccmd) {
      // Merge the plan with the cc.
      newCc.push({
        ...cc,
        children: plan.children,
      })
    } else {
      // Just copy the cc data.
      newCc.push({ ...cc })
    }
  }
  return newCc
}

/*
 * Returns plan data for AFRICOM required by CoComCard
 */
const getAfricomPlans = () => {
  let data = sampleAfricomPlans()
  if (_isRealServer) {
    //data = ??
  }
  return data
}

/*
 * Returns plan data for CENTCOM required by CoComCard
 */
const getCentcomPlans = () => {
  let data = sampleCentcomPlans()
  if (_isRealServer) {
    //data = ??
  }
  return data
}

/*
 * Returns plan data for CYBERCOM required by CoComCard
 */
const getCybercomPlans = () => {
  let data = sampleCybercomPlans()
  if (_isRealServer) {
    //data = ??
  }
  return data
}

/*
 * Returns plan data for EUCOM required by CoComCard
 */
const getEucomPlans = () => {
  let data = sampleEucomPlans()
  if (_isRealServer) {
    //data = ??
  }
  return data
}

/*
 * Returns plan data for INDOPACOM required by CoComCard
 */
const getIndopacomPlans = () => {
  let data: Plan = sampleIndopacomPlans()
  if (_isRealServer) {
    //data = ??
  }
  return data
}

/*
 * Returns plan data for NORTHCOM required by CoComCard
 */
const getNorthcomPlans = () => {
  let data: Plan = sampleNorthcomPlans()
  if (_isRealServer) {
    //data = ??
  }
  return data
}

/*
 * Returns plan data for SOUTHCOM required by CoComCard
 */
const getSouthcomPlans = () => {
  let data: Plan = sampleSouthcomPlans()
  if (_isRealServer) {
    //data = ??
  }
  return data
}

/*
 * Returns plan data for SPACECOM required by CoComCard
 */
const getSpacecomPlans = () => {
  let data: Plan = sampleSpacecomPlans()
  if (_isRealServer) {
    //data = ??
  }
  return data
}

/*
 * Returns plan data for STRATCOM required by CoComCard
 */
const getStratcomPlans = () => {
  let data: Plan = sampleStratcomPlans()
  if (_isRealServer) {
    //data = ??
  }
  return data
}

/*
 * Returns plan data for SOCOM required by CoComCard
 */
const getSocomPlans = () => {
  let data = sampleSocomPlans()
  if (_isRealServer) {
    //data = ??
  }
  return data
}

/*
 * Returns plan data for TRANSCOM required by CoComCard
 */
const getTranscomPlans = () => {
  let data: Plan = sampleTranscomPlans()
  if (_isRealServer) {
    //data = ??
  }
  return data
}
