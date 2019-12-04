import fetch, { Response } from 'node-fetch';
import { Person, Film } from './models';
import { toString } from './utils';
import { toCamelCase } from 'case-converter';

type SwapiId = number;

class Swapi {
  private readonly _host = 'https://swapi.co/api';
  private readonly _people = 'people';
  private readonly _films = 'films';

  private _get(...resource: string[]): Promise<Response> {
    const uri = [this._host, ...resource].join('/');
    return fetch(uri);
  }

  private async _getJson<T = any>(...resource: string[]): Promise<T> {
    const res = await this._get(...resource);
    const json = await res.json();
    const camelCasedJson = toCamelCase(json);
    return <T>camelCasedJson;
  }

  getPerson(id: SwapiId): Promise<Person> {
    return this._getJson<Person>(this._people, id.toString());
  }

  getFilm(id: SwapiId): Promise<Film> {
    return this._getJson<Film>(this._films, id.toString());
  }
}

export const swapi = new Swapi();