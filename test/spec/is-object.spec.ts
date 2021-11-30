import { deepStrictEqual as equal } from 'assert';
import { isObject } from '../../src/index.js';

const nan = parseInt('not-a-number');

describe('is-object', async function () {

	it('is-object-undefined', async () => {
		equal(isObject(undefined), false);
	});

	it('is-object-null', async () => {
		equal(isObject(null), false);
	});

	it('is-object-nan', async () => {
		equal(isObject(nan), false);
	});

	it('is-object-num', async () => {
		equal(isObject(0), false);
		equal(isObject(-1), false);
		equal(isObject(123), false);
	});

	it('is-object-[]', async () => {
		equal(isObject([]), false);
		equal(isObject([undefined]), false);
		equal(isObject([null]), false);
	});

	it('is-object-string', async () => {
		equal(isObject(''), false);
	});

	it('is-object-object', async () => {
		equal(isObject({}), true);
		equal(isObject({ a: 123 }), true);
	});


});