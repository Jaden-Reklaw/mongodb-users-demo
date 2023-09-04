const assert = require('assert');
const User = require('../src/user');

describe('Reading Records!', () => {

    let user1, user2, user3, user4, user5;
    const bob = 'Bob Belcher'
    const linda = 'Linda Belcher';
    const tina = 'Tina Belcher';
    const gene = 'Gene Belcher';
    const louis = 'Louis Belcher';

    beforeEach(async () => {

        user1 = new User({name: bob});
        user2 = new User({name: linda});
        user3 = new User({name: tina});
        user4 = new User({name: gene});
        user5 = new User({name: louis});

        await Promise.all([user1.save(), user2.save(), user3.save(), user4.save(), user5.save()]);
    });

    it(`Find all users with name of ${bob}`, async () => {
        
        const users = await User.find({name: bob});
        
        assert(user1._id.toString() === users[0]._id.toString())
    });

    it('Find a user by ID', async () => {
        
        const fetchedUser =  await User.findById(user1._id);
        
        assert(fetchedUser.name === bob);
    });

    it('should skip 2 records get the next 2 records tina and gene and not return louis', async () => {
        
        const users = await User.find({}).sort({name: 1}).skip(2).limit(2);

        assert(users.length === 2);
        assert(users[0].name === linda);
        assert(users[1].name === louis)
    });
});