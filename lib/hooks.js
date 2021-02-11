"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = exports.Pre = exports.post = exports.pre = void 0;
const constants_1 = require("./internal/constants");
const utils_1 = require("./internal/utils");
const logSettings_1 = require("./logSettings");
// Note: TSDoc for the hooks can't be added without adding it to *every* overload
const hooks = {
    pre(...args) {
        return (target) => addToHooks(target, 'pre', args);
    },
    post(...args) {
        return (target) => addToHooks(target, 'post', args);
    }
};
/**
 * Add a hook to the hooks Array
 * @param target Target Class
 * @param hookType What type is it
 * @param args All Arguments, that should be passed-throught
 */
function addToHooks(target, hookType, args) {
    var _a, _b;
    // Convert Method to array if only a string is provided
    const methods = Array.isArray(args[0]) ? args[0] : [args[0]];
    utils_1.assertion(typeof args[1] === 'function', new TypeError(`"${utils_1.getName(target)}.${hookType}.${methods.join(' ')}"'s function is not a function!`));
    const func = args[1];
    logSettings_1.logger.info('Adding hooks for "[%s]" to "%s" as type "%s"', methods.join(','), utils_1.getName(target), hookType);
    for (const method of methods) {
        switch (hookType) {
            case 'post':
                const postHooks = Array.from((_a = Reflect.getMetadata(constants_1.DecoratorKeys.HooksPost, target)) !== null && _a !== void 0 ? _a : []);
                postHooks.push({ func, method });
                Reflect.defineMetadata(constants_1.DecoratorKeys.HooksPost, postHooks, target);
                break;
            case 'pre':
                const preHooks = Array.from((_b = Reflect.getMetadata(constants_1.DecoratorKeys.HooksPre, target)) !== null && _b !== void 0 ? _b : []);
                preHooks.push({ func, method });
                Reflect.defineMetadata(constants_1.DecoratorKeys.HooksPre, preHooks, target);
                break;
        }
    }
}
exports.pre = hooks.pre;
exports.post = hooks.post;
// Export it PascalCased
exports.Pre = hooks.pre;
exports.Post = hooks.post;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9va3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaG9va3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBSUEsb0RBQXFEO0FBQ3JELDRDQUFzRDtBQUN0RCwrQ0FBdUM7QUFnRXZDLGlGQUFpRjtBQUNqRixNQUFNLEtBQUssR0FBVTtJQUNuQixHQUFHLENBQUMsR0FBRyxJQUFJO1FBQ1QsT0FBTyxDQUFDLE1BQVcsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUNELElBQUksQ0FBQyxHQUFHLElBQUk7UUFDVixPQUFPLENBQUMsTUFBVyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMzRCxDQUFDO0NBQ0YsQ0FBQztBQUVGOzs7OztHQUtHO0FBQ0gsU0FBUyxVQUFVLENBQUMsTUFBVyxFQUFFLFFBQXdCLEVBQUUsSUFBVzs7SUFDcEUsdURBQXVEO0lBQ3ZELE1BQU0sT0FBTyxHQUFVLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRSxpQkFBUyxDQUNQLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLFVBQVUsRUFDN0IsSUFBSSxTQUFTLENBQUMsSUFBSSxlQUFPLENBQUMsTUFBTSxDQUFDLElBQUksUUFBUSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxDQUFDLENBQ3JHLENBQUM7SUFDRixNQUFNLElBQUksR0FBZ0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRWxDLG9CQUFNLENBQUMsSUFBSSxDQUFDLDhDQUE4QyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsZUFBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBRTFHLEtBQUssTUFBTSxNQUFNLElBQUksT0FBTyxFQUFFO1FBQzVCLFFBQVEsUUFBUSxFQUFFO1lBQ2hCLEtBQUssTUFBTTtnQkFDVCxNQUFNLFNBQVMsR0FBa0IsS0FBSyxDQUFDLElBQUksT0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLHlCQUFhLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxtQ0FBSSxFQUFFLENBQUMsQ0FBQztnQkFDeEcsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO2dCQUNqQyxPQUFPLENBQUMsY0FBYyxDQUFDLHlCQUFhLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDbkUsTUFBTTtZQUNSLEtBQUssS0FBSztnQkFDUixNQUFNLFFBQVEsR0FBa0IsS0FBSyxDQUFDLElBQUksT0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLHlCQUFhLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxtQ0FBSSxFQUFFLENBQUMsQ0FBQztnQkFDdEcsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO2dCQUNoQyxPQUFPLENBQUMsY0FBYyxDQUFDLHlCQUFhLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDakUsTUFBTTtTQUNUO0tBQ0Y7QUFDSCxDQUFDO0FBRVksUUFBQSxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQztBQUNoQixRQUFBLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO0FBRS9CLHdCQUF3QjtBQUNYLFFBQUEsR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUM7QUFDaEIsUUFBQSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyJ9