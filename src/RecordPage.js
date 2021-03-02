import React, { Component } from 'react';
import { ReactMic } from 'react-mic';

const axios = require('axios');

class RecordPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false,
      audioLink: ""
    }

    this.onStop = this.onStop.bind(this);
  }

  startRecording = () => {
    this.setState({
      record: true
    });
  }

  stopRecording = () => {
    this.setState({
      record: false
    });
  }

  onData(recordedBlob) {
    console.log('This function does not return an object, but is called at a time interval of 10ms');
  }

  onStop(recordedBlob) {
    console.log('recordedBlob is: ', recordedBlob);

    console.log('sending blob to server..');

  
    var apiUrl = "https://bd7fc827ac09.ngrok.io"
    
    var fd = new FormData();
    fd.append('fname', 'test.wav');
    fd.append('data', recordedBlob.blob);

    axios({
      method: 'post',
      url: apiUrl + '/mock/audio/',
      data: fd,
      processData: false,
      contentType: false
    }).then(function(data) {
      console.log(data);
    });

    this.setState({audioLink: '' + recordedBlob.blobURL});
  }

  render() {
    return (
      <div>
        <ReactMic
          record={this.state.record}
          className="sound-wave"
          onStop={this.onStop}
          onData={this.onData}
          strokeColor="#000000"
          backgroundColor="#FF4081" 
          mimeType="audio/wav" />
        <button onClick={this.startRecording} type="button">Start</button>
        <button onClick={this.stopRecording} type="button">Stop</button>
        <a href={this.state.audioLink}> Click for audio</a>
      </div>
    );
  }
}

export default RecordPage;