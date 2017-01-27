var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ls;
(function (ls) {
    var List = (function (_super) {
        __extends(List, _super);
        function List() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        List.prototype.validDelegate = function (delegate) {
            if (this.length <= 0)
                return false;
            if (typeof delegate !== "function")
                throw new TypeError(delegate + ' is not a function');
            return true;
        };
        List.prototype.Where = function (delegate, args) {
            try {
                var list = new List();
                if (!this.validDelegate(delegate))
                    return list;
                for (var i = 0; i < this.length; i++) {
                    var c = this[i];
                    if (c === null)
                        continue;
                    if (delegate.call(args, c))
                        list.Add(c);
                }
                return list;
            }
            catch (ex) {
                return new List();
            }
        };
        List.prototype.Select = function (delegate, args) {
            var list = new List();
            if (!this.validDelegate(delegate))
                return list;
            for (var i = 0; i < this.length; i++) {
                var c = this[i];
                if (c === null)
                    continue;
                list.Add(delegate.call(args, c));
            }
            return list;
        };
        List.prototype.Distinct = function (delegate, args) {
            try {
                var list = new List();
                if (!this.validDelegate(delegate))
                    return list;
                for (var i = 0; i < this.length; i++) {
                    var c = this[i];
                    if (c === null)
                        continue;
                    var elem = delegate.call(args, c);
                    if (!list.Contains(elem))
                        list.Add(elem);
                }
                return list;
            }
            catch (ex) {
                return new List();
            }
        };
        List.prototype.First = function () {
            return this.first();
        };
        List.prototype.Last = function () {
            return this.last();
        };
        List.prototype.Add = function (items) {
            try {
                this.push(items);
                return true;
            }
            catch (ex) {
                return false;
            }
        };
        List.prototype.AddRange = function (items) {
            try {
                for (var i = 0; i < items.length; i++)
                    this.Add(items[i]);
                return true;
            }
            catch (ex) {
                return false;
            }
        };
        List.prototype.RemoveAt = function (index) {
            try {
                this.splice(index, 1);
                return true;
            }
            catch (ex) {
                return false;
            }
        };
        List.prototype.Remove = function (item) {
            try {
                var index = this.IndexOf(item);
                return this.RemoveAt(index);
            }
            catch (ex) {
                return false;
            }
        };
        List.prototype.IndexOf = function (item) {
            try {
                return $.inArray(item, this);
            }
            catch (ex) {
                return -1;
            }
        };
        List.prototype.Contains = function (item) {
            try {
                return this.IndexOf(item) > -1;
            }
            catch (ex) {
                return false;
            }
        };
        List.prototype.Get = function (index) {
            try {
                return this[index];
            }
            catch (ex) {
                return undefined;
            }
        };
        List.prototype.Clear = function () {
            for (var i = this.length; i >= 0; i--)
                this.RemoveAt(i);
        };
        List.prototype.ToArray = function () {
            return $(this).toArray();
        };
        List.prototype.Count = function (delegate, args) {
            if (delegate === void 0) { delegate = null; }
            if (args === void 0) { args = null; }
            try {
                if (delegate == null)
                    return this.length;
                if (!this.validDelegate(delegate))
                    return 0;
                var length_1 = 0;
                for (var i = 0; i < this.length; i++) {
                    var c = this[i];
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
        List.prototype.Any = function (delegate, args) {
            if (delegate === void 0) { delegate = null; }
            if (args === void 0) { args = null; }
            try {
                if (delegate == null)
                    return this.length > 0;
                if (!this.validDelegate(delegate))
                    return false;
                for (var i = 0; i < this.length; i++) {
                    var c = this[i];
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
        List.prototype.Equals = function (list) {
            if (list.length !== this.length)
                return false;
            list = list.ToList();
            for (var i = 0; i < this.length; i++) {
                if (!list.Contains(this[i]))
                    return false;
                list.RemoveAt(list.IndexOf(this[i]));
            }
            return true;
        };
        return List;
    }(Array));
    ls.List = List;
})(ls || (ls = {}));
Array.prototype.ToList = function () {
    var list = new ls.List();
    for (var i = 0; i < this.length; i++)
        list.Add(this[i]);
    return list;
};
Array.prototype.first = function () {
    return this.length <= 0 ? undefined : this[0];
};
Array.prototype.last = function () {
    return this.length <= 0 ? undefined : this[this.length - 1];
};
