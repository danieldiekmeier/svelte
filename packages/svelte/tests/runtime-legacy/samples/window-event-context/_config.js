import { flushSync } from 'svelte';
import { test } from '../../test';

export default test({
	get props() {
		return { foo: true };
	},

	html: 'true',

	skip: /^v4/.test(process.version), // node 4 apparently does some weird stuff

	async test({ assert, component, target, window }) {
		const event = new window.Event('click');

		window.dispatchEvent(event);
		flushSync();
		assert.equal(component.foo, false);
		assert.htmlEqual(target.innerHTML, 'false');

		window.dispatchEvent(event);
		flushSync();
		assert.equal(component.foo, true);
		assert.htmlEqual(target.innerHTML, 'true');
	}
});
