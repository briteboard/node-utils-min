import { deepStrictEqual as equal } from 'assert';
import { describe, test } from "bun:test";
import { deepFreeze } from '../../src/index.js';
import { should_throw } from './utils.js';

const nan = parseInt('not-a-number');

describe('deep-freeze', async function () {

	test('deep-freeze-object-flat', () => {
		const obj = { a: 1, b: "32" };

		deepFreeze(obj);
		equal(obj.a, 1);

		should_throw(() => {
			obj.a = 123;
		});
	});

	test('deep-freeze-object-nested', () => {
		const obj = { a: 1, b: "32", c: { x: 33, y: 44 } };

		deepFreeze(obj);
		equal(obj.a, 1);
		equal(obj.c.x, 33);

		should_throw(() => {
			obj.c.x = 123;
		});
	});

	test('deep-freeze-array-strings', () => {
		const obj = { a: 1, b: "32", c: ["a", "b"] };

		deepFreeze(obj);
		equal(obj.a, 1);
		equal(obj.c[0], "a");

		should_throw(() => {
			obj.c[0] = "z";
		});
	});

	test('deep-freeze-array-objects', () => {
		const obj = { a: 1, b: null, c: ["a", { d: { e: 1, f: 2 } }] };

		deepFreeze(obj);
		equal(obj.a, 1);
		equal(obj.c[0], "a");

		should_throw(() => {
			(<any>obj.c[1]).d.e = 123;
		});
	});


	test('deep-freeze-number', () => {
		const obj = 123;

		deepFreeze(obj);
		equal(obj, 123);
	});

	test('deep-freeze-null', () => {
		const obj = null;

		deepFreeze(obj);
		equal(obj, null);
	});

});

