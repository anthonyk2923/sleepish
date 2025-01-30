<script>
	let { messages, selfData, stringToColor, range, time } = $props();
	const convertTime = (Intime, curTime) => {
		const inDate = new Date(Intime);
		const timeDifference = curTime - inDate;
		const within24Hours = timeDifference < 24 * 60 * 60 * 1000;

		const options = {
			hour: '2-digit',
			minute: '2-digit',
			hour12: true
		};

		// If within 24 hours, show only time
		if (within24Hours) {
			return inDate.toLocaleTimeString('en-US', options);
		} else {
			// Otherwise, show date and time
			const dateString = inDate.toLocaleDateString('en-US');
			const timeString = inDate.toLocaleTimeString('en-US', options);
			return `${dateString} ${timeString}`;
		}
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
				<span class="text-sm font-normal text-gray-900">{convertTime(message.time, time)}</span>
			</p>
			<p class="break-words text-sm">{message.body}</p>
		</div>
	</div>
{/each}
