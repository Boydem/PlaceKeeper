'use strict'

function onMapPageInit() {
    renderUserPrefs()
    renderPlaceList()
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
    centerMap(loc.lat, loc.lng)
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

function centerMap(lat, lng) {
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
    const locations = getPlaces()
    locations.forEach(location => {
        const marker = new google.maps.Marker({
            position: {
                lat: location.lat,
                lng: location.lng
            },
            map: map,
        });
        marker.setMap(map)
        // marker.addListener("click", centerMap('ev.lat(),ev.lng()'))
    })
    map.addListener("dblclick", onAddPlace)
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

    const locations = getPlaces()
    locations.forEach(location => {
        const marker = new google.maps.Marker({
            position: {
                lat: location.lat,
                lng: location.lng
            },
            map: map,
        });
        marker.setMap(map)
    })
    // The marker
    map.addListener("dblclick", onAddPlace)

}