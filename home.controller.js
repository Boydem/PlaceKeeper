'use strict'

renderUserName()

function renderUserName() {
    const user = getUser()
    if (!user) return console.log('NO USER FOUND')
    document.querySelector('.username-home').innerText = user.userName
}