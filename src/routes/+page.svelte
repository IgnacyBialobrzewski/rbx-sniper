<script lang="ts">
	import {
		DataTable,
		Toolbar,
		ToolbarContent,
		ToolbarSearch,
		ComposedModal,
		Button,
		NumberInput,
		ModalHeader,
		ModalBody,
		ModalFooter
	} from "carbon-components-svelte"

	let modalOpen: boolean
	let inputItemId: number
	let inputProfitPercentage: number

	function onCreateMonitor(itemId: number, profitPercentage: number) {
		modalOpen = false
	}
</script>

<DataTable
	title="Dashboard"
	description="Here you can view limiteds you are currently monitoring"
	headers={[
		{ key: "name", value: "Name" },
		{ key: "protocol", value: "Protocol" },
		{ key: "port", value: "Port" },
		{ key: "rule", value: "Rule" }
	]}
	rows={[
		{
			id: "a",
			name: "Load Balancer 3",
			protocol: "HTTP",
			port: 3000,
			rule: "Round robin"
		}
	]}
>
	<Toolbar>
		<ToolbarContent>
			<ToolbarSearch shouldFilterRows persistent />
			<Button on:click={() => (modalOpen = true)}>Create monitor</Button>
		</ToolbarContent>
	</Toolbar>
</DataTable>
<ComposedModal
	bind:open={modalOpen}
	on:submit={() => onCreateMonitor(inputItemId, inputProfitPercentage)}
>
	<ModalHeader label="New monitor" title="Create monitor" />
	<ModalBody hasForm>
		<NumberInput label="Item ID" bind:value={inputItemId} />
		<NumberInput label="Profit percentage" bind:value={inputProfitPercentage} />
	</ModalBody>
	<ModalFooter
		primaryButtonText="Create"
		primaryButtonDisabled={inputItemId && inputProfitPercentage ? false : true}
	/>
</ComposedModal>
