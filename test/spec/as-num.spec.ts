import { deepStrictEqual as equal } from 'assert';
import { describe, test } from "bun:test";
import { asNum } from '../../src/index.js';

const nan = parseInt('not-a-number');

describe('as-num', async function () {

	test('as-num-undefined', async () => {
		equal(asNum(undefined), undefined);
	});

	test('as-num-undefined[]', async () => {
		equal(asNum([undefined]), [null]);
	});

	test('as-num-null', async () => {
		equal(asNum(null), null);
	});

	test('as-num-num', async () => {
		equal(asNum(12), 12);
	});

	test('as-num-nan', async () => {
		equal(asNum(nan), null);
	});

	test('as-num-str-empty', async () => {
		equal(asNum(''), null);
		equal(asNum('  '), null);
	});

	test('as-num-str-nan', async () => {
		equal(asNum('12nan'), null);
		equal(asNum('n12'), null);
	});

	test('as-num-str', async () => {
		equal(asNum('12'), 12);
		equal(asNum('12.1'), 12.1);
	});

	test('as-num-str[]', async () => {
		equal(asNum(['12', '14']), [12, 14]);
		equal(asNum(['12', '14', 'some']), [12, 14, null]);
	});

	test('as-num-str[]-nil', async () => {
		equal(asNum(['12', '14', null, undefined]), [12, 14, null, null]);
	});

	test('as-num-str[]-empty', async () => {
		equal(asNum(['', '   ']), [null, null]);
	});

	test('as-num-str[]-num', async () => {
		equal(asNum(['12', 13, '   ']), [12, 13, null]);
	});



});