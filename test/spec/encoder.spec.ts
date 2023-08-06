import { deepStrictEqual as equal } from 'assert';
import { describe, test } from "bun:test";
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { BASE_10_ALPHABET, BASE_16_ALPHABET, BASE_58_ALPHABET, encoder, shortUuid, toUuid } from '../../src/index.js';

describe('encoder', async function () {

	test('encoder-base-10-to-58', async () => {

		const num = 9912992344;
		const dec2hexEncode = encoder(BASE_10_ALPHABET, BASE_58_ALPHABET);
		const result = dec2hexEncode('' + num);

		const hex2decEncode = encoder(BASE_58_ALPHABET, BASE_10_ALPHABET);
		const revert = hex2decEncode(result);

		equal(revert, '' + num);
	});

	test('encoder-base-16-to-58', async () => {
		function hexToBytes(hex: string) {
			for (var bytes: number[] = [], c = 0; c < hex.length; c += 2)
				bytes.push(parseInt(hex.substring(c, 2), 16));
			return bytes;
		}

		const hexHash = crypto.createHash("sha256").update('aaa' + 'bbb').digest("hex");
		const expectedResult = '2ce109e9d0faf820b2434e166297934e6177b65ab9951dbc3e204cad4689b39c';
		equal(hexHash, expectedResult);

		const hex_to_b58 = encoder(BASE_16_ALPHABET, BASE_58_ALPHABET);
		const b58 = hex_to_b58(hexHash);
		equal(b58, '42BxvCVVLLY1UK1TnyDQwwfgvkc7Lw4uwDUZ9eCtfZuM');
	});


	test('encoder-uuid', async () => {

		let count = 10;

		do {
			const uuid = uuidv4();
			const short = shortUuid(uuid);
			const decodedUuid = toUuid(short);
			equal(decodedUuid, uuid, `count: ${count} ${uuid}`);
		} while (count--);
	});

});