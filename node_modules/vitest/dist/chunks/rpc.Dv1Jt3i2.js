import { getSafeTimers } from '@vitest/utils/timers';
import { c as createBirpc } from './index.Bgo3tNWt.js';
import { g as getWorkerState } from './utils.CG9h5ccR.js';

const { get } = Reflect;
function withSafeTimers(fn) {
	const { setTimeout, clearTimeout, nextTick, setImmediate, clearImmediate } = getSafeTimers(), currentSetTimeout = globalThis.setTimeout, currentClearTimeout = globalThis.clearTimeout, currentSetImmediate = globalThis.setImmediate, currentClearImmediate = globalThis.clearImmediate, currentNextTick = globalThis.process?.nextTick;
	try {
		if (globalThis.setTimeout = setTimeout, globalThis.clearTimeout = clearTimeout, setImmediate) globalThis.setImmediate = setImmediate;
		if (clearImmediate) globalThis.clearImmediate = clearImmediate;
		if (globalThis.process && nextTick) globalThis.process.nextTick = nextTick;
		return fn();
	} finally {
		if (globalThis.setTimeout = currentSetTimeout, globalThis.clearTimeout = currentClearTimeout, globalThis.setImmediate = currentSetImmediate, globalThis.clearImmediate = currentClearImmediate, globalThis.process && nextTick) nextTick(() => {
			globalThis.process.nextTick = currentNextTick;
		});
	}
}
const promises = /* @__PURE__ */ new Set();
async function rpcDone() {
	if (!promises.size) return;
	const awaitable = Array.from(promises);
	return Promise.all(awaitable);
}
let previousRpc;
function createRuntimeRpc(options) {
	if (previousRpc) previousRpc.$close(), previousRpc = void 0;
	let setCancel = (_reason) => {};
	const onCancel = new Promise((resolve) => {
		setCancel = resolve;
	}), rpc = createSafeRpc(createBirpc({ onCancel: setCancel }, {
		eventNames: [
			"onUserConsoleLog",
			"onCollected",
			"onCancel"
		],
		timeout: -1,
		...options
	}));
	return previousRpc = rpc, {
		rpc,
		onCancel
	};
}
function createSafeRpc(rpc) {
	return new Proxy(rpc, { get(target, p, handler) {
		// keep $rejectPendingCalls as sync function
		if (p === "$rejectPendingCalls") return rpc.$rejectPendingCalls;
		const sendCall = get(target, p, handler), safeSendCall = (...args) => withSafeTimers(async () => {
			const result = sendCall(...args);
			promises.add(result);
			try {
				return await result;
			} finally {
				promises.delete(result);
			}
		});
		return safeSendCall.asEvent = sendCall.asEvent, safeSendCall;
	} });
}
function rpc() {
	const { rpc } = getWorkerState();
	return rpc;
}

export { rpcDone as a, createRuntimeRpc as c, rpc as r };
