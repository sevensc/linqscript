# Simple lightweight lambda syntax library for Typescript. 
#### jQuery required.
###### Typescript arrow functions allows to use lambda syntax, which makes this easy to use.
#### USAGE:

```typescript
var fruits = new List<string>();
fruits.Add("apple");
fruits.Add("banana");

var fruit = fruits.Where(x => x === "apple").First();

```
You can use of course more complex objects:
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
```html
<script type="text/javascript" src="scripts/linqscript.js"></script>
```
#### also include latest jQuery version.


## Methods
| Method        |   Description                                             | Parameter     |
| ------------- |:-------------                                             |:-----         |
|  `Where`      |   Returns list, where delegate returns true.              | `Delegate`    |
| `Select`      |   Returns list of selected value                          | `Delegate`    | 
| `Distinct`    |   Returns grouped selected value.                         | `Delegate`    |
| `First`       |   Returns first item in list.                             |               |
| `Last`        |   Returns last item in list.                              |               |
|`Add`          |   Adds element to list.                                   | `item`     	|
|`AddRange`     |   Adds each item in given list.                           | `items`    	|
|`RemoveAt`     |   Removes item from list by index.                        | `index`       |
|`Remove`     	|   Removes item from list.                                 | `item`        |
|`IndexOf`      |   Gets index of given item.                               | `item`        |
|`Contains`     |   Return true if list contains given item.                | `item`        |
|`Get`          |   Gets item by index.                                     | `index`       |
|`Clear`        |   Clears list.                                            |               |
|`ToArray`      |   Converts list to array. Important for serialization.    | `item`        |
|`Count`        |   Returns listcount.                                      |               |
|`Count`        |   Returns listcount by delegate.                          | `Delegate`    |
|`Any`          |   Returns true if list contains any item.                 |               |
|`Any`          |   Returns true if list contains any item by delegate.     | `Delegate`    |
|`Equals`       |   Compares lists. Returns true if lists are equal.        | `item`        |


Usage without Typescript:

e.g.
```javascript
var fruits = new ls.List();

fruits.Add("Apple");
fruits.Add("Kiwi");

var value = fruits.Where(function(x) { return x === "Kiwi" });
```
