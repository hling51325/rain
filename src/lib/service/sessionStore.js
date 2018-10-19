
const mongoose = require('mongoose')

const schema = {
    id: String,
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

    async destroy(id) {
        const { session } = this;
        return session.remove({ id });
    }

    async get(id) {
        const { session } = this;
        const { data } = await session.findOne({ id });
        return data;
    }

    async set(id, data, maxAge, { changed, rolling }) {
        if (changed || rolling) {
            const { session } = this;
            const record = { id, data, updatedAt: new Date() };
            await session.findOneAndUpdate({ id }, record, { upsert: true, safe: true });
        }
        return data;
    }

    static create(opts) {
        return new MongooseStore(opts);
    }
}

module.exports = MongooseStore