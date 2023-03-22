import {OutgoingHttpHeaders} from "http";
import axios from "axios";

export interface SGDBGame {
    id: number;
    name: string;
    types: string[];
    verified: boolean;
}

export interface SGDBAuthor {
    name: string;
    steam64: string;
    avatar: URL;
}

export interface SGDBImage {
    id: number;
    score: number;
    style: string[];
    url: URL;
    thumb: URL;
    tags: string[];
    author: SGDBAuthor;
}

export interface SGDBOptions {
    key?: string;
    headers?: OutgoingHttpHeaders;
    baseURL?: string;
}

export interface SGDBImageOptions {
    id: number;
    type: string;
    styles?: string[];
    dimensions?: string[];
    mimes?: string[];
    types?: string[];
    nsfw?: string;
    epilepsy?: string;
    humor?: string;
    oneoftag?: string;
    page?: number;
}

interface SGDBQueryParams {
    [key: string]: string;
}

export default class SGDB {
    private readonly key:string;
    private readonly baseURL:string;
    private readonly headers:OutgoingHttpHeaders;

    constructor(options:SGDBOptions | string) {
        // Allow passing just the API key as a string
        if (typeof options === "string") {
            options = {key: options};
        }

        this.baseURL = options.baseURL ?? "https://www.steamgriddb.com/api/v2";
        this.key = options.key ?? "";
        this.headers = {};

        if (options.headers) {
            this.headers = Object.assign({}, options.headers);
        }

        if (this.key) {
            this.headers.Authorization = `Bearer ${this.key}`;
        } else {
            process.emitWarning("API Key not provided, some methods won't work.");
        }
    }

    private buildQuery(options): SGDBQueryParams {
        const multiParams = ["styles", "dimensions", "mimes", "types"];
        const singleParams = ["nsfw", "humor", "epilepsy", "oneoftag", "page"];
        const params = {};

        multiParams.forEach((queryParam) => {
            if (options[queryParam]?.length) {
                params[queryParam] = options[queryParam].join(",");
            }
        });

        singleParams.forEach((queryParam) => {
            if (typeof options[queryParam] !== "undefined") {
                params[queryParam] = options[queryParam];
            }
        });
        return params;
    }

    async handleRequest(method:string, url:string, params:SGDBQueryParams = {}, formData = null): Promise<any> {
        let options = {
            url: `${this.baseURL}${url}`,
            headers: this.headers,
            method,
            params: params
        };

        if (formData) {
            options = Object.assign({}, options, {formData: formData});
        }

        let response;

        try {
            response = await axios(options);
        } catch (error) {
            error.message = error.response.data?.errors?.join(", ") ?? error.message;
            throw error;
        }

        if (response?.data.success) {
            return response.data.data ?? response.data.success;
        }

        const error = new axios.AxiosError();
        error.message = response.data?.errors?.join(", ") ?? "Unknown SteamGridDB error.";
        throw error;
    }

    async searchGame(query):Promise<SGDBGame[]> {
        return await this.handleRequest("get", `/search/autocomplete/${encodeURIComponent(query)}`);
    }

    async getGame(options):Promise<SGDBGame> {
        return await this.handleRequest("get", `/games/${options.type}/${options.id}`);
    }

    async getGameById(id:number):Promise<SGDBGame> {
        return this.getGame({type: "id", id: id});
    }

    async getGameBySteamAppId(id:number):Promise<SGDBGame> {
        return this.getGame({type: "steam", id: id});
    }

    async getGrids(options:SGDBImageOptions):Promise<SGDBImage[]> {
        return await this.handleRequest("get", `/grids/${options.type}/${options.id}`, this.buildQuery(options));
    }

    async getGridsById(
        id:number,
        styles?:string[],
        dimensions?:string[],
        mimes?:string[],
        types?:string[],
        nsfw?:string,
        humor?:string
    ):Promise<SGDBImage[]> {
        return this.getGrids({
            type: "game",
            id: id,
            styles: styles,
            dimensions: dimensions,
            mimes: mimes,
            types: types,
            nsfw: nsfw,
            humor: humor
        });
    }

    async getGridsBySteamAppId(
        id:number,
        styles?:string[],
        dimensions?:string[],
        mimes?:string[],
        types?:string[],
        nsfw?:string,
        humor?:string
    ):Promise<SGDBImage[]> {
        return this.getGrids({
            type: "steam",
            id: id,
            styles: styles,
            dimensions: dimensions,
            mimes: mimes,
            types: types,
            nsfw: nsfw,
            humor: humor
        });
    }

    async getHeroes(options:SGDBImageOptions):Promise<SGDBImage[]> {
        return await this.handleRequest("get", `/heroes/${options.type}/${options.id}`, this.buildQuery(options));
    }

    async getIcons(options:SGDBImageOptions):Promise<SGDBImage[]> {
        return await this.handleRequest("get", `/icons/${options.type}/${options.id}`, this.buildQuery(options));
    }

    async getLogos(options:SGDBImageOptions):Promise<SGDBImage[]> {
        return await this.handleRequest("get", `/logos/${options.type}/${options.id}`, this.buildQuery(options));
    }

    async deleteGrids(ids:number|number[]):Promise<boolean> {
        const gridIds = Array.isArray(ids) ? ids.join(",") : ids.toString();

        return await this.handleRequest("delete", `/grids/${Array.isArray(gridIds) ? gridIds.join(",") : gridIds}`);
    }
}
