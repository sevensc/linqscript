namespace ls {
    export class List<T> extends Array<T> {
        public _array: Array<T>;

        /**
         * Adds passed item to list.
         * @param item element to add
         */
        public Add(item: T): boolean {
            try {
                this._array.push(item);
                return true;
            }
            catch (ex) {
                return false;
            }
        }

        /**
         * Adds all passed elements to list, elements can be either an Array<T>, a List<T> or even multiple elements e.g. 
         * fruits.AddRange(["apple", "banana", "lemon"]); fruits.AddRange(fruits2); fruits.AddRange("apple", "banana", "lemon");
         * @param args either Array<T>, List<T> or multiple elements, 
         */
        public AddRange(...args): boolean {
            try {
                if (args === null || args[0] == null)
                    return false;

                if (Object.prototype.toString.call(args) === '[object Array]')
                    args = args[0];

                else if ((<any>args.constructor).name === "Array" || (<any>args.constructor).name === "List")
                    args = args[0]

                for (let i = 0; i < args.length; i++)
                    this._array.push(args[i]);
                return true;
            }
            catch (ex) {
                return false;
            }
        }

        /**
         * Checks if list contains any elements. Delegate available. fruits.Any(x => x.Color === Color.Yellow) // e.g. 2
         * @param delegate
         * @param args 
         */
        public Any(delegate: (value: T) => boolean = null, args: any = null): boolean {
            try {
                if (delegate == null)
                    return this._array.length > 0;

                if (!this.validDelegate(delegate))
                    return false;

                for (let i = 0; i < this._array.length; i++) {
                    const c = this._array[i];
                    if (c === null)
                        continue;

                    const elem = delegate.call(args, c);
                    if (elem != null && elem !== false)
                        return true;
                }

                return false;
            }
            catch (ex) {
                return false;
            }
        }

        /**
         * Removes all elements from list.
         */
        public Clear(): boolean {
            try {
                for (let i = this._array.length; i >= 0; i--)
                    this._array.splice(i, 1);

                return true;
            }
            catch (ex) {
                return false;
            }
        }

        /**
         * Returns true if list contains passed element.
         * @param item 
         */
        public Contains(item: T): boolean {
            try {
                return this._array.indexOf(item) > -1;
            }
            catch (ex) {
                return false;
            }
        }

        /**
         * Returns listcount. Delegate available. fruits.Where(x => x.Color === Color.Yellow) // e.g. 2
         * @param delegate boolean to compare by delegate
         * @param args 
         */
        public Count(delegate: (value: T) => boolean = null, args: any = null): number {
            try {
                if (delegate == null)
                    return this._array.length;

                if (!this.validDelegate(delegate))
                    return 0;

                let length = 0;
                for (let i = 0; i < this._array.length; i++) {
                    const c = this._array[i];
                    if (c === null)
                        continue;

                    const elem = delegate.call(args, c);
                    if (elem != null && elem !== false)
                        length++;
                }

                return length;
            }
            catch (ex) {
                return 0;
            }
        }

        /**
         * Returns new list removes duplicates and select items from delegate if set.
         * Works on complex objects only, if elements inside are equal.
         * @param delegate distinct values to return.
         * @param args 
         */
        public Distinct(delegate: (value: T) => any = null, args?: any): List<T> {
            try {
                const list = new Array<T>();
                if (delegate != null && !this.validDelegate(delegate))
                    return list.ToList();

                for (var i = 0, l = this._array.length; i < l; i++) {
                    const c = this._array[i];
                    if (c === null)
                        continue;

                    const elem = delegate != null ? delegate.call(args, c) : c;

                    if (JSON.stringify(list).indexOf(JSON.stringify(elem)) < 0)
                        list.push(elem);
                }

                return list.ToList();
            }
            catch (ex) {
                return new List<T>();
            }
        }

        /**
         * Compares two lists
         * @param list List to compare with
         * @param comparePosition default true, if false, equality will not be checked by position.
         */
        public Equals(list: List<T>, comparePosition = true): boolean {
            try {
                return this.equals(list, this._array, comparePosition);
            }
            catch (ex) {
                return false;
            }
        }

        /**
         * Returns first element of list.
         */
        public First(): T {
            try {
                return this.first();
            }
            catch (ex) {
                return null;
            }
        }

        /**
         * Returns element at index
         * @param index 
         */
        public Get(index: number): T {
            try {
                return this._array[index];
            }
            catch (ex) {
                return undefined;
            }
        }

        /**
         * Returns index of passed element in list.
         * @param item 
         */
        public IndexOf(item: any): number {
            try {
                return this._array.indexOf(item);
            }
            catch (ex) {
                return -1;
            }
        }

        /**
         * Returns last element of list.
         */
        public Last(): T {
            try {
                return this.last();
            }
            catch (ex) {
                return null;
            }
        }

        /**
         * Removes passed item from list
         * @param item Item to remove
         */
        public Remove(item: T): boolean {
            try {
                var expectedLength = this._array.length - 1;
                let index = this._array.indexOf(item);
                this._array.splice(index, 1);
                return expectedLength === this._array.length;
            }
            catch (ex) {
                return false;
            }
        }

        /**
         * Removes item at passed index.
         * @param index 
         */
        public RemoveAt(index: number): boolean {
            try {
                this._array.splice(index, 1);
                return true;
            }
            catch (ex) {
                return false;
            }
        }

        /**
         * Returns new list with by delegate selected value.
         * @param delegate 
         * @param args 
         */
        public Select(delegate: (value: T) => any, args?: any): List<T> {
            const list = new Array<T>();
            try {
                if (!this.validDelegate(delegate))
                    return list.ToList();

                for (let i = 0; i < this._array.length; i++) {
                    const c = this._array[i];
                    if (c === null)
                        continue;

                    list.push(delegate.call(args, c));
                }

                return list.ToList();
            }
            catch (ex) {
                return list.ToList();
            }
        }

        /**
         * Converts List<T> to Array. Needed for serialization e.g. with ajax calls.
         */
        public ToArray(): Array<T> {
            try {
                var array = new Array<T>();
                for (let i = 0; i < this._array.length; i++)
                    array.push(this._array[i]);
                return array;
            }
            catch (ex) {
                return null;
            }
        }

        /**
         * Returns list by delegate fruits.Where(x => x.Color === Color.Red);
         * @param delegate 
         * @param args 
         */
        public Where(delegate: (value: T) => boolean, args?: any): List<T> {
            try {
                const list = new Array<T>();
                if (!this.validDelegate(delegate))
                    return list.ToList();

                for (let i = 0; i < this._array.length; i++) {
                    const c = this._array[i];
                    if (c === null)
                        continue;

                    if (delegate.call(args, c))
                        list.push(c);
                }

                return list.ToList();
            }
            catch (ex) {
                return new List<T>();
            }
        }

        /**
         * needed to call recursive
         */
        private equals(list, array, comparePosition): boolean {
            if (!list)
                return false;

            if (array.length != list.length)
                return false;

            for (var i = 0, l = array.length; i < l; i++) {
                if (array[i] instanceof Array && list[i] instanceof Array) {
                    if (!this.equals(list[i], array[i], comparePosition)) //recursive call
                        return false;
                }
                else if (array[i] instanceof Object) {
                    for (var key in array[i]) {
                        if (array[i].hasOwnProperty(key) && array[i][key] instanceof Array) {
                            if (!this.equals(list[i][key], array[i][key], comparePosition)) //recursive call
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
        }

        private validDelegate(delegate: any): boolean {
            if (this._array.length <= 0)
                return false;

            if (typeof delegate !== "function")
                throw new TypeError(`${delegate}  is not a function`);

            return true;
        }
    }
}

interface Array<T> {
    Add(item: T): boolean;
    AddRange(...args): boolean;
    Any(delegate, args?): boolean;
    Clear(): boolean;
    Contains(item: T): boolean;
    Count(delegate, args?): number;
    Distinct(delegate, args?): ls.List<T>;
    Equals(list: ls.List<T>, comparePosition: boolean): boolean;
    first(): T;
    Get(index: number): T;
    IndexOf(item: T): number;
    last(): T;
    Remove(item: T): boolean;
    RemoveAt(index: number): boolean;
    Select(delegate, args?): ls.List<T>;
    ToArray(): Array<T>;
    ToList(): ls.List<T>;
    Where(delegate, args?): ls.List<T>;
}

Array.prototype.Add = function (item) {
    ls.List.prototype._array = this;
    var returnValue = ls.List.prototype.Add(item);
    ls.List.prototype._array = null;
    return returnValue;
}
Array.prototype.AddRange = function () {
    ls.List.prototype._array = this;
    var args = arguments;
    if (Object.prototype.toString.call(args) === '[object Array]' || Object.prototype.toString.call(args[0]) === '[object Array]')
        args = args[0];

    var returnValue = ls.List.prototype.AddRange(args);
    ls.List.prototype._array = null;
    return returnValue;
}
Array.prototype.Any = function (delegate, args) {
    ls.List.prototype._array = this;
    var returnValue = ls.List.prototype.Any(delegate, args);
    ls.List.prototype._array = null;
    return returnValue;
}
Array.prototype.Clear = function () {
    ls.List.prototype._array = this;
    var returnValue = ls.List.prototype.Clear();
    ls.List.prototype._array = null;
    return returnValue;
}
Array.prototype.Contains = function (item) {
    ls.List.prototype._array = this;
    var returnValue = ls.List.prototype.Contains(item);
    ls.List.prototype._array = null;
    return returnValue;
}
Array.prototype.Count = function (delegate, args) {
    ls.List.prototype._array = this;
    var returnValue = ls.List.prototype.Count(delegate, args);
    ls.List.prototype._array = null;
    return returnValue;
}
Array.prototype.Distinct = function (delegate, args) {
    ls.List.prototype._array = this;
    var returnValue = ls.List.prototype.Distinct(delegate, args);
    ls.List.prototype._array = null;
    return returnValue;
}
Array.prototype.Equals = function (list, comparePosition) {
    ls.List.prototype._array = this;
    var returnValue = ls.List.prototype.Equals(list, comparePosition);
    ls.List.prototype._array = null;
    return returnValue;
}
Array.prototype.first = function () {
    return this.length <= 0 ? undefined : this[0];
}
Array.prototype.Get = function (index) {
    ls.List.prototype._array = this;
    var returnValue = ls.List.prototype.Get(index);
    ls.List.prototype._array = null;
    return returnValue;
}
Array.prototype.IndexOf = function (item) {
    ls.List.prototype._array = this;
    var returnValue = ls.List.prototype.IndexOf(item);
    ls.List.prototype._array = null;
    return returnValue;
}
Array.prototype.last = function () {
    return this.length <= 0 ? undefined : this[this.length - 1];
}
Array.prototype.Remove = function (item) {
    ls.List.prototype._array = this;
    var returnValue = ls.List.prototype.Remove(item);
    ls.List.prototype._array = null;
    return returnValue;
}
Array.prototype.RemoveAt = function (index) {
    ls.List.prototype._array = this;
    var returnValue = ls.List.prototype.RemoveAt(index);
    ls.List.prototype._array = null;
    return returnValue;
}
Array.prototype.Select = function (delegate, args) {
    ls.List.prototype._array = this;
    var returnValue = ls.List.prototype.Select(delegate, args);
    ls.List.prototype._array = null;
    return returnValue;
}
Array.prototype.ToArray = function () {
    ls.List.prototype._array = this;
    var returnValue = ls.List.prototype.ToArray();
    ls.List.prototype._array = null;
    return returnValue;
}
Array.prototype.ToList = function () {
    var list = new ls.List();
    for (var i = 0; i < this.length; i++)
        list.push(this[i]);
    return list;
}
Array.prototype.Where = function (delegate, args) {
    ls.List.prototype._array = this;
    var returnValue = ls.List.prototype.Where(delegate, args);
    ls.List.prototype._array = null;
    return returnValue;
}