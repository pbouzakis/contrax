function exec(foo) {
    var a = foo.exec();
    var b = foo.name;
    var c = "SALT";

    foo.value = a + b + c;
}
