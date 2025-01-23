<script>
	import { onMount, onDestroy, tick } from 'svelte';
	import { io } from 'socket.io-client';

	import SendNavBar from '$lib/components/SendNavBar.svelte';
	import ActionMenu from '$lib/components/ActionMenu.svelte';
	import SignOutButton from '$lib/components/SignOutButton.svelte';
	import ConNavBar from '$lib/components/ConNavBar.svelte';
	import ChatContainer from '$lib/components/ChatContainer.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import { walk } from 'svelte/compiler';

	let data;
	let token;
	let messages = [];
	let chatInput = '';
	let maxChars = 400;
	let range = { r: [65, 255], g: [65, 255], b: [65, 255] };
	let selfData;
	let page = 0;
	let chunk = 25;
	let chatContainer;
	let isLoading = false;
	let totalPages = 0;
	let curLocationChatContainer;
	let socket;
	let conUsers;
	let signInMenu = false;
	let signUpMenu = false;
	let login = '';
	let password = '';
	let email = '';
	let username = '';
	let isSubmitting = false;
	let time;
	let appSettings;

	const handleSignIn = async (login, password) => {
		await logIn({
			login: login,
			password: password
		});
		await tick();
	};

	const handlesignup = async (email, username, password) => {
		await signUp({
			email: email,
			password: password,
			username: username
		});
		await tick();
		await logIn({
			login: username,
			password: password
		});
	};

	const signUp = async (signUpData) => {
		try {
			const res = await fetch('/api/user/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(signUpData)
			});
			data = await res.json();
		} catch (error) {
			console.error(error.message);
		}
	};

	const logIn = async (signUpData) => {
		try {
			const res = await fetch('/api/user/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(signUpData)
			});
			data = await res.json();
			token = data.token;
			await getSelf(token);
			await getMessages(token);
			socket = await socketConnect(token);
			setupSocketListeners();
		} catch (error) {
			console.error(error.message);
		}
	};

	const logOut = () => {
		data = '';
		token = '';
		messages = [];
		chatInput = '';
		selfData = [];
		page = 0;
		isLoading = false;
		totalPages = 0;
		curLocationChatContainer = 0;
		if (socket) {
			socket.disconnect();
			socket = null;
		}
	};

	const getSelf = async (token) => {
		try {
			const res = await fetch('/api/user/self', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `bearer ${token}`
				}
			});
			selfData = await res.json();
		} catch (error) {
			console.error(error);
		}
	};

	const getMessages = async (token) => {
		try {
			isLoading = true;
			const res = await fetch(`/api/message?page=${page}&chunk=${chunk}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `bearer ${token}`
				}
			});
			const newMessages = await res.json();
			const newMessageData = newMessages.messages;
			totalPages = newMessages.totalPages;
			messages = [...newMessageData, ...messages];
			await tick();
			scrollToBottom();
		} catch (error) {
			console.error(error.message);
		} finally {
			isLoading = false;
		}
	};
	const socketConnect = (token) => {
		if (!token) {
			console.log('No token provided');
		} else {
			const socket = io('http://localhost:8080', {
				query: { token: token }
			});
			return socket;
		}
	};

	const setupSocketListeners = () => {
		if (socket) {
			socket.on('newMessage', async (message) => {
				messages = [...messages, message];
				await tick();
			});

			socket.on('newUsers', async (message) => {
				conUsers = message;
				await tick();
			});
			socket.on('setTime', async (message) => {
				time = new Date(message.time);
				//timeCount();
			});
			socket.on('newTime', async (message) => {
				if (message.time != 'e') {
					time = new Date(message.time);
				} else {
					console.log('ee');
				}
			});
		}
	};
	const scrollToBottom = () => {
		if (chatContainer) {
			chatContainer.scrollTop = chatContainer.scrollHeight;
		}
	};

	const scrollTo = (y) => {
		if (chatContainer) {
			chatContainer.scrollTop = y;
		}
	};

	const handleScroll = async () => {
		curLocationChatContainer = chatContainer.clientHeight;
		if (chatContainer.scrollTop === 0) {
			if (page + 1 < totalPages) {
				page += 1;
				await getMessages(token);
				scrollTo(curLocationChatContainer);
			}
		}
	};

	function stringToColor(username, range) {
		let hash = 0;
		for (let i = 0; i < username.length; i++) {
			hash = username.charCodeAt(i) + ((hash << 5) - hash);
		}

		const r = (Math.abs(hash) % (range.r[1] - range.r[0] + 1)) + range.r[0];
		const g = Math.abs((hash >> 8) % (range.g[1] - range.g[0] + 1)) + range.g[0];
		const b = Math.abs((hash >> 16) % (range.b[1] - range.b[0] + 1)) + range.b[0];

		const color = `rgb(${r}, ${g}, ${b})`;

		return color;
	}
	onDestroy(() => {
		if (socket) {
			socket.off('newMessage');
			socket.off('newUsers');
			socket.off('time');
		}
	});
</script>

{#if token}
	<div class="flex h-screen">
		<ConNavBar {conUsers} />
		<div
			class="ml-auto mr-2 w-4/5 flex-1 overflow-y-auto overflow-x-hidden"
			bind:this={chatContainer}
			on:scroll={handleScroll}
		>
			{#if isLoading}<Loading />{/if}
			<ChatContainer {messages} {selfData} {stringToColor} {range} />
		</div>
		<SendNavBar {chatInput} {maxChars} {token} {tick} {scrollToBottom} {time} {selfData} />
		<SignOutButton {logOut} />
	</div>
{:else}
	<ActionMenu
		{signInMenu}
		{signUpMenu}
		{handleSignIn}
		{handlesignup}
		{login}
		{email}
		{username}
		{password}
		{isSubmitting}
	/>
{/if}

<style lang="postcss">
	:global(body) {
		@apply bg-zinc-950;
	}
</style>
