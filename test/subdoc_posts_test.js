const assert = require('assert');
const User = require('../src/user');

describe.skip('Working with sub documents: Users with posts', () => {

    const fullName = 'Tony Stark';
    let user;
    
    beforeEach(async () => {
        user = new User({
            name: fullName, 
            posts: [{ title: 'Iron Man', content: 'Origin Story'}]
        });

        await user.save();
    });

    it('Create user with posts!', async () => {
        
        const fetchedUser = await User.findOne({name: fullName});

        assert(fetchedUser._id.toString() === user._id.toString());
        assert(fetchedUser.posts[0].title === user.posts[0].title);
    });

    it('Create new post on an existing user', async () => {

        const fetchedUser = await User.findOne({name: fullName});

        fetchedUser.posts.push({title: 'Iron Man2', description: 'Enlightment Story'})

        await fetchedUser.save();

        const fetchedUserAgain = await User.findOne({name: fullName});

        assert(fetchedUserAgain._id.toString() === user._id.toString());
        assert(fetchedUserAgain.posts[0].title === user.posts[0].title);
        assert(fetchedUserAgain.posts[1].title === fetchedUser.posts[1].title);
        assert(fetchedUserAgain.posts.length > user.posts.length);
    });

    it('Create new post on an existing user', async () => {

        const fetchedUser = await User.findOne({name: fullName});

        // fetchedUser.posts[0].pull()
        //or
        const post = fetchedUser.posts[0];
        fetchedUser.posts.pull(post);
        await fetchedUser.save();

        const fetchedUserAgain = await User.findOne({name: fullName});

        assert(fetchedUserAgain._id.toString() === user._id.toString());
        assert(fetchedUser.posts.length === 0);
    });
}); 