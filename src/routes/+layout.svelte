<script lang="ts">
	import "../app.css"
	import "carbon-components-svelte/css/white.css"
	import { ContentSwitcher, Switch } from "carbon-components-svelte"
</script>

<div class="p-4">
	<ContentSwitcher>
		<Switch text="Dashboard" />
		<Switch text="Settings" />
	</ContentSwitcher>
	<div class="py-4">
		<slot />
	</div>
</div>
