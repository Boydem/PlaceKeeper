'use strict'
function onHomePageInit() {
    renderUserName()
    renderUserPrefs()
}

function renderUserName() {
    const user = getUser()
    if (!user) return console.log('NO USER FOUND')
    document.querySelector('.username-home').innerText = user.userName
}