import React from 'react';
import { withRouter } from 'react-router-dom';
import './hero-detail.css';
import { heroService } from '../heroes/hero-service';

class HeroDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hero: undefined
    };
  }

  async componentDidMount() {
    this.getHero();
  }

  async getHero() {
    this.setState({
      hero: await heroService.getHero(+this.props.match.params.id)
    });
  }
  
  goBack = () => {
    this.props.history.goBack();
  }

  save = () => {
    heroService.updateHero(this.state.hero).then(this.goBack);
  }

  handleChange = (event) => {
    this.setState({
      hero: { ...this.state.hero, name: event.target.value }
    });
  }

  render() {
    if (!this.state.hero) {
      return null;
    }

    return (
      <div className="hero-detail">
        <h2>{this.state.hero.name.toUpperCase()} Details</h2>
        <div><span>id: </span>{this.state.hero.id}</div>
        <div>
          <label>name:
            <input value={this.state.hero.name} onChange={this.handleChange} placeholder="name"/>
          </label>
        </div>
        <button onClick={this.goBack}>go back</button>
        <button onClick={this.save}>save</button>
      </div>
    );
  }
}

export default withRouter(HeroDetail);