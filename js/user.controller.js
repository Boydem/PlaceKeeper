'use strict'

function onInit() {
    renderUserPrefs()

}

function onSaveSettings(ev) {
    ev.preventDefault()
    // console.log(ev)
    const elForm = ev.target
    // console.log(elForm)
    const elFormInputs = Array.from(elForm.querySelectorAll('input'))
    // console.log(elFormInputs)
    const newUserSettings = elFormInputs.reduce((acc, elFormInput) => {
        if (elFormInput.id) acc[elFormInput.id] = elFormInput.value
        // console.log('elFormInput', elFormInput)
        return acc
    }, {})
    // let [userName, bgColor, txtColor, zoom, location] = elFormInputs
    // const newUserSettings = {
    //     userName: userName.value,
    //     bgColor: bgColor.value,
    //     txtColor: txtColor.value,
    //     zoom: zoom.value,
    //     location: location.value
    // }
    saveSettings(newUserSettings)
    renderUserPrefs()
}

function renderUserPrefs() {
    const user = getUser()
    if (!user) return console.log('NO USER FOUND')
    document.documentElement.style.setProperty('--bgc', `${user.bgColor}`)
    document.documentElement.style.setProperty('--text', `${user.txtColor}`)
    // console.log('document.documentElement', document.documentElement)
}