let _ = require('lodash')
let fields = ['a', 'b']
let obj = {
    a: 1,b: 2,c: 3
}

let obj1 = _.pick(obj, fields)
console.log(obj)
console.log(obj1)