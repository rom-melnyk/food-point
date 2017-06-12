import { h, Component } from 'preact';
import { Button, Types } from '../../form-elements/buttons';
import store from '../store';
import { updateGroup } from './group-actions';

function getParentGroup(id) {
    return store.state.groups.find(g => g.items.indexOf(id) !== -1);
}


function getArrow(dir, id, isGroup = false) {
    id = isGroup ? `g${id}` : id;
    const parent = getParentGroup(id);
    if (!parent) {
        return null;
    }

    const position = parent.items.indexOf(id);

    if ((position > 0 && dir === 'up') || (position < parent.items.length - 1 && dir === 'down')) {
        const title = `Перемістити ${dir === 'up' ? 'вгору' : 'вниз'}`;
        const iconClassName = `chevron-${dir === 'up' ? 'up' : 'down'}`;

        return <Button
            type={ Types.EDIT }
            onClick={ () => moveItem(dir, position, parent) }
            title={ title }
            narrow={ true }
            iconClassName={ iconClassName }
        />;
    } else {
        return null;
    }
}


function moveItem(dir, index, parent) {
    const lowerIndex = dir === 'up'  ? (index - 1) : index;

    const newItems = parent.items.slice(0, lowerIndex)
        .concat([
            parent.items[lowerIndex + 1],
            parent.items[lowerIndex]
        ])
        .concat(parent.items.slice(lowerIndex + 2));
    // console.log(`${parent.items.join(',')} <---> ${newItems.join(',')}`);

    updateGroup(parent.id, { items: newItems }, null, false);
}


export { getArrow };
