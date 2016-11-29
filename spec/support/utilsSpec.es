const ModelHelpers = require('../../utils/model.es');

describe('ModelHelpers', () => {

    it('doesObjectContainKeys()', () => {
        const object = {
            id: 1,
            name: 'name',
            foo: 'bar'
        };
        const fields = ['id', 'name', 'foo'];
        const fieldsFew = ['id', 'name'];
        const fieldsMany = ['id', 'name', 'field'];

        expect(ModelHelpers.doesObjectContainKeys(object, fields)).toBe(true);
        expect(ModelHelpers.doesObjectContainKeys(object, fieldsFew)).toBe(true);
        expect(ModelHelpers.doesObjectContainKeys(object, fieldsMany)).toBe(false);
    });
});
