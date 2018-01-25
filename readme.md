[![NPM](https://nodei.co/npm/linqscript.png?mini=true)](https://www.npmjs.com/package/linqscript)
# C# alike List in Javascript. Simple lightweight lambda syntax library for Typescript, extending Array.
## No jQuery required! Unit tested.
##### Typescript arrow functions allows us, to use lambda syntax, which makes this easy to use. 
##### This library extends the native Array. Use full advantage of an Array, extended with this methods.

```typescript
import { List } from 'linqscript';
```
#### USAGE:
```typescript
var fruits = new List<string>();
fruits.Add("apple");
fruits.Add("banana");

var fruit = fruits.Where(x => x === "apple").First();
```
#### You can use of course more complex objects:
```typescript
enum Color {
	Green,
	Red
}

class Fruits {
	public Name: string;
	public Color: Color;
}

var fruits = new List<Fruits>();
var apple = new Fruit();
apple.Color = Color.Green;
apple.Name = "Apple";
fruits.Add(apple);

var redApple = new Fruit();
redApple.Color = Color.Red;
redApple.Name = "Apple";
fruits.Add(redApple);

var kiwi = new Fruit();
kiwi.Color = Color.Green;
kiwi.Name = "Kiwi";
fruits.Add(kiwi);

fruits.Where(x => x.Color === Color.Green);
```
```json
Output:
{
	"Fruits": [{
		"Name": "Kiwi",
		"Color": 1
	}, {
		"Name": "Apple",
		"Color": 1
	}]
}
```

```typescript
fruits.Select(x => x.Color);
```
```json
{
	"Color": [
		"Green",
		"Red"
	]
}
```
```typescript
fruits.Distinct(x => x.Name)
```
```json
{
	"Name": [
		"Apple",
		"Kiwi"
	]
}
```
```typescript
List.Range(3, 10)

[3,4,5,6,7,8,9,10,11,12] // starting at 3, generates 10 numbers
```
```typescript
var numbersToSum = new List<number>();

numbersToSum.Add(1);
numbersToSum.Add("2"); // will be converted
numbersToSum.Add(3);
numbersToSum.Add(5);
numbersToSum.Add("eight"); // will be ignored
numbersToSum.Add(8);
numbersToSum.Add(13);

var sum = numbersToSum.Sum(); // 32

var sumPlusOne = numbersToSum.Sum(x => x+1); // 38 -> use delegate to manipulate.
```


## Methods
| Method        	|   Description                                             | Parameter     			|
| ------------- 	|:-------------                                             |:-----         			|
|  `Where`      	|   Returns list, where delegate returns true.              | `Delegate`    			|		
| `Select`      	|   Returns list of selected value                          | `Delegate`    			|
| `Distinct`    	|   Returns grouped selected value.                         | `Delegate`    			|
| `First`       	|   Returns first item in list.                             |               			|
| `Last`        	|   Returns last item in list.                              |               			|
| `Range (static)`	|   Creates list of numbers, within a specified range.      | `start`, `length`			|
| `Add`          	|   Adds element to list.                                   | `item`     				|
| `AddRange`     	|   Adds each item in given list.                           | `items`    				|
| `RemoveAt`     	|   Removes item from list by index.                        | `index`       			|
| `Remove`     		|   Removes item from list.                                 | `item`        			|
| `IndexOf`      	|   Gets index of given item.                               | `item`        			|
| `Contains`     	|   Return true if list contains given item.                | `item`        			|
| `Get`          	|   Gets item by index.                                     | `index`       			|
| `Clear`        	|   Clears list.                                            |               			|
| `ToArray`      	|   Converts list to array. Important for serialization.    | `item`        			|
| `Count`        	|   Returns listcount.                                      |               			|
| `Count`        	|   Returns listcount by delegate.                          | `Delegate`    			|
| `Sum`        		|   Summarizes numbers in list. 	                        |			    			|
| `Sum`        		|   Summarizes numbers in list by delegate.                 | `Delegate`    			|
| `Any`          	|   Returns true if list contains any item.                 |              		 		|
| `Any`          	|   Returns true if list contains any item by delegate.     | `Delegate`				|
| `Equals`       	|   Compares list with another list. Returns true if lists are equal. If comparePosition is set to false, equality will be checked without comparison on position     	   | `item`, `comparePosition (default true)` 	|
| `ToList`       	|   Converts an Array to list.						        |               			|

#### any questions or feedback, please contact me!