import { W as WorkerGlobalState, B as BirpcOptions, R as RuntimeRPC } from './chunks/worker.d.BFk-vvBU.js';
import { Awaitable } from '@vitest/utils';
import '@vitest/runner';
import 'vite/module-runner';
import './chunks/config.d.u2CUDWwS.js';
import '@vitest/pretty-format';
import '@vitest/snapshot';
import '@vitest/utils/diff';
import './chunks/environment.d.CrsxCzP1.js';

/** @experimental */
declare function runBaseTests(method: "run" | "collect", state: WorkerGlobalState): Promise<void>;

type WorkerRpcOptions = Pick<BirpcOptions<RuntimeRPC>, "on" | "off" | "post" | "serialize" | "deserialize">;
interface VitestWorker extends WorkerRpcOptions {
	runTests: (state: WorkerGlobalState) => Awaitable<unknown>;
	collectTests: (state: WorkerGlobalState) => Awaitable<unknown>;
}

interface Options extends VitestWorker {
	teardown?: () => void;
}
/** @experimental */
declare function init(worker: Options): void;

export { init, runBaseTests };
