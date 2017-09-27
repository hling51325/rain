module.exports = {
    find,
    insertOne,
    findOneAndUpdate
}

function find(collection, where) {
    return collection.find(where).toArray()
}

function insertOne(collection, data) {
    return collection.insertOne(data)
        .then(result => {
            return result.ops[0]
        })
        .catch(err => {
            console.log(err)
        })
}

function findOneAndUpdate(collection, where, data) {
    return collection.findOneAndUpdate(where, {$set: data})
        .then(result => {
            return result.value
        })
        .catch(err => {
            console.log(err)
        })
}