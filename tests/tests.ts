import { List } from "../dist/index";
import { expect } from "chai";
import "mocha";

export enum Color {
  Red,
  Yellow,
  Blue
}
export class Fruit {
  public Color: Color;
  public Name: string;
  public Tastes: List<string>;

  constructor() {
    this.Tastes = new List<string>();
  }
}
/**First item has to be "red", second "yellow" and last "blue" */
var checklist = function(enumeration: any[]) {
  return (
    enumeration[0] === "red" &&
    enumeration[1] === "yellow" &&
    enumeration[2] === "blue"
  );
};

describe("constructor", () => {
  it("instantiates a new list with another in its constructor", () => {
    var list = new List<string>();
    list.Add("check my ctor!");
    var expected = new List<string>(list);
    expected.AddRange(list);

    expect(expected.First()).to.equal("check my ctor!");
  });
});

describe("List.Where()", () => {
  it("should return true if values where correctly selected", () => {
    var fruits = new List<Fruit>();
    var apple = new Fruit();
    apple.Color = Color.Red;
    apple.Name = "Apple";
    apple.Tastes.Add("sweet");
    apple.Tastes.Add("sour");
    fruits.Add(apple);

    var banana = new Fruit();
    banana.Color = Color.Yellow;
    banana.Name = "Banana";
    banana.Tastes.Add("sweet");
    fruits.Add(banana);

    var lemon = new Fruit();
    lemon.Color = Color.Yellow;
    lemon.Name = "Lemon";
    lemon.Tastes.Add("sour");
    lemon.Tastes.Add("sweet");
    fruits.Add(lemon);

    var actual = fruits.Where(x => x.Color === Color.Yellow);
    var expected = false;
    if (
      actual.length === 2 &&
      actual[0].Name === "Banana" &&
      actual[0].Color === Color.Yellow
    )
      expected = true;
    if (actual[1].Name !== "Lemon" || actual[1].Color !== Color.Yellow)
      expected = false;

    console.log("Result: " + JSON.stringify(actual));
    expect(expected).to.equal(true);
  });
});

describe("AddRange()", () => {
  it("should return true if added by arguments -> AddRange(..args)", () => {
    var list = new List<string>();
    list.AddRange("red", "yellow", "blue");

    console.log("Result: " + JSON.stringify(list));
    expect(checklist(list)).to.equal(true);
  });

  it("should return true if added by array -> AddRange(T:[])", () => {
    var list = new List<string>();
    list.AddRange(["red", "yellow", "blue"]);

    console.log("Result: " + JSON.stringify(list));
    expect(checklist(list)).to.equal(true);
  });

  it("should return true if added by list -> AddRange(List<T>)", () => {
    var list = new List<string>();
    list.Add("red");
    list.Add("yellow");
    list.Add("blue");

    var list2 = new List<string>();
    list2.AddRange(list);

    console.log("Result: " + JSON.stringify(list2));
    expect(checklist(list2)).to.equal(true);
  });
});

describe("Add()", () => {
  it("should return true if items where added correctly", () => {
    var list = new List<string>();
    list.Add("red");
    list.Add("yellow");
    list.Add("blue");

    console.log("Result: " + JSON.stringify(list));
    expect(checklist(list)).to.equal(true);
  });
});

describe("ToArray()", () => {
  it("should return true if list converted to Array", () => {
    var list = new List<string>();
    list.Add("red");
    list.Add("yellow");
    list.Add("blue");

    var array = list.ToArray();
    var actual = Object.prototype.toString.call(array) === "[object Array]";

    console.log(
      "Result: " +
        JSON.stringify(`type of ${Object.prototype.toString.call(array)}`)
    );
    expect(actual).to.equal(true);
  });
});

describe("Contains()", () => {
  it("should return true if list contains 'yellow'", () => {
    var list = new List<string>();
    list.Add("red");
    list.Add("yellow");
    list.Add("blue");

    console.log("Result: " + JSON.stringify(list));
    var actual = list.Contains("yellow");
    expect(actual).to.equal(true);
  });
});

describe("IndexOf()", () => {
  it("should return true if index of 'yellow' is one", () => {
    var list = new List<string>();
    list.Add("red");
    list.Add("yellow");
    list.Add("blue");

    var actual = list.indexOf("yellow");
    console.log("Result: " + JSON.stringify(list[actual]));

    expect(actual).to.equal(1);
  });
});

describe("Select()", () => {
  it("should return true if only colors selected", () => {
    var fruits = new List<Fruit>();
    var apple = new Fruit();
    apple.Color = Color.Red;
    apple.Name = "Apple";
    fruits.Add(apple);

    var banana = new Fruit();
    banana.Color = Color.Yellow;
    banana.Name = "Banana";
    fruits.Add(banana);

    var grape = new Fruit();
    grape.Color = Color.Blue;
    grape.Name = "Grape";
    fruits.Add(grape);

    var actual = <any>fruits.Select(x => x.Color);
    var expected = false;
    if (
      actual.length === 3 &&
      actual[0] === Color.Red &&
      actual[1] === Color.Yellow &&
      actual[2] === Color.Blue
    )
      expected = true;

    console.log("Result: " + JSON.stringify(actual));
    expect(expected).to.equal(true);
  });
});

describe("Clear()", () => {
  it("should return true if list has been cleard", () => {
    var list = new List<string>();
    list.Add("red");
    list.Add("yellow");
    list.Add("blue");
    list.Clear();

    console.log("Result: " + JSON.stringify(list));
    expect(list.length).to.equals(0);
  });
});

describe("RemoveAt()", () => {
  it("should return true if item at index 1 has been removed", () => {
    var list = new List<string>();
    list.Add("red");
    list.Add("yellow");
    list.Add("blue");

    list.RemoveAt(1);

    var actual = false;
    if (list.length === 2 && list[0] === "red" && list[1] === "blue")
      actual = true;

    console.log("Result: " + JSON.stringify(list));
    expect(actual).to.equal(true);
  });
});

describe("Remove()", () => {
  var fruits = new List<Fruit>();
  var apple = new Fruit();
  apple.Color = Color.Red;
  apple.Name = "Apple";
  fruits.Add(apple);

  var banana = new Fruit();
  banana.Color = Color.Yellow;
  banana.Name = "Banana";
  fruits.Add(banana);

  var grape = new Fruit();
  grape.Color = Color.Blue;
  grape.Name = "Grape";
  fruits.Add(grape);

  fruits.Remove(banana);

  var actual = false;
  if (
    fruits.length === 2 &&
    fruits[0].Name === "Apple" &&
    fruits[1].Name === "Grape"
  )
    actual = true;

  console.log("Result: " + JSON.stringify(fruits));
  expect(actual).to.equal(true);
});

describe("Get()", () => {
  it("should return true if item at index 1 is 'yellow'", () => {
    var list = new List<string>();
    list.Add("red");
    list.Add("yellow");
    list.Add("blue");

    var actual = list.Get(1);
    console.log("Result: " + JSON.stringify(actual));
    expect(actual).to.equal("yellow");
  });
});

describe("Count()", () => {
  it("should return true if list contains all 3 items -> Count()", () => {
    var list = new List<string>();
    list.Add("red");
    list.Add("yellow");
    list.Add("blue");

    var actual = list.Count();
    console.log("Result: " + JSON.stringify(actual));
    expect(actual).to.equal(3);
  });

  it("should return true if Count returns 1 with delegate -> Count(delegate)", () => {
    var list = new List<string>();
    list.Add("red");
    list.Add("yellow");
    list.Add("blue");

    var actual = list.Count(x => x === "yellow");
    console.log("Result: " + JSON.stringify(actual));
    expect(actual).to.equal(1);
  });
});

describe("Any()", () => {
  it("should return true if list has any items", () => {
    var list = new List<string>();
    list.Add("red");
    list.Add("yellow");
    list.Add("blue");

    var actual = list.Any();
    console.log("Result: " + JSON.stringify(actual));
    expect(actual).to.equal(true);
  });

  it("should return true if list has any items by delegate where is 1 yellow item", () => {
    var list = new List<string>();
    list.Add("red");
    list.Add("yellow");
    list.Add("blue");

    var actual = list.Any(x => x === "yellow");
    console.log("Result: " + JSON.stringify(actual));
    expect(actual).to.equal(true);
  });
});

describe("Distinct()", () => {
  it("should return true", () => {
    var fruits = new List<Fruit>();
    var apple = new Fruit();
    apple.Tastes.Add("sweet");
    apple.Tastes.Add("sour");
    apple.Color = Color.Red;
    apple.Name = "Apple";
    fruits.Add(apple);

    var banana = new Fruit();
    banana.Color = Color.Yellow;
    banana.Name = "Banana";
    fruits.Add(banana);

    var grape = new Fruit();
    grape.Color = Color.Yellow;
    grape.Tastes.Add("sour");
    grape.Name = "Lemon";
    fruits.Add(grape);

    var grape2 = new Fruit();
    grape2.Color = Color.Yellow;
    grape2.Tastes.Add("sour");
    grape2.Name = "Lemon";
    fruits.Add(grape2);

    var actual = fruits.Distinct();
    var expected = false;

    if (
      actual.length === 3 &&
      actual[0].Name == "Apple" &&
      actual[1].Name == "Banana" &&
      actual[2].Name == "Lemon"
    )
      expected = true;

    console.log(expected, "succeed " + JSON.stringify(actual));
    expect(expected).to.equal(true);
  });

  it("should return true if distinct works on delegate by select distinct value", () => {
    var fruits = new List<Fruit>();
    var apple = new Fruit();
    apple.Color = Color.Red;
    apple.Name = "Apple";
    fruits.Add(apple);

    var banana = new Fruit();
    banana.Color = Color.Yellow;
    banana.Name = "Banana";
    fruits.Add(banana);

    var grape = new Fruit();
    grape.Color = Color.Yellow;
    grape.Name = "Lemon";
    fruits.Add(grape);

    var actual = <any>fruits.Distinct(x => x.Color);

    var expected = false;
    if (
      actual.length === 2 &&
      actual[0] === Color.Red &&
      actual[1] === Color.Yellow
    )
      expected = true;

    console.log("succeed " + JSON.stringify(actual));
    expect(expected).to.equal(true);
  });
});

describe("Equals()", () => {
  it("should return true if lists are equal", () => {
    var fruits = new List<Fruit>();

    var apple = new Fruit();
    apple.Color = Color.Red;
    apple.Name = "Apple";
    apple.Tastes.Add("sweet");
    apple.Tastes.Add("sour");
    fruits.Add(apple);

    var banana = new Fruit();
    banana.Color = Color.Yellow;
    banana.Name = "Banana";
    banana.Tastes.Add("sweet");
    fruits.Add(banana);

    var grape = new Fruit();
    grape.Color = Color.Blue;
    grape.Name = "Grape";
    grape.Tastes.Add("sweet");
    grape.Tastes.Add("fruity");
    fruits.Add(grape);

    var fruits2 = new List<Fruit>();
    var apple2 = new Fruit();
    apple2.Color = Color.Red;
    apple2.Name = "Apple";
    apple2.Tastes.Add("sweet");
    apple2.Tastes.Add("sour");
    fruits2.Add(apple2);

    var banana2 = new Fruit();
    banana2.Color = Color.Yellow;
    banana2.Name = "Banana";
    banana2.Tastes.Add("sweet");
    fruits2.Add(banana2);

    var grape2 = new Fruit();
    grape2.Color = Color.Blue;
    grape2.Name = "Grape";
    grape2.Tastes.Add("fruity");
    grape2.Tastes.Add("sweet");
    fruits2.Add(grape2);
    console.log(JSON.stringify(fruits));
    console.log(JSON.stringify(fruits2));
    var actual = fruits.Equals(fruits2, false);

    expect(actual).to.equal(true);
  });
});

describe("Range", () => {
  it("first value should be 3 and last value 22, the length be 20. ", () => {
    var list = List.Range(3, 20);
    console.log(list.concat());
    var expected =
      list.First() === 3 && list.Last() === 22 && list.length === 20;
    expect(expected).to.equal(true);
  });

  it("should throw the error: Count cant be less or equal to zero.", () => {
    expect(() => {
      List.Range(1, 0);
    }).to.throw("Count cant be less or equal to zero.");
  });
});

describe("Sum", () => {
  it("should summarize numbers ", () => {
    var a = new List<number>();
    a.Add(1);
    a.Add(2);
    a.Add(4);
    var b = a.Sum();
    expect(b).to.equal(7);
  });

  it("should summarize and convert a numbers as string to an int ", () => {
    var a = new List<string>();
    a.Add("1");
    a.Add("2");
    var b = a.Sum();
    expect(b).to.equal(3);
  });

  it("should summarize and add +1 to every entry in list", () => {
    var a = new List<number>();
    a.Add(1);
    a.Add(2);
    a.Add(3);
    a.Add(5);
    a.Add(8);
    a.Add(13);
    var b = a.Sum(x => x + 1);
    expect(b).to.equal(38);
  });

  it("should summarize only valid numbers", () => {
    var a = new List<any>();
    a.Add(1);
    a.Add(2);
    a.Add("invalid");
    a.Add(5);
    a.Add(8);
    a.Add(13);
    var b = a.Sum();
    expect(b).to.equal(29);
  });
});
