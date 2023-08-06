import { fail } from 'assert';
import { describe, test } from "bun:test";
import { isNotEmpty } from '../../src/index.js';

const nan = parseInt('not-a-number');

describe('is-not-empty', async function () {

	test('is-not-empty-maybe', async () => {
		let arr: string[] | undefined;
		if (isNotEmpty(arr)) {
			const l = arr.length; // arr is string array
			fail('arr should be empty');
		}
	});


});