const assert = require('assert');
const User = require('../src/user');

describe('Reading Records!', () => {

    let user1;
    const fullName = 'Linda Belcher';

    beforeEach((done) => {
        user1 = new User({name: fullName});
        user1.save()
        .then(() => done())
    });

    it(`Find all users with name of ${fullName}`, (done) => {
        User.find({name: fullName}).then(users => {
            assert(user1._id.toString() === users[0]._id.toString())
            done();
        });
    });

    it('Find a user by ID', (done) => {
        User.findOne({_id: user1._id})
        .then((user) => {
            assert(user.name === fullName)
            done();
        })
    });
});