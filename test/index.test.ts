import {expect} from "@jest/globals";
import SGDB from "../src";
import * as nock from "nock";

const client = new SGDB("API_KEY");

it("should retrieve by steam appid", async () => {
    const mockResponse = "{\"id\":10602,\"name\":\"Team Fortress 2\",\"types\":[\"steam\"],\"verified\":true}";

    nock("https://www.steamgriddb.com")
        .get("/api/v2/games/steam/440")
        .reply(200, {"success": true, "data": mockResponse});

    const response = await client.getGameBySteamAppId(440);
    expect(response).toEqual(mockResponse);
});

it("should retrieve by game id", async () => {
    const mockResponse = "{\"id\":10602,\"name\":\"Team Fortress 2\",\"types\":[\"steam\"],\"verified\":true}";
    nock("https://www.steamgriddb.com")
        .get("/api/v2/games/id/10602")
        .reply(200, {"success": true, "data": mockResponse});

    const response = await client.getGameById(10602);
    expect(response).toEqual(mockResponse);
});

it("should retrieve platform data", async () => {
    const mockResponse = "{\"id\":10602,\"name\":\"Team Fortress 2\",\"types\":[\"steam\"],\"verified\":true,\"external_platform_data\": {\"steam\": [{\"id\": \"440\"}]}";
    nock("https://www.steamgriddb.com")
        .get("/api/v2/games/id/10602?platformdata=steam")
        .reply(200, {"success": true, "data": mockResponse});

    const response = await client.getGameById(10602,{
        platformdata: ["steam"]
    });
    expect(response).toEqual(mockResponse);
});

it("should be searchable", async () => {
    const mockResponse = "[{\"id\":10602,\"name\":\"Team Fortress 2\",\"types\":[\"steam\"],\"verified\":true},{\"id\":31520,\"name\":\"Team Fortress 2008\",\"types\":[\"steam\"],\"verified\":true},{\"id\":1706,\"name\":\"Team Fortress Classic\",\"types\":[\"steam\"],\"verified\":true},{\"id\":13797,\"name\":\"Team Fortress 2 Beta\",\"types\":[\"steam\"],\"verified\":true},{\"id\":655,\"name\":\"Escape from Fortress Lugohm\",\"types\":[\"steam\"],\"verified\":true}]";

    nock("https://www.steamgriddb.com")
        .get("/api/v2/search/autocomplete/Team%20Fortress%202")
        .reply(200, {"success": true, "data": mockResponse});

    const response = await client.searchGame("Team Fortress 2");
    expect(response).toEqual(mockResponse);
});

it("should retrieve by steam appid", async () => {
    const mockResponse = "[{\"id\":32002,\"score\":2,\"style\":\"blurred\",\"url\":\"https://s3.amazonaws.com/steamgriddb/grid/79da9938d61a8bb4ddeead82d229441a.png\",\"thumb\":\"https://s3.amazonaws.com/steamgriddb/thumb/79da9938d61a8bb4ddeead82d229441a.png\",\"tags\":[],\"author\":{\"name\":\"Devtholt\",\"steam64\":\"76561197987783300\",\"avatar\":\"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/8d/8d6d4fac26f50c51a9c1a87dc3a8da6196058efd.jpg\"}},{\"id\":46,\"score\":2,\"style\":\"blurred\",\"url\":\"https://s3.amazonaws.com/steamgriddb/grid/d9d4f495e875a2e075a1a4a6e1b9770f.png\",\"thumb\":\"https://s3.amazonaws.com/steamgriddb/thumb/d9d4f495e875a2e075a1a4a6e1b9770f.png\",\"tags\":[],\"author\":{\"name\":\"KlagerRen\",\"steam64\":\"76561198049721485\",\"avatar\":\"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fd/fd15400a9bd9cbbd9293bf26d85a2b9873538916.jpg\"}},{\"id\":7215,\"score\":2,\"style\":\"alternate\",\"url\":\"https://s3.amazonaws.com/steamgriddb/grid/b17446af05919be6e83500be7f5df5c4.png\",\"thumb\":\"https://s3.amazonaws.com/steamgriddb/thumb/b17446af05919be6e83500be7f5df5c4.png\",\"tags\":[],\"author\":{\"name\":\"Malugre\",\"steam64\":\"76561198004874489\",\"avatar\":\"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ce/ce9634a628a6821ab323966a97983e60543f9d85.jpg\"}},{\"id\":5121,\"score\":1,\"style\":\"material\",\"url\":\"https://s3.amazonaws.com/steamgriddb/grid/70f250e2d762fbde8a2e70eabf6eb953.png\",\"thumb\":\"https://s3.amazonaws.com/steamgriddb/thumb/70f250e2d762fbde8a2e70eabf6eb953.png\",\"tags\":[],\"author\":{\"name\":\"NightCrawler\",\"steam64\":\"76561198098830603\",\"avatar\":\"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/6f/6f1dd62991dfeb94ed6fcc65a1fb0ebe7834c106.jpg\"}},{\"id\":1565,\"score\":1,\"style\":\"blurred\",\"url\":\"https://s3.amazonaws.com/steamgriddb/grid/d961e9f236177d65d21100592edb0769.png\",\"thumb\":\"https://s3.amazonaws.com/steamgriddb/thumb/d961e9f236177d65d21100592edb0769.png\",\"tags\":[],\"author\":{\"name\":\"EpicWolverine\",\"steam64\":\"76561198025674497\",\"avatar\":\"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/76/764911aeb96ae312c2819780f4107396d3b5ac38.jpg\"}},{\"id\":7216,\"score\":1,\"style\":\"blurred\",\"url\":\"https://s3.amazonaws.com/steamgriddb/grid/994d1cad9132e48c993d58b492f71fc1.png\",\"thumb\":\"https://s3.amazonaws.com/steamgriddb/thumb/994d1cad9132e48c993d58b492f71fc1.png\",\"tags\":[],\"author\":{\"name\":\"Malugre\",\"steam64\":\"76561198004874489\",\"avatar\":\"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ce/ce9634a628a6821ab323966a97983e60543f9d85.jpg\"}},{\"id\":25198,\"score\":1,\"style\":\"material\",\"url\":\"https://s3.amazonaws.com/steamgriddb/grid/4e1593351be8d712406950f7e8b16eba.png\",\"thumb\":\"https://s3.amazonaws.com/steamgriddb/thumb/4e1593351be8d712406950f7e8b16eba.png\",\"tags\":[],\"author\":{\"name\":\"Scout339\",\"steam64\":\"76561198101626673\",\"avatar\":\"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/77/77d88ff57360981a7c59a51999102ae5f31628df.jpg\"}},{\"id\":2719,\"score\":1,\"style\":\"alternate\",\"url\":\"https://s3.amazonaws.com/steamgriddb/grid/7aee26c309def8c5a2a076eb250b8f36.png\",\"thumb\":\"https://s3.amazonaws.com/steamgriddb/thumb/7aee26c309def8c5a2a076eb250b8f36.png\",\"tags\":[],\"author\":{\"name\":\"DalaiLlama\",\"steam64\":\"76561198051141376\",\"avatar\":\"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/19/19d44f84d2d09c6f59932a8b3c591e1ee396c776.jpg\"}},{\"id\":29873,\"score\":1,\"style\":\"alternate\",\"url\":\"https://s3.amazonaws.com/steamgriddb/grid/ba683b00e5811b2a1e28212d787739e9.png\",\"thumb\":\"https://s3.amazonaws.com/steamgriddb/thumb/ba683b00e5811b2a1e28212d787739e9.png\",\"tags\":[],\"author\":{\"name\":\"VinnyStalck\",\"steam64\":\"76561198081448408\",\"avatar\":\"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/8c/8cc9c7797dc689828bc2854dbc9756e65e6c2e37.jpg\"}},{\"id\":2242,\"score\":1,\"style\":\"blurred\",\"url\":\"https://s3.amazonaws.com/steamgriddb/grid/1a3f91fead97497b1a96d6104ad339f6.png\",\"thumb\":\"https://s3.amazonaws.com/steamgriddb/thumb/1a3f91fead97497b1a96d6104ad339f6.png\",\"tags\":[],\"author\":{\"name\":\"dragnus\",\"steam64\":\"76561198015793633\",\"avatar\":\"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/16/1697d783690fc5443ce5b3937fe3202957118b1d.jpg\"}},{\"id\":2507,\"score\":1,\"style\":\"alternate\",\"url\":\"https://s3.amazonaws.com/steamgriddb/grid/83691715fdc5baf20ed0742b0b85785b.png\",\"thumb\":\"https://s3.amazonaws.com/steamgriddb/thumb/83691715fdc5baf20ed0742b0b85785b.png\",\"tags\":[],\"author\":{\"name\":\"ChrisN34\",\"steam64\":\"76561198040629334\",\"avatar\":\"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/5e/5eae049ed48612776ae217aa64ac80c562558156.jpg\"}},{\"id\":2009,\"score\":1,\"style\":\"material\",\"url\":\"https://s3.amazonaws.com/steamgriddb/grid/f1981e4bd8a0d6d8462016d2fc6276b3.png\",\"thumb\":\"https://s3.amazonaws.com/steamgriddb/thumb/f1981e4bd8a0d6d8462016d2fc6276b3.png\",\"tags\":[],\"author\":{\"name\":\"Sneakman\",\"steam64\":\"76561198036733909\",\"avatar\":\"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/dd/ddfa6d4b1cf03aa35b1c1efcf47f0a9465e15e50.jpg\"}},{\"id\":4828,\"score\":1,\"style\":\"blurred\",\"url\":\"https://s3.amazonaws.com/steamgriddb/grid/de3f712d1a02c5fb481a7a99b0da7fa3.png\",\"thumb\":\"https://s3.amazonaws.com/steamgriddb/thumb/de3f712d1a02c5fb481a7a99b0da7fa3.png\",\"tags\":[],\"author\":{\"name\":\"dragnus\",\"steam64\":\"76561198015793633\",\"avatar\":\"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/16/1697d783690fc5443ce5b3937fe3202957118b1d.jpg\"}},{\"id\":27613,\"score\":1,\"style\":\"material\",\"url\":\"https://s3.amazonaws.com/steamgriddb/grid/fdbeb638e95f0bb8868a6e7c1969a713.png\",\"thumb\":\"https://s3.amazonaws.com/steamgriddb/thumb/fdbeb638e95f0bb8868a6e7c1969a713.png\",\"tags\":[],\"author\":{\"name\":\"leafonthewind\",\"steam64\":\"76561198080660597\",\"avatar\":\"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/e5/e56f7517e85e5577a7a220c2bdcd96fa2c7f3b19.jpg\"}},{\"id\":3307,\"score\":1,\"style\":\"blurred\",\"url\":\"https://s3.amazonaws.com/steamgriddb/grid/d7aab42e6b85c49c0f1d3a115e939c74.png\",\"thumb\":\"https://s3.amazonaws.com/steamgriddb/thumb/d7aab42e6b85c49c0f1d3a115e939c74.png\",\"tags\":[],\"author\":{\"name\":\"ElCapitan\",\"steam64\":\"76561198068123705\",\"avatar\":\"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/0f/0fe16b7ffa28eecb39d507b72f16823b7da6141d.jpg\"}},{\"id\":304,\"score\":0,\"style\":\"alternate\",\"url\":\"https://s3.amazonaws.com/steamgriddb/grid/37bc2f75bf1bcfe8450a1a41c200364c.png\",\"thumb\":\"https://s3.amazonaws.com/steamgriddb/thumb/37bc2f75bf1bcfe8450a1a41c200364c.png\",\"tags\":[],\"author\":{\"name\":\"ChrisN34\",\"steam64\":\"76561198040629334\",\"avatar\":\"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/5e/5eae049ed48612776ae217aa64ac80c562558156.jpg\"}},{\"id\":30048,\"score\":0,\"style\":\"alternate\",\"url\":\"https://s3.amazonaws.com/steamgriddb/grid/83ece3622fecf463a8b520014ed96c26.png\",\"thumb\":\"https://s3.amazonaws.com/steamgriddb/thumb/83ece3622fecf463a8b520014ed96c26.png\",\"tags\":[],\"author\":{\"name\":\"Ziggy\",\"steam64\":\"76561197997299324\",\"avatar\":\"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fb/fb8a3cf34d94577efdafb179de096d109364064e.jpg\"}}]";

    nock("https://www.steamgriddb.com")
        .get("/api/v2/grids/steam/440")
        .reply(200, {"success": true, "data": mockResponse});

    const response = await client.getGridsBySteamAppId(440);
    expect(response).toEqual(mockResponse);
});

it("should be filterable for style", async () => {
    const mockResponse = "[{\"id\":32002,\"score\":2,\"style\":\"blurred\",\"url\":\"https://s3.amazonaws.com/steamgriddb/grid/79da9938d61a8bb4ddeead82d229441a.png\",\"thumb\":\"https://s3.amazonaws.com/steamgriddb/thumb/79da9938d61a8bb4ddeead82d229441a.png\",\"tags\":[],\"author\":{\"name\":\"Devtholt\",\"steam64\":\"76561197987783300\",\"avatar\":\"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/8d/8d6d4fac26f50c51a9c1a87dc3a8da6196058efd.jpg\"}},{\"id\":46,\"score\":2,\"style\":\"blurred\",\"url\":\"https://s3.amazonaws.com/steamgriddb/grid/d9d4f495e875a2e075a1a4a6e1b9770f.png\",\"thumb\":\"https://s3.amazonaws.com/steamgriddb/thumb/d9d4f495e875a2e075a1a4a6e1b9770f.png\",\"tags\":[],\"author\":{\"name\":\"KlagerRen\",\"steam64\":\"76561198049721485\",\"avatar\":\"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fd/fd15400a9bd9cbbd9293bf26d85a2b9873538916.jpg\"}},{\"id\":5121,\"score\":1,\"style\":\"material\",\"url\":\"https://s3.amazonaws.com/steamgriddb/grid/70f250e2d762fbde8a2e70eabf6eb953.png\",\"thumb\":\"https://s3.amazonaws.com/steamgriddb/thumb/70f250e2d762fbde8a2e70eabf6eb953.png\",\"tags\":[],\"author\":{\"name\":\"NightCrawler\",\"steam64\":\"76561198098830603\",\"avatar\":\"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/6f/6f1dd62991dfeb94ed6fcc65a1fb0ebe7834c106.jpg\"}},{\"id\":1565,\"score\":1,\"style\":\"blurred\",\"url\":\"https://s3.amazonaws.com/steamgriddb/grid/d961e9f236177d65d21100592edb0769.png\",\"thumb\":\"https://s3.amazonaws.com/steamgriddb/thumb/d961e9f236177d65d21100592edb0769.png\",\"tags\":[],\"author\":{\"name\":\"EpicWolverine\",\"steam64\":\"76561198025674497\",\"avatar\":\"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/76/764911aeb96ae312c2819780f4107396d3b5ac38.jpg\"}},{\"id\":7216,\"score\":1,\"style\":\"blurred\",\"url\":\"https://s3.amazonaws.com/steamgriddb/grid/994d1cad9132e48c993d58b492f71fc1.png\",\"thumb\":\"https://s3.amazonaws.com/steamgriddb/thumb/994d1cad9132e48c993d58b492f71fc1.png\",\"tags\":[],\"author\":{\"name\":\"Malugre\",\"steam64\":\"76561198004874489\",\"avatar\":\"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ce/ce9634a628a6821ab323966a97983e60543f9d85.jpg\"}},{\"id\":25198,\"score\":1,\"style\":\"material\",\"url\":\"https://s3.amazonaws.com/steamgriddb/grid/4e1593351be8d712406950f7e8b16eba.png\",\"thumb\":\"https://s3.amazonaws.com/steamgriddb/thumb/4e1593351be8d712406950f7e8b16eba.png\",\"tags\":[],\"author\":{\"name\":\"Scout339\",\"steam64\":\"76561198101626673\",\"avatar\":\"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/77/77d88ff57360981a7c59a51999102ae5f31628df.jpg\"}},{\"id\":2242,\"score\":1,\"style\":\"blurred\",\"url\":\"https://s3.amazonaws.com/steamgriddb/grid/1a3f91fead97497b1a96d6104ad339f6.png\",\"thumb\":\"https://s3.amazonaws.com/steamgriddb/thumb/1a3f91fead97497b1a96d6104ad339f6.png\",\"tags\":[],\"author\":{\"name\":\"dragnus\",\"steam64\":\"76561198015793633\",\"avatar\":\"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/16/1697d783690fc5443ce5b3937fe3202957118b1d.jpg\"}},{\"id\":2009,\"score\":1,\"style\":\"material\",\"url\":\"https://s3.amazonaws.com/steamgriddb/grid/f1981e4bd8a0d6d8462016d2fc6276b3.png\",\"thumb\":\"https://s3.amazonaws.com/steamgriddb/thumb/f1981e4bd8a0d6d8462016d2fc6276b3.png\",\"tags\":[],\"author\":{\"name\":\"Sneakman\",\"steam64\":\"76561198036733909\",\"avatar\":\"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/dd/ddfa6d4b1cf03aa35b1c1efcf47f0a9465e15e50.jpg\"}},{\"id\":4828,\"score\":1,\"style\":\"blurred\",\"url\":\"https://s3.amazonaws.com/steamgriddb/grid/de3f712d1a02c5fb481a7a99b0da7fa3.png\",\"thumb\":\"https://s3.amazonaws.com/steamgriddb/thumb/de3f712d1a02c5fb481a7a99b0da7fa3.png\",\"tags\":[],\"author\":{\"name\":\"dragnus\",\"steam64\":\"76561198015793633\",\"avatar\":\"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/16/1697d783690fc5443ce5b3937fe3202957118b1d.jpg\"}},{\"id\":27613,\"score\":1,\"style\":\"material\",\"url\":\"https://s3.amazonaws.com/steamgriddb/grid/fdbeb638e95f0bb8868a6e7c1969a713.png\",\"thumb\":\"https://s3.amazonaws.com/steamgriddb/thumb/fdbeb638e95f0bb8868a6e7c1969a713.png\",\"tags\":[],\"author\":{\"name\":\"leafonthewind\",\"steam64\":\"76561198080660597\",\"avatar\":\"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/e5/e56f7517e85e5577a7a220c2bdcd96fa2c7f3b19.jpg\"}},{\"id\":3307,\"score\":1,\"style\":\"blurred\",\"url\":\"https://s3.amazonaws.com/steamgriddb/grid/d7aab42e6b85c49c0f1d3a115e939c74.png\",\"thumb\":\"https://s3.amazonaws.com/steamgriddb/thumb/d7aab42e6b85c49c0f1d3a115e939c74.png\",\"tags\":[],\"author\":{\"name\":\"ElCapitan\",\"steam64\":\"76561198068123705\",\"avatar\":\"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/0f/0fe16b7ffa28eecb39d507b72f16823b7da6141d.jpg\"}}]";

    nock("https://www.steamgriddb.com")
        .get("/api/v2/grids/game/10602")
        .query({styles: "blurred,material"})
        .reply(200, {"success": true, "data": mockResponse});

    const response = await client.getGridsById(10602, ["blurred", "material"]);
    expect(response).toEqual(mockResponse);
});

it("should be filterable for nsfw", async () => {
    const mockResponse = "[{\"id\":105538,\"score\":0,\"style\":\"alternate\",\"width\":600,\"height\":900,\"nsfw\":true,\"humor\":false,\"notes\":\"Original Uncensored Cover\",\"mime\":\"image/png\",\"language\":\"en\",\"url\":\"https://cdn2.steamgriddb.com/file/sgdb-cdn/grid/fc5737abfb74a7b980c0369fa119d325.png\",\"thumb\":\"https://cdn2.steamgriddb.com/file/sgdb-cdn/thumb/fc5737abfb74a7b980c0369fa119d325.jpg\",\"lock\":false,\"epilepsy\":false,\"upvotes\":0,\"downvotes\":0,\"author\":{\"name\":\"MrWheyne\",\"steam64\":\"76561198055275060\",\"avatar\":\"https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/0b/0befacc6e67692a42c0ad23f0a4a6ddfd50e601d.jpg\"}}]";

    nock("https://www.steamgriddb.com")
        .get("/api/v2/grids/game/25795")
        .query({nsfw: "any"})
        .reply(200, {"success": true, "data": mockResponse});

    const response = await client.getGridsById(25795, undefined, undefined, undefined, undefined, "any");
    expect(response).toEqual(mockResponse);
});

it("should be deletable", async () => {
    nock("https://www.steamgriddb.com")
        .delete("/api/v2/grids/123123")
        .reply(200, {success: true});

    const response = await client.deleteGrids([123123]);
    expect(response).toBe(true);
});
