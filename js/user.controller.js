'use strict'

function onInit() {
    renderUserPrefs()

}

function onSaveSettings(ev) {
    ev.preventDefault()
    // capture the form this way
    const elForm = ev.target
    const elFormInputs = Array.from(elForm.querySelectorAll('input'))
    // reduce to map all inputs values
    const newUserSettings = elFormInputs.reduce((acc, elFormInput) => {
        if (elFormInput.id) acc[elFormInput.id] = elFormInput.value
        return acc
    }, {})
    saveUserSettings(newUserSettings)
    savePlaceList()
    renderUserPrefs()
    setUserPrefLocation()
}

function renderUserPrefs() {
    const user = getUser()
    // if (!user || user.userName === 'Guest') return console.log('NO USER FOUND')
    document.documentElement.style.setProperty('--bgc', `${user.bgColor}`)
    document.documentElement.style.setProperty('--text', `${user.txtColor}`)
    if (location.href.includes('user-settings.html')) {}
}

function setUserPrefLocation() {
    const startLocationCoords = getCurrUserLoc()
    const loc = {
        name: `${getUser().userName} Start Location`,
        lat: startLocationCoords.lat,
        lng: startLocationCoords.lng,
        time: createFormatedDate(Date.now())
    }
    addPlace(loc)
}