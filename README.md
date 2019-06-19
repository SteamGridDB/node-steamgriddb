# SteamGridDB for Node.js
[![npm](https://img.shields.io/npm/v/steamgriddb.svg?color=%23CB3837&logo=npm&style=for-the-badge)](https://www.npmjs.com/package/steamgriddb)
[![license](https://img.shields.io/npm/l/steamgriddb.svg?style=for-the-badge&logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGFyaWEtaGlkZGVuPSJ0cnVlIiB2aWV3Qm94PSIwIDAgMTQgMTYiPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik03IDRhMS41IDEuNSAwIDEgMSAwLTMgMS41IDEuNSAwIDAgMSAwIDN6bTcgNmEyIDIgMCAwIDEtMiAyaC0xYTIgMiAwIDAgMS0yLTJsMi00aC0xYTEgMSAwIDAgMS0xLTFIOHY4Yy40MiAwIDEgLjQ1IDEgMWgxYy40MiAwIDEgLjQ1IDEgMUgzYzAtLjU1LjU4LTEgMS0xaDFjMC0uNTUuNTgtMSAxLTFoLjAzTDYgNUg1YTEgMSAwIDAgMS0xIDFIM2wyIDRhMiAyIDAgMCAxLTIgMkgyYTIgMiAwIDAgMS0yLTJsMi00SDFWNWgzYTEgMSAwIDAgMSAxLTFoNGExIDEgMCAwIDEgMSAxaDN2MWgtMWwyIDR6TTIuNSA3TDEgMTBoM0wyLjUgN3pNMTMgMTBsLTEuNS0zLTEuNSAzaDN6Ii8+PC9zdmc+)](/LICENSE.md)
[![license](https://img.shields.io/discord/488621078302949377.svg?color=%237289DA&label=Discord&logo=discord&logoColor=%238ea7ff&style=for-the-badge)](https://discord.gg/2jYnUej)  
A Node.js wrapper for the SteamGridDB API.

### Installation

```bash
npm install steamgriddb
```

## Getting Started
#### Get your API key
[You can generate an API key on the preferences page.](https://www.steamgriddb.com/profile/preferences)

#### Require the library into your project.
```js
const SGDB = require('steamgriddb');
```

#### Pass your API key into the constructor:
```js
const client = new SGDB('your_api_key');
```

Optionally, you can pass an object with some settings:
```js
const client = new SGDB({
  key: 'your_api_key',
  // Array of headers to send with each request
  headers: {
    'X-Some-Header': 'Some Value',
  },
  baseURL: 'https://www.steamgriddb.com/api/v2'
});
```

#### Search for a game:
```js
client.searchGame('Half-Life 2')
    .then((output) => {
        console.log(output);
    })
    .catch((err) => {
        console.log(err);
    });
```

That outputs:
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

#### Get some grids:
```js
// Get grids by game ID
client.getGrids({type: 'game', id: 2254}) // 2254 = Game ID we got from searchGame()
    .then((output) => {
        console.log(output);
    })
    .catch((err) => {
        console.log(err);
    });
    
// Get grid by Steam App Id
client.getGrids({type: 'steam', id: 220}) // 220 = https://store.steampowered.com/app/220/HalfLife_2/
    .then((output) => {
        console.log(output);
    })
    .catch((err) => {
        console.log(err);
    });
    
// Alternatively, you can do it like this:
client.getGridsById(2254)
    .then((output) => {
        console.log(output);
    })
    .catch((err) => {
        console.log(err);
    });
    
client.getGridsBySteamAppId(220)
    .then((output) => {
        console.log(output);
    })
    .catch((err) => {
        console.log(err);
    });
```

#### Filter the styles:
```js
client.getGrids({type: 'game', id: 2590, styles: ['material','blurred']})
    .then((output) => {
        console.log(output);
    })
    .catch((err) => {
        console.log(err);
    });

// And if you like to do things the other way:
client.getGridsBySteamAppId(220, ['material','blurred'])
    .then((output) => {
        console.log(output);
    })
    .catch((err) => {
        console.log(err);
    });
```

The getGrid*() methods give us an output like this:
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
#### Do something with the grid output:
```js
const SGDB = require('steamgriddb');
const request = require('request');
const fs = require('fs');

const client = new SGDB('my_api_key');
client.getGridsBySteamAppId(220, ['blurred'])
    .then((output) => {
        // Save each Blurred Half-Life 2 grid to disk
        output.forEach((grid) => {
            request(grid.url).pipe(fs.createWriteStream(`grid-${grid.id}.png`));
        });
    });
```

## Other methods
#### Vote on grids:
```js
// Upvote a grid
client.voteGrid({direction: 'up', id: 80}) // 80 = Grid ID
    .then((res) => {
        console.log(res); // true/false
    });

// Downvote the same grid
client.voteGrid({direction: 'down', id: 80}) // 80 = Grid ID
    .then((res) => {
        console.log(res); // true/false
    });
    
// Alternatively:
client.upvoteGrid(80)
    .then((res) => {
        console.log(res); // true/false
    });
client.downvoteGrid(80)
    .then((res) => {
        console.log(res); // true/false
    });
```

#### Upload a grid:
```js
// Upload a blurred grid to Half-Life 2 (2254)
client.uploadGrid(2254, 'blurred', fs.createReadStream(__dirname + '/grid.png'))
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });
```

#### Delete grids:
```js
// Delete a grid
client.deleteGrids(80)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });

// Delete multiple grids
client.deleteGrids([80,81,82,83])
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });
```
