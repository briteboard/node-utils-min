
Minimalistic utilities for modern ES / TypeScript coding (assumes es2018 and above)

Priorities: 

- Designed for modern JS/ES/TS programing ONLY, i.e. nodejs 12+ & modern browsers (post IE era)
- Carefully Typed (i.e., Built for and with TypeScript)
- Zero dependencies


Overview: 

- `Nil` for `null | undefined | NaN`
- `prune`, `pruneNil`, `pruneEmpty` Removes properties by value (new object returned, direct properties only)
- `omit` Removes properties by name (new object returned, direct properties only)
- `pick(obj, ...props)` Pick properties by name returns new object
- `pruneIn` Removes properties with undefined in place (no clone)
- `split(string, delim?)` Splits (default ','), trim items and filter out empty ones.
- `asArr(val | vals[])` Returns [val] if val, or vals[] if already array. null/undefined passthrough.
- `equal` fast strict and deep equal function for object, map, set, date, regex, and primitive types.
- All functions are [nullipotent](https://en.wiktionary.org/wiki/nullipotent) argument wise, except for `pruneIn`.
- All functions are null-passthrough, meaning if null or undefined is passed it returns the value passed.
  - null-passthrough is accordingly typed in TS with conditional typing when needed.



Roadmap: 
- `omitIn(obj, ...props)` Omit in place (not sure we need/want this one).
- `asBool(val | vals[])` Returns true: 'true' | >0, false: 'false' | <=0 | null | undefined | NaN
- (only if requested) `deepPrune...` `deepOmit`


```sh
npm install utils-min
```

## Overview


```ts
const nan = parseInt('not-a-number'); // as example

isObject({}); // true
isObject(1);  // false
isObject([]); // false
isObject(nan); // false
isObject(null); // false
isObject(undefined); // false

// isNil: 'Nil' means 'null | undefined | NaN'
isNil(null); // true
isNil(undefined); // true
isNil(nan); // true
isNil([]); // false
isNil(''); // false

// isEmpty
isEmpty(null); // true
isEmpty(undefined); // true
isEmpty(nan); // true
isEmpty([]); // true
isEmpty({}): // true
isEmpty(''); // true
isEmpty('\n\t  \r'); // true (whitespaces count as empty)
isEmpty(0); // false
isEmpty([undefined]); // false (use pruneNil before)

// isNotEmpty (same opposite as above, but use)
let arr: any[] | undefined | null = ...;
if (isNotEmpty(arr)){
  arr.length; // will be NonNullable<typeof arr>
}

// isString (will also so the "val is string" if returns true)
isString('hello'); // true 
isString({some: 'text'}); // false 
isString(123); // false 
isString(['hello']); // false 
isString(null); // false
isString(undefined); // false 

// prune: prune properties with undefined (return new object)
prune({a: undefined, b: 123, c: [], d: null, e: nan}); // {b: 123, c: [], d: null, c: nan}
prune({ a: undefined, b: 123, c: [], d: null, e: nan }, 123); // { e: [], f: '' } (with additional exclude 123)
prune([undefined,1]); // [1]
prune([undefined]); // []
prune(null); // null
prune(undefined); // undefined

// pruneNil: prune undefined, null, and NaN (return new object)
pruneNil({a: undefined, b: null, c: 0, d: [], e: '', f: nan}); // {c: 0, d: [], e: ''}
pruneNil([undefined, null, 0, [], '', nan]); // [0, [], '']
pruneNil([undefined, null, 0, 1, 2, nan], 0, 1); // [2]  (additional dxcludes 0 and 1)

// pruneEmpty: prune undefined, null, and NaN, '', []
pruneEmpty({a: undefined, b: null, c: 0, d: [], e: ''}); // {c: 0}
pruneEmpty([undefined, null, 0, [], '']); // [0]
pruneEmpty([undefined, null, 123, [], ''], 123); // [] (additional exclude 123)

// omit: return new object without some of properties (returned type Omit<T, K extends Extract<keyof T, string>>)
omit({a: 1, b: 'BBB', c: 'CCC'}, 'b', 'c'); // {a: 1}
omit({a: 1, b: 'BBB', c: 'CCC', d: null, e: undefined}, 'b', 'c'); // {a: 1, d: null, e: undefined}

// pick: return new object 
pick({a: 1, b: 'BBB', c: 'CCC'}, 'b', 'c'); // {b: 'BBB', c: 'CCC'}

// split: split, trim, and remove empty items (default delim ',')
split('1 ,2, 3'); // ['1', '2', '3']
split('1 ,2,, \t,\n 3,,'); // ['1', '2', '3']
split('1 ;2, 3', ';'); // ['1', '2, 3'] (with custom delim ;)

// asNum: use Number to parse, but return null for empty strings and support array.
asNum('12.5'); // 12.5
asNum(12.5); // 12.5
asNum('12a'); // null
asNum('12a', -1); // -1
asNum(['12', 13, 'aa']); // [12, 13, null]
asNum(['12', 13, 'aa'], -1); // [12, 13, -1]
asNum(''); // null
asNum(['', '   ']); // [null, null]
asNum([undefined, undefined]); // [null, null]
asNum(null); // null
asNum(undefined); // undefined

// asArray: wrap argument into an array if not already an array. Returns correct TS type.
asArray(1); // [1]
asArray([1, 2, 3]); // [1, 2, 3] (same array)
asArray(['one', 2]); // ['one', 2] (same array)
asArray({some:'text'}); // [{some: 'text'}]
asArray([undefined]); // [undefined] (not transformation, use prune)
asArray(null); // null
asArray(undefined); // undefined

// equal: strict deep equal for array, object literals, Map, Set, Date, RegEx, and primtive types
equal(1, 1); // true
equal({a: 1, b: 2}, {b: 2, a: 1}); // true
equal([1, 2], [1, 2]); // true
equal([1, {two: 2}], [1, {two: 2}]); // true
equal({a: 1, b: undefined}, {a: 1}); // false (use prune)
equal([1, 2], [2, 1]); // false
equal([1, 2], [1, 2, undefined]); // false (use prune)


await wait(1000); // resolve in 1000 ms


// pruneIn: IN PLACE pruning of properties with undefined value 
// (not necessarely faster than the nillipotent prune() version, especially for object)
const obj = {a: 1, b: undefined, c: null};
pruneIn(obj); // change obj to {a:1, c: null} and returns it as well 
// (slower than prune when some undefined values)

const arr = [1, undefined, null];
pruneIn(arr); // change arr to [1, null] and returns it 
// (faster than prune for arrays)
```


### Thanks to

- [ts-utils](https://www.npmjs.com/package/ts-utils)

