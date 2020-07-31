import { deepStrictEqual as equal } from 'assert';
import { isNum } from '../../src';

const nan = parseInt('not-a-number');

const str: any = 'hello';

describe('is-num', async function () {

	it('is-num-undefined', async () => {
		equal(isNum(undefined), false);
	});

	it('is-num-null', async () => {
		equal(isNum(null), false);
	});

	it('is-num-nan', async () => {
		equal(isNum(nan), false);
	});

	it('is-num-num', async () => {
		equal(isNum(0), true);
		equal(isNum(-1), true);
		equal(isNum(123), true);
	});

	it('is-num-[]', async () => {
		equal(isNum([]), false);
		equal(isNum([undefined]), false);
		equal(isNum([null]), false);
		equal(isNum([1, 2]), false);
	});

	it('is-num-string', async () => {
		equal(isNum(''), false);
		equal(isNum('hello'), false);
		equal(isNum('123'), false);
		equal(isNum('-1'), false);

	});

	it('is-num-object', async () => {
		equal(isNum({}), false);
		equal(isNum({ a: 123 }), false);
	});


});