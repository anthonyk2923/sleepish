<script>
	import TimeClock from './TimeClock.svelte';
	let { chatInput, maxChars, token, tick, scrollToBottom, time, selfData } = $props();
	const checkEnterSubmit = async (event) => {
		if (event.keyCode == 13) {
			event.preventDefault();
			if (chatInput.length > maxChars || chatInput.trim() === '') {
				return;
			} else {
				const body = chatInput;
				await sendMessage(token, body);
				await tick();
				chatInput = '';
			}
		}
	};

	const sendMessage = async (token, body) => {
		try {
			const res = await fetch('/api/message/send', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
					Authorization: `bearer ${token}`
				},
				body: JSON.stringify({
					body: body
				})
			});

			scrollToBottom();
		} catch (error) {
			console.error(error);
		}
	};
</script>

<div class="m-2 w-1/4 bg-stone-950">
	<div class="relative">
		<textarea
			class="h-48 w-full resize-none rounded p-4 text-gray-700 outline-none"
			type="text"
			onkeydown={checkEnterSubmit}
			bind:value={chatInput}
		></textarea>

		<span
			class="absolute bottom-2 right-4 text-sm {chatInput.length > maxChars
				? 'text-red-500'
				: 'text-gray-500'}"
		>
			{chatInput.length} / {maxChars}
		</span>
	</div>

	<button
		onclick={async () => {
			await sendMessage(token, chatInput);
			chatInput = '';
			await tick();
		}}
		class="mt-1 w-full rounded px-4 py-2 text-white {chatInput.length > maxChars ||
		chatInput.trim() === ''
			? 'cursor-not-allowed bg-gray-400'
			: 'bg-blue-500 hover:bg-blue-600'}"
		disabled={chatInput.length > maxChars || chatInput.trim() === ''}
	>
		Send
	</button>
	{#if time}
		<TimeClock {time} {selfData} />
	{/if}
</div>
