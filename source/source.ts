namespace ls {
    declare var $;
    export class List<T> extends Array<T> {
        private validDelegate(delegate: any): boolean {
            if (this.length <= 0)
                return false;

            if (typeof delegate !== "function")
                throw new TypeError(`${delegate}  is not a function`);

            return true;
        }

        public Where(delegate: (value: T) => boolean, args?: any): List<T> {
            try {
                const list = new List<T>();
                if (!this.validDelegate(delegate))
                    return list;

                for (let i = 0; i < this.length; i++) {
                    const c = this[i];
                    if (c === null)
                        continue;

                    if (delegate.call(args, c))
                        list.Add(c);
                }

                return list;
            }
            catch (ex) {
                return new List<T>();
            }
        }

        public Select(delegate: (value: T) => any, args?: any): List<T> {
            const list = new List<T>();
            if (!this.validDelegate(delegate))
                return list;

            for (let i = 0; i < this.length; i++) {
                const c = this[i];
                if (c === null)
                    continue;

                list.Add(delegate.call(args, c));
            }

            return list;
        }

        public Distinct(delegate: (value: T) => any, args?: any) {
            try {
                const list = new List<T>();
                if (!this.validDelegate(delegate))
                    return list;

                for (let i = 0; i < this.length; i++) {
                    const c = this[i];
                    if (c === null)
                        continue;

                    const elem = delegate.call(args, c);
                    if (!list.Contains(elem))
                        list.Add(elem);
                }

                return list;
            }
            catch (ex) {
                return new List<T>();
            }
        }

        public First() {
            return this.first();
        }

        public Last() {
            return this.last();
        }

        public Add(items: T): boolean {
            try {
                this.push(items);
                return true;
            }
            catch (ex) {
                return false;
            }
        }

        public AddRange(...args): boolean {
            try {
                if(args === null || args[0] === null)
                    return false;

                if(Object.prototype.toString.call(args[0]) === '[object Array]')
                    args = args[0];
                else if(args[0].constructor.name === "List")
                    args = args[0]

                for (let i = 0; i < args.length; i++)
                    this.Add(args[i]);
                return true;
            }
            catch (ex) {
                return false;
            }
        }

        public RemoveAt(index: number): boolean {
            try {
                this.splice(index, 1);
                return true;
            }
            catch (ex) {
                return false;
            }
        }

        public Remove(item: T): boolean {
            try {
                let index = this.IndexOf(item);
                return this.RemoveAt(index);
            }
            catch (ex) {
                return false;
            }
        }

        public IndexOf(item: any): number {
            try {
                return this.indexOf(item);
            }
            catch (ex) {
                return -1;
            }
        }

        public Contains(item: T): boolean {
            try {
                return this.IndexOf(item) > -1;
            }
            catch (ex) {
                return false;
            }
        }

        public Get(index: number) {
            try {
                return this[index];
            }
            catch (ex) {
                return undefined;
            }
        }

        public Clear() {
            for (let i = this.length; i >= 0; i--)
                this.RemoveAt(i);
        }

        public ToArray() {
            var array = new Array<T>();
            for (let i = 0; i < this.length; i++)
                array.push(this[i]);
            return array;
        }

        public Count(delegate: (value: T) => boolean = null, args: any = null): number {
            try {
                if (delegate == null)
                    return this.length;

                if (!this.validDelegate(delegate))
                    return 0;

                let length = 0;
                for (let i = 0; i < this.length; i++) {
                    const c = this[i];
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

        public Any(delegate: (value: T) => boolean = null, args: any = null): boolean {
            try {
                if (delegate == null)
                    return this.length > 0;

                if (!this.validDelegate(delegate))
                    return false;

                for (let i = 0; i < this.length; i++) {
                    const c = this[i];
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

        public Equals(list: List<T>): boolean {
            if (list.length !== this.length)
                return false;

            list = list.ToList();
            for (let i = 0; i < this.length; i++) {
                if (!list.Contains(this[i]))
                    return false;

                list.RemoveAt(list.IndexOf(this[i]));
            }
            return true;
        }
    }
}

interface Array<T> {
    ToList(): ls.List<T>;
    first();
    last();
}

Array.prototype.ToList = function () {
    var list = new ls.List();
    for (var i = 0; i < this.length; i++)
        list.Add(this[i]);
    return list;
}
Array.prototype.first = function () {
    return this.length <= 0 ? undefined : this[0];
}
Array.prototype.last = function () {
    return this.length <= 0 ? undefined : this[this.length - 1];
}
