"use strict";

var esprima = require("esprima");
var estraverse = require("estraverse");

module.exports = function contrax(source) {
    var ast = esprima.parse(source);
    var interfaces = {};

    function addToInterface(node) {
        var name = node.object.type === "ThisExpression" ? "this" : node.object.name;
        var prop = node.property.name;

        var type = currentType[currentType.length - 1] || "Property";

        interfaces[name] = interfaces[name] || {};
        interfaces[name][prop] = type;
    }

    var currentType = [];

    var types = {
        CallExpression: function (op) {
            currentType[op]("Method");
        },

        AssignmentExpression: function (op, node) {
            var type = node.right.type === "FunctionExpression" ? "Method" : "Property";
            currentType[op](type);
        }
    };

    var interfaceAdds = {
        MemberExpression: function (node) {
            // Ignore properties retreived from function calls or array accessors.
            if (node.property.type !== "Literal" && node.object.type !== "CallExpression") {
                addToInterface(node);
            }
        }
    };

    estraverse.traverse(ast, {
        enter: function (node) {
            if (node.type in types) {
                types[node.type]("push", node);
            }

            if (node.type in interfaceAdds) {
                interfaceAdds[node.type](node);
            }
        },

        leave: function (node) {
            if (node.type in types) {
                types[node.type]("pop", node);
            }
        }
    });

    return interfaces;
};
