const assert = require('assert');
const User = require('../src/user');

xdescribe('Updating Records!', () => {

    let user1;
    const fullName = 'Bob Belcher';
    const updatedName = 'Gene Belcher';

    beforeEach(async () => {
        user1 = new User({name: fullName, followers: 0});
        await user1.save();
    });

    async function assertName(operation) {
        await operation
        const users = await User.find({});
        assert(users.length === 1);
        assert(users[0].name === updatedName)
      }

    it('instace type using set n save', async () => {
        user1.set({name: updatedName});
        await assertName(user1.save())
    });

    it('A model instance can update', async () => {
        await assertName(user1.updateOne({ name: updatedName }));
    });

    it('A model class can update. Find all instances and update with new name', async () => {
        await assertName(User.updateMany({name: fullName}, {name: updatedName}));
    });

    it('A model class can update. Find one instance and update.', async () => {
        await assertName(User.findOneAndUpdate({name: fullName}, {name: updatedName}))
    });

    it('A model class can update. Find one instance by id and update', async () => {
        await assertName(User.findByIdAndUpdate(user1._id, {name: updatedName})); 
    });

    //mongo update operators best way to update records in a mongo database
    //need to fix since we removed postCount from schema
    it('a user can have their followers incremented by 1', async () => {
        await User.updateMany({name: fullName}, {$inc: {followers: 1}})
        const user = await User.findOne({name: fullName})
        assert(user.followers === 1)
    });
});