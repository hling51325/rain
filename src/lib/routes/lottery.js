
module.exports = [
    {
        verb: 'get',
        url: '/lottery/',
        methods: [lottery]
    }
]

const { Lottery } = require('../schema')
async function lottery(ctx, next) {
    let data = await Lottery.find({}).sort({ expect: -1 })
    const total = data.length
    const last = data[0].expect
    const begin = data[total - 1].expect
    let redCount = {}
    let blueCount = {}
    data.forEach(item => {
        item.red.forEach(red => {
            redCount[red] = redCount[red] !== undefined ? redCount[red] + 1 : 0
        })
        blueCount[item.blue] = blueCount[item.blue] !== undefined ? blueCount[item.blue] + 1 : 0
    })
    ctx.body = {
        total,
        redCount,
        blueCount,
        begin,
        last
    }
}