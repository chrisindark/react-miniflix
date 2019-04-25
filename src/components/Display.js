import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CloudinaryContext, Transformation, Video } from 'cloudinary-react';
import axios from 'axios';
import { isLoggedIn } from '../utils/AuthService';
import Nav from './Nav';

class Display extends Component {
  state = {
    videos: []
  };

  getVideos() {
    axios.get('http://res.cloudinary.com/chrisindark/video/list/miniflix.json')
      .then(res => {
        console.log(res.data.resources);
        this.setState({ videos: res.data.resources});
      });
  }

  componentDidMount() {
    this.getVideos();
  }

  render() {
    const { videos } = this.state;

    return (
      <div>
        <Nav />
        <h3 className="text-center"> Latest Videos on Miniflix </h3>
        <hr/>

        <div className="col-sm-12">
          <CloudinaryContext cloudName="chrisindark">
            { videos.map((data, index) => (
              <div className="col-sm-4" key={index}>
                <div className="embed-responsive embed-responsive-4by3">
                  <Video publicId={data.public_id} width="300" height="300" controls></Video>
                </div>
                <div> Created at {data.created_at} </div>

              </div>
            )) }
          </CloudinaryContext>
        </div>
      </div>
    );
  }
}

export default Display;
