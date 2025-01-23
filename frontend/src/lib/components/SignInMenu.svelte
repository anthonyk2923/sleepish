<script>
	let { handleSignIn, login, password, isSubmitting } = $props();
</script>

<div
	class="mx-auto flex w-full max-w-md flex-col items-center justify-center rounded-lg bg-gray-900 p-6 text-white shadow-lg"
>
	<h2 class="mb-4 text-2xl font-semibold">Sign In</h2>

	<form onsubmit={() => handleSignIn(login, password)}>
		<div class="mb-4">
			<label for="login" class="mb-2 block text-lg">Email or Username</label>
			<input
				type="text"
				id="login"
				class="w-full rounded bg-gray-800 p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
				placeholder="Enter your email or username"
				bind:value={login}
				required
			/>
		</div>

		<div class="mb-4">
			<label for="password" class="mb-2 block text-lg">Password</label>
			<input
				type="password"
				id="password"
				class="w-full rounded bg-gray-800 p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
				placeholder="Enter your password"
				bind:value={password}
				required
			/>
		</div>

		<button
			type="submit"
			class="w-full rounded bg-blue-500 p-3 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
			disabled={isSubmitting}
		>
			Sign In
		</button>
	</form>
</div>
<hr class="mx-auto my-4 w-1/2 border-t-2 border-gray-400" />
