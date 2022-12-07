'use strict'

const STORAGE_KEY_USER_DB = 'userDB'

const gUser = _createUser()

function saveSettings(newUserSettings) {
    saveToStorage(STORAGE_KEY_USER_DB, newUserSettings)
}

function getUser() {
    return loadFromStorage(STORAGE_KEY_USER_DB) || gUser
}

function getCurrUserLoc() {
    const currUserSettings = loadFromStorage(STORAGE_KEY_USER_DB)
    return {
        lat: +currUserSettings.location.split(',')[0],
        lng: +currUserSettings.location.split(',')[1]
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