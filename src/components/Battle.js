import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

function PlayerPreview (props) {
    return (
        <div>
            <div className='column'>
                <img
                    className='avatar'
                    src={props.avatar}
                    alt={`Avatar for ${props.username}`}
                />
                <h2 className='username'>@{props.username}</h2>
            </div>
            <button 
                className='reset'
                onClick={props.onReset.bind(null, props.id)}
            >
                Reset
            </button>
        </div>
    )
}

PlayerPreview.propTypes = {
    avatar: PropTypes.string.isRequred,
    username: PropTypes.string.isRequred,
    onReset: PropTypes.func.isRequred,
    id: PropTypes.string.isRequred,

}

class PlayerInput extends Component {
    state = {
        username: '',
    }

    handleChange = (event) => {
        let value = event.target.value;
        this.setState({
            username: value,
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.props.onSubmit(
            this.props.id,
            this.state.username
        )
    }

    render(){
        return (
            <form className='column' onSubmit={this.handleSubmit}>
                <label className='header' htmlFor='username'>
                    {this.props.label}
                </label>
                <input
                    id='username'
                    placeholder='github username'
                    type='text'
                    autoComplete='off'
                    value={this.state.username}
                    onChange={this.handleChange}
                />
                <button
                    className='button'
                    type='submit'
                    disabled={!this.state.username}>
                        Submit
                </button>        
            </form>
        )
    }
}

PlayerInput.propTypes = {
    id: PropTypes.string.isRequred,
    label: PropTypes.string.isRequred,
    onSubmit: PropTypes.func.isRequred,
}

class Battle extends Component {
    state = {
        playerOneName: '',
        playerTwoName: '',
        playerOneImage: null,
        playerTwoImage: null,
    }

    handleSubmit=(id, username)=> {
        this.setState(function () {
          var newState = {};
          newState[id + 'Name'] = username;
          newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200'
          return newState;
        });
    }

    handleReset=(id)=>{
        this.setState(function () {
            var newState = {};
            newState[id + 'Name'] = '';
            newState[id + 'Image'] = null;
            return newState;
          });
      }

    render(){
        let match = this.props.match;
        let playerOneName = this.state.playerOneName;
        let playerTwoName = this.state.playerTwoName;
        let playerOneImage = this.state.playerOneImage;
        let playerTwoImage = this.state.playerTwoImage;


        return(
            <div>
                <div className='row'>
                    {!playerOneName &&
                        <PlayerInput 
                            id='playerOne'
                            label = 'Player One'
                            onSubmit={this.handleSubmit}
                            />}

                    {playerOneImage !== null &&
                        <PlayerPreview 
                            avatar={playerOneImage}
                            username={playerOneName}
                            onReset={this.handleReset}
                            id='playerOne'
                        />}

                    {!playerTwoName &&
                        <PlayerInput 
                            id='playerTwo' 
                            label = 'Player Two'
                            onSubmit={this.handleSubmit}
                            />}

                    {playerTwoImage !== null &&
                        <PlayerPreview 
                            avatar={playerTwoImage}
                            username={playerTwoName}
                            onReset={this.handleReset}
                            id='playerTwo'
                        />}
                </div>

                {playerOneImage && playerTwoImage && 
                    <Link
                        className='button'
                        to={{
                            pathname: `${match.url}/results`,
                            search: `?playerOne=${playerOneName}&playerTwo=${playerTwoName}`
                        }}>
                        Battle
                    </Link>
                }
            </div>
        )
    }
}

export default Battle;
