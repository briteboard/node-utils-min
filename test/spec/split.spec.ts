import { deepStrictEqual as equal } from 'assert';
import { describe, test } from "bun:test";
import { split } from '../../src/index.js';

const nan = parseInt('not-a-number');

describe('split', async function () {

	test('split-null', async () => {
		equal(split('1 ,2, 3'), ['1', '2', '3']);
		equal(split('1 ,2,, \t,\n 3,,'), ['1', '2', '3']);
		equal(split('1 ;2, 3', ';'), ['1', '2, 3']);
	});

	test('split-null', async () => {
		equal(split(undefined), undefined);
	});

	test('split-null', async () => {
		equal(split(null), null);
	});

	test('split-empty', async () => {
		equal(split(''), []);
	});

	test('split-whitespaces', async () => {
		equal(split('  ,\t\r,,  \n, '), []);
	});

	test('split-with-whitespaces', async () => {
		equal(split(' 1 , two,, ,three,four  ,,'), ['1', 'two', 'three', 'four']);
	});

	test('split-with-delim', async () => {
		equal(split(' 1 ; 2 ,3;4;;', ';'), ['1', '2 ,3', '4']);
	});

});