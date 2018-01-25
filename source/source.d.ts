export declare class List<T> {
  Add(item: T): boolean;
  AddRange(...args: any[]): boolean;
  Any(delegate: any, args?: any[]): boolean;
  Clear(): boolean;
  Contains(item: T): boolean;
  Count(delegate: any, args?: any[]): number;
  Sum(delegate: any, args?: number[]): number;
  Distinct(delegate: any, args?: any[]): List<T>;
  Equals(list: List<T>, comparePosition: boolean): boolean;
  First(): T;
  Get(index: number): T;
  IndexOf(item: T): number;
  Last(): T;
  Remove(item: T): boolean;
  RemoveAt(index: number): boolean;
  Select(delegate: any, args?: any[]): List<T>;
  ToArray(): Array<T>;
  ToList(): List<T>;
  Where(delegate: any, args?: any[]): List<T>;
}
