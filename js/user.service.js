'use strict'

const STORAGE_KEY_USER_DB = 'userDB'

const gUser = _createUser()

function saveUserSettings(newUserSettings) {
    saveToStorage(STORAGE_KEY_USER_DB, newUserSettings)
}

function getUser() {
    return loadFromStorage(STORAGE_KEY_USER_DB) || gUser
}

function getCurrUserLoc() {
    const currUserSettings = loadFromStorage(STORAGE_KEY_USER_DB)
    const locations = currUserSettings.location.split(',')
    return {
        lat: +locations[0],
        lng: +locations[1]
    }
}

function getCurrUserZoom() {
    const currUserSettings = loadFromStorage(STORAGE_KEY_USER_DB)
    return +currUserSettings.zoom
}


function _createUser() {
    if (!loadFromStorage(STORAGE_KEY_USER_DB)) return {
        id: makeId(),
        userName: 'Guest',
        bgColor: '#211C1C',
        txtColor: '#FDDDDD',
        zoom: 12,
        location: '12,12'
    }
    else return loadFromStorage(STORAGE_KEY_USER_DB)
}