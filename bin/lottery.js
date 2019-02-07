// http://www.mxnzp.com/api/lottery/ssq/lottery_list?page=1

let axios = require('axios')
const db = require('../src/lib/service/db')
const { Lottery } = require('../src/lib/schema')

const TOTAL = 94

main()

async function main() {
    await db.connect()
    for (let i = 0; i < TOTAL; i++) {
        await fetch(i + 1)
    }
}

async function fetch(page) {
    let { data } = await axios.get(`http://www.mxnzp.com/api/lottery/ssq/lottery_list?page=${page}`)
    let list = data.data.list
    let jobs = list.map(job)
    await Lottery.insertMany(jobs)
}

function job(data) {
    let code = data.openCode.split(',')
    let [six, blue] = code[5].split('+')
    code.pop()
    code = code.map(Number)
    return {
        red: [...code, Number(six)],
        blue: Number(blue),
        expect: data.expect,
        time: data.time
    }
}