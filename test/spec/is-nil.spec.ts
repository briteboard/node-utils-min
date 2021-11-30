import { deepStrictEqual as equal } from 'assert';
import { isNil } from '../../src/index.js';

const nan = parseInt('not-a-number');

describe('is-nil', async function () {

	it('is-nil-undefined', async () => {
		equal(isNil(undefined), true);
	});

	it('is-nil-null', async () => {
		equal(isNil(null), true);
	});

	it('is-nil-nan', async () => {
		equal(isNil(nan), true);
	});

	it('is-nil-num', async () => {
		equal(isNil(0), false);
		equal(isNil(-1), false);
		equal(isNil(123), false);
	});

	it('is-nil-[]', async () => {
		equal(isNil([]), false);
		equal(isNil([undefined]), false);
		equal(isNil([null]), false);
	});

	it('is-nil-string', async () => {
		equal(isNil(''), false);
	});

	it('is-nil-object', async () => {
		equal(isNil({}), false);
	});


});