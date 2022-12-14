'use strict'

const STORAGE_KEY_PLACE_DB = 'placeDB'
const gSavedPlaces = loadFromStorage(STORAGE_KEY_PLACE_DB) || _createPlaces()

function getPlaces() {
    return gSavedPlaces
}

function savePlaceList() {
    const userPrefStartLoc = gSavedPlaces.findIndex(place => place.name.includes('Start'))
    if (userPrefStartLoc === -1) return saveToStorage(STORAGE_KEY_PLACE_DB, gSavedPlaces)
    console.log('userPrefStartLoc:', userPrefStartLoc)
    gSavedPlaces.splice(userPrefStartLoc, 1)
    saveToStorage(STORAGE_KEY_PLACE_DB, gSavedPlaces)
}

function removePlace(placeId) {
    const placeIdx = gSavedPlaces.findIndex(place => place.id === placeId)
    if (placeIdx === -1) return
    gSavedPlaces.splice(placeIdx, 1)
    if (gSavedPlaces.length === 0) {
        saveToStorage(STORAGE_KEY_PLACE_DB, null)
        return
    }
    saveToStorage(STORAGE_KEY_PLACE_DB, gSavedPlaces)
}

function addPlace({
    lat,
    lng,
    name,
    time
}) {
    gSavedPlaces.unshift(_createPlace({
        lat,
        lng,
        name,
        time
    }))
    saveToStorage(STORAGE_KEY_PLACE_DB, gSavedPlaces)
}


function _createPlace({
    lat,
    lng,
    name,
    time
}) {
    return {
        id: makeId(),
        lat,
        lng,
        name,
        time
    }
}

function _createPlaces() {
    return [{
        id: makeId(),
        lat: 32,
        lng: 15,
        name: 'Home',
        time: '16/10/22, 13:01'
    }, {
        id: makeId(),
        lat: 12,
        lng: 34,
        name: 'Safari',
        time: '16/10/22, 13:01'
    }, {
        id: makeId(),
        lat: 65,
        lng: 67,
        name: 'School',
        time: '16/10/22, 13:01'
    }]
}

// * get User's location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
}



// * funcitons for thr CSV bouns
function getPlaceAsCSV() {
    let csvStr = `Id,Latitude,Longitude,Name`
    if (gPlaces.length) {
        gPlaces.forEach((place) => {
            const csvLine = `\n${place.id}, ${place.pos.lat}, ${place.pos.lng}, ${place.name}`
            csvStr += '\n' + csvLine
        })
        return csvStr
    }
}

function downloadCSV() {
    const csvContent = getPlaceAsCSV()
    if (!csvContent) return
    window.open('data:text/csv;charset=utf-8,' + csvContent)
}