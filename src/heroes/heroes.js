import React from 'react';
import { Link } from 'react-router-dom';
import { heroService } from '../heroes/hero-service';

export class Heroes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      heroes: [],
      heroName: ''
    };
  }

  componentDidMount() {
    this.getHeroes();
  }

  async getHeroes() {
    this.setState({
      heroes: await heroService.getHeroes()
    });
  }

  add = (name) => {
    if (!name) { 
      return;
    }

    heroService.addHero({ name })
      .then(hero => {
        this.setState({
          heroes: [...this.state.heroes, hero]
        });
      });
  }

  delete = (hero) => {
    this.setState({
      heroes: this.state.heroes.filter(h => h.id !== hero.id)
    });
    heroService.deleteHero(hero.id);
  }

  handleChange = (event) => {
    this.setState({
      heroName: event.target.value.trim()
    });
  }

  render() {
    const heroes = this.state.heroes.map(hero => (
      <li key={hero.id}>
        <Link to={`/detail/${hero.id}`}>
          <span className="badge">{hero.id}</span> {hero.name}
        </Link>
        <button className="delete" title="delete hero" onClick={() => this.delete(hero)}>x</button>
      </li>
    ));

    return (
      <div className="heroes">
        <h2>My Heroes</h2>
        <div>
          <label>Hero name:
            <input value={this.state.heroName} onChange={this.handleChange} />
          </label>
          <button onClick={() => this.add(this.state.heroName)}>add</button>
        </div>
        <ul className="heroes">
          {heroes}
        </ul>
      </div>
    );
  }
}