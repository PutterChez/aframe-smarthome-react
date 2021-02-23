import React, { Component } from 'react';
import { ReactMic } from 'react-mic';

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
    this.setState({audioLink: '' + recordedBlob.blobURL});

    console.log('sending blob to server..');
    var fd = new FormData();
    var apiUrl = "127.0.0.1:8000/mock/audio/Test"
    fd.append('audio', recordedBlob);
  
    fetch(apiUrl + '/api/createAudio', {
      headers: { Accept: "application/json" },
      method: "POST", body: fd
    });
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
          mimeType="audio/mp3" />
        <button onClick={this.startRecording} type="button">Start</button>
        <button onClick={this.stopRecording} type="button">Stop</button>
        <a href={this.state.audioLink}> Click for audio</a>
      </div>
    );
  }
}

export default RecordPage;