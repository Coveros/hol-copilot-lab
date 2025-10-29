import { createRequire } from 'node:module';
import { performance } from 'node:perf_hooks';
import timers from 'node:timers';
import timersPromises from 'node:timers/promises';
import util from 'node:util';
import { startTests, collectTests } from '@vitest/runner';
import { KNOWN_ASSET_TYPES } from '@vitest/utils/constants';
import { s as setupChaiConfig, r as resolveTestRunner, a as resolveSnapshotEnvironment } from '../chunks/resolveSnapshotEnvironment.BZzLjzkh.js';
import { c as setupCommonEnv, s as startCoverageInsideWorker, a as stopCoverageInsideWorker } from '../chunks/setup-common.DR1sucx6.js';
import { i as index } from '../chunks/index.RwjEGCQ0.js';
import { c as closeInspector } from '../chunks/inspector.DLZxSeU3.js';
import { g as getWorkerState } from '../chunks/utils.CG9h5ccR.js';
import { g as globalExpect } from '../chunks/vi.BZvkKVkM.js';
import '@vitest/expect';
import '../chunks/rpc.Dv1Jt3i2.js';
import '@vitest/utils/timers';
import '../chunks/index.Bgo3tNWt.js';
import '../chunks/test.CnspO-X4.js';
import '@vitest/utils/helpers';
import '../chunks/benchmark.DHKMYAts.js';
import '@vitest/runner/utils';
import '@vitest/utils/error';
import 'pathe';
import '../chunks/coverage.D_JHT54q.js';
import '@vitest/snapshot';
import '../chunks/evaluatedModules.Dg1zASAC.js';
import 'vite/module-runner';
import 'expect-type';
import 'node:url';
import '@vitest/spy';
import '@vitest/utils/offset';
import '@vitest/utils/source-map';
import '../chunks/_commonjsHelpers.BFTU3MAI.js';
import '../chunks/date.-jtEtIeV.js';

async function run(method, files, config, moduleRunner) {
	const workerState = getWorkerState();
	await setupCommonEnv(config), Object.defineProperty(globalThis, "__vitest_index__", {
		value: index,
		enumerable: false
	});
	const viteEnvironment = workerState.environment.viteEnvironment || workerState.environment.name;
	if (globalExpect.setState({ environment: workerState.environment.name }), viteEnvironment === "client") {
		const _require = createRequire(import.meta.url);
		_require.extensions[".css"] = resolveCss, _require.extensions[".scss"] = resolveCss, _require.extensions[".sass"] = resolveCss, _require.extensions[".less"] = resolveCss, KNOWN_ASSET_TYPES.forEach((type) => {
			_require.extensions[`.${type}`] = resolveAsset;
		}), process.env.SSR = "";
	} else process.env.SSR = "1";
	if (globalThis.__vitest_required__ = {
		util,
		timers,
		timersPromises
	}, await startCoverageInsideWorker(config.coverage, moduleRunner, { isolate: false }), config.chaiConfig) setupChaiConfig(config.chaiConfig);
	const [runner, snapshotEnvironment] = await Promise.all([resolveTestRunner(config, moduleRunner), resolveSnapshotEnvironment(config, moduleRunner)]);
	config.snapshotOptions.snapshotEnvironment = snapshotEnvironment, runner.getWorkerContext = void 0, workerState.onCancel.then((reason) => {
		closeInspector(config), runner.cancel?.(reason);
	}), workerState.durations.prepare = performance.now() - workerState.durations.prepare;
	const { vi } = index;
	for (const file of files) {
		if (workerState.filepath = file.filepath, method === "run") await startTests([file], runner);
		else await collectTests([file], runner);
		// mocks should not affect different files
		vi.resetConfig(), vi.restoreAllMocks();
	}
	await stopCoverageInsideWorker(config.coverage, moduleRunner, { isolate: false });
}
function resolveCss(mod) {
	mod.exports = "";
}
function resolveAsset(mod, url) {
	mod.exports = url;
}

export { run };
