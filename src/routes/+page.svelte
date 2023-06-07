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
		ModalFooter,
		Loading
	} from "carbon-components-svelte"
	import { onMount } from "svelte"

	interface Row {
		id: number
		itemName: string
		itemId: number
		productId: number
		profitPercentage: number
	}

	interface Seller {
		userAssetId: number
		seller: {
			hasVerifiedBadge: boolean
			id: number
			type: string
			name: string
		}
		price: number
		serialNumber: undefined
	}

	let selectedRowIds: Array<number> = []
	let rows: Array<Row> = []
	let loadingActive: boolean = false
	let modalOpen: boolean
	let inputItemId: number
	let inputProfitPercentage: number

	function clearSelectedRowIds() {
		rows = rows.filter((v) => selectedRowIds.indexOf(v.id) === -1)
		selectedRowIds = []
	}

	async function createMonitor(itemId: number, profitPercentage: number) {
		modalOpen = false
		loadingActive = true

		const response = await fetch("/api/roblox/catalog/items/details", {
			method: "POST",
			body: JSON.stringify({
				items: [
					{
						itemType: 1,
						id: itemId
					}
				]
			})
		})

		if (response.ok) {
			const responseJson = await response.json()

			if (responseJson.data[0]) {
				const itemData = responseJson.data[0]

				rows = [
					{
						id: itemId,
						itemName: itemData.name,
						productId: itemData.productId,
						itemId,
						profitPercentage
					},
					...rows
				]
			}
		}

		loadingActive = false
	}

	onMount(() => {
		async function calculateItemPrices() {
			rows.forEach(async (v) => {
				const response = await fetch(`/api/roblox/economy/assets/${v.itemId}/resellers`)

				if (response.ok) {
					const responseJson = await response.json()
					const responseData: Array<Seller> = responseJson.data
					const oldPrice = responseData[1].price
					const newPrice = responseData[0].price
					const profit = oldPrice * 0.7 - (newPrice + newPrice * v.profitPercentage)

					if (profit > 0) {
						const purchaseResponse = await fetch(
							`/api/roblox/economy/purchases/products/${v.productId}`,
							{
								method: "POST",
								body: JSON.stringify({
									expectedCurrency: 1,
									expectedPrice: responseData[0].price,
									expectedSeller: responseData[0].seller
								})
							}
						)

						if (purchaseResponse.ok) {
							const purchaseData = await purchaseResponse.json()

							if (purchaseData.purchased) {
								fetch(
									`/api/internal/notify?itemId=${v.itemId}&itemName=${v.itemName}&oldPrice=${responseData[1].price}&newPrice=${responseData[0].price}&profitPercentage=${v.profitPercentage}`
								)
							}
						}
					}
				}
			})
		}

		setInterval(calculateItemPrices, 8000)
	})
</script>

<Loading active={loadingActive} />
<DataTable
	bind:selectedRowIds
	selectable
	title="Dashboard"
	description="Here you can view limiteds you are currently monitoring"
	headers={[
		{ key: "itemName", value: "Item Name" },
		{ key: "itemId", value: "Item ID" },
		{ key: "productId", value: "Product ID" }
	]}
	{rows}
>
	<Toolbar>
		<ToolbarContent>
			<ToolbarSearch shouldFilterRows persistent />
			<Button on:click={() => (modalOpen = true)}>Create monitor</Button>
			<Button on:click={clearSelectedRowIds} kind="secondary">Delete selected</Button>
			<Button on:click={() => (rows = [])} kind="danger">Delete all</Button>
		</ToolbarContent>
	</Toolbar>
</DataTable>
<ComposedModal
	bind:open={modalOpen}
	on:submit={() => createMonitor(inputItemId, inputProfitPercentage)}
>
	<ModalHeader label="New monitor" title="Create monitor" />
	<ModalBody hasForm>
		<NumberInput label="Item ID" bind:value={inputItemId} />
		<NumberInput label="Profit percentage" allowEmpty bind:value={inputProfitPercentage} />
	</ModalBody>
	<ModalFooter
		primaryButtonText="Create"
		primaryButtonDisabled={inputItemId && inputProfitPercentage ? false : true}
	/>
</ComposedModal>
