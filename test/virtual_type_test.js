const assert = require('assert');
const User = require('../src/user');

xdescribe('Virtual Types!', () => {

    const fullName = 'Tony Stark';
    let user;
    
    beforeEach(async () => {
        user = new User({
            name: fullName, 
            posts: [{ title: 'Iron Man', content: 'Origin Story'}]
        });

        await user.save();
    });

    //Check out virtual fields on user schema
    it('User virtual fields to calculate length of post', async () => {
    
        const fetchedUser = await User.findOne({name: fullName});

        assert(fetchedUser.postCount === 1);
    });
});