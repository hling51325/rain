

const Schema = require('../schema')

// fields = [{
//     localField,
//     foreignField,
//     from,
//     as,
//     isArray
// }]
// option.series 串行执行
module.exports = async function lookup(data, fields, option) {
    fields = normalize(fields)
    let isSingle = Array.isArray(data)
    if (option.series) {
        for (field in fields) {
            await process(fields[field])
        }
    } else {
        await Promise.all(fields.map(process))
    }
    return data

    async function process({
        localField,
        foreignField,
        from,
        as,
        isArray
    }) {
        isArray = isArray !== undefined ? isArray :
            Array.isArray(data) ? Array.isArray(data[0][localField]) : Array.isArray(data[localField])

        const findedKeys = getFindedKeys(localField, isArray)
        let result = await Schema[from].find({ [foreignField]: { $in: findedKeys } })
        let fillMap = makeMap(result)
        fillData(fillMap, localField, as, isArray)

        function getFindedKeys(localField, isArray) {
            if (isSingle) {
                return Array.isArray(data.localField) ? data.localField : [data.localField]
            }

            let localFields = data.map(_ => _[localField])
            if (isArray) {
                localFields = localFields.reduce((curr, next) => {
                    return curr.concat(next)
                }, [])
            }
            localFields = localFields.filter(_ => _)
            return localFields
        }

        function makeMap(result) {
            return result.reduce((curr, next) => {
                curr[next._id] = next
                return curr
            }, {})
        }

        function fillData(fillMap, localField, as, isArray) {
            if (isSingle) {
                return data[as] = isArray ? data[localField].map(key => fillMap[key]) : fillMap[data[localField]]
            }

            data.forEach(item => {
                if (isArray) {
                    item[as] = item[localField].map(key => fillMap[key])
                } else {
                    item[as] = fillMap[item[localField]]
                }
            })
        }
    }

    function normalize(fields) {
        return Array.isArray(fields) ? fields : [fields]
    }
}