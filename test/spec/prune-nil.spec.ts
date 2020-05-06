import { deepStrictEqual as equal } from 'assert';
import { pruneNil } from '../../src';

const nan = parseInt('not-a-number');

describe('prune-nil', async function () {

	it('prune-nil-undefined', async () => {
		equal(pruneNil(undefined), undefined);
	});

	it('prune-nil-null', async () => {
		equal(pruneNil(null), null);
	});

	it('prune-nil-object', async () => {
		equal(pruneNil({ a: undefined, b: null, c: nan, d: 0, e: [], f: '' }), { d: 0, e: [], f: '' });
	});

	it('prune-nil-[]', async () => {
		equal(pruneNil([undefined, null, nan, 0, [], '']), [0, [], '']);
	});

});