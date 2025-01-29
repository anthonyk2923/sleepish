<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let time;
	export let selfData;

	// Curfew and bypass logic
	const curfew = [selfData?.app?.curfewStart || 0, selfData?.app?.curfewEnd || 24];
	let timeStartLeft = curfew[0] - time.getHours();
	let timeEndLeft = curfew[1] - time.getHours();
	let isWithinCurfew = time.getHours() >= curfew[0] && time.getHours() <= curfew[1];
	let isBypassCurfew = selfData?.app?.curfewBypass === 'true';
	let isDisabled = isBypassCurfew || isWithinCurfew;
</script>

<div class="text-white">
	<h1>{time.getHours()}:{time.getMinutes()}:{time.getSeconds()}</h1>
	<h1>Time Start Left: {timeStartLeft}</h1>
	<h1>Time End Left: {timeEndLeft}</h1>
	<h1>Is Within Curfew: {isWithinCurfew}</h1>
	<h1>Is Bypass Curfew: {isBypassCurfew}</h1>
</div>
