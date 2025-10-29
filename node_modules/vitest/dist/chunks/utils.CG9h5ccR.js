import { getSafeTimers } from '@vitest/utils/timers';

const NAME_WORKER_STATE = "__vitest_worker__";
function getWorkerState() {
	// @ts-expect-error untyped global
	const workerState = globalThis[NAME_WORKER_STATE];
	if (!workerState) throw new Error("Vitest failed to access its internal state.\n\nOne of the following is possible:\n- \"vitest\" is imported directly without running \"vitest\" command\n- \"vitest\" is imported inside \"globalSetup\" (to fix this, use \"setupFiles\" instead, because \"globalSetup\" runs in a different context)\n- \"vitest\" is imported inside Vite / Vitest config file\n- Otherwise, it might be a Vitest bug. Please report it to https://github.com/vitest-dev/vitest/issues\n");
	return workerState;
}
function provideWorkerState(context, state) {
	return Object.defineProperty(context, NAME_WORKER_STATE, {
		value: state,
		configurable: true,
		writable: true,
		enumerable: false
	}), state;
}
function isChildProcess() {
	return typeof process !== "undefined" && !!process.send;
}
function resetModules(modules, resetMocks = false) {
	const skipPaths = [
		/\/vitest\/dist\//,
		/vitest-virtual-\w+\/dist/,
		/@vitest\/dist/,
		...!resetMocks ? [/^mock:/] : []
	];
	modules.idToModuleMap.forEach((node, path) => {
		skipPaths.some((re) => re.test(path)) || (node.promise = void 0, node.exports = void 0, node.evaluated = false, node.importers.clear());
	});
}
function waitNextTick() {
	const { setTimeout } = getSafeTimers();
	return new Promise((resolve) => setTimeout(resolve, 0));
}
async function waitForImportsToResolve() {
	await waitNextTick();
	const state = getWorkerState(), promises = [], resolvingCount = state.resolvingModules.size;
	for (const [_, mod] of state.evaluatedModules.idToModuleMap) if (mod.promise && !mod.evaluated) promises.push(mod.promise);
	!promises.length && !resolvingCount || (await Promise.allSettled(promises), await waitForImportsToResolve());
}

export { getWorkerState as g, isChildProcess as i, provideWorkerState as p, resetModules as r, waitForImportsToResolve as w };
