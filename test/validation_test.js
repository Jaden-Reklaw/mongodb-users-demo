const assert = require('assert');
const User = require('../src/user');

describe.skip('Validating records!', () => {

    it('Validate: Name is required!', async () => {
        
        const user = new User({name: undefined});
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;

        assert(message === 'Name is required!');
    });

    it('Validate: Name must be longer than 2 characters!', async () => {
        
        const user = new User({name: 'Tu'})
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;

        assert(message === 'Name must be longer than 2 characters!');
    });

    it('Validate: doesnt allow for invalid record to be saved', async () => {
        
        try {
            const user = new User({name: 'Tu'})
            const result = await user.save()
        } catch(error) {
            const { message } = error.errors.name.properties;

            assert(message === 'Name must be longer than 2 characters!')
        }  
    });
});