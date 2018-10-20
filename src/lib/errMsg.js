const errorMessagegs = {
    user: {
        none: {
            status: 400,
            message: '用户不存在'
        },
        exist: {
            status: 400,
            message: '用户已存在'
        }
    }
}

module.exports = (which) => {
    let array = which.split('.')
    return array.reduce((curr, next) => curr[next], errorMessagegs)
}