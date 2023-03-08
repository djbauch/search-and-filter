import Portal from '@arcgis/core/portal/Portal';
import PortalQueryParams from "@arcgis/core/portal/PortalQueryParams";
import { Container } from 'reactstrap';
import { Form, Button, Row, Col } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

export const BrowseLayersPortal = (props) => {

    const [numResults, setNumResults] = useState("0");
    const [ownerType, setOwnerType] = useState("Esri");
    const [itemType, setItemType] = useState("Feature Service");
    const [sortType, setSortType] = useState("numviews");
    const [queryString, setQueryString] = useState("");
    const [resultsList, setResultsList] = useState([]);

    const results = document.getElementById("results");
    const contentFile = document.getElementById("contentFile");

    // useEffect(() => {
    //     queryPortal();
    // }, [ownerType, itemType, sortType, queryString]);

    useEffect(() => {
        //foreach item in resultsList, add to results
        resultsList.map(result => {
            results?.appendChild(result);
        });
    }, [setResultsList, resultsList]);
 /* TODO:
    const SearchInputBox = () => {
        return (
            <Form.Control
                id="search"
                type="text"
                placeholder="e.g. weather, census, population, trails..."
                size="sm"
                className="esri-input esri-search__input"
                value={queryString}
                onChange={e => setQueryString(e.target.value)}
                onKeyUp={(e) => {handleKeyUp(e)}} >
            </Form.Control>
        )
    };

    const handleKeyUp = (e) => {
        if (e.charCode ===  13 || e.key === "Enter") {
            setQueryString(e.target.value); //this triggers queryPortal
        };
    }

    const ownerTypes = ["Esri", "Public", "Private"];
    const OwnerTypeDropdown = () => {
        let options = ownerTypes.map(oType => {
            return(
                <option
                        key={oType}
                        value={oType}>
                    {(oType === "Private") ? oType + " (sign in)" : oType}
                </option>
            );
        });
        return(
            <span title="Changes the owner type filter.">
                <Form.Select size="sm" className="custom-select custom-select-sm enabled"
                    value={ownerType}
                    name="ownerType"
                    id="ownerTypeSelect"
                    onChange={(e: any) => handleOwnerChangeSelect(e.target.value)}>
                   {options}
                </Form.Select>
            </span>
        );
    }
    const handleOwnerChangeSelect = (changedItem) => {
        setOwnerType(changedItem);
    }

    // const itemTypes = ["Web Map", "Web Scene", "Layers", "Feature Service", "Vector Tile Service", "Tile Service", "Scene Service", "GeoJson", "Application Configuration", "Map Package", "Layer Package", "CSV", "Shapefile", "Microsoft Word", "Microsoft Excel", "PDF"];
    const itemTypesLess = ["Layers", "Feature Service", "Vector Tile Service", "Tile Service", "Image Service"];
    const ItemTypeDropdown = () => {
        let options = itemTypesLess.map(iType => {
            return(
                <option
                    key={iType}
                    value={iType}>
                    {iType}
                </option>
            );
        });
        return(
            <span title="Changes the item type filter.">
                <Form.Select size="sm" className="custom-select custom-select-sm enabled"
                    value={itemType}
                    name="itemType"
                    onChange={(e: any) => handleItemChangeSelect(e.target.value)}>
                   {options}
                </Form.Select>
            </span>
        );
    }
    const handleItemChangeSelect = (changedItem) => {
        setItemType(changedItem);
    }

    const ResultsList = () => {
        return(
            <ul id="results" role="presentation" className="esri-basemap-gallery__item-container search-panel__results" onClick={onResultListClick}></ul>
        );
    }

    let currentOwnerType = ownerType;

    function queryPortal() {
        //const ownerType = ownerTypeSelect?.value;  // Default "Esri"
        //console.log("ownertype:" + ownerType);
        const portal = new Portal({
            url: "https://www.arcgis.com/",
            authMode: (ownerType === "Private") ? "immediate" : "auto"
        });
        // Reset credentials, force login for private
        // if (currentOwnerType !== ownerType) {
        //     IdentityManager.destroyCredentials();
        // }

        // Query portal and login if private
        portal.load()
        .then(()=>{
            currentOwnerType = ownerType;
            getItems(portal);
        })
        .catch((error)=>{
            // Reset if login fails
           // ownerTypeSelect?.value = currentOwnerType
           console.log(error);
           //console.log(currentOwnerType + " : " + ownerType);
           setOwnerType('Esri');    //back to default, to do: make this go back to previous choice
        });
    }

    function getItems(portal){
        const itemString = getItemType(itemType);
        const ownerString = getOwnerType(portal, ownerType);
        // Build query params
        const query = `${queryString} ${ownerString} ${itemString}`;
        const queryParams = new PortalQueryParams({
        query: query,
        sortField: sortType,
        sortOrder: "desc",
        num: 100,
        });
        // Query the portal and add items
        //console.log("queryPortal with " + query);
        portal.queryItems(queryParams)
        .then((response) => {
            //results.innerHTML = "";
            //results.scrollTop = 0;
            setNumResults(response.results.length);
            //console.log("results: " + response.results.length);
            let updatedResultsList = [];
            removeAllResults(results);
            response.results.forEach((item, i) => {
                const li = document.createElement("li");
                li.setAttribute("class", "esri-basemap-gallery__item" + ((i === 0) ? " esri-basemap-gallery__item--selected" : ""));
                li.setAttribute("item-id", item.id);
                li.setAttribute("item-type", itemType);
                li.setAttribute("item-url", item.url);
                li.setAttribute("item-title", item.title);
                li.innerHTML = getItemHTML(item);
                //results?.appendChild(li); //moved this to useEffect when list is updated
                updatedResultsList.push(li);
            });
            setResultsList(updatedResultsList);
            // Display the first item
        }).catch((error)=>{
           console.log("Error in getItems BrowseLayersPortal: " + error);
        });
    }

    function removeAllResults(resultList)
    {
        var child = resultList?.lastElementChild;
        while (child) {
            resultList.removeChild(child);
            child = resultList.lastElementChild;
        }
    }

    function getItemType(itemType) {
        if (itemType === "Layers") {
            //return `((type:"Scene Service" OR type:"Feature Collection" OR type:"Route Layer" OR type:"Layer" OR type:"Feature Service" OR type:"Feed" OR type:"Vector Tile Service" OR type:"Image Service" OR type:"WMS" OR type:"KML" OR typekeywords:"OGC" OR typekeywords:"Geodata Service" -type:("Web Mapping Application" OR "Geodata Service" OR type:"WFS" OR type:"WMTS" OR type:"Stream Service")) -type:"Code Attachment")`;
            return `((type:"Feature Service" OR type:"Vector Tile Service" OR type:"Image Service" OR type:"WMS" OR typekeywords:"OGC" OR typekeywords:"Geodata Service" -type:("Web Mapping Application" OR "Geodata Service" OR type:"WFS" OR type:"WMTS" OR type:"Stream Service")) -type:"Code Attachment")`;
        } else {
            return `type:"${itemType}"`;
        }
    }

    function getOwnerType(portal, ownerType) {
        if (ownerType === "Esri") {
            return "(owner:esri OR owner:Federal_User_Community OR owner:esri_Landscape OR owner:esri_dm OR owner:AtlasPublisher OR owner:StoryMaps OR owner:esri_basemaps OR owner:UOdocent OR owner:esri_vector OR owner:esri_livefeeds OR owner:esri_oceans OR owner:esri_demographics OR owner:esri_observations OR owner:esri_landscape2 OR owner:Esri_GI OR owner:esri_livefeeds2 OR owner:esri_analytics)";
        } else if (ownerType === "Private") {
            return `(owner:${portal.user.username})`;
        } else {
            return "";
        }
    }

    function getItemHTML(item) {
        return `<img alt="" className="esri-basemap-gallery__item-thumbnail" src="${item.thumbnailUrl}">
        <div className="esri-basemap-gallery__item-title">
        <strong>${item.title}</strong><br>
        Owner: ${item.owner}<br>
        Type: ${item.type} | Views: ${item.numViews.toLocaleString()}<br>
        Created: ${new Date(item.created).toLocaleDateString("en-US")} | Last modified: ${new Date(item.modified).toLocaleDateString("en-US")}<br>
        Item ID: <a href="https://www.arcgis.com/home/item.html?id=${item.id}" target="_blank">${item.id}
        </div>`;
    }

    const onResultListClick = (event) => {
        const parent = event.target.parentNode;
        if (parent.classList.contains("esri-basemap-gallery__item")) {
            document.querySelector(".esri-basemap-gallery__item--selected").classList.remove("esri-basemap-gallery__item--selected");
            parent.classList.add("esri-basemap-gallery__item--selected");
            //loadItem(parent.getAttribute("item-id"),parent.getAttribute("item-type"));
            var selURL = parent.getAttribute("item-url");
            var selTitle = parent.getAttribute("item-title");
            var selType = parent.getAttribute("item-type");

            if(selType === "GeoJson" && (selURL === "null" || selURL === "")){
                //if it's a geojson, use item id to build the url
                //url: `https://www.arcgis.com/sharing/rest/content/items/${id}/data`
                var selItemID = parent.getAttribute("item-id");
                selURL = `https://www.arcgis.com/sharing/rest/content/items/${selItemID}/data`;
            }
            //console.log("selected " + selURL + " : " + selTitle + ", type : " + selType);
            props.setSelectedURL(selURL);
            props.setSelectedTitle(selTitle);
        }
    }

    const onChangeSortSelect = (changedItem) => {
        setSortType(changedItem);
    }

    const handleSearchClick = () =>  {
        //make sure queryString is updated
        var searchStr = document.getElementById("search");
        if(searchStr?.value)
            setQueryString(searchStr.value);
    }
 */
    return (
        <div id="browsePanel">

        </div>
    );
}

export default BrowseLayersPortal;