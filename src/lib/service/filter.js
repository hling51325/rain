module.exports = async (ctx, next) => {
    let filter = {
        where = {},
        sort = null,
        project = null,
        skip = 0,
        limit = -1
    } = ctx.query

    if (filter.where) {
        try {
            filter.where = JSON.parse(where);
        } catch (error) {
            throw `parse filter.where: ${error}`;
        }
    }

    await next()
}