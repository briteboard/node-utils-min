import { deepStrictEqual as equal } from 'assert';
import { v4 as uuidv4 } from 'uuid';
import { shortUuid, toUuid } from '../../src';

describe('uuid', async function () {

	it('uuid-base', async () => {

		let count = 300;

		do {
			const uuid = uuidv4();
			const short = shortUuid(uuid);
			const decodedUuid = toUuid(short);
			equal(decodedUuid, uuid, `count: ${count} ${uuid}`);
		} while (count--);
	});

});