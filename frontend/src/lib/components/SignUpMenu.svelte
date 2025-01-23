<script>
	let { handlesignup, email, username, password, isSubmitting } = $props();
</script>

<div
	class="mx-auto flex w-full max-w-md flex-col items-center justify-center rounded-lg bg-gray-900 p-6 text-white shadow-lg"
>
	<h2 class="mb-4 text-2xl font-semibold">Sign Up</h2>

	<form onsubmit={handlesignup(email, username, password)}>
		<div class="mb-4">
			<label for="email" class="mb-2 block text-lg">Email</label>
			<input
				type="email"
				id="email"
				class="w-full rounded bg-gray-800 p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
				placeholder="Enter your email"
				bind:value={email}
				required
			/>
		</div>

		<div class="mb-4">
			<label for="username" class="mb-2 block text-lg">Username</label>
			<input
				type="text"
				id="username"
				class="w-full rounded bg-gray-800 p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
				placeholder="Choose a username"
				bind:value={username}
				required
			/>
		</div>

		<div class="mb-4">
			<label for="password" class="mb-2 block text-lg">Password</label>
			<input
				type="password"
				id="password"
				class="w-full rounded bg-gray-800 p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
				placeholder="Create a password"
				bind:value={password}
				required
			/>
		</div>

		<button
			type="submit"
			class="w-full rounded bg-green-500 p-3 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
			disabled={isSubmitting}
		>
			Sign Up
		</button>
	</form>
</div>
<hr class="mx-auto my-4 w-1/2 border-t-2 border-gray-400" />
