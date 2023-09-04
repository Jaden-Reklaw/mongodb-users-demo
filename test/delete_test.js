const assert = require('assert');
const User = require('../src/user');

describe.skip('Deleting Records!', () => {

    let user1;
    const fullName = 'Bob Belcher';

    beforeEach(async () => {
        user1 = new User({ name: fullName });
        await user1.save();
    });

    async function assertName(operation) {
        await operation;
        const user = await User.findOne({ name: fullName });
        assert(user === null);
    }

    it('model instance delete', async () => {
        await assertName(user1.deleteOne());
    });

    it('a class method delete. Find all instances of name and delete', async () => {
        await assertName(User.deleteMany({ name: fullName }));
    });

    it('class method findAndDelete', async () => {
        await assertName(User.findOneAndDelete({ name: fullName }));
    });

    it('class method findByIdAndDelete', async () => {
        await assertName(User.findByIdAndDelete({ _id: user1._id }));
    });
});
