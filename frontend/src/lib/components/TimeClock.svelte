<script>
	let { time, selfData } = $props();
	const curfew = [selfData?.app.curfewStart, selfData?.app.curfewEnd];
	const timeStartLeft = $derived(curfew[0] - time.getHours());
	const timeEndLeft = $derived(curfew[1] - time.getHours());
	const isWithinCurfew = $derived(time.getHours() >= curfew[0] && time.getHours() <= curfew[1]);
	const isBypassCurfew = selfData?.app.curfewBypass == 'true';
</script>

<div class={isBypassCurfew || isWithinCurfew ? 'text-blue-500' : 'text-red-500'}>
	<h1>{time.getHours()}:{time.getMinutes()}:{time.getSeconds()}</h1>
	<h1>{timeStartLeft}</h1>
	<h1>{timeEndLeft}</h1>
	<h1>{isWithinCurfew}</h1>
	<h1>{isBypassCurfew}</h1>
</div>
