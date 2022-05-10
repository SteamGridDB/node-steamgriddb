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
    this.multiParams = ['styles','dimensions','mimes','types'];
    this.singleParams = ['nsfw','humor'];

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

  buildQuery(options) {
    let params = {};
    for(let queryParam of this.multiParams) {
      if (typeof options[queryParam] !== 'undefined'){
        params[queryParam] = options[queryParam].join(',')
      }
    }
    for(let queryParam of this.singleParams) {
      if (typeof options[queryParam] !== 'undefined'){
        params[queryParam] = options[queryParam]
      }
    }
    return params;
  }
  getGrids(options) {
    return new Promise((resolve, reject) => {
      this._handleRequest('get', `/grids/${options.type}/${options.id}`, this.buildQuery(options))
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
   * @param {(Array|Undefined)} options.mimes Array of hero mime types.
   * @param {(Array|Undefined)} options.types Array of hero animation types.
   * @param {(String|Undefined)} options.nsfw String of hero nsfw allowed status.
   * @param {(String|Undefined)} options.humor String of hero humor allowed status.
   * @return {Promise<Object>} JSON heroes response
   */
  getHeroes(options) {
    return new Promise((resolve, reject) => {
      this._handleRequest('get', `/heroes/${options.type}/${options.id}`, this.buildQuery(options))
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
   * @param {(Array|Undefined)} options.styles Array of logo styles.
   * @param {(Array|Undefined)} options.dimensions Array of logo dimensions.
   * @param {(Array|Undefined)} options.mimes Array of logo mime types.
   * @param {(Array|Undefined)} options.types Array of logo animation types.
   * @param {(String|Undefined)} options.nsfw String of logo nsfw allowed status.
   * @param {(String|Undefined)} options.humor String of logo humor allowed status.
   * @return {Promise<Object>} JSON heroes response
   */
  getLogos(options) {
    return new Promise((resolve, reject)=>{
      this._handleRequest('get',`/logos/${options.type}/${options.id}`, this.buildQuery(options))
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
   * @param {Object} options
   * @param {Number} options.id Game ID. Could be Steam App ID or game ID
   * @param {String} options.type ID Type.
   * @param {(Array|Undefined)} options.styles Array of icon styles.
   * @param {(Array|Undefined)} options.dimensions Array of icon dimensions.
   * @param {(Array|Undefined)} options.mimes Array of icon mime types.
   * @param {(Array|Undefined)} options.types Array of icon animation types.
   * @param {(String|Undefined)} options.nsfw String of icon nsfw allowed status.
   * @param {(String|Undefined)} options.humor String of icon humor allowed status.
   * @return {Promise<Object>} JSON heroes response
   */
  getIcons(options) {
    return new Promise((resolve, reject)=>{
      this._handleRequest('get',`/icons/${options.type}/${options.id}`, this.buildQuery(options))
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
   * @param {(Array|Undefined)} mimes Array of grid mime types.
   * @param {(Array|Undefined)} types Array of grid animation types.
   * @param {(String|Undefined)} nsfw String of grid nsfw allowed status.
   * @param {(String|Undefined)} humor String of grid humor allowed status.
   * @return {Promise<Object>} JSON grid response
   */
  getGridsById(id, styles, dimensions, mimes, types, nsfw, humor) {
    return this.getGrids({
      type: 'game',
      id: id,
      styles: styles,
      dimensions: dimensions,
      mimes: mimes,
      types: types,
      nsfw: nsfw,
      humor: humor
    });
  }

  /**
   * @param {Number} id Steam App ID
   * @param {(Array|Undefined)} styles Array of grid styles.
   * @param {(Array|Undefined)} dimensions Array of grid dimensions.
   * @param {(Array|Undefined)} mimes Array of grid mime types.
   * @param {(Array|Undefined)} types Array of grid animation types.
   * @param {(String|Undefined)} nsfw String of grid nsfw allowed status.
   * @param {(String|Undefined)} humor String of grid humor allowed status.
   * @return {Promise<Object>} JSON grid response
   */
  getGridsBySteamAppId(id, styles, dimensions, mimes, types, nsfw, humor) {
    return this.getGrids({
      type: 'steam',
      id: id,
      styles: styles,
      dimensions: dimensions,
      mimes: mimes,
      types: types,
      nsfw: nsfw,
      humor: humor
    });
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
