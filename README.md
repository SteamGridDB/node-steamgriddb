# SteamGridDB API
[![npm](https://img.shields.io/npm/v/steamgriddb.svg?color=%23CB3837&logo=npm&style=for-the-badge)](https://www.npmjs.com/package/steamgriddb)
[![license](https://img.shields.io/npm/l/steamgriddb.svg?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGFyaWEtaGlkZGVuPSJ0cnVlIiB2aWV3Qm94PSIwIDAgMTQgMTYiPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik03IDRhMS41IDEuNSAwIDEgMSAwLTMgMS41IDEuNSAwIDAgMSAwIDN6bTcgNmEyIDIgMCAwIDEtMiAyaC0xYTIgMiAwIDAgMS0yLTJsMi00aC0xYTEgMSAwIDAgMS0xLTFIOHY4Yy40MiAwIDEgLjQ1IDEgMWgxYy40MiAwIDEgLjQ1IDEgMUgzYzAtLjU1LjU4LTEgMS0xaDFjMC0uNTUuNTgtMSAxLTFoLjAzTDYgNUg1YTEgMSAwIDAgMS0xIDFIM2wyIDRhMiAyIDAgMCAxLTIgMkgyYTIgMiAwIDAgMS0yLTJsMi00SDFWNWgzYTEgMSAwIDAgMSAxLTFoNGExIDEgMCAwIDEgMSAxaDN2MWgtMWwyIDR6TTIuNSA3TDEgMTBoM0wyLjUgN3pNMTMgMTBsLTEuNS0zLTEuNSAzaDN6Ii8+PC9zdmc+)](/LICENSE.md)
[![license](https://img.shields.io/discord/488621078302949377.svg?color=%237289DA&label=Discord&logo=discord&logoColor=%238ea7ff&style=for-the-badge)](https://discord.gg/2jYnUej)  

## Installation
```bash
npm install steamgriddb
```

## Getting Started
#### Get your API key
[You can generate an API key on the preferences page.](https://www.steamgriddb.com/profile/preferences)

#### Require the library into your project.
```ts
import SGDB from "steamgriddb";
```

#### Pass your API key into the constructor:
```ts
const client = new SGDB('your_api_key');
```

Optionally, you can pass an object with some settings:
```ts
const client = new SGDB({
    key: 'your_api_key',
    headers: {
        'X-Some-Header': 'Some Value',
    },
    baseURL: 'https://www.steamgriddb.com/api/v2'
});
```

## Usage
Although these code examples use [await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await),
SteamGridDB can also be used with `.then()` and `.catch()`.

<details>
    <summary>Example</summary>

```js
    client.getGrids({type: 'game', id: 2254})
        .then((grids) => {
            console.log(grids);
        })
        .catch((error) => {
            console.error(error);
        });
```
</details>

### Search for a game:
```ts
const games = await client.searchGame('Half-Life 2');
```

<details>
    <summary>Output</summary>

```json
[
  {
    "id": 2254,
    "name": "Half-Life 2",
    "types": [
      "steam"
    ],
    "verified": true
  },
  {
    "id": 21207,
    "name": "Half-Life",
    "types": [
      "steam"
    ],
    "verified": true
  },
  {
    "id": 1417,
    "name": "Half-Life: Blue Shift",
    "types": [
      "steam"
    ],
    "verified": true
  },
  {
    "id": 3868,
    "name": "Half-Life: Source",
    "types": [
      "steam"
    ],
    "verified": true
  }
]
```
</details>

### Get grids By Game ID
```ts
// 2254 = Game ID we got from searchGame()
const grids = await client.getGrids({type: 'game', id: 2254}); 
```

```ts
// 2254 = Game ID we got from searchGame()
const grids = await client.getGridsById(2254);
```

### Get grids by Steam App ID
```ts
// Get grid by Steam App Id
// 220 = https://store.steampowered.com/app/220/HalfLife_2/
const grids = await client.getGrids({type: 'steam', id: 220});
```

```ts
// 220 = https://store.steampowered.com/app/220/HalfLife_2/
const grids = await client.getGridsBySteamAppId(220);
```

### Filter styles:
```ts
const grids = await client.getGrids({type: 'game', id: 2590, styles: ['material','blurred']});
```

```ts
client.getGridsBySteamAppId(220, ['material','blurred'])
```

<details>
    <summary>Output</summary>

```json
[
  {
    "id": 80,
    "score": 1,
    "style": "blurred",
    "url": "https://s3.amazonaws.com/steamgriddb/grid/f033ab37c30201f73f142449d037028d.png",
    "thumb": "https://s3.amazonaws.com/steamgriddb/thumb/f033ab37c30201f73f142449d037028d.png",
    "tags": [],
    "author": {
      "name": "EpicWolverine",
      "steam64": "76561198025674497",
      "avatar": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/76/764911aeb96ae312c2819780f4107396d3b5ac38.jpg"
    }
  },
  {
    "id": 120,
    "score": 1,
    "style": "blurred",
    "url": "https://s3.amazonaws.com/steamgriddb/grid/da4fb5c6e93e74d3df8527599fa62642.png",
    "thumb": "https://s3.amazonaws.com/steamgriddb/thumb/da4fb5c6e93e74d3df8527599fa62642.png",
    "tags": [],
    "author": {
      "name": "Tiederian",
      "steam64": "76561197997534033",
      "avatar": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/bc/bc893073b7e2e60ad412c6fd2af39d3204a5f26a.jpg"
    }
  }
]
```
</details>

### Delete grids:
```ts
// Delete a grid
const success = await client.deleteGrids(80);
```

```ts
// Delete multiple grids
const success = client.deleteGrids([80,81,82,83]);
```

#### Handling errors:
SteamGridDB throws an [AxiosError](https://axios-http.com/docs/handling_errors) when an error occurs, with the message 
altered to contain the message returned from SteamGridDB. All methods and properties available in an AxiosError
are available, such as `error.request` and `error.response`.

```ts
// Get grids for a game that doesn't exist
let grids;

try {
    grids = await SGDB.getGrids({dimensions: ["460x215", "920x430"], ...{type, id: 0}});
} catch (error) {
    console.log(error.message); // "Game not found."
    console.log(err.response.status); // 404
};
```

```ts
// Try to delete a grid you don't own
try {
    await client.deleteGrids(34312);
} catch (error) {
    console.log(error.message); // "This grid isn't yours."
    console.log(err.response.status); // 403
}
```
