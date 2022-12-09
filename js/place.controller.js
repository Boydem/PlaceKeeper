'use strict'

function onMapPageInit() {
    renderPlaceList()
    renderUserPrefs()
    // const elMap = document.querySelector('#map')
}

function onPlaceClick(lat, lng) {
    centerMap(lat, lng)
}

function onAddPlace(ev) {
    const loc = {
        name: prompt('enter name'),
        lat: ev.latLng.lat(),
        lng: ev.latLng.lng(),
        time: createFormatedDate(Date.now())
    }
    addPlace(loc)
    renderPlaceList()
}

function onRemovePlace(listId) {
    removePlace(listId)
    renderPlaceList()
}

function renderPlaceList() {
    const places = getPlaces()
    const strHTML = places.map(place => `
    <article data-list-id="${place.id}" class="list-item" onclick="onPlaceClick(${place.lat},${place.lng})">
        <span class="list-title">${place.name}</span>
        <span class="list-time">Saved: ${place.time}</span>
        <span class="btn-del-list" onclick="onRemovePlace('${place.id}')">✕</span>
        </article>`)
    const elSavedContainer = document.querySelector('.saved-container')
    elSavedContainer.innerHTML = strHTML.join('')
}

function centerMap(lat = 55, lng = 44) {
    const elMap = document.querySelector('#map')
    const currUserZoom = getCurrUserZoom()
    // options
    let options = {
        zoom: currUserZoom,
        center: {
            lat,
            lng
        }
    }
    // The map   
    const map = new google.maps.Map(
        elMap, options);
    // The marker
    const marker = new google.maps.Marker({
        position: {
            lat,
            lng
        },
        map: map,
    });
    // map.addListener("dblclick", onAddPlace)
}

function initMap() {
    const elMap = document.querySelector('#map')
    const currUserLoc = getCurrUserLoc()
    const currUserZoom = getCurrUserZoom()
    // options
    let options = {
        zoom: currUserZoom,
        center: currUserLoc,
    }
    // The map   
    const map = new google.maps.Map(
        elMap, options);
    // The marker
    const marker = new google.maps.Marker({
        position: currUserLoc,
        map: map,
    });
    map.addListener("dblclick", onAddPlace)

    marker.addListener("click", () => {
        map.setZoom(8);
        map.setCenter(marker.getPosition());
      });
}