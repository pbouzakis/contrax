
function localFunc() {
}

var staticVar = 5;

module.exports = function Foo(baz) {
    this.title = baz.name;
    this.size = baz.value;

    this.onClick = function () {
        baz.exec();
    };
};
