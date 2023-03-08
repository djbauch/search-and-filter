import WMSLayer from "@arcgis/core/layers/WMSLayer";
// import CSVLayer from "@arcgis/core/layers/CSVLayer";
// import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
// import ArcGISImageServiceLayer from "@arcgis/core/layers/ArcGISImageServiceLayer";
// import KMLLayer from "@arcgis/core/layers/KMLLayer";
// import PopupTemplate from "@arcgis/core/layers/PopupTemplate";
// import InfoTemplate from "@arcgis/core/layers/InfoTemplate";
// import ArcGISDynamicMapServiceLayer from "@arcgis/core/layers/ArcGISDynamicMapServiceLayer";
// import esriRequest from "@arcgis/core/esriRequest";

// export function getLayerType(url) {
//     var layerType;
//     if (url.includes("/FeatureServer"))
//         layerType = "FeatureServer";
//     else if ((url.includes("wms") || (url.includes("WMS"))) || (url.includes("/MapServer") && url.includes("WMS")))
//         layerType = "ogcWms";
//     else if (url.includes(".csv"))
//         layerType = "CSV";
//     else if (url.includes(".kml"))
//         layerType = "KML";
//     else if (url.includes("/ImageServer"))
//         layerType = "ImageServer";
//     else if (url.includes("/MapServer") && layerType != "ogcWms")
//         layerType = "MapServer";

//     addLayer(url, layerType);
// }

// export function addLayer(layerURLValue, layerType) {
//     var date = getDate();
//     switch (layerType) {
//         case "FeatureServer":
//             console.log("Feature Service");
//             //Check to see if the URL ends with a number (for a specific sublayer), if it does not, load all sublayers.
//             var match = layerURLValue.match(/\d+$/);
//             if (match) {
//                 var layersRequest = esriRequest({
//                     url: layerURLValue,
//                     content: { f: "json" },
//                     handleAs: "json",
//                     callbackParamName: "callback"
//                 });
//                 layersRequest.then(
//                   function (response) {
//                       console.log(response);
//                       var popupTitle;
//                       if (response.displayField)
//                           popupTitle = "{" + response.displayField + "}";
//                       else
//                           popupTitle = response.name;

//                       var layer = new FeatureLayer(layerURLValue, {
//                           mode: FeatureLayer.MODE_ONDEMAND,
//                           outFields: ["*"],
//                           infoTemplate: new PopupTemplate({ title: popupTitle, description: "{*}" })
//                       })
//                       var mapLyrNam;
//                       if (response.name)
//                           mapLyrNam = response.name;
//                       else
//                           mapLyrNam = date;
//                       var layerObj = {
//                           id: mapLyrNam,
//                           layer: layer,
//                       };
//                       addLyrToMap(layerObj, layer);
//             }, function (error) {
//                 console.log("Error: Esri Request Failed. Feature Service Layer is unable to load. Error Message: ", error.message);
//                 alert("Layer can not be added. See Console for details.");
//             });
//             //Load all sublayers
//             } else {
//                 var layersRequest = esriRequest({
//                     url: layerURLValue,
//                     content: { f: "json" },
//                     handleAs: "json",
//                     callbackParamName: "callback"
//                 });
//                 layersRequest.then(
//                   function (response) {
//                       console.log(response);
//                       response.layers.forEach(function (sublayer) {
//                               var layer = new FeatureLayer(layerURLValue + "/" + sublayer.id, {
//                                   mode: FeatureLayer.MODE_ONDEMAND,
//                                   outFields: ["*"],
//                                   infoTemplate: new PopupTemplate({ title: sublayer.name, description: "{*}" })
//                               })
//                               var layerObj = {
//                                   id: sublayer.name,
//                                   layer: layer,
//                               };
//                               addLyrToMap(layerObj, layer);
//                       });
//                   }, function (error) {
//                       console.log("Error: Esri Request Failed. Feature Service Layer is unable to load. Error Message: ", error.message);
//                       alert("Layer can not be added. See Console for details.");
//                   });
//             }
//             break;
//         case "MapServer":
//             console.log("Map Service");
//             var match = layerURLValue.match(/\d+$/);
//             if (match) {
//                 alert("Unfortunatly, loading specific Sublayers for a Map Service is not currently supported. Please remove the specific sublayer from the end of the URL, and try again.");
//                 break;
//             }
//             var layer;
//             var layerPopup = {};
//             var layersRequest = esriRequest({
//                 url: layerURLValue,
//                 content: { f: "json" },
//                 handleAs: "json",
//                 callbackParamName: "callback"
//             });
//             layersRequest.then(
//               function (response) {
//                   console.log("Success: ", response);
//                       var sublayerCounter = -1;
//                       response.layers.forEach(function (sublayer) {
//                           console.log(sublayer.name);
//                           sublayerCounter++
//                           layerPopup[sublayerCounter] = {
//                               infoTemplate: new InfoTemplate(sublayer.name, "${*}"),
//                               layerUrl: layerURLValue + "/" + sublayerCounter
//                           }
//                       });
//                       layer = new ArcGISDynamicMapServiceLayer(layerURLValue, {
//                           id: response.mapName,
//                           infoTemplates: layerPopup
//                       });
//                   var mapLyrNam;
//                   if (response.documentInfo == undefined || response.documentInfo.Title == "" || response.documentInfo.Title == undefined)
//                       mapLyrNam = response.mapName;
//                   else
//                       mapLyrNam = response.documentInfo.Title;
//                   var layerObj = {
//                       id: mapLyrNam,
//                       layer: layer,
//                   };
//                   addLyrToMap(layerObj, layer);
//               }, function (error) {
//                   console.log("Error: Esri Request Failed. Map Service Layer is unable to load. Error Message: ", error.message);
//                   alert("Layer can not be added. See Console for details.");
//               });
//             break;
//         case "ogcWms":
//             console.log("OGC Web Map Service");
//             var layer = new WMSLayer(layerURLValue, {
//                 id: date
//             });
//             var layerObj = {
//                 id: layer.id,
//                 layer: layer
//             };
//             addLyrToMap(layerObj, layer);
//             break;
//         case "CSV":
//             console.log("CSV Layer");
//             var csvName = layerURLValue.substring(layerURLValue.lastIndexOf('/') + 1);
//             var layer = new CSVLayer(layerURLValue, {
//                 id: csvName,
//                 infoTemplate: new PopupTemplate({ title: csvName, description: "{*}" })
//             });
//             var layerObj = {
//                 id: csvName,
//                 layer: layer
//             };
//             addLyrToMap(layerObj, layer);
//             break;
//         case "ImageServer":
//             console.log("Image Service");
//             var layer;
//             var layersRequest = esriRequest({
//                 url: layerURLValue,
//                 content: { f: "json" },
//                 handleAs: "json",
//                 callbackParamName: "callback"
//             });
//             layersRequest.then(
//               function (response) {
//                   layer = new ArcGISImageServiceLayer(layerURLValue);
//                   var layerObj = {
//                       id: response.name,
//                       layer: layer,
//                   };
//                   addLyrToMap(layerObj, layer);
//               }, function (error) {
//                   console.log("Error: Esri Request Failed. Image Service Layer is unable to load. Error Message: ", error.message);
//                   alert("Layer can not be added. See Console for details.");
//               });
//             break;
//         case "KML":
//             console.log("KML");
//             var kmlName = layerURLValue.substring(layerURLValue.lastIndexOf('/') + 1);
//             var layer = new KMLLayer(layerURLValue, {
//                 id: date
//             });
//             var layerObj = {
//                 id: kmlName,
//                 layer: layer
//             };
//             addLyrToMap(layerObj, layer);
//             break;
//     }
// }

// export function addLyrToMap(layerObj, layer) {
//     //mapInfoLyrs.push(layerObj);
//     //map.addLayer(layer);
//     //map.legendList.refresh();
// }

// ///////////////////////////
// // <html>
// //   <head>
// //     <meta charset="utf-8" />
// //     <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
// //     <title>Create a FeatureLayer from a shapefile | Sample | ArcGIS API for JavaScript 4.22</title>
// //     <style>
// //       html,
// //       body,
// //       #viewDiv {
// //         padding: 0;
// //         margin: 0;
// //         height: 100%;
// //         width: 100%;
// //       }
// //       #mainWindow {
// //         padding: .5em;
// //         background-color: #fff;
// //       }
// //       #mainWindow p, #uploadForm {
// //           display: block;
// //           padding: .1em;
// //         }

// //     </style>

// //     <link rel="stylesheet" href="https://js.arcgis.com/4.22/esri/themes/light/main.css" />
// //     <script src="https://js.arcgis.com/4.22/"></script>

// //     <script>
// //       require([
// //         "esri/config",
// //         "esri/Map",
// //         "esri/views/MapView",
// //         "esri/widgets/Expand",
// //         "esri/request",
// //         "esri/layers/FeatureLayer",
// //         "esri/layers/support/Field",
// //         "esri/Graphic"
// //       ], (esriConfig, Map, MapView, Expand, request, FeatureLayer, Field, Graphic) => {

// //           const portalUrl = "https://www.arcgis.com";

// //           document.getElementById("uploadForm").addEventListener("change", (event) => {
// //             const fileName = event.target.value.toLowerCase();

// //             if (fileName.indexOf(".zip") !== -1) {//is file a zip - if not notify user
// //               generateFeatureCollection(fileName);
// //             }
// //             else {
// //               document.getElementById('upload-status').innerHTML = '<p style="color:red">Add shapefile as .zip file</p>';
// //             }
// //           });

// //           const map = new Map({
// //             basemap: "dark-gray-vector"
// //           });

// //           const view = new MapView({
// //             center: [-41.647, 36.41],
// //             zoom: 2,
// //             map: map,
// //             container: "viewDiv",
// //             popup: {
// //               defaultPopupTemplateEnabled: true
// //             }
// //           });

// //           const fileForm = document.getElementById("mainWindow");

// //           const expand = new Expand({
// //             expandIconClass: "esri-icon-upload",
// //             view: view,
// //             content: fileForm
// //           });

// //           view.ui.add(expand, "top-right");

// //           function generateFeatureCollection (fileName) {
// //             let name = fileName.split(".");
// //             // Chrome adds c:akepath to the value - we need to remove it
// //             name = name[0].replace("c:\fakepath\", "");

// //             document.getElementById('upload-status').innerHTML = '<b>Loading </b>' + name;

// //             // define the input params for generate see the rest doc for details
// //             // https://developers.arcgis.com/rest/users-groups-and-items/generate.htm
// //             const params = {
// //               'name': name,
// //               'targetSR': view.spatialReference,
// //               'maxRecordCount': 1000,
// //               'enforceInputFileSizeLimit': true,
// //               'enforceOutputJsonSizeLimit': true
// //             };

// //             // generalize features to 10 meters for better performance
// //             params.generalize = true;
// //             params.maxAllowableOffset = 10;
// //             params.reducePrecision = true;
// //             params.numberOfDigitsAfterDecimal = 0;

// //             const myContent = {
// //               'filetype': 'shapefile',
// //               'publishParameters': JSON.stringify(params),
// //               'f': 'json',
// //             };

// //             // use the REST generate operation to generate a feature collection from the zipped shapefile
// //             request(portalUrl + '/sharing/rest/content/features/generate', {
// //               query: myContent,
// //               body: document.getElementById('uploadForm'),
// //               responseType: 'json'
// //             })
// //             .then((response) => {
// //                 const layerName = response.data.featureCollection.layers[0].layerDefinition.name;
// //                 document.getElementById('upload-status').innerHTML = '<b>Loaded: </b>' + layerName;
// //                 addShapefileToMap(response.data.featureCollection);
// //               })
// //               .catch(errorHandler);
// //           }

// //           function errorHandler (error) {
// //             document.getElementById('upload-status').innerHTML =
// //             "<p style='color:red;max-width: 500px;'>" + error.message + "</p>";
// //           }

// //           function addShapefileToMap (featureCollection) {
// //             // add the shapefile to the map and zoom to the feature collection extent
// //             // if you want to persist the feature collection when you reload browser, you could store the
// //             // collection in local storage by serializing the layer using featureLayer.toJson()
// //             // see the 'Feature Collection in Local Storage' sample for an example of how to work with local storage
// //             let sourceGraphics = [];

// //             const layers = featureCollection.layers.map((layer) => {

// //               const graphics = layer.featureSet.features.map((feature) => {
// //                 return Graphic.fromJSON(feature);
// //               })
// //               sourceGraphics = sourceGraphics.concat(graphics);
// //               const featureLayer = new FeatureLayer({
// //                 objectIdField: "FID",
// //                 source: graphics,
// //                 fields: layer.layerDefinition.fields.map((field) => {
// //                 return Field.fromJSON(field);
// //                 })
// //               });
// //               return featureLayer;
// //               // associate the feature with the popup on click to enable highlight and zoom to
// //             });
// //             map.addMany(layers);
// //             view.goTo(sourceGraphics)
// //             .catch((error) => {
// //               if (error.name != "AbortError"){
// //                 console.error(error);
// //               }
// //             });

// //             document.getElementById('upload-status').innerHTML = "";
// //           }

// //         });
// //     </script>
// //   </head>

// //   <body>
// //     <div id="mainWindow">
// //       <div>
// //         <div style='padding-left:4px;'>
// //           <p>Download shapefile from <a href='https://bsvensson.github.io/various-tests/shp/drp_county_boundary.zip'>here.</a></p>
// //           <p>Add a zipped shapefile to the map.</p>
// //           <p>Visit the
// //             <a target='_blank' href="https://doc.arcgis.com/en/arcgis-online/reference/shapefiles.htm">Shapefiles</a> help
// //             topic for information and limitations.</p>
// //           <form enctype="multipart/form-data" method="post" id="uploadForm">
// //             <div class="field">
// //               <label class="file-upload">
// //                 <span><strong>Add File</strong></span>
// //                 <input type="file" name="file" id="inFile" />
// //               </label>
// //             </div>
// //           </form>
// //           <span class="file-upload-status" style="opacity:1;" id="upload-status"></span>
// //           <div id="fileInfo"> </div>
// //         </div>
// //       </div>
// //     </div>
// //     <div id="viewDiv"></div>
// //   </body>
// // </html>
