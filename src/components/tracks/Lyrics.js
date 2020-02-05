import React, { Component } from 'react';

import Spinner from "../layouts/Spinner";

import axios from 'axios';

class Lyrics extends Component {
    state = {
        track: [],
        lyrics: []
    };

    componentDidMount() {
        axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`)
        .then(res => {
            this.setState({lyrics: res.data.message.body.lyrics.lyrics_body});

            return axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`);
        })
        .then(res => {
            this.setState({track: res.data.message.body.track});
            console.log(res.data)
        })
        .catch(err => console.log(err));
    }
    
    render() {
        const { lyrics, track } = this.state;
        if(track === undefined || lyrics === undefined || Object.keys(track).length === 0 || Object.keys(track).length === 0) {
            return <Spinner />
        } else {
            return (
                <div className="col-md-6">
                    <div className="card mb-4 shawdow-lg">
                        <div className="card-body">
                            <h1><strong>Lyrics</strong></h1>
                        <br/>
                        <h2 className="title">{track.track_name}: {track.artist_name}</h2>
                            <p className="card-text">
                                {lyrics}
                            </p>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Lyrics;