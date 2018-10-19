module.exports = req => {
    let filter = {
        where: {},
        sort: null,
        limit: -1,
        skip: 0,
        project: null
    }

    let where = req.query.where || null;
    if (where) {
        try {
            where = JSON.parse(where);
        } catch (error) {
            throw `parse filter.where: ${error}`;
        }
    }
    filter.where = where

    filter.sort = req.query.sort || null;
    filter.project = req.query.project || null;

    let limit = req.query.limit;
    if (limit) {
        filter.limit = Number(limit);
    }
    let skip = req.query.skip;
    if (skip) {
        filter.skip = Number(skip);
    }

    return filter
}