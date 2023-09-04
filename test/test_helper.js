const mongoose = require('mongoose');

before(async () => {
    try {
        await mongoose.connect('mongodb://localhost/users_test');
        
        mongoose.connection.on('error', (error) => {
            console.warn('Warning', error);
        });
        
        mongoose.connection.once('open', () => {
            console.log('Connected to MongoDB');
        });
    } catch (error) {
        console.error('Connection error:', error);
    }
});

beforeEach(async () => {
    try {
        await mongoose.connection.collections.users.drop();
        await mongoose.connection.collections.blogposts.drop();
        await mongoose.connection.collections.comments.drop();
    } catch (error) {
        console.error('Error dropping collection:', error);
    }
});

after(() => {
    mongoose.connection.close();
});
