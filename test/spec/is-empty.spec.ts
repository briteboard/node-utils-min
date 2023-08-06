import { deepStrictEqual as equal } from 'assert';
import { describe, test } from "bun:test";
import { isEmpty } from '../../src/index.js';

const nan = parseInt('not-a-number');

describe('is-empty', async function () {

	test('is-empty-undefined', async () => {
		equal(isEmpty(undefined), true);
	});

	test('is-empty-null', async () => {
		equal(isEmpty(null), true);
	});

	test('is-empty-nan', async () => {
		equal(isEmpty(nan), true);
	});

	test('is-empty-num', async () => {
		equal(isEmpty(0), false);
		equal(isEmpty(-1), false);
		equal(isEmpty(123), false);
	});

	test('is-empty-[]', async () => {
		equal(isEmpty([]), true);
		equal(isEmpty([null]), false);
		equal(isEmpty([-1]), false);
		equal(isEmpty(['']), false);
	});

	test('is-empty-string', async () => {
		equal(isEmpty(''), true);
		equal(isEmpty('a'), false);
	});

	test('is-empty-string-whitespace', async () => {
		equal(isEmpty('\n\t  \r'), true);
		equal(isEmpty('\n\t - \r'), false);
	});


	test('is-empty-object', async () => {
		equal(isEmpty({}), true);
		equal(isEmpty({ a: undefined }), false);
		equal(isEmpty({ a: null }), false);
	});


});