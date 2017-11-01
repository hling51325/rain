let axios = require('axios')
let chai = require('chai');
let assert = chai.assert;    // Using Assert style

describe('test', () => {
    before(() => {
        console.log('before')
    })

    describe('GET /blogs', () => {
        it('should get all blogs', () => {
            return axios.get('http://localhost:3333/api/blogs')
                .then(res => {
                    assert.equal(200, res.status)
                    assert.isArray(res.data);
                })
        })
    })

    after(() => {
        console.log('after')
    });

})