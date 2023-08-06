import { deepStrictEqual as equal } from 'assert';
import { describe, test } from "bun:test";
import { asArray } from '../../src/index.js';

const nan = parseInt('not-a-number');

describe('as-array', async function () {

	test('as-array-undefined', async () => {
		const v: undefined = asArray(undefined);
		equal(v, undefined);
	});

	test('as-array-null', async () => {
		const v: null = asArray(null);
		equal(v, null);
	});

	test('as-array-num', async () => {
		const v: number[] = asArray(1);
		equal(v, [1]);
	});

	test('as-array-nums', async () => {
		const v: number[] = asArray([1, 2, 3]);
		equal(v, [1, 2, 3]);
	});

	test('as-maybe-array', async () => {
		const a = hello();
		const v: string[] = asArray(a);
		equal(v, ['hello']);
	});

	test('as-array-objs', async () => {
		const v: { some: string }[] = asArray({ some: 'text' });
		equal(v, [{ some: 'text' }]);
	});

	test('as-array-objs', async () => {
		const v: any[] = asArray([1, { some: 'text' }, 3]);
		equal(v, [1, { some: 'text' }, 3]);
	});
});


function hello(): string | string[] {
	return 'hello';
}