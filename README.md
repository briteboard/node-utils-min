
Minimalistic utilities for modern ES / TypeScript coding (assumes es2018 and above)

- Designed for nodejs 12+ & modern browsers (post IE era)
- Zero dependencies
- Typed (i.e., TypeScript )
- Only handle primitive types, object, and array (for now it does not handle Map / Set)
- `Nil` for `null | undefined | NaN`
- `prune`, `pruneNil`, `pruneEmpty` removes properties by value (new object returned, direct properties only)
- `omit` removes properties by name (new object returned, direct properties only)
- `split(string, delim?)` Split (default ','), trim items and filter out empty ones.
- `asArr(val | vals[])` return [val] if val, or vals[] if already array. null/undefined passthrough.


Roadmap: 
- `pruneIn(obj), pruneNullIn(obj), ...` Prune in place (obj). No clone of object. 
- `omitIn(obj, ...props)` Omit in place.
- `asBool(val | vals[])` Returns true: 'true' | >0, false: 'false' | <=0 | null | undefined | NaN
- `pick(obj, ...props)` Create a new object by with specified property name
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

// prune: prune only undefined
prune({a: undefined, b: 123, c: [], d: null, e: nan}); // {b: 123, c: [], d: null, c: nan}
prune({ a: undefined, b: 123, c: [], d: null, e: nan }, 123); // { e: [], f: '' } (with additional exclude 123)

// pruneNil: prune undefined, null, and NaN
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

// split: split, trim, and remove empty items
split('1 ,2, 3'); // ['1', '2', '3']
split('1 ,2,, \t,\n 3,,'); // ['1', '2', '3']
split('1 ;2, 3', ';'); // ['1', '2, 3']

// asNum: use Number to parse, but return null for empty strings and support array.
asNum('12.5'); // 12.5
asNum(12.5); // 12.5
asNum('12a'); // null
asNum('12a', -1); // -1
asNum(['12', 13, 'aa']); // [12, 13, null]
asNum(['12', 13, 'aa'], -1); // [12, 13, -1]
asNum(''); // null
asNum(['', '   ']); // [null, null]
asNum(null); // null
asNum(undefined); // null

// asArray: wrap argument into an array if not already an array. Returns correct TS type.
asArray(1); // [1]
asArray([1, 2, 3]); // [1, 2, 3] (same array)
asArray(['one', 2]); // ['one', 2] (same array)
asArray({some:'text'}); // [{some: 'text'}]
asArray(null); // null
asArray(undefined); // undefined


await wait(1000); // resolve in 1000 ms
```


### Thanks to

- [ts-utils](https://www.npmjs.com/package/ts-utils)

