<script lang="ts">
	import "../app.css"
	import "carbon-components-svelte/css/white.css"
	import { ContentSwitcher, Switch } from "carbon-components-svelte"
	import { onMount } from "svelte"

	onMount(() => {
		async function updateToken() {
			const response = await fetch("/api/internal/token")

			if (response.ok) {
				document.cookie = `token=${await response.text()}`
			} else {
				console.error("Failed to update token")
			}
		}

		updateToken()
		setInterval(updateToken, 30000)
	})
</script>

<div class="p-4">
	<ContentSwitcher>
		<Switch text="Dashboard" />
	</ContentSwitcher>
	<div class="py-4">
		<slot />
	</div>
</div>
