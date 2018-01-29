export declare class List<T> extends Array<T> {
  /**
   * instantiates a list either with, or with out Array or List
   * var fruits = new List<Fruit>(favoriteFruits);
   * var fruits = new List<Fruit>();
   * @param array can be a list, an array, or null.
   */
  constructor(array?: List<T> | Array<T>);
  /**
   * Adds item with typeof T to current List.
   * @param item element to add
   */
  Add(item: T): boolean;
  /**
   * Adds all passed elements to list, elements can be either an Array<T>, a List<T> or even multiple elements e.g.
   * fruits.AddRange(["apple", "banana", "lemon"]); fruits.AddRange(fruits2); fruits.AddRange("apple", "banana", "lemon");
   * @param args either Array<T>, List<T> or multiple elements,
   */
  AddRange(...args: any[]): boolean;
  /**
   * Checks if list contains any elements with delegate fruits.Any(x => x.Color === Color.Yellow) // e.g. 2
   * @param delegate
   * @param args
   */
  Any(delegate: (value: T) => boolean): boolean;
  /**
   * Checks if list contains any elements
   */
  Any(): boolean;
  /**
   * Removes all elements from list.
   */
  Clear(): boolean;
  /**
   * Returns true if list contains passed element.
   * @param item
   */
  Contains(item: T): boolean;
  /**
   * Returns listcount by delegate. fruits.Where(x => x.Color === Color.Yellow) // e.g. 2
   * @param delegate boolean to compare by delegate
   * @param args
   */
  Count(delegate: (value: T) => boolean): number;
  /**
   * Returns count of the List.
   */
  Count(): number;
  /**
   * Summarizes numbers within a list by delegate, ignoring invalid values, and converts strings if possible
   * @param delegate must be a number
   * @param args
   */
  Sum(delegate: (value: number) => number): number;
  /**
   * Summarizes numbers within a list, ignoring invalid values, and converts strings if possible
   */
  Sum(): number;
  /**
   * Returns new list with removed duplicates and select items from delegate if set.
   * Works on complex objects only, if elements inside are equal.
   * @param delegate distinct values to return.
   * @param args
   */
  Distinct(delegate: (value: T) => any): List<T>;
  /**
   * Returns new list with removed duplicates.
   * Works on complex objects only, if elements inside are equal.
   */
  Distinct(): List<T>;
  /**
   * Compares two lists.
   *
   * @param list List to compare with
   * @param deepCompare default true. If false, equality will be checked by items, not by position ->
   * [ "Apple", "Banana" ].Equals([ "Banana", "Apple" ]) will then return true.
   */
  Equals(list: List<T>, deepCompare: boolean): boolean;
  /**
   * Compares two lists
   * @param list List to compare with
   */
  Equals(list: List<T>): boolean;
  /**
   * Returns first element of list.
   */
  First(): T;
  /**
   * Returns element at index
   * @param index
   */
  Get(index: number): T;
  /**
   * Returns index of passed element in list.
   * @param item
   */
  IndexOf(item: T): number;
  /**
   * Returns last element of list.
   */
  Last(): T;
  /**
   * Removes passed item from list
   * @param item Item to remove
   */
  Remove(item: T): boolean;
  /**
   * Removes item at passed index.
   * @param index
   */
  RemoveAt(index: number): boolean;
  /**
   * Returns new list with by delegate selected value.
   * @param delegate
   * @param args
   */
  Select(delegate: (value: T) => any): List<T>;
  /**
   * Converts List<T> to Array. Needed for serialization e.g. with ajax calls.
   */
  ToArray(): Array<T>;
  /**
   * Returns list by delegate fruits.Where(x => x.Color === Color.Red);
   * @param delegate
   * @param args
   */
  Where(delegate: (value: T) => boolean): List<T>;
  /**
   * Creates list of numbers, within a specified range.
   * @param start where to start
   * @param count count of numbers to create
   */
  static Range(start: number, count: number): List<number>;
}

declare global {
  interface Array<T> extends ArrayConstructor {
    ToList(): List<T>;
  }
}