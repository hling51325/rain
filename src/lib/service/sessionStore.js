
const mongoose = require('mongoose')

const schema = {
    data: Object,
    updatedAt: {
        default: new Date(),
        expires: 86400, // 1 day
        type: Date
    }
};
class MongooseStore {
    constructor({
        // collection = 'sessions',
        expires = 86400,
        name = 'session'
    } = {}) {
        const updatedAt = { ...schema.updatedAt, expires };
        const { Schema } = mongoose;
        this.session = mongoose.model(name, new Schema({ ...schema, updatedAt }));
    }

    async destroy(_id) {
        const { session } = this;
        return session.remove({ _id });
    }

    async get(_id) {
        const { session } = this;
        const __session = await session.findOne({ _id });
        return __session && __session.data;
    }

    async set(_id, data, maxAge, { changed, rolling }) {
        if (changed || rolling) {
            const { session } = this;
            const record = { data, updatedAt: new Date() };
            await session.findOneAndUpdate({ _id }, record, { upsert: true, safe: true });
        }
        return data;
    }

    static create(opts) {
        return new MongooseStore(opts);
    }
}

module.exports = MongooseStore