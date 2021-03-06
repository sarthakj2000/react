import React, { Component, Fragment } from 'react'
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types'
import Repos from '../repos/Repos'
import {Link} from 'react-router-dom'
 class User extends Component {
    static propTypes={
        loading:PropTypes.bool,
        user:PropTypes.object.isRequired,
        getUser:PropTypes.func.isRequired,
        getUserRepos:PropTypes.func.isRequired,
        repos:PropTypes.array.isRequired,
    }
     componentDidMount(){
         this.props.getUser(this.props.match.params.login);
         this.props.getUserRepos(this.props.match.params.login);
     }
     
    render() {
        const {
            name,
            avatar_url,
            location,
            bio,
            blog,
            company,
            login,
            html_url,
            followers,
            following,
            public_repos,
            public_gists,
            hireable
        }=this.props.user;
        const {loading,repos}=this.props;
        if(loading){
            return <Spinner />
        }
        return (
            
            <Fragment>
                <Link to='/' class="btn btn-dark">Back to search</Link>
                Hireable:{' '}
                {hireable?(
                    <i className="fas fa-check text-success"></i>
                ):(<i className="fas fa-times-circle text-danger"></i>)
            }
            <div className="card grid-2">
                <div className="all-center">
                    <img src={avatar_url} className="round-img" alt="" style={{width:'150px'}}/>
                    <h1>{name}</h1>
                    <p>Location: {location}</p>
                </div>
                <div>
                    {bio && (
                    <Fragment>
                        <h1>Bio</h1>
                        <p>{bio}</p>
                    </Fragment>
                    )
                    }
                    <a href={html_url} className="btn btn-dark my-1">Visit Github Profile</a>
                    <ul>
                        <li>
                            {login && <Fragment>
                                    <strong>Username: </strong>{login}
                                </Fragment>}
                        </li>
                        <li>
                            {company && <Fragment>
                                    <strong>Company: </strong>{company}
                                </Fragment>}
                        </li>
                        <li>
                            {blog && <Fragment>
                                    <strong>Website: </strong>{blog}
                                </Fragment>}
                        </li>
                       
                    </ul>
                </div>
            </div>
            <div className="card text-center">
                <div className="badge badge-primary">Followers: {followers}</div>
                <div className="badge badge-success">Following: {following}</div>
                <div className="badge badge-light">Public Repos: {public_repos}</div>
                <div className="badge badge-dark">Public Gists: {public_gists}</div>
            </div>
            <Repos repos={repos}/>
            </Fragment>
        )
    }
}

export default User
