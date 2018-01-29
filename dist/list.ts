/**See declaration in declaration File list.d.ts */
export class List<T> extends Array<T> {
  private _array: any;

  constructor(array?: List<T> | Array<T>) {
    super();
    if (array) this.AddRange(array);
  }

  public Add(item: T): boolean {
    try {
      this._array.push(item);
      return true;
    } catch (ex) {
      return false;
    }
  }

  public AddRange(...args: any[]): boolean {
    try {
      if (args === null || args[0] == null) return false;

      if (Object.prototype.toString.call(args) === "[object Array]")
        args = args[0];
      else if (
        (<any>args.constructor).name === "Array" ||
        (<any>args.constructor).name === "List"
      )
        args = args[0];

      for (let i = 0; i < args.length; i++) this._array.push(args[i]);
      return true;
    } catch (ex) {
      return false;
    }
  }

  public Any(delegate: (value: T) => boolean = null, args?: any): boolean {
    try {
      if (delegate == null) return this._array.length > 0;

      if (!this.validDelegate(delegate)) return false;

      for (let i = 0; i < this._array.length; i++) {
        const c = this._array[i];
        if (c === null) continue;

        const elem = delegate.call(args, c);
        if (elem != null && elem !== false) return true;
      }

      return false;
    } catch (ex) {
      return false;
    }
  }

  public Clear(): boolean {
    try {
      for (let i = this._array.length; i >= 0; i--) this._array.splice(i, 1);

      return true;
    } catch (ex) {
      return false;
    }
  }

  public Contains(item: T): boolean {
    try {
      return this._array.indexOf(item) > -1;
    } catch (ex) {
      return false;
    }
  }

  public Count(delegate: (value: T) => boolean = null, args?: any): number {
    try {
      if (delegate == null) return this._array.length;

      if (!this.validDelegate(delegate)) return 0;

      let length = 0;
      for (let i = 0; i < this._array.length; i++) {
        const c = this._array[i];
        if (c === null) continue;

        const elem = delegate.call(args, c);
        if (elem != null && elem !== false) length++;
      }

      return length;
    } catch (ex) {
      return 0;
    }
  }

  public Sum(delegate: (value: number) => number = null, args?: number[]): number {
    try {
      if (delegate && !this.validDelegate(delegate)) return 0;

      let count = 0;
      for (let i = 0; i < this._array.length; i++) {
        let c = +this._array[i];

        if (delegate) c = +delegate.call(args, c);

        if (typeof c !== "number" || isNaN(c) || c === null) continue;

        count += c;
      }

      return count;
    } catch (ex) {
      throw new Error(ex);
    }
  }

  public Distinct(delegate: (value: T) => any = null, args?: any[]): List<T> {
    try {
      const list = new Array<T>();
      if (delegate != null && !this.validDelegate(delegate))
        return (<any>list).ToList();

      for (let i = 0, l = this._array.length; i < l; i++) {
        const c = this._array[i];
        if (c === null) continue;

        const elem = delegate != null ? delegate.call(args, c) : c;

        if (JSON.stringify(list).indexOf(JSON.stringify(elem)) < 0)
          list.push(elem);
      }

      return (list as any).ToList();
    } catch (ex) {
      return new List<T>();
    }
  }

  public Equals(list: List<T>, deepCompare: boolean = true): boolean {
    try {
      return this.equals(list, this._array, deepCompare);
    } catch (ex) {
      return false;
    }
  }

  public First(): T {
    try {
      return this._array.First();
    } catch (ex) {
      return null;
    }
  }

  public Get(index: number): T {
    try {
      return this._array[index];
    } catch (ex) {
      return undefined;
    }
  }

  public IndexOf(item: T): number {
    try {
      return this._array.indexOf(item);
    } catch (ex) {
      return -1;
    }
  }

  public Last(): T {
    try {
      return this._array.Last();
    } catch (ex) {
      return null;
    }
  }

  public Remove(item: T): boolean {
    try {
      const expectedLength = this._array.length - 1;
      const index = this._array.indexOf(item);
      this._array.splice(index, 1);
      return expectedLength === this._array.length;
    } catch (ex) {
      return false;
    }
  }

  public RemoveAt(index: number): boolean {
    try {
      this._array.splice(index, 1);
      return true;
    } catch (ex) {
      return false;
    }
  }

  public Select(delegate: (value: T) => any, args?: any): List<T> {
    const list = new Array<T>();
    try {
      if (!this.validDelegate(delegate)) return (list as any).ToList();

      for (let i = 0; i < this._array.length; i++) {
        const c = this._array[i];
        if (c === null) continue;

        list.push(delegate.call(args, c));
      }

      return (<any>list).ToList();
    } catch (ex) {
      return (<any>list).ToList();
    }
  }

  public ToArray(): Array<T> {
    try {
      const array = new Array<T>();
      for (let i = 0; i < this._array.length; i++) array.push(this._array[i]);
      return <any>array;
    } catch (ex) {
      return null;
    }
  }

  public Where(delegate: (value: T) => boolean, args?: any): List<T> {
    try {
      const list = new Array<T>();
      if (!this.validDelegate(delegate)) return (list as any).ToList();

      for (let i = 0; i < this._array.length; i++) {
        const c = this._array[i];
        if (c === null) continue;

        if (delegate.call(args, c)) list.push(c);
      }

      return (<any>list).ToList();
    } catch (ex) {
      return new List<T>();
    }
  }

  public static Range(start: number, count: number): List<number> {
    try {
      if (count <= 0) throw new Error("Count cant be less or equal to zero.");

      var numbers = new List<number>();
      for (let i = start; i < count + start; i++) numbers.push(i);

      return numbers;
    } catch (ex) {
      throw new Error(ex);
    }
  }

  private equals(list: any[], array: any[], comparePosition: boolean): boolean {
    if (!list) return false;

    if (array.length !== list.length) return false;

    for (let i = 0, l = array.length; i < l; i++) {
      if (array[i] instanceof Array && list[i] instanceof Array) {
        if (!this.equals(list[i], array[i], comparePosition))
          // recursive call
          return false;
      } else if (array[i] instanceof Object) {
        for (const key in array[i]) {
          if (array[i].hasOwnProperty(key) && array[i][key] instanceof Array) {
            if (!this.equals(list[i][key], array[i][key], comparePosition))
              // recursive call
              return false;
          }
        }
      } else if (comparePosition && array[i] !== list[i]) {
        return false;
      } else if (!comparePosition && array.indexOf(list[i]) <= -1) {
        return false;
      }
    }

    return true;
  }

  private validDelegate(delegate: any): boolean {
    if (this._array.length <= 0) return false;

    if (typeof delegate !== "function")
      throw new TypeError(`${delegate}  is not a function`);

    return true;
  }
}

(Array.prototype as any).Add = function(item: any) {
  (List.prototype as any)._array = this;
  const returnValue = List.prototype.Add(item);
  (List.prototype as any)._array = null;
  return returnValue;
};
(Array.prototype as any).AddRange = function() {
  (List.prototype as any)._array = this;
  let args = arguments;
  if (
    Object.prototype.toString.call(args) === "[object Array]" ||
    Object.prototype.toString.call(args[0]) === "[object Array]"
  )
    args = args[0];

  const returnValue = List.prototype.AddRange(args);
  (List.prototype as any)._array = null;
  return returnValue;
};
(Array.prototype as any).Any = function(delegate: any, args: any) {
  (List.prototype as any)._array = this;
  const returnValue = List.prototype.Any(delegate, args);
  (List.prototype as any)._array = null;
  return returnValue;
};
(Array.prototype as any).Clear = function() {
  (List.prototype as any)._array = this;
  const returnValue = List.prototype.Clear();
  (List.prototype as any)._array = null;
  return returnValue;
};
(Array.prototype as any).Contains = function(item: any) {
  (List.prototype as any)._array = this;
  const returnValue = List.prototype.Contains(item);
  (List.prototype as any)._array = null;
  return returnValue;
};
(Array.prototype as any).Count = function(delegate: any, args: any) {
  (List.prototype as any)._array = this;
  const returnValue = List.prototype.Count(delegate, args);
  (List.prototype as any)._array = null;
  return returnValue;
};
(Array.prototype as any).Sum = function(delegate: any, args: any) {
  (List.prototype as any)._array = this;
  const returnValue = List.prototype.Sum(delegate, args);
  (List.prototype as any)._array = null;
  return returnValue;
};
(Array.prototype as any).Distinct = function(delegate: any, args: any) {
  (List.prototype as any)._array = this;
  const returnValue = List.prototype.Distinct(delegate, args);
  (List.prototype as any)._array = null;
  return returnValue;
};
(Array.prototype as any).Equals = function(list: any, comparePosition: any) {
  (List.prototype as any)._array = this;
  const returnValue = List.prototype.Equals(list as any, comparePosition);
  (List.prototype as any)._array = null;
  return returnValue;
};
(Array.prototype as any).First = function() {
  return this.length <= 0 ? undefined : this[0];
};
(Array.prototype as any).Get = function(index: any) {
  (List.prototype as any)._array = this;
  const returnValue = List.prototype.Get(index);
  (List.prototype as any)._array = null;
  return returnValue;
};
(Array.prototype as any).IndexOf = function(item: any) {
  (List.prototype as any)._array = this;
  const returnValue = List.prototype.IndexOf(item);
  (List.prototype as any)._array = null;
  return returnValue;
};
(Array.prototype as any).Last = function() {
  return this.length <= 0 ? undefined : this[this.length - 1];
};
(Array.prototype as any).Remove = function(item: any) {
  (List.prototype as any)._array = this;
  const returnValue = List.prototype.Remove(item);
  (List.prototype as any)._array = null;
  return returnValue;
};
(Array.prototype as any).RemoveAt = function(index: any) {
  (List.prototype as any)._array = this;
  const returnValue = List.prototype.RemoveAt(index);
  (List.prototype as any)._array = null;
  return returnValue;
};
(Array.prototype as any).Select = function(delegate: any, args: any) {
  (List.prototype as any)._array = this;
  const returnValue = List.prototype.Select(delegate, args);
  (List.prototype as any)._array = null;
  return returnValue;
};
(Array.prototype as any).ToArray = function() {
  (List.prototype as any)._array = this;
  const returnValue = List.prototype.ToArray();
  (List.prototype as any)._array = null;
  return returnValue;
};
(Array.prototype as any).ToList = function() {
  const list = new List();
  for (let i = 0; i < this.length; i++) list.push(this[i]);
  return list;
};
(Array.prototype as any).Where = function(delegate: any, args: any) {
  (List.prototype as any)._array = this;
  const returnValue = List.prototype.Where(delegate, args);
  (List.prototype as any)._array = null;
  return returnValue;
};

declare global {
  interface Array<T> extends ArrayConstructor {
    ToList(): List<T>;
  }
}