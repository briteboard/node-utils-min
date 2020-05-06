
Minimalistic utilities for modern ES / TypeScript coding (assume es2018 and above)

- Designed for nodejs 12+ & modern browsers (post IE era)
- Zero dependencies
- Typescript
- Only handle primitive types, object, and array (for now does not handle Map / Set handling)
- `Nil` for `null | undefined | NaN`
- `prune...` removes by value
- `omit` removes by name


```sh
npm install min-utils
```

## Overview


```ts
const nan = parseInt('not-a-number'); // as example

isObject({}); // true
isObject(1);  // false
isObject([]); // false
isObject(nan); // false

// 'Nil' means 'null | undefined | NaN'
isNil(null); // true
isNil(undefined); // true
isNil(nan); // true
isNil([]); // false
isNil(''); // false


isEmpty(null); // true
isEmpty(undefined); // true
isEmpty(nan); // true
isEmpty([]); // true
isEmpty({}): // true
isEmpty(''); // true
isEmpty(0); // false
isEmpty([undefined]); // false (use pruneNil before)

pruneNil({a: undefined, b: null, c: 0, d: [], e: '', f: nan}); // {c: 0, d: [], e: ''}
pruneNil([undefined, null, 0, [], '', nan]); // [0, [], '']

pruneEmpty({a: undefined, b: null, c: 0, d: [], e: ''}); // {c: 0}
pruneEmpty([undefined, null, 0, [], '']); // [0]


// omit({a: 1, b: 2}, ['a']); // {b: 2} (NOT IMPLEMENTED YET)

asNum('12.5'); // 12.5
asNum('12a'); // null
asNum('12a', -1); // -1
asNum(['12', 13, 'aa']); // [12, 13, null]
asNum(['12', 13, 'aa'], -1); // [12, 13, -1]
asNum(''); // null
asNum(['', '   ']); // [null, null]

await wait(1000); // resolve in 1000 second


```



### Thanks to

- [ts-utils](https://www.npmjs.com/package/ts-utils)

