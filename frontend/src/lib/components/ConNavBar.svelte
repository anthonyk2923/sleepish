<script>
	let { conUsers } = $props();
</script>

<div class="s-full mr-4 w-1/5 overflow-y-scroll bg-stone-950 text-white">
	<h1 class="ml-4 text-2xl font-bold">Connected Users</h1>
	{#each conUsers as user}
		{console.log(user)}
		<li class="mb-2 ml-6 flex items-center text-lg">
			{#if user.role == 'GOD'}
				<img class="mr-2 inline-block h-5 w-5" src="./god.svg" alt="" />
				<span class="font-bold text-amber-400">{user.username}</span>
			{:else if user.role == 'VIP'}
				<img class="mr-2 inline-block h-5 w-5" src="./crown.svg" alt="" />
				<span class="font-bold text-green-400">{user.username}</span>
			{:else}
				<span class="font-bold">{user.username}</span>
			{/if}
		</li>
	{/each}
</div>
