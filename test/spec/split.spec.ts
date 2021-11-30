import { deepStrictEqual as equal } from 'assert';
import { split } from '../../src/index.js';

const nan = parseInt('not-a-number');

describe('split', async function () {

	it('split-null', async () => {
		equal(split('1 ,2, 3'), ['1', '2', '3']);
		equal(split('1 ,2,, \t,\n 3,,'), ['1', '2', '3']);
		equal(split('1 ;2, 3', ';'), ['1', '2, 3']);
	});

	it('split-null', async () => {
		equal(split(undefined), undefined);
	});

	it('split-null', async () => {
		equal(split(null), null);
	});

	it('split-empty', async () => {
		equal(split(''), []);
	});

	it('split-whitespaces', async () => {
		equal(split('  ,\t\r,,  \n, '), []);
	});

	it('split-with-whitespaces', async () => {
		equal(split(' 1 , two,, ,three,four  ,,'), ['1', 'two', 'three', 'four']);
	});

	it('split-with-delim', async () => {
		equal(split(' 1 ; 2 ,3;4;;', ';'), ['1', '2 ,3', '4']);
	});

});