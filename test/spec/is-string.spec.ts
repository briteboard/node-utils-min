import { deepStrictEqual as equal } from 'assert';
import { describe, test } from "bun:test";
import { isString } from '../../src/index.js';

const nan = parseInt('not-a-number');

const str: any = 'hello';

describe('is-string', async function () {

	test('is-string-undefined', async () => {
		equal(isString(undefined), false);
	});

	test('is-string-null', async () => {
		equal(isString(null), false);
	});

	test('is-string-nan', async () => {
		equal(isString(nan), false);
	});

	test('is-string-num', async () => {
		equal(isString(0), false);
		equal(isString(-1), false);
		equal(isString(123), false);
	});

	test('is-string-[]', async () => {
		equal(isString([]), false);
		equal(isString([undefined]), false);
		equal(isString([null]), false);
	});

	test('is-string-string', async () => {
		equal(isString(''), true);
		equal(isString('hello'), true);

		// check type assertion
		if (isString(str)) {
			equal(str.padEnd(6, '0'), str + '0');
		}
	});

	test('is-string-object', async () => {
		equal(isString({}), false);
		equal(isString({ a: 123 }), false);
	});


});