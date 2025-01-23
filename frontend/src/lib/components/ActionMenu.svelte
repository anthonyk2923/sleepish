<script>
	import SignInMenu from './SignInMenu.svelte';
	import SignUpMenu from './SignUpMenu.svelte';
	let {
		signInMenu,
		signUpMenu,
		handleSignIn,
		handlesignup,
		login,
		email,
		username,
		password,
		isSubmitting
	} = $props();
</script>

<div class="flex flex-col items-center rounded-lg p-8 text-white shadow-lg">
	<h1 class="mb-4 text-center text-4xl font-extrabold text-yellow-200">Can't Sleep?</h1>
	<span class="mb-8 text-2xl font-semibold text-yellow-300">Nor can we</span>
	<div class="grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
		<!-- Option 1: Login -->
		<div
			class="flex transform flex-col items-center rounded-lg bg-gray-900 p-6 shadow-lg transition-transform hover:scale-105 hover:bg-gray-800"
			onclick={() => {
				signInMenu = !signInMenu;
				signUpMenu = false;
			}}
			aria-label="signIn menu"
			role="button"
			onkeydown={() => ''}
			tabindex="-1"
		>
			<h2 class="mb-4 text-2xl font-semibold text-teal-400">Option 1</h2>
			<p class="text-lg text-white">Login</p>
		</div>

		<!-- Option 2: Sign Up -->
		<div
			class="flex transform flex-col items-center rounded-lg bg-gray-900 p-6 shadow-lg transition-transform hover:scale-105 hover:bg-gray-800"
			onclick={() => {
				signUpMenu = !signUpMenu;
				signInMenu = false;
			}}
			aria-label="signIn menu"
			role="button"
			onkeydown={''}
			tabindex="-1"
		>
			<h2 class="mb-4 text-2xl font-semibold text-teal-400">Option 2</h2>
			<p class="text-lg text-white">Sign Up</p>
		</div>

		<!-- Option 3: Go Back to Sleep -->
		<div
			class="pointer-events-none relative flex transform flex-col items-center rounded-lg bg-gray-900 p-6 shadow-lg transition-transform hover:scale-105 hover:bg-gray-800"
		>
			<div class="absolute inset-0 flex items-center justify-center">
				<span class="text-9xl font-bold text-red-600">X</span>
			</div>
			<h2 class="mb-4 text-2xl font-semibold text-teal-400 opacity-50">Option 3</h2>
			<p class="text-lg text-white opacity-50">Go Back to Sleep</p>
		</div>
	</div>
</div>

{#if signInMenu}
	<SignInMenu {handleSignIn} {login} {password} {isSubmitting} />
{:else if signUpMenu}
	<SignUpMenu {handlesignup} {email} {username} {password} {isSubmitting} />
{/if}
