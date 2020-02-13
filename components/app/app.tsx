import * as React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { increment, setCounter, reset } from "../../actions/app";
import { fetchPokemon } from "../../actions/async/pokemon";

import { ApplicationStateType, ApplicationActionsType } from "../../types";
import {
  AppStateType,
  IncrementActionType,
  SetCounterActionType,
  ResetActionType
} from "../../types/appTypes";
import { PokemonStateType } from "../../types/pokemonTypes";
import { AsyncActionType } from "../../actions/async/async-action-creator";
import { Dispatch } from "redux";

interface componentState {
  value: number,
  number: number
}

interface componentProps {
  app: AppStateType,
  increment: () => IncrementActionType,
  setCounter: (param: number) => SetCounterActionType,
  reset: () => ResetActionType,
  pokemon: PokemonStateType,
  fetchPokemon: (param: number) => AsyncActionType
}

class App extends React.Component<componentProps, componentState>{
  constructor(props) {
    super(props);

    this.state = {
      value: 0,
      number: 1
    }
  }

  incrementComponentState(): void {
    this.setState({
      value: this.state.value + 1
    });
  }

  resetComponentState(): void {
    this.setState({
      value: 0
    })
  }

  changeNumber(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      number: parseInt(event.target.value)
    })
  }

  search(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    this.props.fetchPokemon(this.state.number)
  }

  render() {
    return (
      <div>
        <h1>React redux with typescript</h1>
        <h3>Example with component state.</h3>
        <label>Counter : {this.state.value} </label>
        <button
          onClick={this.incrementComponentState.bind(this)}>Increment</button>
        <button
          onClick={this.resetComponentState.bind(this)}>Reset</button>

        <h3>Example with redux state.</h3>
        <label>counter: {this.props.app.counter} </label>
        <button
          onClick={() => this.props.increment()}>Increment</button>
        <button
          onClick={() => this.props.setCounter(22)}>Set counter to 22</button>
        <button onClick={() => this.props.reset()}>Reset</button>
        <hr />

        <div>
          <form onSubmit={(event) => { this.search(event) }}>
            <label>Get data for number </label>
            <input type="number"
              placeholder="Eg. 1"
              onChange={(event) => { this.changeNumber(event) }} />
            <button type="submit">Search</button>
          </form>
          <br />
          <p>Note: <small>As pokemon api is public api. sometimes it fails.</small></p>
          <br />
          <div>
            {this.props.pokemon.loading ? ("Loading...") : (null)}
            {this.props.pokemon.error ? (this.props.pokemon.error) : (null)}
            {this.props.pokemon.data &&
              !this.props.pokemon.loading &&
              !this.props.pokemon.error ? (
                <div>
                  <label>Id : {this.props.pokemon.data.id}</label>
                  <br />
                  <label>Name : {this.props.pokemon.data.name}</label>
                </div>) :
              (null)
            }
          </div>
        </div>
      </div>
    )
  }
}

export const mapStateToProps = (state: ApplicationStateType) => {
  return {
    app: state.appReducer,
    pokemon: state.pokemonReducer
  };
};

export const mapDispatchToProps = (dispatch:
  Dispatch<ApplicationActionsType, ApplicationStateType>) => {
  return bindActionCreators(
    {
      increment,
      setCounter,
      reset,
      fetchPokemon
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);