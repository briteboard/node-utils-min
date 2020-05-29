import { deepStrictEqual as equal } from 'assert';
import { asArray } from '../../src';

const nan = parseInt('not-a-number');

describe('as-array', async function () {

	it('as-array-undefined', async () => {
		const v: undefined = asArray(undefined);
		equal(v, undefined);
	});

	it('as-array-null', async () => {
		const v: null = asArray(null);
		equal(v, null);
	});

	it('as-array-num', async () => {
		const v: number[] = asArray(1);
		equal(v, [1]);
	});

	it('as-array-nums', async () => {
		const v: number[] = asArray([1, 2, 3]);
		equal(v, [1, 2, 3]);
	});

	it('as-array-objs', async () => {
		const v: { some: string }[] = asArray({ some: 'text' });
		equal(v, [{ some: 'text' }]);
	});

	it('as-array-objs', async () => {
		const v: any[] = asArray([1, { some: 'text' }, 3]);
		equal(v, [1, { some: 'text' }, 3]);
	});
});