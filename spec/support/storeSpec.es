const { getState, addValue, editValue, removeValue } = require('../../server/store.es');

describe('store', () => {

    it('should create labels array with one label', () => {
        addValue('labels', { id: 1, name: 'label one' });
        const state = getState();
        expect(state.labels.length).toBe(1);

        expect(state.labels[0].name).toContain('one');
    });

    it('should add one more value', () => {
        addValue('labels', { id: 2, name: 'label two' });
        const state = getState();
        expect(state.labels.length).toBe(2);

        expect(state.labels[1].name).toContain('two');
    });

    it('should edit value', () => {
        editValue('labels', 2, { name: 'label three' });
        const state = getState();
        expect(state.labels.length).toBe(2);

        expect(state.labels[1].name).toContain('three');
    });

    it('should insert the value whilst editing the non-existing one', () => {
        editValue('labels', 4, { name: 'label four' });
        const state = getState();
        expect(state.labels.length).toBe(3);

        expect(state.labels[2].name).toContain('four');
    });

    it('should remove value', () => {
        removeValue('labels', 2);
        const state = getState();
        expect(state.labels.length).toBe(2);

        expect(state.labels.filter(l => l.id === 2).length).toBe(0);
    });

    it('should not remove non-existing value', () => {
        removeValue('labels', 2);
        const state = getState();
        expect(state.labels.length).toBe(2);

        expect(state.labels.filter(l => l.id === 2).length).toBe(0);
    });
});
