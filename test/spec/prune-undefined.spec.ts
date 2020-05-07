import { deepStrictEqual as equal } from 'assert';
import { prune } from '../../src';

const nan = parseInt('not-a-number');

describe('prune-undefined', async function () {

	it('prune-undefined-nil', async () => {
		equal(prune(undefined), undefined);
		equal(prune(null), null);
	});


	it('prune-undefined-obj', async () => {
		equal(prune({}), {});
		equal(prune({ a: undefined }), {});
		equal(prune({ a: undefined, b: 123, c: null, e: nan }), { b: 123, c: null, e: nan });
	});

	it('prune-undefined-[]', async () => {
		equal(prune([]), []);
		equal(prune([undefined]), []);
		equal(prune([undefined, 123, null, nan]), [123, null, nan]);
	});

});