
let events = []
module.exports = {
    pub,
    sub,
    on
}

function pub(name, data) {
    return events[name].map(func => {
        return func(data)
    })
}

function sub() {


}

function on(name, func) {
    if (!events[name] || !Array.isArray(events[name])) events[name] = []
    events[name].push(func)
}