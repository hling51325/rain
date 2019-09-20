
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
    },
    // {
    //     verb: 'get',
    //     url: '/cpu',
    //     methods: [cpu]
    // },
    // {
    //     verb: 'get',
    //     url: '/memory',
    //     methods: [memory]
    // }
]

const { Test } = require('../schema')
function touch(ctx, next) {
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
    ctx.response.body = Date.now()
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

function cpu(ctx) {
    let count = 0
    for (let i = 0; i < 5000000000; i++) {
        count++
    }
    ctx.response.body = count
}

const { timeout } = require('../service/util')
async function memory(ctx) {
    let array = []
    for (let i = 0; i < 10000000; i++) {
        // array = [...array, i]
        array.push(i)
    }
    await timeout(5000)
    ctx.body = array
}