var fs = require("fs");
var contrax = require("../lib");

describe("contrax: ", function(){
    describe("with the simplest module ever", function(){

        function sourceFrom(file) {
            return fs.readFileSync("test/spec-modules/" + file + ".js", { encoding: "utf8" });
        }

        it("works", function() {
            var src = sourceFrom("local-func");
            var result = contrax(src);

            result.should.deep.equal({
                foo: {
                    exec: "Method",
                    name: "Property",
                    value: "Property"
                }
            });
        });

        it("works", function() {
            var src = sourceFrom("export-func");
            var result = contrax(src);

            result.should.deep.equal({
                "module": {
                    exports: "Method"
                },

                "this": {
                    title: "Property",
                    size: "Property",
                    onClick: "Method"
                },

                baz: {
                    name: "Property",
                    value: "Property",
                    exec: "Method"
                }
            });
        });
    });
})
