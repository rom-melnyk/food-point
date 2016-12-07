class Label {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.icon = data.icon;
    }
}

Label.FIELDS = ['id', 'name', 'icon'];

module.exports = Label;
