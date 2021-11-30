import { deepStrictEqual as equal } from 'assert';
import { isEmpty } from '../../src/index.js';

const nan = parseInt('not-a-number');

describe('is-empty', async function () {

	it('is-empty-undefined', async () => {
		equal(isEmpty(undefined), true);
	});

	it('is-empty-null', async () => {
		equal(isEmpty(null), true);
	});

	it('is-empty-nan', async () => {
		equal(isEmpty(nan), true);
	});

	it('is-empty-num', async () => {
		equal(isEmpty(0), false);
		equal(isEmpty(-1), false);
		equal(isEmpty(123), false);
	});

	it('is-empty-[]', async () => {
		equal(isEmpty([]), true);
		equal(isEmpty([null]), false);
		equal(isEmpty([-1]), false);
		equal(isEmpty(['']), false);
	});

	it('is-empty-string', async () => {
		equal(isEmpty(''), true);
		equal(isEmpty('a'), false);
	});

	it('is-empty-string-whitespace', async () => {
		equal(isEmpty('\n\t  \r'), true);
		equal(isEmpty('\n\t - \r'), false);
	});


	it('is-empty-object', async () => {
		equal(isEmpty({}), true);
		equal(isEmpty({ a: undefined }), false);
		equal(isEmpty({ a: null }), false);
	});


});