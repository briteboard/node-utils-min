import { deepStrictEqual as equal } from 'assert';
import { omit } from '../../src';

const nan = parseInt('not-a-number');

describe('omit', async function () {

	it('omit-any', async () => {
		const data: any = { a: 123, b: 124 }
		equal(omit(data, 'b', 'c'), { a: 123 });
	});

	it('omit-literal', async () => {
		equal(omit({ a: 123, b: 'BBB' }, 'b'), { a: 123 });
	});

	it('omit-with-nil', async () => {
		equal(omit({ a: 123, b: 'BBB', c: undefined, d: null, e: nan }, 'b'), { a: 123, c: undefined, d: null, e: nan });
	});

	it('omit-with-object', async () => {
		const obj = { a: 123, b: 'BBB' };
		equal(omit(obj, 'b'), { a: 123 });
	});

});