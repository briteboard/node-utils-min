import { deepStrictEqual as equal } from 'assert';
import { isString } from '../../src';

const nan = parseInt('not-a-number');

const str: any = 'hello';

describe('is-string', async function () {

	it('is-string-undefined', async () => {
		equal(isString(undefined), false);
	});

	it('is-string-null', async () => {
		equal(isString(null), false);
	});

	it('is-string-nan', async () => {
		equal(isString(nan), false);
	});

	it('is-string-num', async () => {
		equal(isString(0), false);
		equal(isString(-1), false);
		equal(isString(123), false);
	});

	it('is-string-[]', async () => {
		equal(isString([]), false);
		equal(isString([undefined]), false);
		equal(isString([null]), false);
	});

	it('is-string-string', async () => {
		equal(isString(''), true);
		equal(isString('hello'), true);

		// check type assertion
		if (isString(str)) {
			equal(str.padEnd(6, '0'), str + '0');
		}
	});

	it('is-string-object', async () => {
		equal(isString({}), false);
		equal(isString({ a: 123 }), false);
	});


});