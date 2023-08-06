import { deepStrictEqual as equal } from 'assert';
import { describe, test } from "bun:test";
import { isObject } from '../../src/index.js';

const nan = parseInt('not-a-number');

describe('is-object', async function () {

	test('is-object-undefined', async () => {
		equal(isObject(undefined), false);
	});

	test('is-object-null', async () => {
		equal(isObject(null), false);
	});

	test('is-object-nan', async () => {
		equal(isObject(nan), false);
	});

	test('is-object-num', async () => {
		equal(isObject(0), false);
		equal(isObject(-1), false);
		equal(isObject(123), false);
	});

	test('is-object-[]', async () => {
		equal(isObject([]), false);
		equal(isObject([undefined]), false);
		equal(isObject([null]), false);
	});

	test('is-object-string', async () => {
		equal(isObject(''), false);
	});

	test('is-object-object', async () => {
		equal(isObject({}), true);
		equal(isObject({ a: 123 }), true);
	});


});