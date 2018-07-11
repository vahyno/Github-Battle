import React, {Component} from 'react';
import queryString from 'query-string';
import Api from '../utils/api';

class Results extends Component {

    
    componentDidMount(){
        let players = queryString.parse(this.props.location.search);
        Api.battle([
            players.playerOneName,
            players.playerTwoName
        ]).then(results=>{
            console.log(results);
        })
    }
    render(){
        return (
            <div>Results</div>
        )
    }
}

export default Results;