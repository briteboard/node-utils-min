
//#region    ---------- Helpers ---------- 
const TYPE_OFFSET = 8;
const TYPE_STRING = 'String]'; // '[object String]'
const TYPE_NUMBER = 'Number]'; // '[object Number]'
const TYPE_BOOLEAN = 'Boolean]'; // '[object Boolean]'
const TYPE_OBJECT = 'Object]'; // '[object Object]'
const TYPE_REGEXP = 'RegExp]'; // '[object RegExp]'
const TYPE_ARRAY = 'Array]'; // '[object Array]'
const TYPE_DATE = 'Date]'; // '[object Date]
const TYPE_MAP = 'Map]'; // '[object Map]'
const TYPE_SET = 'Set]'; // '[object Set]'
const toType = Object.prototype.toString; // to call as toType(obj).substring(TYPE_OFFSET)
//#endregion ---------- /Helpers ---------- 

//#region    ---------- is... ---------- 

export function isNil(obj: any): boolean {
	if (obj == null || Number.isNaN(obj)) return true;
	return false;
}

export function isObject(obj: any): boolean {
	return toType.call(obj).substring(TYPE_OFFSET) === TYPE_OBJECT;
}

// allows to have type predicate
export function isNotEmpty<T>(obj: T): obj is NonNullable<T> {
	return !isEmpty(obj);
}

export function isEmpty(obj: any) {
	if (obj == null) return true;
	const type = toType.call(obj).substring(TYPE_OFFSET);

	if (type === TYPE_ARRAY) {
		return (obj.length === 0);
	}

	else if (type === TYPE_STRING) {
		if (obj.length === 0) return true;
		// needs to do the trim now
		return (obj.trim().length === 0);
	}

	else if (type === TYPE_OBJECT) {
		for (var prop in obj) {
			if (obj.hasOwnProperty(prop)) return false;
		}
		return true;
	}
	if (Number.isNaN(obj)) return true;

	return false;
}

export function isString(val: any): val is string {
	return toType.call(val).substring(TYPE_OFFSET) === TYPE_STRING;
}

export function isNum(val: any): val is number {
	const type = toType.call(val).substring(TYPE_OFFSET);
	return (type === TYPE_NUMBER && !Number.isNaN(val as number))
}

export function isBoolean(val: any): val is boolean {
	return toType.call(val).substring(TYPE_OFFSET) === TYPE_BOOLEAN;
}
//#endregion ---------- /is... ----------



//#region    ---------- prune ---------- 
type NonNull = string | number | boolean | symbol | bigint | object;

/**
 * Prune by value (if value isEmpty)
 */
export function pruneEmpty<T extends object | null | undefined>(obj: T, ...additionalExcludes: (number | string | boolean)[]): T extends object ? Partial<T> : T;
export function pruneEmpty<T extends any[]>(obj: T, ...additionalExcludes: (number | string | boolean)[]): NonNull[];
export function pruneEmpty<T extends undefined | null | object | Array<any>>(obj: T, ...additionalExcludes: (number | string | boolean)[]): Partial<T> | NonNull[] | null | undefined {
	return _prune(obj, isEmpty, additionalExcludes);
}

/**
 * Prune by value (if value isNil i.e., undefined | null | NaN)
 */
export function pruneNil<T extends object | null | undefined>(obj: T, ...additionalExcludes: (number | string | boolean)[]): T extends object ? Partial<T> : T;
export function pruneNil<T extends any[]>(obj: T, ...additionalExcludes: (number | string | boolean)[]): NonNull[];
export function pruneNil<T extends object | Array<any>>(obj: T, ...additionalExcludes: (number | string | boolean)[]): Partial<T> | NonNull[] | null | undefined {
	return _prune(obj, isNil, additionalExcludes);
}

const isUndefined = (v: any) => v === undefined;
/**
 * Prune by value (if value undefined and only undefined)
 */
export function prune<T extends object | null | undefined>(obj: T): T;
export function prune<T extends object | null | undefined>(obj: T, ...additionalExcludes: (number | string | boolean)[]): T extends object ? Partial<T> : T;
export function prune<T extends any[]>(obj: T, ...additionalExcludes: (number | string | boolean)[]): any[];
export function prune<T extends object | Array<any>>(obj: T, ...additionalExcludes: (number | string | boolean)[]): T | Partial<T> | NonNull[] | null | undefined {
	return _prune(obj, isUndefined, additionalExcludes);
}

function _prune<T extends undefined | null | object | Array<any>>(obj: T, is: (v: any) => boolean, excludeVals?: (number | string | boolean)[]): Partial<T> | NonNull[] | null | undefined {
	if (obj == null) return obj;

	const excludeValSet = (excludeVals) ? new Set(excludeVals) : null;
	if (obj instanceof Array) {
		return obj.filter(v => !(is(v) || excludeValSet?.has(v)))
	} else {
		const prunedObj: Partial<T> = {};

		for (const k in obj) {
			if (obj.hasOwnProperty(k)) {
				const v = obj![k] as any;
				if (!(is(v) || excludeValSet?.has(v))) {
					prunedObj[k] = v;
				}
			}

		}
		return prunedObj;
	}

}
//#endregion ---------- /prune ----------

//#region    ---------- pruneIn ---------- 
export function pruneIn<T extends undefined | null | object | Array<any>>(obj: T): T {
	if (obj == null) return obj;

	if (obj instanceof Array) {
		let i = obj.length;
		while (i--) {
			if (obj[i] === undefined) {
				obj.splice(i, 1);
			}
		}
	} else {
		for (const k in obj) {
			if (obj.hasOwnProperty(k)) {
				const v = obj![k] as any;
				if (v === undefined) {
					delete obj![k];
				}
			}
		}
	}
	return obj;
}
//#endregion ---------- /pruneIn ---------- 



//#region    ---------- asNum ---------- 
type MaybeNumStr = (string | number | null | undefined);

export function asNum<T extends MaybeNumStr, A extends number | undefined>
	(val: T, or_else?: A): A extends number ? number : T extends null | undefined ? T : (number | null);

export function asNum<T extends MaybeNumStr[], A extends number | undefined>
	(vals: T, or_else?: A): A extends number ? number[] : (number | null)[];

export function asNum<T extends MaybeNumStr[][], A extends number | undefined>
	(vals: T, or_else?: A): A extends number ? number[][] : (number | null)[][];

export function asNum(val: MaybeNumStr[][] | MaybeNumStr[] | MaybeNumStr, alt?: number): (number | null)[][] | (number | null)[] | (number | null | undefined) {
	if (val == null) {
		return alt ?? val;
	}

	const _alt = (alt != null) ? alt : null;
	const type = toType.call(val).substring(TYPE_OFFSET);

	// take the string value of val if exist (preserve null or undefined)

	// first if null, return as is
	if (val == null) {
		return _alt;
	}

	// if it is a string, return the parsed string (return null | number)
	if (type === TYPE_STRING) {
		return _asNum(val as string, _alt)
	} else if (type === TYPE_NUMBER) {
		return !Number.isNaN(val as number) ? val as number : _alt;
	}

	// at this point vals is an array or array of array

	// if empty array return empty array
	if (type === TYPE_ARRAY) {
		const vals = val as MaybeNumStr[] | MaybeNumStr[][];
		if (vals.length === 0) {
			return []; // return empty array
		}

		// determine if we have array or array of array base on arguments. 
		// Assume that types were respected, and that first element of the array is representative of the sequence.
		const is2d = (vals[0] instanceof Array);

		// Note: here ts needs little help.
		return (is2d) ? (<string[][]>val).map(items => { return items.map(item => _asNum(item, _alt)) }) : (<string[]>val).map(item => _asNum(item, _alt));
	} else {
		// We do not know what it is, might be an object
		return null;
	}

}

function _asNum(str: string | null | undefined, alt: number | null): number | null {
	if (str == null) {
		return alt;
	}
	const r = Number(str);
	const is_number = !Number.isNaN(r);
	const is_zero = r === 0;
	// Note: trying to push as late as possible the str.strim in case we have 0 (because Number(' ') === 0, which we do not want)
	return (!is_zero && is_number || is_zero && str.trim().length > 0) ? r : alt;
}
//#endregion ---------- /asNum ----------


//#region    ---------- asArray ---------- 
export function asArray<T>(a: T): T extends Array<infer E> ? E[] : T extends null | undefined ? T : T[];
export function asArray<T>(a: T | Array<T> | null | undefined): T | Array<T> | null | undefined {
	if (a == null) return a;
	return (a instanceof Array) ? a : [a];
}
//#endregion ---------- /asArray ----------


//#region    ---------- omit ---------- 
// 
/**
 * Omit properties by name.
 * Thanks to: https://stackoverflow.com/a/53968837
 * For now, loosen up internal typing (i.e. ret: any, excludeSet Set<string>)
 */
export function omit<T extends object, K extends Extract<keyof T, string>>(obj: T, ...keys: K[]): Omit<T, K> {
	let ret: any = {};
	const excludeSet: Set<string> = new Set(keys);
	// TS-NOTE: Set<K> makes the obj[key] type check fail, so, loosen up typing here.

	for (let key in obj) {
		if (!excludeSet.has(key)) {
			ret[key] = obj[key];
		}
	}
	return ret;
}
//#endregion ---------- /omit ---------- 

//#region    ---------- pick ---------- 
export function pick<T extends object | null | undefined, K extends Extract<keyof T, string>>(obj: T, ...keys: K[]): Pick<T, K> {
	if (obj == null) return obj;

	let ret: any = {};
	for (let key of keys) {
		if (obj.hasOwnProperty(key)) {
			ret[key] = obj![key];
		}
	}
	return ret;
}
//#endregion ---------- /pick ---------- 


//#region    ---------- split ---------- 
/**
 * Split a string, trim, and prune empty strings. 
 * @param str 
 * @param delim 
 */
export function split<T extends string | undefined | null>(str?: T, delim?: string): T extends string ? string[] : T;
export function split<T extends string | undefined | null>(str: T, delim = ','): string[] | T {
	if (str == null) return str;
	const r: string[] = [];
	const strs = str.split(delim);
	for (let v of strs) {
		v = v.trim();
		if (v.length > 0) r.push(v);
	}
	return r;
}
//#endregion ---------- /split ---------- 


//#region    ---------- equal ---------- 
// inspired from: https://github.com/epoberezkin/fast-deep-equal/
const hasOwnProp = Object.prototype.hasOwnProperty;

/** Perform a deep equal check */
export function equal(a: any, b: any) {
	// take care of same ref, and boolean, and string match
	if (a === b) return true;

	const aType = toType.call(a).substring(TYPE_OFFSET);
	const bType = toType.call(b).substring(TYPE_OFFSET);

	if (aType !== bType) return false;

	// check object 
	if (aType === TYPE_OBJECT) {
		let aKeys = Object.keys(a);
		let length = aKeys.length;

		if (length !== Object.keys(b).length)
			return false;

		for (let i = length; i-- !== 0;)
			if (!hasOwnProp.call(b, aKeys[i])) return false;

		for (let i = length; i-- !== 0;) {
			let key = aKeys[i];
			if (!equal(a[key], b[key])) return false;
		}
		return true;
	}

	// array
	if (aType === TYPE_ARRAY) {
		let length = a.length;
		if (length != b.length) return false;
		for (let i = length; i-- !== 0;) {
			if (!equal(a[i], b[i])) return false;
		}
		return true;
	}

	// date
	if (aType === TYPE_DATE) {
		return a.getTime() == b.getTime();
	}

	// regex
	if (aType === TYPE_REGEXP) {
		return a.toString() == b.toString();
	}

	// Map
	if (aType === TYPE_MAP) {
		if (a.size !== b.size) return false;
		for (let i of a.entries())
			if (!b.has(i[0])) return false;
		for (let i of a.entries())
			if (!equal(i[1], b.get(i[0]))) return false;
		return true;
	}

	// Set
	if (aType === TYPE_SET) {
		if (a.size !== b.size) return false;
		for (let i of a.entries())
			if (!b.has(i[0])) return false;
		return true;
	}

	// (trick from https://github.com/epoberezkin/fast-deep-equal/, because if a NaN a !== a !!!)
	// true if both NaN, false otherwise
	return a !== a && b !== b;

};
//#endregion ---------- /equal ---------- 

//#region    ---------- deepClone ---------- 
/**
 * Simple deep clone function for cloning array and object. 
 * For advanced cloning support, such as prototype, Map/Set, class support, see other cloning library from lodash, underscore, or deepMerge. 
 * @param target Target value to be copied.
 * @see source project, ts-deepcopy https://github.com/ykdr2017/ts-deepcopy
 */
export function deepClone<T>(target: T): T {
	if (target == null) {
		return target;
	}
	if (target instanceof Date) {
		return new Date(target.getTime()) as any;
	}
	if (target instanceof Array) {
		const cp = [] as any[];
		(target as any[]).forEach((v) => { cp.push(v); });
		return cp.map((n: any) => deepClone<any>(n)) as any;
	}
	if (typeof target === 'object' && target !== {}) {
		const cp = { ...(target as { [key: string]: any }) } as { [key: string]: any };
		Object.keys(cp).forEach(k => {
			cp[k] = deepClone<any>(cp[k]);
		});
		return cp as T;
	}
	return target;
};
//#endregion ---------- /deepClone ---------- 


//#region    ---------- wait ---------- 
export async function wait(ms: number) {
	return new Promise(function (resolve) {
		setTimeout(() => { resolve(); }, ms);
	});
}
//#endregion ---------- /wait ----------

//#region    ---------- uuid ---------- 
const BASE_58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'; // Bitcoin base58
const BASE_16 = '0123456789abcdef';

/**
 * B58 (bitcoin alphabet) encode a UUID. 
 * from: b455d83b-a89e-4e40-b50a-876f6363c79d
 * to:   PGaVHxohT51pMVaYme2Qd2
 * (base on any-base code)
 * 
 * @param uuid 
 */
export function shortUuid(uuid: string): string {
	const uuidStr = uuid.replace(/-/g, '');
	return encode(BASE_16, BASE_58, uuidStr);
}

export function toUuid(b58: string): string {
	const str = encode(BASE_58, BASE_16, b58).padStart(32, '0');
	return `${str.substring(0, 8)}-${str.substring(8, 12)}-${str.substring(12, 16)}-${str.substring(16, 20)}-${str.substring(20, 32)}`;
}

/**
 * 
 * Code mostly from https://github.com/HarasimowiczKamil/any-base#readme
 */
function encode(srcAlphabet: string, dstAlphabet: string, str: string) {
	const numberMap: number[] = []; // can be array here (was {} in any-base, perhaps for perf? to test ?)
	const fromBase = srcAlphabet.length;
	const toBase = dstAlphabet.length;

	let i, divide: number, newlen, length = str.length, result = '';

	if (srcAlphabet === dstAlphabet) {
		return str;
	}

	for (i = 0; i < length; i++) {
		numberMap[i] = srcAlphabet.indexOf(str[i]);
	}
	do {
		divide = 0;
		newlen = 0;
		for (i = 0; i < length; i++) {
			divide = divide * fromBase + numberMap[i];
			if (divide >= toBase) {
				numberMap[newlen++] = parseInt('' + (divide / toBase), 10);
				divide = divide % toBase;
			} else if (newlen > 0) {
				numberMap[newlen++] = 0;
			}
		}
		length = newlen;
		result = dstAlphabet.slice(divide, divide + 1).concat(result);
	} while (newlen !== 0);

	return result;
};
//#endregion ---------- /uuid ----------