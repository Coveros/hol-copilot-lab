import { r as resolveCoverageProviderModule } from './coverage.D_JHT54q.js';
import { addSerializer } from '@vitest/snapshot';
import { setSafeTimers } from '@vitest/utils/timers';
import { g as getWorkerState } from './utils.CG9h5ccR.js';

async function startCoverageInsideWorker(options, loader, runtimeOptions) {
	const coverageModule = await resolveCoverageProviderModule(options, loader);
	return coverageModule ? coverageModule.startCoverage?.(runtimeOptions) : null;
}
async function takeCoverageInsideWorker(options, loader) {
	const coverageModule = await resolveCoverageProviderModule(options, loader);
	return coverageModule ? coverageModule.takeCoverage?.({ moduleExecutionInfo: loader.moduleExecutionInfo }) : null;
}
async function stopCoverageInsideWorker(options, loader, runtimeOptions) {
	const coverageModule = await resolveCoverageProviderModule(options, loader);
	return coverageModule ? coverageModule.stopCoverage?.(runtimeOptions) : null;
}

let globalSetup = false;
async function setupCommonEnv(config) {
	if (setupDefines(config), setupEnv(config.env), !globalSetup && (globalSetup = true, setSafeTimers(), config.globals)) (await import('./globals.BGT_RUsD.js')).registerApiGlobally();
}
function setupDefines(config) {
	for (const key in config.defines) globalThis[key] = config.defines[key];
}
function setupEnv(env) {
	const state = getWorkerState(), { PROD, DEV,...restEnvs } = env;
	for (const key in state.metaEnv.PROD = PROD, state.metaEnv.DEV = DEV, restEnvs) state.metaEnv[key] = env[key];
}
async function loadDiffConfig(config, moduleRunner) {
	if (typeof config.diff === "object") return config.diff;
	if (typeof config.diff !== "string") return;
	const diffModule = await moduleRunner.import(config.diff);
	if (diffModule && typeof diffModule.default === "object" && diffModule.default != null) return diffModule.default;
	throw new Error(`invalid diff config file ${config.diff}. Must have a default export with config object`);
}
async function loadSnapshotSerializers(config, moduleRunner) {
	const files = config.snapshotSerializers;
	(await Promise.all(files.map(async (file) => {
		const mo = await moduleRunner.import(file);
		if (!mo || typeof mo.default !== "object" || mo.default === null) throw new Error(`invalid snapshot serializer file ${file}. Must export a default object`);
		const config = mo.default;
		if (typeof config.test !== "function" || typeof config.serialize !== "function" && typeof config.print !== "function") throw new TypeError(`invalid snapshot serializer in ${file}. Must have a 'test' method along with either a 'serialize' or 'print' method.`);
		return config;
	}))).forEach((serializer) => addSerializer(serializer));
}

export { stopCoverageInsideWorker as a, loadSnapshotSerializers as b, setupCommonEnv as c, loadDiffConfig as l, startCoverageInsideWorker as s, takeCoverageInsideWorker as t };
