import { fail } from 'assert';
import { isNotEmpty } from '../../src';

const nan = parseInt('not-a-number');

describe('is-not-empty', async function () {

	it('is-not-empty-maybe', async () => {
		let arr: string[] | undefined;
		if (isNotEmpty(arr)) {
			const l = arr.length; // arr is string array
			fail('arr should be empty');
		}
	});


});