import { deepStrictEqual as equal } from 'assert';
import { pick } from '../../src';

const nan = parseInt('not-a-number');

describe('pick', async function () {

	it('pick-null', async () => {
		const p = pick(null);
		equal(p, null);
	});

	it('pick-any', async () => {
		const data = { a: 123, b: 124, c: 'one' };
		const p = pick(data, 'a', 'b');
		equal(p, { a: 123, b: 124 });

		const p2 = pick({ a: 1, b: 'BBB', c: 'CCC' }, 'b', 'c');
		equal(p2, { b: 'BBB', c: 'CCC' });

	});

	it('pick-with-undefined', async () => {
		const data: any = { a: 123 };
		const p = pick(data, 'a', 'b');
		equal(p, { a: 123 });

	});


});

