const request = require('request-promise-native');

class SGDB {
    /**
     * @param {(Object|String)} options Object or options API key
     * @param {String} options.key API key
     * @param {Object} options.headers Custom headers
     * @param {String} options.baseURL Base API URL
     */
    constructor(options) {
        this.baseURL = 'https://www.steamgriddb.com/api/v2';
        this.headers = {};

        if (options.baseURL) {
            this.baseURL = options.baseURL;
        }
        if (options.headers) {
            this.headers = Object.assign({}, options.headers);
        }
        if (options.key) {
            this.key = options.key;
        }

        if (typeof options === 'string') {
            this.key = options;
        }

        if (this.key) {
            this.headers.Authorization = `Bearer ${this.key}`;
        } else {
            process.emitWarning('API Key not provided, some methods won\'t work.');
        }
    }

    /**
     * @param {String} url API endpoint to append to baseURL
     * @param {String} method HTTP method
     * @param {Object} params
     * @param {Object} formData
     * @return {Promise<Object>}
     */
    _handleRequest(method, url, params, formData = null) {
        let options = { uri: `${this.baseURL}${url}`, headers: this.headers, method: method, qs: params, simple: false, json: true, resolveWithFullResponse: true };
        if (formData) {
            options = Object.assign({},options,{formData: formData});
        }

        return new Promise((resolve, reject) => {
            request(options)
                .then((response) => {
                    const json = response.body;
                    if (json.success) {
                        resolve(json); // Return whole output so each function can handle differently
                    }
                    if (!json.success) {
                        let error = new Error(json.errors);
                        error.response = response; // attach response to error
                        reject(error);
                    }
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    /**
     * @param {Object} options
     * @param {String} options.type ID Type.
     * @param {Number} options.id Game ID. Could be Steam App ID or game ID
     * @return {Promise<Object>} JSON game response
     */
    getGame(options) {
        return new Promise((resolve, reject) => {
            this._handleRequest('get', `/games/${options.type}/${options.id}`)
                .then((res) => {
                    if (res.success) {
                        resolve(res.data);
                    }
                }).catch((err) => {
                    reject(err);
                });
        });
    }

    /**
     * @param {Number} id Game ID
     * @return {Promise<Object>} JSON game response
     */
    getGameById(id) {
        return this.getGame({type: 'id', id: id});
    }

    /**
     * @param {Number} id Steam App ID
     * @return {Promise<Object>} JSON game response
     */
    getGameBySteamAppId(id) {
        return this.getGame({type: 'steam', id: id});
    }

    /**
     * @param {Object} options
     * @param {Number} options.id Game ID. Could be Steam App ID or game ID
     * @param {String} options.type ID Type.
     * @param {(Array|Undefined)} options.styles Array of grid styles.
     * @param {(Array|Undefined)} options.dimensions Array of grid dimensions.
     * @return {Promise<Object>} JSON grids response
     */
    getGrids(options) {
        let params = {};
        if (typeof options.styles !== 'undefined') {
            params.styles = options.styles.join(',');
        }
        if (typeof options.dimensions !== 'undefined') {
            params.dimensions = options.dimensions.join(',');
        }
        return new Promise((resolve, reject) => {
            this._handleRequest('get', `/grids/${options.type}/${options.id}`, params)
                .then((res) => {
                    if (res.success) {
                        resolve(res.data);
                    }
                }).catch((err) => {
                    reject(err);
                });
        });
    }

    /**
     * @param {Object} options
     * @param {Number} options.id Game ID. Could be Steam App ID or game ID
     * @param {String} options.type ID Type.
     * @param {(Array|Undefined)} options.styles Array of hero styles.
     * @param {(Array|Undefined)} options.dimensions Array of hero dimensions.
     * @return {Promise<Object>} JSON heroes response
     */
    getHeroes(options) {
        let params = {};
        if (typeof options.styles !== 'undefined') {
            params.styles = options.styles.join(',');
        }
        if (typeof options.dimensions !== 'undefined') {
            params.dimensions = options.dimensions.join(',');
        }
        return new Promise((resolve, reject) => {
            this._handleRequest('get', `/heroes/${options.type}/${options.id}`, params)
                .then((res) => {
                    if (res.success) {
                        resolve(res.data);
                    }
                }).catch((err) => {
                    reject(err);
                });
        });
    }
    getLogos(options) {
      let params = {};
      return new Promise((resolve, reject)=>{
        this._handleRequest('get',`/logos/${options.id}`)
          .then((res) => {
            if (res.success) {
              resolve(res.data);
            }
          }).catch((err)=>{
            reject(err);
          });
      });
    }

    /**
     * @param {Number} id Game ID on SteamGridDB
     * @param {(Array|Undefined)} styles Array of grid styles.
     * @param {(Array|Undefined)} dimensions Array of grid dimensions.
     * @return {Promise<Object>} JSON grid response
     */
    getGridsById(id, styles, dimensions) {
        return this.getGrids({type: 'game', id: id, styles: styles, dimensions: dimensions});
    }

    /**
     * @param {Number} id Steam App ID
     * @param {(Array|Undefined)} styles Array of grid styles.
     * @param {(Array|Undefined)} dimensions Array of grid dimensions.
     * @return {Promise<Object>} JSON grid response
     */
    getGridsBySteamAppId(id, styles, dimensions) {
        return this.getGrids({type: 'steam', id: id, styles: styles, dimensions: dimensions});
    }

    /**
     * @param {Object} options
     * @param {String} options.direction Vote direction. Should be "up" or "down".
     * @param {Number} options.id Grid ID.
     * @return {Promise<Boolean>}
     */
    voteGrid(options) {
        if (!['up','down'].includes(options.direction)) {
            return new TypeError('Invalid direction paramater. Can only vote "up" or "down".');
        }

        return new Promise((resolve, reject) => {
            this._handleRequest('post', `/grids/vote/${options.direction}/${options.id}`)
                .then((res) => {
                    if (res.success) {
                        resolve(true);
                    }
                }).catch((err) => {
                    reject(err);
                });
        });
    }

    /**
     * @param {Number} id Grid ID
     * @return {Promise<Boolean>}
     */
    upvoteGrid(id) {
        return this.voteGrid({direction: 'up', id: id});
    }

    /**
     * @param {Number} id Grid ID
     * @return {Promise<Boolean>}
     */
    downvoteGrid(id) {
        return this.voteGrid({direction: 'down', id: id});
    }

    /**
     * @param  {Number} id Game ID.
     * @param  {String} style Style name.
     * @param  {stream.Writable} grid File stream
     * @return {Boolean}
     */
    uploadGrid(id, style, grid) {
        const formData = {
            game_id: id,
            style: style,
            grid: grid
        };

        return new Promise((resolve, reject) => {
            this._handleRequest('post', '/grids', null, formData)
                .then((res) => {
                    if (res.success) {
                        resolve(true);
                    }
                }).catch((err) => {
                    reject(err);
                });
        });
    }

    /**
     * @param  {(Number|Array)} ids Grid ID or array of IDs to delete
     * @return {Promise<Boolean>}
     */
    deleteGrids(ids) {
        let gridIds = ids;
        if (Array.isArray(ids)) {
            gridIds = ids.join(',');
        }

        return new Promise((resolve, reject) => {
            this._handleRequest('delete', `/grids/${gridIds}`)
                .then((res) => {
                    if (res.success) {
                        resolve(true);
                    }
                }).catch((err) => {
                    reject(err);
                });
        });
    }

    /**
     * @param  {String} term Search term
     * @return {Promise<Object>}
     */
    searchGame(term) {
        return new Promise((resolve, reject) => {
            this._handleRequest('get', `/search/autocomplete/${encodeURIComponent(term)}`)
                .then((res) => {
                    if (res.success) {
                        resolve(res.data);
                    }
                }).catch((err) => {
                    reject(err);
                });
        });
    }
}

module.exports = SGDB;
