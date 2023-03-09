import React, { useRef, useEffect, useState } from "react";
import Map from "@arcgis/core/Map";
import SceneView from "@arcgis/core/views/SceneView";
import Camera from "@arcgis/core/Camera";
import Sketch from "@arcgis/core/widgets/Sketch";
import Expand from "@arcgis/core/widgets/Expand";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import esriConfig from "@arcgis/core/config";
import LayerList from "@arcgis/core/widgets/LayerList";
import BasemapLayerList from "@arcgis/core/widgets/BasemapLayerList";
import AreaMeasurement3D from "@arcgis/core/widgets/AreaMeasurement3D";
import DirectLineMeasurement3D from "@arcgis/core/widgets/DirectLineMeasurement3D";
import Color from "@arcgis/core/Color"
import PropTypes from "prop-types";
import "./EsriGlobe.css";

  // Required: Set this property to insure assets resolve correctly.
  esriConfig.assetsPath = "/assets";

const blackColor = new Color("black")
const mapRef = new Map({

})

const viewRef = new SceneView({
  map: mapRef,
  highlightOptions: {
    haloColor: blackColor,
    haloOpacity: 0.9,
    fillOpacity: 0.2,
    shadowColor: blackColor,
    shadowOpacity: 0.5,
  },
})

const initialize = (container) => {
  viewRef.container = container
}

type EsriGlobeProps = {
  layersVisible: boolean;
  map: Map;
  latitude: number;
  longitude: number;
  altitude: number;
};
const EsriGlobe = (props: EsriGlobeProps) => {
  const uiDiv = useRef()
  useEffect(() => {
    initialize(uiDiv.current)
  })
  const [tooltipsEnabled] = useState(true); // useTooltipsEnabledState from LocalStorageKeys
  const [tooltipBehavior] = useState("view-mouseover"); //useTooltipBehaviorState ""


  const mapDiv = useRef(null);

  const addMeasurementTool = (sceneView: SceneView) => {
    let activeWidget = null;

    const distanceId = "esri-distance-button";
    const areaId = "esri-area-button";
    const clearId = "esri-clear-button";

    /*
    ViewRef doesn't allow adding things the React way, so got to do things the old way
    Note that in order to get the button look that the globe widgets use, you need to
    use a div and give it the button role, rather than use the button HTML element.
    */

    const distanceButton = document.createElement("div");
    distanceButton.id = distanceId;
    distanceButton.className =
      "esri-widget--button esri-widget--button__measure button__bottom-right";
    distanceButton.title = "Distance Measurement Tool";
    distanceButton.role = "button";
    distanceButton.tabIndex = 0;
    const distanceIcon = document.createElement("span");
    distanceIcon.className = "esri-icon-measure-line";
    distanceButton.append(distanceIcon);

    const areaButton = document.createElement("div");
    areaButton.id = areaId;
    areaButton.className =
      "esri-widget--button esri-widget--button__measure button__bottom-right";
    areaButton.title = "Area Measurement Tool";
    areaButton.role = "button";
    areaButton.tabIndex = 0;
    const areaIcon = document.createElement("span");
    areaIcon.className = "esri-icon-measure-area";
    areaButton.append(areaIcon);

    const clearButton = document.createElement("div");
    clearButton.id = clearId;
    clearButton.className = "esri-widget--button esri-widget--button__measure";
    clearButton.title = "Clear Measurements";
    clearButton.role = "button";
    clearButton.tabIndex = 0;
    const clearIcon = document.createElement("span");
    clearIcon.className = "esri-icon-trash";
    clearButton.append(clearIcon);

    distanceButton.addEventListener("click", function () {
      setActiveWidget("line");
      distanceButton.classList.add("esri-widget--button__measure--active");
      areaButton.classList.remove("esri-widget--button__measure--active");
    });
    areaButton.addEventListener("click", function () {
      setActiveWidget("area");
      distanceButton.classList.remove("esri-widget--button__measure--active");
      areaButton.classList.add("esri-widget--button__measure--active");
    });
    clearButton.addEventListener("click", function () {
      setActiveWidget("clear");
      distanceButton.classList.remove("esri-widget--button__measure--active");
      areaButton.classList.remove("esri-widget--button__measure--active");
    });

    function setActiveWidget(tool: string) {
      if (activeWidget) {
        activeWidget.viewModel.clear();
        sceneView.ui.remove(activeWidget);
        activeWidget.destroy();
      }

      if (tool === "line") {
        activeWidget = new DirectLineMeasurement3D({
          view: sceneView,
        });
        distanceButton.classList.add("active");
        areaButton.classList.remove("active");
      } else if (tool === "area") {
        activeWidget = new AreaMeasurement3D({
          view: sceneView,
        });
        distanceButton.classList.remove("active");
        areaButton.classList.add("active");
      } else {
        activeWidget = null;
        distanceButton.classList.remove("active");
        areaButton.classList.remove("active");
      }

      if (activeWidget) {
        sceneView.ui.add(activeWidget, "bottom-right");
        activeWidget.viewModel.start().catch(function (error) {
          if (error.name !== "AbortError") {
            console.error(error);
          }
        });
      }
    }

    const panel = document.createElement("div");
    panel.className = "esri-component esri-measurement-toggle esri-widget";
    panel.appendChild(distanceButton);
    panel.appendChild(areaButton);
    panel.appendChild(clearButton);

    sceneView.ui.add(panel, "bottom-right");
  };

  const addSketchTool = (map: Map, sceneView: SceneView) => {
    if (!map || !sceneView) {
      return
    }
    const sketchLayer = new GraphicsLayer({
      title: "Sketch Tool",
      listMode: "hide",
    });

    map.add(sketchLayer, 0);

    const sketch = new Sketch({
      view: sceneView,
      layer: sketchLayer,
      creationMode: "update",
    });

    let sketchExpand = new Expand({
      expandIconClass: "esri-icon-sketch-rectangle",
      expandTooltip: "Expand Sketch Tool",
      view: sceneView,
      content: sketch,
    });

    sceneView.ui.add(sketchExpand, "bottom-left");
  };

  const addLayerControlTool = (sceneView: SceneView) => {
    if (!sceneView) {
      return
    }
    let layerListDiv = document.createElement("div");
    layerListDiv.className = "project-layer-list";

    let letLayerListTitle = document.createElement("h2");
    letLayerListTitle.className = "esri-header__layer-header";
    let layerListTitleContent = document.createTextNode("Project Layers");
    letLayerListTitle.appendChild(layerListTitleContent);
    layerListDiv.appendChild(letLayerListTitle);

    let layerList = new LayerList({
      container: layerListDiv,
      view: sceneView,
      listItemCreatedFunction: defineLayerListActions,
    });

    function defineLayerListActions(event) {
      // The event object contains an item property.
      // is is a ListItem referencing the associated layer
      // and other properties. You can control the visibility of the
      // item, its title, and actions using this object.

      let item = event.item;

      item.actionsSections = [
        [
          {
            title: "Current Opacity: " + item.layer.opacity * 100 + "%",
            className: "esri-icon-hollow-eye",
            id: "current-opacity",
          },
          {
            title: "Increase opacity by 25%",
            className: "esri-icon-up",
            id: "increase-opacity",
          },
          {
            title: "Decrease opacity by 25%",
            className: "esri-icon-down",
            id: "decrease-opacity",
          },
          {
            title: "Reset opacity to 100%",
            className: "esri-icon-undo",
            id: "reset-opacity",
          },
        ],
      ];
    }

    layerList.on("trigger-action", function (event) {
      // The layer visible in the view at the time of the trigger.
      let visibleLayer = event.item.layer;

      // Capture the action id.
      let id = event.action.id;

      let opacityChanged = false;

      if (id === "increase-opacity") {
        // If the increase-opacity action is triggered, then
        // increase the opacity of the GroupLayer by 0.25.

        if (visibleLayer.opacity < 1) {
          visibleLayer.opacity += 0.25;
          opacityChanged = true;
        }
      } else if (id === "decrease-opacity") {
        // If the decrease-opacity action is triggered, then
        // decrease the opacity of the GroupLayer by 0.25.

        if (visibleLayer.opacity > 0) {
          visibleLayer.opacity -= 0.25;
          opacityChanged = true;
        }
      } else if (id === "reset-opacity") {
        // If the decrease-opacity action is triggered, then
        // decrease the opacity of the GroupLayer by 0.25.

        if (visibleLayer.opacity !== 1) {
          visibleLayer.opacity = 1;
          opacityChanged = true;
        }
      }

      if (opacityChanged) {
        //Update the label to show the current opacity
        event.item.actionsSections.getItemAt(0).getItemAt(0).title =
          "Current Opacity: " + visibleLayer.opacity * 100 + " %";
      }
    });

    let layerListExpand = new Expand({
      expandIconClass: "esri-icon-layer-list",
      expandTooltip: "Expand Project Layers List",
      view: sceneView,
      content: layerListDiv,
      expanded: false, //default to collapsed
    });

    sceneView.ui.add(layerListExpand, {
      position: "top-right",
    });

    //Add the BaseMap layer toggle below

    let basemapLayerList = new BasemapLayerList({
      view: sceneView,
    });

    let bmLayerListExpand = new Expand({
      expandIconClass: "esri-icon-globe",
      expandTooltip: "Expand Base Map Layers List",
      view: sceneView,
      content: basemapLayerList,
    });

    // Adds the widget below other elements in the top left corner of the view
    sceneView.ui.add(bmLayerListExpand, {
      position: "top-right",
    });
  };

  useEffect(() => {
    const addHighlighting = (sceneView) => {
      let highlightHandle = null;
      sceneView.on("pointer-move", function (event) {
        //hitTest checks for elements that are on the surface of the globe like points or equipment.
        sceneView.hitTest(event).then(function (response) {
          console.log(response);
          if (response.results.length > 0) {
            let graphic = response.results[0].graphic;
            sceneView.whenLayerView(graphic.layer).then(function (layerView) {
              if (!highlightHandle) {
                highlightHandle = layerView.highlight(graphic);
                if (tooltipsEnabled && tooltipBehavior === "view-mouseover") {
                  sceneView.popup.open({
                    features: [graphic], // array of graphics with popupTemplate set and geometries
                    location: graphic.geometry.centroid, // updates the location of popup based on
                    // selected feature's geometry
                  });
                }
              }
            });
          } else {
            if (highlightHandle) {
              highlightHandle.remove();
              highlightHandle = null;
              if (tooltipsEnabled && tooltipBehavior === "view-mouseover")
                sceneView.popup.close();
            }
          }
        });
      });
    };

    // Only initialize view once.
    viewRef.ui.container = uiDiv.current;

    addMeasurementTool(viewRef);
    addSketchTool(mapRef, viewRef);
    if (props.layersVisible) {
      addLayerControlTool(viewRef);
    }

    addHighlighting(viewRef);
    if (!tooltipsEnabled || tooltipBehavior === "view-mouseover") {
      viewRef.popup.autoOpenEnabled = false;
    }

    if (viewRef.camera === undefined) {
      viewRef.camera = new Camera({
        position: {
          latitude: props.latitude,
          longitude: props.longitude,
          z: props.altitude,
        },
       });
    }

      //Uncomment this to see a shapefile loaded onto the map.
      //props.importShapefile(mapRef.current, viewRef.current);
   }, [props, tooltipBehavior, tooltipsEnabled]);

  return (
    <div>
      <div className="mapDiv" ref={mapDiv}></div>
      <div className="uiDev" ref={uiDiv}></div>
    </div>
  );
};

EsriGlobe.propTypes = {
  map: PropTypes.instanceOf(Map).isRequired,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  altitude: PropTypes.number.isRequired,
  layersVisible: PropTypes.bool,
};
export default EsriGlobe
