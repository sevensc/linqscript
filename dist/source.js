"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var List = /** @class */ (function (_super) {
    __extends(List, _super);
    function List() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Adds passed item to list.
     * @param item element to add
     */
    List.prototype.Add = function (item) {
        try {
            this._array.push(item);
            return true;
        }
        catch (ex) {
            return false;
        }
    };
    /**
     * Adds all passed elements to list, elements can be either an Array<T>, a List<T> or even multiple elements e.g.
     * fruits.AddRange(["apple", "banana", "lemon"]); fruits.AddRange(fruits2); fruits.AddRange("apple", "banana", "lemon");
     * @param args either Array<T>, List<T> or multiple elements,
     */
    List.prototype.AddRange = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        try {
            if (args === null || args[0] == null)
                return false;
            if (Object.prototype.toString.call(args) === '[object Array]')
                args = args[0];
            else if (args.constructor.name === "Array" || args.constructor.name === "List")
                args = args[0];
            for (var i = 0; i < args.length; i++)
                this._array.push(args[i]);
            return true;
        }
        catch (ex) {
            return false;
        }
    };
    /**
     * Checks if list contains any elements. Delegate available. fruits.Any(x => x.Color === Color.Yellow) // e.g. 2
     * @param delegate
     * @param args
     */
    List.prototype.Any = function (delegate, args) {
        if (delegate === void 0) { delegate = null; }
        try {
            if (delegate == null)
                return this._array.length > 0;
            if (!this.validDelegate(delegate))
                return false;
            for (var i = 0; i < this._array.length; i++) {
                var c = this._array[i];
                if (c === null)
                    continue;
                var elem = delegate.call(args, c);
                if (elem != null && elem !== false)
                    return true;
            }
            return false;
        }
        catch (ex) {
            return false;
        }
    };
    /**
     * Removes all elements from list.
     */
    List.prototype.Clear = function () {
        try {
            for (var i = this._array.length; i >= 0; i--)
                this._array.splice(i, 1);
            return true;
        }
        catch (ex) {
            return false;
        }
    };
    /**
     * Returns true if list contains passed element.
     * @param item
     */
    List.prototype.Contains = function (item) {
        try {
            return this._array.indexOf(item) > -1;
        }
        catch (ex) {
            return false;
        }
    };
    /**
     * Returns listcount. Delegate available. fruits.Where(x => x.Color === Color.Yellow) // e.g. 2
     * @param delegate boolean to compare by delegate
     * @param args
     */
    List.prototype.Count = function (delegate, args) {
        if (delegate === void 0) { delegate = null; }
        try {
            if (delegate == null)
                return this._array.length;
            if (!this.validDelegate(delegate))
                return 0;
            var length_1 = 0;
            for (var i = 0; i < this._array.length; i++) {
                var c = this._array[i];
                if (c === null)
                    continue;
                var elem = delegate.call(args, c);
                if (elem != null && elem !== false)
                    length_1++;
            }
            return length_1;
        }
        catch (ex) {
            return 0;
        }
    };
    /**
     * Returns new list removes duplicates and select items from delegate if set.
     * Works on complex objects only, if elements inside are equal.
     * @param delegate distinct values to return.
     * @param args
     */
    List.prototype.Distinct = function (delegate, args) {
        if (delegate === void 0) { delegate = null; }
        try {
            var list = new Array();
            if (delegate != null && !this.validDelegate(delegate))
                return list.ToList();
            for (var i = 0, l = this._array.length; i < l; i++) {
                var c = this._array[i];
                if (c === null)
                    continue;
                var elem = delegate != null ? delegate.call(args, c) : c;
                if (JSON.stringify(list).indexOf(JSON.stringify(elem)) < 0)
                    list.push(elem);
            }
            return list.ToList();
        }
        catch (ex) {
            return new List();
        }
    };
    /**
     * Compares two lists
     * @param list List to compare with
     * @param comparePosition default true, if false, equality will not be checked by position.
     */
    List.prototype.Equals = function (list, comparePosition) {
        if (comparePosition === void 0) { comparePosition = true; }
        try {
            return this.equals(list, this._array, comparePosition);
        }
        catch (ex) {
            return false;
        }
    };
    /**
     * Returns first element of list.
     */
    List.prototype.First = function () {
        try {
            return this._array.First();
        }
        catch (ex) {
            return null;
        }
    };
    /**
     * Returns element at index
     * @param index
     */
    List.prototype.Get = function (index) {
        try {
            return this._array[index];
        }
        catch (ex) {
            return undefined;
        }
    };
    /**
     * Returns index of passed element in list.
     * @param item
     */
    List.prototype.IndexOf = function (item) {
        try {
            return this._array.indexOf(item);
        }
        catch (ex) {
            return -1;
        }
    };
    /**
     * Returns last element of list.
     */
    List.prototype.Last = function () {
        try {
            return this._array.Last();
        }
        catch (ex) {
            return null;
        }
    };
    /**
     * Removes passed item from list
     * @param item Item to remove
     */
    List.prototype.Remove = function (item) {
        try {
            var expectedLength = this._array.length - 1;
            var index = this._array.indexOf(item);
            this._array.splice(index, 1);
            return expectedLength === this._array.length;
        }
        catch (ex) {
            return false;
        }
    };
    /**
     * Removes item at passed index.
     * @param index
     */
    List.prototype.RemoveAt = function (index) {
        try {
            this._array.splice(index, 1);
            return true;
        }
        catch (ex) {
            return false;
        }
    };
    /**
     * Returns new list with by delegate selected value.
     * @param delegate
     * @param args
     */
    List.prototype.Select = function (delegate, args) {
        var list = new Array();
        try {
            if (!this.validDelegate(delegate))
                return list.ToList();
            for (var i = 0; i < this._array.length; i++) {
                var c = this._array[i];
                if (c === null)
                    continue;
                list.push(delegate.call(args, c));
            }
            return list.ToList();
        }
        catch (ex) {
            return list.ToList();
        }
    };
    /**
     * Converts List<T> to Array. Needed for serialization e.g. with ajax calls.
     */
    List.prototype.ToArray = function () {
        try {
            var array = new Array();
            for (var i = 0; i < this._array.length; i++)
                array.push(this._array[i]);
            return array;
        }
        catch (ex) {
            return null;
        }
    };
    /**
     * Returns list by delegate fruits.Where(x => x.Color === Color.Red);
     * @param delegate
     * @param args
     */
    List.prototype.Where = function (delegate, args) {
        try {
            var list = new Array();
            if (!this.validDelegate(delegate))
                return list.ToList();
            for (var i = 0; i < this._array.length; i++) {
                var c = this._array[i];
                if (c === null)
                    continue;
                if (delegate.call(args, c))
                    list.push(c);
            }
            return list.ToList();
        }
        catch (ex) {
            return new List();
        }
    };
    /**
     * needed to call recursive
     */
    List.prototype.equals = function (list, array, comparePosition) {
        if (!list)
            return false;
        if (array.length != list.length)
            return false;
        for (var i = 0, l = array.length; i < l; i++) {
            if (array[i] instanceof Array && list[i] instanceof Array) {
                if (!this.equals(list[i], array[i], comparePosition))
                    return false;
            }
            else if (array[i] instanceof Object) {
                for (var key in array[i]) {
                    if (array[i].hasOwnProperty(key) && array[i][key] instanceof Array) {
                        if (!this.equals(list[i][key], array[i][key], comparePosition))
                            return false;
                    }
                }
            }
            else if (comparePosition && array[i] !== list[i]) {
                return false;
            }
            else if (!comparePosition && array.indexOf(list[i]) <= -1) {
                return false;
            }
        }
        return true;
    };
    List.prototype.validDelegate = function (delegate) {
        if (this._array.length <= 0)
            return false;
        if (typeof delegate !== "function")
            throw new TypeError(delegate + "  is not a function");
        return true;
    };
    return List;
}(Array));
exports.List = List;
Array.prototype.Add = function (item) {
    List.prototype._array = this;
    var returnValue = List.prototype.Add(item);
    List.prototype._array = null;
    return returnValue;
};
Array.prototype.AddRange = function () {
    List.prototype._array = this;
    var args = arguments;
    if (Object.prototype.toString.call(args) === '[object Array]' || Object.prototype.toString.call(args[0]) === '[object Array]')
        args = args[0];
    var returnValue = List.prototype.AddRange(args);
    List.prototype._array = null;
    return returnValue;
};
Array.prototype.Any = function (delegate, args) {
    List.prototype._array = this;
    var returnValue = List.prototype.Any(delegate, args);
    List.prototype._array = null;
    return returnValue;
};
Array.prototype.Clear = function () {
    List.prototype._array = this;
    var returnValue = List.prototype.Clear();
    List.prototype._array = null;
    return returnValue;
};
Array.prototype.Contains = function (item) {
    List.prototype._array = this;
    var returnValue = List.prototype.Contains(item);
    List.prototype._array = null;
    return returnValue;
};
Array.prototype.Count = function (delegate, args) {
    List.prototype._array = this;
    var returnValue = List.prototype.Count(delegate, args);
    List.prototype._array = null;
    return returnValue;
};
Array.prototype.Distinct = function (delegate, args) {
    List.prototype._array = this;
    var returnValue = List.prototype.Distinct(delegate, args);
    List.prototype._array = null;
    return returnValue;
};
Array.prototype.Equals = function (list, comparePosition) {
    List.prototype._array = this;
    var returnValue = List.prototype.Equals(list, comparePosition);
    List.prototype._array = null;
    return returnValue;
};
Array.prototype.First = function () {
    return this.length <= 0 ? undefined : this[0];
};
Array.prototype.Get = function (index) {
    List.prototype._array = this;
    var returnValue = List.prototype.Get(index);
    List.prototype._array = null;
    return returnValue;
};
Array.prototype.IndexOf = function (item) {
    List.prototype._array = this;
    var returnValue = List.prototype.IndexOf(item);
    List.prototype._array = null;
    return returnValue;
};
Array.prototype.Last = function () {
    return this.length <= 0 ? undefined : this[this.length - 1];
};
Array.prototype.Remove = function (item) {
    List.prototype._array = this;
    var returnValue = List.prototype.Remove(item);
    List.prototype._array = null;
    return returnValue;
};
Array.prototype.RemoveAt = function (index) {
    List.prototype._array = this;
    var returnValue = List.prototype.RemoveAt(index);
    List.prototype._array = null;
    return returnValue;
};
Array.prototype.Select = function (delegate, args) {
    List.prototype._array = this;
    var returnValue = List.prototype.Select(delegate, args);
    List.prototype._array = null;
    return returnValue;
};
Array.prototype.ToArray = function () {
    List.prototype._array = this;
    var returnValue = List.prototype.ToArray();
    List.prototype._array = null;
    return returnValue;
};
Array.prototype.ToList = function () {
    var list = new List();
    for (var i = 0; i < this.length; i++)
        list.push(this[i]);
    return list;
};
Array.prototype.Where = function (delegate, args) {
    List.prototype._array = this;
    var returnValue = List.prototype.Where(delegate, args);
    List.prototype._array = null;
    return returnValue;
};
