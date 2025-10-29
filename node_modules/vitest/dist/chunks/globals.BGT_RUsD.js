import { g as globalApis } from './constants.D_Q9UYh-.js';
import { i as index } from './index.RwjEGCQ0.js';
import './vi.BZvkKVkM.js';
import '@vitest/expect';
import '@vitest/runner';
import '@vitest/runner/utils';
import './utils.CG9h5ccR.js';
import '@vitest/utils/timers';
import '@vitest/snapshot';
import '@vitest/utils/error';
import '@vitest/utils/helpers';
import '@vitest/spy';
import '@vitest/utils/offset';
import '@vitest/utils/source-map';
import './_commonjsHelpers.BFTU3MAI.js';
import './date.-jtEtIeV.js';
import './benchmark.DHKMYAts.js';
import './evaluatedModules.Dg1zASAC.js';
import 'pathe';
import 'vite/module-runner';
import 'expect-type';

function registerApiGlobally() {
	globalApis.forEach((api) => {
		// @ts-expect-error I know what I am doing :P
		globalThis[api] = index[api];
	});
}

export { registerApiGlobally };
