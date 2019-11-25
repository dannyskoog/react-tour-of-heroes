import React from 'react';
import { Link } from 'react-router-dom';
import './hero-search.css';
import { heroService } from '../heroes/hero-service';

export default class HeroSeach extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heroes: [],
      term: ''
    };
  }

  activeIntervalId = undefined;

  search = (event) => {
    const oldTerm = this.state.term;
    const newTerm = event.target.value;

    this.setState({
      term: newTerm
    });

    if (this.activeIntervalId) {
      clearInterval(this.activeIntervalId);
    }

    if (oldTerm === newTerm) {
      return;
    }

    this.activeIntervalId = setTimeout(async() => {
      this.activeIntervalId = undefined;
      this.setState({
        heroes: await heroService.searchHeroes(newTerm)
      });
    }, 300);
  }

  render() {
    const heroes = this.state.heroes.map(hero => (
      <li key={hero.id}>
        <Link to={`/detail/${hero.id}`}>{hero.name}</Link>
      </li>
    ));

    return (
      <div id="search-component">
        <h4><label htmlFor="search-box">Hero Search</label></h4>
        <input id="search-box" onChange={this.search} />
        <ul className="search-result">
          {heroes}
        </ul>
      </div>
    );
  }
}