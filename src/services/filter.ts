/*
Gets the names of all the headers used in the filter panels. Returns map where the key is
a unique identifier and the value is the header text.
*/
export const getFilterHeaders = () => {
  return getFilterHeadersEnglish()
}

export const getFilterHeadersEnglish = () => {
  return new Map<string, string>([
    ['cocom', 'Combatant Commands'],
    ['topo', 'Geospatial'],
    ['orgs', 'Organizations'],
    ['plat', 'Platform Types'],
    ['temp', 'Date Range'],
    ['freq', 'Frequency'],
    ['func', 'Functions']
  ])
}