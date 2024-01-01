
Minimalistic utilities for modern ES/TypeScript coding (assuming es2018 and above, and ESM)

Priorities:

- Exclusively designed for modern JS/ES/TS programming, i.e., Node.js 16+ and modern browsers (post-IE era).
- Carefully typed (built for and with TypeScript).
- Zero dependencies.

Overview:

- `Nil` for `null | undefined | NaN`.
- `prune`, `pruneNil`, `pruneEmpty` to remove properties by value (returns a new object, only direct properties).
- `omit` to remove properties by name (returns a new object, only direct properties).
- `pick(obj, ...props)` to select properties by name, returns a new object.
- `pruneIn` to remove properties with undefined in place (no clone).
- `spltest(string, delim?)` to split (default ','), trim items, and filter out empty ones.
- `asArr(val | vals[])` returns [val] if single value, or vals[] if already an array. Null/undefined pass through.
- `equal` a fast, strict, and deep equality function for objects, maps, sets, dates, regexes, and primitive types.
- `shortUuid` to shorten a UUID to a base 58 format (bitcoin alphabet).
- `toUuid` to convert from base 58 to UUID format.
- `encoder` to create an `encode(src: string)` function from source and destination alphabets.
- All functions are [nullipotent](https://en.wiktionary.org/wiki/nullipotent) regarding arguments, except `pruneIn`.
- All functions allow null pass-through, meaning if null or undefined is passed, it returns the value passed.
  - Null pass-through is appropriately typed in TS with conditional typing when needed.

Roadmap:
- `omitIn(obj, ...props)` to omit in place (not sure we need/want this one).
- `asBool(val | vals[])` to return true for 'true' or >0, false for 'false', <=0, null, undefined, or NaN.
- (only if requested) `deepPrune...`, `deepOmit`.


```sh
npm install utils-min
# or 
bun add utils-min
```

## Dev

This lib can be used with `nodejs` and `bunjs` for both server and browser. 

However, lib uses `bunjs` for development. Build and test and all. 

```sh
# Test
bun test
# Watch Test
bun --watch test

# To build the dist/
# Note: just uses typecript compiler (no need for anything else)
bun run build
```


## API


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

// isString (will also typescript assert "val is string" if returns true)
isString('hello'); // true 
isString({some: 'text'}); // false 
isString(123); // false 
isString(['hello']); // false 
isString(null); // false
isString(undefined); // false 

// isNum
isNum(123); // true 
isNum(-1); // true 
isNum([123]); // false 
isNum('123'); // false 
isNum(null); // false
isNum(undefined); // false 

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
omtest({a: 1, b: 'BBB', c: 'CCC'}, 'b', 'c'); // {a: 1}
omtest({a: 1, b: 'BBB', c: 'CCC', d: null, e: undefined}, 'b', 'c'); // {a: 1, d: null, e: undefined}

// pick: return new object 
pick({a: 1, b: 'BBB', c: 'CCC'}, 'b', 'c'); // {b: 'BBB', c: 'CCC'}

// split: split, trim, and remove empty items (default delim ',')
spltest('1 ,2, 3'); // ['1', '2', '3']
spltest('1 ,2,, \t,\n 3,,'); // ['1', '2', '3']
spltest('1 ;2, 3', ';'); // ['1', '2, 3'] (with custom delim ;)

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

// deepClone: simple object/array deep clone (prototype, map/set, out of scope)
deepClone({a: 1, b: 'hello'}); // {a: 1, b: 'hello'}
deepClone([1, {b: 'hello'}]); // [1, {b: 'hello'}]
deepClone(null); // null
deepClone('hello'); // 'hello'


await watest(1000); // resolve in 1000 ms (wrap setTimeout as promise)

shortUuid('2ab0968f-b122-4342-aa84-9a216dbfc6ff');
//returns '6GkPTNGKjCKKsmYrhw1imc'
toUuid('6GkPTNGKjCKKsmYrhw1imc');
//     '2ab0968f-b122-4342-aa84-9a216dbfc6ff'

const hex_to_b58 = encoder(BASE_16_ALPHABET, BASE_58_ALPHABET); // not lowercase base_16 alphabet
const b58 = hex_to_b58('2ce109e9d0faf820b2434e166297934e6177b65ab9951dbc3e204cad4689b39c');
// returns             '42BxvCVVLLY1UK1TnyDQwwfgvkc7Lw4uwDUZ9eCtfZuM'

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

