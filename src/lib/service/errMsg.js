const errorMessages = {
    UNEXCEPT: {
        status: 500,
        message: '系统未知错误'
    },
    MISS_PARAMS: {
        status: 400,
        message: '参数错误'
    },
    USER_EXIST: {
        status: 400,
        message: '用户已存在'
    },
    USER_NONE: {
        status: 400,
        message: '用户不存在'
    },
    NO_AUTH: {
        status: 403,
        message: '没有权限'
    }
}

module.exports = errorMessages