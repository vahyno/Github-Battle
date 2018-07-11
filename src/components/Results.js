import React, {Component} from 'react';
import queryString from 'query-string';
import Api from '../utils/api';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import PlayerPreview from './PlayerPreview';

const Profile = (props) => {
    var info = props.info;
    return (
        <PlayerPreview username={info.login} avatar={info.avatar_url}>
            <ul className='space-list-items'>
                {info.name && <li>{info.name}</li>}
                {info.location && <li>{info.location}</li>}
                {info.company && <li>{info.company}</li>}
                <li>Followers: {info.followers}</li>
                <li>Following: {info.following}</li>
                <li>Public Repos: {info.public_repos}</li>
                {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
            </ul>
        </PlayerPreview>
    )
}

Profile.propTypes = {
    info: PropTypes.object.isRequired,
}

const Player = (props) => {
    return (
        <div>
            <h1 className='header'>{props.label}</h1>
            <h3 style={{textAlign: 'center'}}>Score: {props.score}</h3>
            <Profile info={props.profile} />
        </div>
    )
}

Player.propTypes = {
    label: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    profile: PropTypes.object.isRequired,

}

class Results extends Component {
    state = {
        winner: null,
        loser: null,
        error: null,
        loading: true,
    }

    componentDidMount(){
        let players = queryString.parse(this.props.location.search);
        Api.battle([
            players.playerOneName,
            players.playerTwoName
        ]).then(results=>{
            if (results === null) {
                return this.setState({
                    error: 'Looks like there was error. Check that both users exist on Github.',
                    loading: false,
                });
            }
            this.setState({
                error: null,
                winner: results[0],
                loser: results[1],
                loading: false,
            });
        }); 
    }
    render(){
        var error = this.state.error;
        var winner = this.state.winner;
        var loser = this.state.loser;
        var loading = this.state.loading;

        if (loading === true) {
            return (
                <p>Loading</p>
            )
        }

        if (error) {
            return (
                <div>
                    <p>{error}</p>
                    <Link to='/battle'>Reset</Link>
                </div>
            )
        }

        return (
            <div className='row'>
                <Player 
                    label='Winner'
                    score={winner.score}
                    profile={winner.profile}
                />
                <Player 
                    label='Loser'
                    score={loser.score}
                    profile={loser.profile}
                />
            </div>
        )
    }
}

export default Results;