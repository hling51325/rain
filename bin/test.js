const assert = require('assert');

function powerSupply(network, power_plants) {
    let search = []
    let connect = []

    for (let key in power_plants) {
        job(key, power_plants[key], 0)
    }

    let all = network.reduce((curr, next) => {
        next.forEach(item => {
            if (!curr.find(__item => __item === item)) {
                curr.push(item)
            }
        })
        return curr
    }, network[0]).filter(item => !Object.keys(power_plants).find(__item => __item === item))

    return all.filter(item => !connect.find(__item => __item === item))

    function job(city, times, j) {

        if (j >= times) return
        network.forEach((node, index) => {
            if (search.find(item => item === index) !== undefined) return
            let i = node.findIndex(item => item === city)
            if (i === -1) return
            search.push(index)
            let another = i === 0 ? 1 : 0;
            connect.push(node[another])
            j++
            job(node[another], times, j)
        })

    }
}

assert.deepEqual(
    powerSupply([['p1', 'c1'], ['c1', 'c2']], {'p1': 1}).sort(),
    ['c2'],
    "one blackout"
)
assert.deepEqual(
    powerSupply([['c0', 'c1'], ['c1', 'p1'], ['c1', 'c3'], ['p1', 'c4']], {'p1': 1}).sort(),
    ['c0', 'c3'].sort(),
    "two blackout"
)
assert.deepEqual(
    powerSupply([['p1', 'c1'], ['c1', 'c2'], ['c2', 'c3']], {'p1': 3}).sort(),
    [],
    "no blackout"
)
assert.deepEqual(
    powerSupply([['c0', 'p1'], ['p1', 'c2']], {'p1': 0}).sort(),
    ['c0', 'c2'].sort(),
    "weak power-plant"
)
assert.deepEqual(
    powerSupply([['p0', 'c1'], ['p0', 'c2'], ['c2', 'c3'], ['c3', 'p4'], ['p4', 'c5']],
        {'p0': 1, 'p4': 1}).sort(),
    [],
    "cooperation"
)
assert.deepEqual(
    powerSupply([['c0', 'p1'], ['p1', 'c2'], ['c2', 'c3'], ['c2', 'c4'], ['c4', 'c5'],
            ['c5', 'c6'], ['c5', 'p7']],
        {'p1': 1, 'p7': 1}).sort(),
    ['c3', 'c4', 'c6'].sort(),
    "complex cities 1"
)
assert.deepEqual(
    powerSupply([['p0', 'c1'], ['p0', 'c2'], ['p0', 'c3'],
            ['p0', 'c4'], ['c4', 'c9'], ['c4', 'c10'],
            ['c10', 'c11'], ['c11', 'p12'], ['c2', 'c5'],
            ['c2', 'c6'], ['c5', 'c7'], ['c5', 'p8']],
        {'p0': 1, 'p12': 4, 'p8': 1}).sort(),
    ['c6', 'c7'].sort(),
    "complex cities 2"
)
assert.deepEqual(
    powerSupply([['c1', 'c2'], ['c2', 'c3']], {}).sort(),
    ['c1', 'c2', 'c3'].sort(),
    "no power plants"
)
assert.deepEqual(
    powerSupply([['p1', 'c2'], ['p1', 'c4'], ['c4', 'c3'], ['c2', 'c3']],
        {'p1': 1}).sort(),
    ['c3'],
    "circle"
)
assert.deepEqual(
    powerSupply([['p1', 'c2'], ['p1', 'c4'], ['c2', 'c3']], {'p1': 4}).sort(),
    [],
    "more than enough"
)

assert.deepEqual(
    powerSupply(
        [["p1", "c2"], ["c2", "c3"], ["c3", "c4"], ["c4", "p5"], ["c6", "c7"], ["c7", "c8"], ["c8", "c9"], ["c9", "c10"], ["c11", "c12"], ["c12", "c13"], ["c13", "c14"], ["c14", "c15"], ["c16", "c17"], ["c17", "c18"], ["c18", "c19"], ["c19", "c20"], ["p21", "c22"], ["c22", "c23"], ["c23", "c24"], ["c24", "p25"], ["p1", "c6"], ["c2", "c7"], ["c3", "c8"], ["c4", "c9"], ["p5", "c10"], ["c6", "c11"], ["c7", "c12"], ["c8", "c13"], ["c9", "c14"], ["c10", "c15"], ["c11", "c16"], ["c12", "c17"], ["c13", "c18"], ["c14", "c19"], ["c15", "c20"], ["c16", "p21"], ["c17", "c22"], ["c18", "c23"], ["c19", "c24"], ["c20", "p25"]], {
            "p25": 3,
            "p1": 3,
            "p21": 3,
            "p5": 3
        }),
    ["c13"])
console.log("Push!! Push Check NOW!!");