const assert = require('assert');
const User = require('../src/user');

describe.skip('Creating Records!', () => {
    
    it('Save a new user', () => {
        const user1 = new User({name: 'Axel'});
        user1.save()
        .then((done) => {
            assert(!user1.isNew);
            done();
        });
    });
});