import { deepStrictEqual as equal } from 'assert';
import { pruneEmpty } from '../../src';

const nan = parseInt('not-a-number');

describe('prune-empty', async function () {

	it('prune-empty-undefined', async () => {
		equal(pruneEmpty(undefined), undefined);
	});

	it('prune-empty-null', async () => {
		equal(pruneEmpty(null), null);
	});

	it('prune-empty-object', async () => {
		equal(pruneEmpty({ a: undefined, b: null, c: nan, d: 0, e: [], f: '' }), { d: 0 });
	});

	it('prune-empty-[]', async () => {
		equal(pruneEmpty([undefined, null, nan, 0, [], '']), [0]);
	});

});