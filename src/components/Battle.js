import React, {Component} from 'react';
import PropTypes from 'prop-types';


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
    render(){
        let playerOneName = this.state.playerOneName;
        let playerTwoName = this.state.playerTwoName;

        return(
            <div className='row'>
                {!playerOneName &&
                    <PlayerInput 
                        id='playerOne'
                        label = 'Player One'
                        onSubmit={this.handleSubmit}
                        />}

                {!playerTwoName &&
                    <PlayerInput 
                        id='playerTwo' 
                        label = 'Player Two'
                        onSubmit={this.handleSubmit}
                        />}
            </div>
        )
    }
}

export default Battle;
