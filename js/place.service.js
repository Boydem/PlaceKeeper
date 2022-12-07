'use strict'

const STORAGE_KEY_PLACE_DB = 'placeDB'
const gSavedPlaces = loadFromStorage(STORAGE_KEY_PLACE_DB) ? loadFromStorage(STORAGE_KEY_PLACE_DB) : _createPlaces()

function getPlaces() {
    return gSavedPlaces
}

function removePlace(placeId) {
    const placeIdx = gSavedPlaces.findIndex(place => place.id === placeId)
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

function createFormatedDate(date) {
    const formatedDate = new Intl.DateTimeFormat('en').format(date)
    const options = {
        hour: '2-digit',
        minute: '2-digit'
    }
    const formatedTime = new Intl.DateTimeFormat('he', options).format(date)
    return formatedDate + ', ' + formatedTime
}