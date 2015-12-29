'use strict';

var fetchKeys = require('lodash.keys');

module.exports = function shallowEqual(objA, objB, compare, compareContext) {
    if (objA === objB) {
        return true;
    }

    if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
        return false;
    }

    var keysA = fetchKeys(objA);
    var keysB = fetchKeys(objB);

    if (keysA.length !== keysB.length) {
        return false;
    }

    compareContext = compareContext || null;

    // Test for A's keys different from B.
    var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
    var len = keysA.length;
    for (var i = 0; i < len; i++) {
        if (!bHasOwnProperty(keysA[i])) {
            return false;
        }
        var key = keysA[i];
        var valueA = objA[key];
        var valueB = objB[key];

        var ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;
        if (ret === false || ret === void 0 && valueA !== valueB) {
            return false;
        }
    }

    return true;
};