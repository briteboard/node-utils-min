import { deepStrictEqual as equal } from 'assert';
import { asNum } from '../../src';

const nan = parseInt('not-a-number');

describe('as-num', async function () {

	it('as-num-undefined', async () => {
		equal(asNum(undefined), null);
	});

	it('as-num-null', async () => {
		equal(asNum(null), null);
	});

	it('as-num-num', async () => {
		equal(asNum(12), 12);
	});

	it('as-num-nan', async () => {
		equal(asNum(nan), null);
	});

	it('as-num-str-empty', async () => {
		equal(asNum(''), null);
		equal(asNum('  '), null);
	});

	it('as-num-str-nan', async () => {
		equal(asNum('12nan'), null);
		equal(asNum('n12'), null);
	});

	it('as-num-str', async () => {
		equal(asNum('12'), 12);
		equal(asNum('12.1'), 12.1);
	});

	it('as-num-str[]', async () => {
		equal(asNum(['12', '14']), [12, 14]);
		equal(asNum(['12', '14', 'some']), [12, 14, null]);
	});

	it('as-num-str[]-nil', async () => {
		equal(asNum(['12', '14', null, undefined]), [12, 14, null, null]);
	});

	it('as-num-str[]-empty', async () => {
		equal(asNum(['', '   ']), [null, null]);
	});

	it('as-num-str[]-num', async () => {
		equal(asNum(['12', 13, '   ']), [12, 13, null]);
	});



});