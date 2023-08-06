import { deepStrictEqual as equal } from 'assert';
import { describe, test } from "bun:test";
import { isNum } from '../../src/index.js';

const nan = parseInt('not-a-number');

const str: any = 'hello';

describe('is-num', async function () {

	test('is-num-undefined', async () => {
		equal(isNum(undefined), false);
	});

	test('is-num-null', async () => {
		equal(isNum(null), false);
	});

	test('is-num-nan', async () => {
		equal(isNum(nan), false);
	});

	test('is-num-num', async () => {
		equal(isNum(0), true);
		equal(isNum(-1), true);
		equal(isNum(123), true);
	});

	test('is-num-[]', async () => {
		equal(isNum([]), false);
		equal(isNum([undefined]), false);
		equal(isNum([null]), false);
		equal(isNum([1, 2]), false);
	});

	test('is-num-string', async () => {
		equal(isNum(''), false);
		equal(isNum('hello'), false);
		equal(isNum('123'), false);
		equal(isNum('-1'), false);

	});

	test('is-num-object', async () => {
		equal(isNum({}), false);
		equal(isNum({ a: 123 }), false);
	});


});