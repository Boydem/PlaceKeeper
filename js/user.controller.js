'use strict'

function onInit() {
    renderUserPrefs()

}

function onSaveSettings(ev) {
    ev.preventDefault()
    const elFormInputs = document.querySelectorAll('form input')
    let [userName, bgColor, txtColor, zoom, location] = elFormInputs
    const newUserSettings = {
        userName: userName.value,
        bgColor: bgColor.value,
        txtColor: txtColor.value,
        zoom: zoom.value,
        location: location.value
    }
    saveSettings(newUserSettings)
    renderUserPrefs()
}

function renderUserPrefs() {
    const user = getUser()
    if (!user) return console.log('NO USER FOUND')
    document.documentElement.style.setProperty('--bgc', `${user.bgColor}`)
    document.documentElement.style.setProperty('--text', `${user.txtColor}`)
}