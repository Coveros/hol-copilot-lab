import { getCurrentSuite } from '@vitest/runner';
import { createChainable } from '@vitest/runner/utils';
import { noop } from '@vitest/utils/helpers';
import { g as getWorkerState } from './utils.CG9h5ccR.js';

const benchFns = /* @__PURE__ */ new WeakMap(), benchOptsMap = /* @__PURE__ */ new WeakMap();
function getBenchOptions(key) {
	return benchOptsMap.get(key);
}
function getBenchFn(key) {
	return benchFns.get(key);
}
const bench = createBenchmark(function(name, fn = noop, options = {}) {
	if (getWorkerState().config.mode !== "benchmark") throw new Error("`bench()` is only available in benchmark mode.");
	const task = getCurrentSuite().task(formatName(name), {
		...this,
		meta: { benchmark: true }
	});
	// vitest runner sets mode to `todo` if handler is not passed down
	// but we store handler separetly
	if (benchFns.set(task, fn), benchOptsMap.set(task, options), !this.todo && task.mode === "todo") task.mode = "run";
});
function createBenchmark(fn) {
	const benchmark = createChainable([
		"skip",
		"only",
		"todo"
	], fn);
	return benchmark.skipIf = (condition) => condition ? benchmark.skip : benchmark, benchmark.runIf = (condition) => condition ? benchmark : benchmark.skip, benchmark;
}
function formatName(name) {
	return typeof name === "string" ? name : typeof name === "function" ? name.name || "<anonymous>" : String(name);
}

export { getBenchOptions as a, bench as b, getBenchFn as g };
