import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../utils/api';
import Loading from './Loading';

function SelectLanguage (props)  {
    let languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
    return (
        <ul className='languages'>
            {languages.map(lang=>{
                return (
                    <li 
                        style={lang === props.selectedLanguage ? {color : '#d0021b'}: null }
                        onClick={props.onSelect.bind(null, lang)}
                        key={lang}>
                        { lang }
                    </li>)
                })
            }
        </ul>
    )
}

SelectLanguage.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
}

function RepoGrid (props) {
    return (
        <ul className='popular-list'>
            {props.repos.map((repo,idx)=>{
                return (
                    <li key={repo.name} className='popular-item'>
                        <div className='popular-rank'>#{idx + 1}</div>
                        <ul className='space-list-items'>
                            <li>
                                <img 
                                className='avatar'
                                src={repo.owner.avatar_url}
                                alt={`Avatar for ${repo.owner.login}`} />
                            </li>
                            <li><a href={repo.html_url}>{repo.name}</a></li>
                            <li>@{repo.owner.login}</li>
                            <li>{repo.stargazers_count} stars</li>
                        </ul>
                    </li>
                )
            })}
        </ul>
    )
}

RepoGrid.propTypes = {
    repos: PropTypes.array.isRequired,
}

class Popular extends Component {
    state = {
        selectedLanguage: 'All',
        repos: null,
    }

    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage);
    }
    
    updateLanguage = (lang) => {
        this.setState({
            selectedLanguage: lang,
            repos: null,
        });

        api.fetchPopularRepos(lang)
        .then(repos=>{
            this.setState({
                repos,
            })
        });

    }

    render() {
        return (
            <div>
                <SelectLanguage
                    selectedLanguage={this.state.selectedLanguage}
                    onSelect = {this.updateLanguage} 
                />
                {!this.state.repos ? <Loading /> : 
                <RepoGrid 
                    repos={this.state.repos} 
                />}
            </div>
        )
    };
}

export default Popular;