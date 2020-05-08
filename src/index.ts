
//#region    ---------- Helpers ---------- 
const TYPE_STRING = '[object String]';
const TYPE_NUMBER = '[object Number]';
const TYPE_BOOLEAN = '[object Boolean]';
const TYPE_OBJECT = '[object Object]';
const TYPE_ARRAY = '[object Array]';
const toString = Object.prototype.toString;
//#endregion ---------- /Helpers ---------- 

//#region    ---------- isEmpty ---------- 

export function isNil(obj: any): boolean {
	if (obj == null || Number.isNaN(obj)) return true;
	return false;
}

export function isObject(obj: any): boolean {
	return toString.call(obj) === TYPE_OBJECT;
}



//#endregion ---------- /isEmpty ----------


//#region    ---------- isEmpty ---------- 

export function isEmpty(obj: any): boolean {
	if (obj == null) return true;
	const type = toString.call(obj);

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

//#endregion ---------- /isEmpty ----------



//#region    ---------- prune ---------- 
type NonNull = string | number | boolean | symbol | bigint | object;

/**
 * Prune first level properties for empty value (null, undefined, empty array, empty string), and with an additional exclude value list
 * 
 * @param obj 
 */
export function pruneEmpty<T extends object | null | undefined>(obj: T, ...additionalExcludes: (number | string | boolean)[]): T extends object ? Partial<T> : T;
export function pruneEmpty<T extends any[]>(obj: T, ...additionalExcludes: (number | string | boolean)[]): NonNull[];
export function pruneEmpty<T extends undefined | null | object | Array<any>>(obj: T, ...additionalExcludes: (number | string | boolean)[]): Partial<T> | NonNull[] | null | undefined {
	return _prune(obj, isEmpty, additionalExcludes);
}

export function pruneNil<T extends object | null | undefined>(obj: T, ...additionalExcludes: (number | string | boolean)[]): T extends object ? Partial<T> : T;
export function pruneNil<T extends any[]>(obj: T, ...additionalExcludes: (number | string | boolean)[]): NonNull[];
export function pruneNil<T extends object | Array<any>>(obj: T, ...additionalExcludes: (number | string | boolean)[]): Partial<T> | NonNull[] | null | undefined {
	return _prune(obj, isNil, additionalExcludes);
}

const isUndefined = (v: any) => v === undefined;
export function prune<T extends object | null | undefined>(obj: T, ...additionalExcludes: (number | string | boolean)[]): T extends object ? Partial<T> : T;
export function prune<T extends any[]>(obj: T, ...additionalExcludes: (number | string | boolean)[]): NonNull[];
export function prune<T extends object | Array<any>>(obj: T, ...additionalExcludes: (number | string | boolean)[]): Partial<T> | NonNull[] | null | undefined {
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



//#region    ---------- asNum ---------- 
type MaybeNumStr = (string | number | null | undefined);

export function asNum<T extends MaybeNumStr, A extends number | undefined>(val: T, or_else?: A): A extends number ? number : T extends null | undefined ? null : (number | null);
export function asNum<T extends MaybeNumStr[], A extends number | undefined>(vals: T, or_else?: A): A extends number ? number[] : (number | null)[];
export function asNum<T extends MaybeNumStr[][], A extends number | undefined>(vals: T, or_else?: A): A extends number ? number[][] : (number | null)[][];

export function asNum(val: MaybeNumStr[][] | MaybeNumStr[] | MaybeNumStr, alt?: number): (number | null)[][] | (number | null)[] | (number | null) {
	const _alt = (alt != null) ? alt : null;
	const type = toString.call(val);

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

//#region    ---------- omit ---------- 
// 
/**
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

//#region    ---------- wait ---------- 
export async function wait(ms: number) {
	return new Promise(function (resolve) {
		setTimeout(() => { resolve(); }, ms);
	});
}
//#endregion ---------- /wait ----------