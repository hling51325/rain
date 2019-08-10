
module.exports = [
    {
        verb: 'get',
        url: '/touch/',
        method: touch
    },
    {
        verb: 'get',
        url: '/test',
        methods: [test]
    },
    {
        verb: 'get',
        url: '/time',
        methods: [time]
    }
]

const { Test } = require('../schema')
async function touch(ctx, next) {
    ctx.response.body = "hello world"
}

async function test(ctx, next) {
    const test = await Test.findOneAndUpdate({ foo: 'foo' }, {}, {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true
    })
    ctx.response.body = test
}

function time(ctx, next) {
    const time = Date.now()
    ctx.response.body = time
}