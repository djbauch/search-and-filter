import { FunctionalOpts } from 'typings/sharedTypes'
/*
Queries for the list of Functional Opts. Returns an
array of JSON objects in the following format:

{
    id: "unique identifier, e.g. functional1",
    "name": "the name, e.g. Communications"
}
*/
export const getFunctionalOpts = (): FunctionalOpts => {
  return getFunctionalOptsDummyData()
}

//Returns dummy data
const getFunctionalOptsDummyData = (): FunctionalOpts => {
  return [
    {
      id: 'functional1',
      value: 'Coastal Defense Radar',
      label: 'Coastal Defense Radar'
    },
    {
      id: 'functional2',
      value: 'Surface-to-Air Missile',
      label: 'Surface-to-Air Missile'
    },
    {
      id: 'functional3',
      value: 'Target Tracker',
      label: 'Target Tracker'
    },
    {
      id: 'functional4',
      value: 'Navigation',
      label: 'Navigation'
    },
    {
      id: 'functional5',
      value: 'Direction Finding',
      label: 'Direction Finding'
    }
  ]
}
