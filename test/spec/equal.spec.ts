import { deepStrictEqual as nodeEqual } from 'assert';
import { equal } from '../../src/index.js';

const nan = parseInt('not-a-number');

describe('equal', async function () {

	it('equal-undefined', async () => {
		nodeEqual(equal(undefined, undefined), true);
		nodeEqual(equal(undefined, 2), false);
	});


	it('equal-null', async () => {
		nodeEqual(equal(null, null), true);
		nodeEqual(equal(null, 1), false);
		nodeEqual(equal(undefined, null), false);
	});

	it('equal-array', async () => {
		nodeEqual(equal([1, 2], [1, 2]), true);
		nodeEqual(equal([1, { two: 2 }], [1, { two: 2 }]), true);
		nodeEqual(equal([1, { two: 2 }], [1, { two: 3 }]), false);
		nodeEqual(equal([1, 2], 2), false);
		nodeEqual(equal([1, 2, 3], [3, 2, 1]), false);
		nodeEqual(equal([1, 2, 3], null), false);
		nodeEqual(equal([1, 2, 3], 'aa'), false);
	});

	it('equal-object', async () => {
		nodeEqual(equal({ a: 1, b: 2 }, { b: 2, a: 1 }), true);
		nodeEqual(equal({ a: 1, b: 2 }, { a: 1 }), false);
		nodeEqual(equal(null, { a: 1 }), false);
		nodeEqual(equal({ a: 1, b: undefined }, { a: 1 }), false);
		const m = new Map();
		m.set('a', 1);
		nodeEqual(equal(m, { a: 1 }), false);
	});

	it('equal-map', async () => {
		const m1 = new Map();
		m1.set('a', 1);
		m1.set('b', 2);
		const m2 = new Map();
		m2.set('b', 2);
		m2.set('a', 1);
		const m3 = new Map();
		m3.set('a', 1);
		m3.set('b', 3);

		nodeEqual(equal(m1, m1), true);
		nodeEqual(equal(m1, m2), true);
		nodeEqual(equal(m1, m3), false);
		nodeEqual(equal(m2, { a: 1 }), false);
	});

	it('equal-set', async () => {
		const s1 = new Set();
		s1.add('a');
		s1.add('b');
		const s2 = new Set();
		s2.add('b');
		s2.add('a');
		const s3 = new Set();
		s3.add('a');
		s3.add('c');

		nodeEqual(equal(s1, s1), true);
		nodeEqual(equal(s1, s2), true);
		nodeEqual(equal(s1, s3), false);
		nodeEqual(equal(s2, { a: 1 }), false);
	});

});