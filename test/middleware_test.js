const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

xdescribe('Middleware Testing', () => {
    let user, blogPost1, blogPost2;
    const fullName = 'Peter Parker';
    const postTitle = 'Spiderman: Issue';
    const contentOfPost = 'Why do you leave web everywhere?';
    beforeEach(async () => {
        
        //Create objects
        user = new User({name: fullName});
        blogPost1 = new BlogPost({title: postTitle, content: contentOfPost});
        blogPost2 = new BlogPost({title: postTitle, content: contentOfPost});

        //Reference object together
        user.blogPosts.push(blogPost1, blogPost2);

        await Promise.all([user.save(), blogPost1.save(), blogPost2.save()]);
    });
    
    it('users clean up left over blogPosts with middleware', async () => {

        const fetchedUser = await User.findById(user._id)

        assert(fetchedUser.blogPosts.length === 2)

        await user.deleteOne();

        const allUsers = await User.find({});
        const allBlogPosts = await BlogPost.find({});

        assert(allUsers.length === 0);
        assert(allBlogPosts.length === 0);
    });
});