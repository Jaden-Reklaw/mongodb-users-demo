const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');
const Comment = require('../src/comment');

xdescribe('Association Testing', () => {
    let user, blogPost, comment;
    const fullName = 'Bruce Banner';
    const postTitle = 'The Incredible Hulk: Issue'
    const contentOfPost = 'The man turns green and destroys everything in his path.'
    const contentOfComment = 'That is crazy he can do that.'
    
    beforeEach(async () => {
        
        //Create objects
        user = new User({name: fullName});
        blogPost = new BlogPost({title: postTitle, content: contentOfPost});
        comment = new Comment({content: contentOfComment});

        //Reference object together
        user.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = user; //assigning an author to the comment

        await Promise.all([user.save(), blogPost.save(), comment.save()]);
    });

    it('check a users associated blogPost and associated comment', async () => {
        const fetchedUser = await User.findById(user._id)
        .populate({
            path: 'blogPosts',
            populate: {
                path: 'comments',
                model: 'comment',
                populate: {
                    path: 'user',
                    model: 'user'
                }
            }
        });

        assert(fetchedUser.name === fullName)

        assert(fetchedUser.blogPosts[0].title === postTitle);
        assert(fetchedUser.blogPosts[0].content === contentOfPost);

        assert(fetchedUser.blogPosts[0].comments[0].content === contentOfComment);

        assert(fetchedUser.blogPosts[0].comments[0].user.name === fullName);
    })
});