<script>
	let { messages, selfData, stringToColor, range } = $props();

	const convertTime = (Intime) => {
		const time = new Date(Intime);
		return time.toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: true
		});
	};
</script>

{#each messages as message}
	<div class="mb-2 flex justify-start">
		<div
			style={'background-color: ' + stringToColor(message.username, range)}
			class={`rounded p-2 ${
				message.fromUserId == selfData?.user._id ? 'ml-auto w-1/2 min-w-96' : 'w-1/2'
			}`}
			role="alert"
		>
			<p class="flex items-center justify-between font-bold">
				<span>{message.username}</span>
				<span class="text-sm font-normal text-gray-900">{convertTime(message.time)}</span>
			</p>
			<p class="break-words text-sm">{message.body}</p>
		</div>
	</div>
{/each}
