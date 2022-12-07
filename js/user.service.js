'use strict'

const STORAGE_KEY = 'userDB'

const gUser = _createUser()


function saveSettings(newUserSettings) {
    saveToStorage(STORAGE_KEY, newUserSettings)
}

function getUser() {
    return loadFromStorage(STORAGE_KEY) || gUser
}

function _createUser() {
    if (!loadFromStorage(STORAGE_KEY)) return {
        id: makeId(),
        userName: 'Guest',
        bgColor: '#211C1C',
        txtColor: '#FDDDDD',
        zoom: 12,
        location: '12,12'
    }
    else return loadFromStorage(STORAGE_KEY)
}