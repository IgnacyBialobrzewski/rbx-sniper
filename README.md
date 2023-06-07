# rbx-sniper

An item sniper for the game Roblox that's meant to buy item's at a cheap price.

### How it works

This website works by utilizing Roblox's API in order to fetch information about the state of items such as the price, owner, amount listed, etc.

You can add an item monitor by clicking "Add monitor" button and pasting it in the correct field, you can also set your minimum profit percentage.

The profit is calculated using the following equation

```
profit = x * 0.7 - (y + y * p)
```

where

```
x = old price
y = new price
p = profit percentage
```

### How to set it up

You can run this item sniper locally by using these commands

```bash
npm clone https://github.com/IgnacyBialobrzewski/rbx-sniper
npm install
```

Now create `.env` file and paste the following code

```lua
VITE_COOKIE="REPLACE THIS WITH .ROBLOSECURITY COOKIE"
```

Finally you can run the sniper

```bash
npm run dev
```

To create a production version you can use the following command

```bash
npm run build
```

## Credits

- `Ignacy Białobrzewski`
- `Szymon Lenard`
- `Tomasz Leśniewski`
- `Dariusz Ferdyniak`
