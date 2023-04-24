document.querySelector("#msg").addEventListener("change", function() {
    let msg = this.value
    postMessage(msg)
    this.value = ""
})

async function postMessage(msg) {
    await fetch("http://localhost:3000/new-message", {
        method: "POST",
        body: JSON.stringify({ message: msg }),
        headers: {
             "Content-type": "application/json"
        }
    })
}

async function getMessages() {
    let r = await fetch("http://localhost:3000/messages")
    let data = await r.json()
    document.querySelector("#log").innerHTML = data.message.join('<br />')
    getMessages()
}

getMessages()