const schedule = require('node-schedule');
const axios = require('axios')
const { Lottery } = require('../schema')

schedule.scheduleJob('0 0 0 * * ?', lottery);

async function lottery() {
    let URL = 'http://www.mxnzp.com/api/lottery/ssq/latest'
    let { data } = await axios.get(URL)
    data = data.data
    let isExists = await Lottery.findOne({ expect: data.expect })
    if (isExists) return
    console.log(data)
    await Lottery.create(job(data))

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
}