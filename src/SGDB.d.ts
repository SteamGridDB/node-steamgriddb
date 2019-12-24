export default class SGDB {
  constructor(options: any): void;
  _handleRequest(method: string, url: string, params: any, formData: any ): Promise<any>;
  getGame(options: any): Promise<any>;
  getGameById(id: number): Promise<any>;
  getGameBySteamAppId(id: number): Promise<any>;
  getGrids(options: any): Promise<any>;
  getHeroes(options: any): Promise<any>;
  getGridsById(id: number, styles: any, dimensions: any): Promise<any>;
  getGridsBySteamAppId(id: number, styles: any, dimensions: any): Promise<any>;
  voteGrid(options: any): Promise<any>;
  upvoteGrid(id: number): Promise<any>;
  downvoteGrid(id: number): Promise<any>;
  uploadGrid(id: number, style: string, grid: any): Promise<any>;
  deleteGrids(ids: any): Promise<any>;
  searchGame(term: string): Promise<any>;
}
