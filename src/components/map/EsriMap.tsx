import * as React from 'react'
import Map from '@arcgis/core/Map'
import SceneView from '@arcgis/core/views/SceneView'
import GeoJSONLayer from '@arcgis/core/layers/GeoJSONLayer'
import CSVLayer from '@arcgis/core/layers/CSVLayer.js'
import MapView from '@arcgis/core/views/MapView'
import Editor from '@arcgis/core/widgets/Editor.js'
import { useEffect } from 'react'
import esriConfig from '@arcgis/core/config'
//import { setDefaultOptions } from 'esri-loader'

esriConfig.assetsPath = process.env.PUBLIC_URL + '/assets'
console.log (`Assets URL: ${esriConfig.assetsPath}`)
esriConfig.apiKey =
  'AAPKd552e5c2428544508f399ca634b1e265PjlKizbUtyJy2tKhfqK3MHCJ0rgRPlE-65f3LC1FojOhqFlK1Spc2Vmliz364a0C'

//setDefaultOptions({ version: '4.26.5', url: process.env.PUBLIC_URL})
console.log (`Assets URL: ${esriConfig.assetsPath}`)
// If you can access the internet then:
// const url = 'https://portal-server.up.railway.app/units/installations?offset=0&limit=25&f=geo'
// Otherwise:
const url = process.env.PUBLIC_URL + '/installations.json'

export const EsriMap = ({ data }) => {

  const template = {
    title: 'Army Installations',
    content: 'Name: {installationName}'
  }

  const utemplate = {
    title: "Army Units",
    content: "Name: {unit}"
  };

  const rtemplate = {
    title: "Red Units",
    content: "Name: {facilityName}"
  };


  const unit = {
    type: 'simple',
    field: 'unit',
    symbol: {
      type: 'simple-marker',
      color: 'green',
      outline: {
        color: 'yellow'
      }
    },
    fieldInfos: [
      {
        fieldName: 'unit',
        format: {
          String
        }
      }
    ]
  }

  const renderer = {
    type: 'simple',
    field: 'installationName',
    symbol: {
      type: 'simple-marker',
      color: 'blue',
      outline: {
        color: 'yellow'
      }
    },
    fieldInfos: [
      {
        fieldName: 'installationName',
        format: {
          String
        }
      }
    ]
  }

  const runit = {
    type: "simple",
    field: "facilityName",
    symbol: {
      type: "simple-marker",
      color: "red",
      outline: {
        color: "black"
      }
    },
    fieldInfos: [
      {
        fieldName: "facilityName",
        format: {
          String
        }
      }
    ]

  }

  const initMap = () => {
    const map = new Map({
      basemap: "gray-vector",
    })

    //const view =
    new MapView({
      map: map,
      center: [-100, 36],
      zoom: 5,
      container: 'viewDiv' // Div element
    })
  }

  useEffect(() => {
    initMap()
  })

  return (
      <div>
        <center>
          <div id="pageheading"><img src="JEWC_Emblem.png" width="64" height="64" alt="JEWC Emblem" />&nbsp;Working Map Demo</div>
          <div id="viewDiv" style={{ height: '80vh', width: '80%', padding: 15, margin: 20 }}></div>
        </center>
      </div>
  )
}
export default EsriMap