export const FIELDS = ['name', 'price', 'description', 'image', /*'isVisible', */'children'];

export function validateField (field, value) {
    if (field === 'name') {
        return value || '- не вказано -'
    }

    if (field === 'price') {
        return Number(value) || 0;
    }

    if (field === 'image' || field === 'description') {
        return value;
    }

    if (field === 'isVisible') {
        return !!value;
    }

    if (field === 'children') {
        return value === null || value === undefined ? null : value + '';
    }

    return value;
}
