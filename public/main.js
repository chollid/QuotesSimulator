const update = document.querySelector('#update-button')

const deleteButton = document.querySelector('#delete-button')

update.addEventListener('click', _ => {
    //=====================
    // Put Request / Fetch(only way to trigger PUT in browser)
    //=====================
    // fetch(endpoint, options) -- endpoint = /quotes in database
    //=============================
    fetch('/quotes', {
        method: 'put',  // The type of DB request 
        headers: { 'Content-Type': 'application/json' },  //Tells server we are sender JSON
        body: JSON.stringify({
            name: 'Steve Jobs',
            quote: 'Everyone should learn how to program because it teaches you how to think.'
        })
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(response => {
        console.log(response)
    })
})

deleteButton.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'delete', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Steve Jobs'
        })
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(data => {
        window.location.reload()
    })
})
