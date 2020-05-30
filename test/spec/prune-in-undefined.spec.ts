import { deepStrictEqual as equal } from 'assert';
import { prune, pruneIn } from '../../src';

const nan = parseInt('not-a-number');

describe('prune-in-undefined', async function () {

	it('prune-in-undefined-nil', async () => {
		equal(prune(undefined), undefined);
		equal(prune(null), null);
	});


	it('prune-in-undefined-obj', async () => {
		let obj: any = { a: 1, b: undefined, c: null };
		const expected = { a: 1, c: null };
		let r = pruneIn(obj);
		equal(r, expected);
		equal(obj, expected);
	});

	it('prune-in-undefined-[]', async () => {
		let array = [1, 'two', undefined, null, []];
		let expected = [1, 'two', null, []];
		let r = pruneIn(array);
		equal(r, expected);
		equal(array, expected);

	});

});