const socketClient = io() //handshake

let chatBox = document.getElementById('chatBox')
chatBox.addEventListener('keyup', evt => {
    if (evt.key === "Enter")
    socketClient.emit('message', chatBox.value)
})

socketClient.on('history', data => {
    let history = document.getElementById('history')
    let messages = ''
    data.forEach(message => {
        messages += `[${message.userId}]: ${message.message}<br />`
    })
    history.innerHTML = messages
    chatBox.value = ""
})