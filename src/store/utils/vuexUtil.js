/**
 * vuex util
 */
"use strict";
exports.__esModule = true;
function getter(state, getters) {
    return getters;
}
exports.getter = getter;
function mutation(state, mutations) {
    return mutations;
}
exports.mutation = mutation;
function action(state, actions) {
    return actions;
}
exports.action = action;
function decorator(helper, keyMap) {
    function decoratorWrapper(a, b) {
        if (typeof b === 'string') {
            var target = a;
            var key = b;
            return helper(target, key);
        }
        var originKey = a;
        return helper(originKey);
    }
    return decoratorWrapper;
}
exports.decorator = decorator;
//# sourceMappingURL=vuexUtil.js.map