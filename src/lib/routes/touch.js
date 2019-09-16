
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
    },
    // 测试mongodb socket/connectPool/Slow Trains/
    {
        verb: 'get',
        url: '/mongo-socket-1',
        methods: [mongoTest1]
    },
    {
        verb: 'get',
        url: '/mongo-socket-2',
        methods: [mongoTest2]
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

async function mongoTest1(ctx, next) {
    const test = await Test.findOne({})
    ctx.response.body = test
}

async function mongoTest2(ctx, next) {
    await Promise.all([
        Test.findOne({ $where: 'sleep(10000) || true' }),
        Test.findOne({ $where: 'sleep(10000) || true' })
    ])
    ctx.response.body = 'ok'
}