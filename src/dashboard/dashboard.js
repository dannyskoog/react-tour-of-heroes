import React from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css';
import HeroSearch from '../hero-search/hero-search';
import { heroService } from '../heroes/hero-service';

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      heroes: []
    };
  }

  componentDidMount() {
    this.getHeroes();
  }

  async getHeroes() {
    this.setState({
      heroes: (await heroService.getHeroes()).slice(1, 5)
    });
  }

  render() {
    const heroes = this.state.heroes.map(hero => (
      <Link to={`/detail/${hero.id}`} key={hero.id} className="col-1-4">
        <div className="module hero">
          <h4>{hero.name}</h4>
        </div>
      </Link>
    ));

    return (
      <div className="dashboard">
        <h3>Top Heroes</h3>
        <div className="grid grid-pad">
          {heroes}
        </div>
        <HeroSearch />
      </div>
    );
  }
}