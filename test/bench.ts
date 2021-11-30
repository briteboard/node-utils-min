import { performance, PerformanceObserver } from 'perf_hooks';
import { asNum, prune, pruneIn } from '../src/index.js';
const summer = (accumulator: number, currentValue: number) => accumulator + currentValue;

/**
 * Latest result: (2020-05-07)
 * - warmUp: 5ms
 * - benchNumber: 665ms
 * - benchNumberPlus: 672ms
 * - benchNumberWithTrim: 879ms
 * - benchAsNum: 1543ms (with string/array/number support, ' ' return null)
 */

const IT = 1000000;
const STEPS = 10;

const benchTimes: { [name: string]: number[] } = {};

const obs = new PerformanceObserver((list) => {
	const entry = list.getEntries()[0];
	const name = entry.name;
	const times = benchTimes[name] ?? [];
	times.push(entry.duration);
	benchTimes[name] = times;
	performance.clearMarks();
});
obs.observe({ entryTypes: ['function'] });

// asNum benchs
// const benchs = [warmUp, benchNumber, benchNumberPlus, benchNumberWithTrim, benchAsNum];

const benchs = [warmUp, benchPruneInObjWithUndefined, benchPruneObjWithUndefined, benchPruneInObjWithoutUndefined, benchPruneObjWithoutUndefined, benchPruneInArr, benchPruneArr];

const timed_benchs = benchs.map(bench => performance.timerify(bench))

run();

function run() {

	for (const tbench of timed_benchs) {
		for (let s = 0; s < STEPS; s++) {
			tbench();
		}
	}

	// print result
	console.log(`Benchmark result with ${STEPS} steps of ${IT} iteration (time sum per function)`)
	const entries = Object.entries(benchTimes);
	const longest = entries.reduce((l, entry) => {
		return (entry[0].length > l) ? entry[0].length : l;
	}, 0);

	for (const [name, times] of Object.entries(benchTimes)) {
		console.log(`${name.padEnd(longest + 3, ' ')}: ${Math.round(times.reduce(summer, 0))}ms`);
	}

	obs.disconnect();
}

function warmUp() {
	let r: number;
	for (let i = 0; i < IT; i++) {
		r = i + 1;
	}
}

//#region    ---------- pruneIn ---------- 
function benchPruneInObjWithUndefined() {
	let r: any;

	for (let i = 0; i < IT; i++) {
		const obj = { a: i, b: undefined, c: null };
		r = pruneIn(obj);
	}
}

function benchPruneObjWithUndefined() {
	let r: any;

	for (let i = 0; i < IT; i++) {
		const obj = { a: i, b: undefined, c: null };
		r = prune(obj);
	}
}

function benchPruneInObjWithoutUndefined() {
	let r: any;

	for (let i = 0; i < IT; i++) {
		const obj = { a: i, b: 2, c: null };
		r = pruneIn(obj);
	}
}

function benchPruneObjWithoutUndefined() {
	let r: any;

	for (let i = 0; i < IT; i++) {
		const obj = { a: i, b: 2, c: null };
		r = prune(obj);
	}
}


function benchPruneInArr() {
	let r: any;

	for (let i = 0; i < IT; i++) {
		const arr = [i, undefined, null, 'one', 'two'];
		r = pruneIn(arr);
	}
}

function benchPruneArr() {
	let r: any;

	for (let i = 0; i < IT; i++) {
		const arr = [i, undefined, null, 'one', 'two'];
		r = prune(arr);
	}
}

//#endregion ---------- /pruneIn ---------- 

//#region    ---------- asNum ---------- 
function benchAsNum() {
	let r: number | null = null;

	for (let i = 0; i < IT; i++) {
		const str = '  ' + i;
		r = asNum(str);
	}
}

function benchNumber() {
	let r: number | null = null;

	for (let i = 0; i < IT; i++) {
		const str = '  ' + i;
		r = Number(str);
	}
}

function benchNumberWithTrim() {
	let r: number | null = null;

	for (let i = 0; i < IT; i++) {
		const str = '  ' + i;
		r = Number(str.trim());
	}
}

function benchNumberPlus() {
	let r: number | null = null;

	for (let i = 0; i < IT; i++) {
		const str = '  ' + i;
		r = +str;
	}
}
//#endregion ---------- /asNum ----------