import type { RequestHandler } from "@sveltejs/kit"
import { error, text } from "@sveltejs/kit"

export const GET: RequestHandler = async ({ fetch, url }) => {
	const oldPrice = url.searchParams.get("oldPrice")
	const newPrice = url.searchParams.get("newPrice")
	const itemId = url.searchParams.get("itemId")
	const itemName = url.searchParams.get("itemName")
	const profitPercentage = url.searchParams.get("profitPercentage")

	if (oldPrice && newPrice && profitPercentage && itemId && itemId) {
		const profit =
			parseFloat(oldPrice) * 0.7 -
			(parseFloat(newPrice) + parseFloat(newPrice) * parseFloat(profitPercentage))

		if (profit > 0) {
			const response = await fetch(
				"https://discord.com/api/webhooks/1108131792529137695/9SwHoSxIDS8J59VqeEMf2mtmPOsoIwI86cU90FosjRiZ7-4hoIsVivRzO3WHRRcwBmnL",
				{
					method: "POST",
					headers: {
						"content-type": "application/json"
					},
					body: JSON.stringify({
						content: null,
						embeds: [
							{
								title: itemName,
								url: `https://www.roblox.com/catalog/${itemId}`,
								color: null,
								fields: [
									{
										name: "New",
										value: `${newPrice} R$`
									},
									{
										name: "Old",
										value: `${oldPrice} R$`
									},
									{
										name: "Profit",
										value: `${profit} R$`
									},
									{
										name: "Profit Margin",
										value: `${profitPercentage}%`
									}
								]
							}
						],
						attachments: []
					})
				}
			)

			if (response.ok) {
				return text("ok")
			} else {
				throw error(response.status, response.statusText)
			}
		}
	}

	throw error(400, "one of the parameters is missing")
}
