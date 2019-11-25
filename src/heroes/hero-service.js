import axios from 'axios';
import './heroes.css';
import { messageService } from '../messages/message-service';

const API_BASE_URL = 'http://localhost:4000';

const getHeroes = () => {
  return axios.get(`${API_BASE_URL}/heroes`)
    .then(response => {
      log('fetched heroes');
      return response.data;
    }).catch(handleError('getHeroes', []));
};

const getHero = (id) => {
  return axios.get(`${API_BASE_URL}/heroes/${id}`)
    .then(response => {
      log(`fetched hero id=${id}`);
      return response.data;
    }).catch(handleError(`getHero id=${id}`));
};

const addHero = (hero) => {
  return axios.post(`${API_BASE_URL}/heroes`, hero)
    .then((response) => {
      const hero = response.data;
      log(`added hero w/ id=${hero.id}`);
      return hero;
    }).catch(handleError('addHero'));
}

const updateHero = (hero) => {
  return axios.put(`${API_BASE_URL}/heroes/${hero.id}`, hero)
    .then(_ => log(`updated hero id=${hero.id}`))
    .catch(handleError('updateHero'));
}

const deleteHero = (id) => {
  return axios.delete(`${API_BASE_URL}/heroes/${id}`)
    .then(_ => log(`deleted hero id=${id}`))
    .catch(handleError('deleteHero'));
}

const searchHeroes = (term) => {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return Promise.resolve([]);
  }
  return axios.get(`${API_BASE_URL}/heroes/?q=${term}`)
    .then(response => {
      log(`found heroes matching "${term}"`);
      return response.data;
    })
    .catch(handleError('searchHeroes', []));
}

/** Log a HeroService message with the MessageService */
const log = (message) => {
  messageService.add(`HeroService: ${message}`);
}

const handleError = (operation = 'operation', result) => {
  return (error) => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return Promise.resolve(result);
  };
}

export const heroService = { getHeroes, getHero, addHero, updateHero, deleteHero, searchHeroes };