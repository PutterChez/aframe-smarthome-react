import React, { Component } from 'react';
import { ReactMic } from 'react-mic';
import App from './App';

const axios = require('axios');
const toWav = require('audiobuffer-to-wav');

class RecordPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false,
      audioLink: "",
      speech: "",
      apiUrl: "https://140a48e12222.ngrok.io/",
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
    // console.log('This function does not return an object, but is called at a time interval of 10ms');
  }

  onStop(recordedBlob) {
    console.log('recordedBlob is: ', recordedBlob);

    console.log('sending blob to server..');

  
    var apiUrl = this.state.apiUrl;
    
    const reader = new window.FileReader();
    reader.readAsDataURL(recordedBlob.blob);
    reader.onloadend = () => {
      let base64 = reader.result + '';
      base64 = base64.split(',')[1];
      const ab = new ArrayBuffer(base64.length);
      const buff = new Buffer.from(base64, 'base64');
      const view = new Uint8Array(ab);
      for (let i = 0; i < buff.length; ++i) {
        view[i] = buff[i];
      }
      const context = new AudioContext();
      context.decodeAudioData(ab, (buffer) => {
      const wavFile = toWav(buffer);
      const blob = new window.Blob([ new DataView(wavFile) ], {
        type: 'audio/wav'
      });

      var fd = new FormData();
      fd.append('file', blob);
      
      var self = this;
      axios({
        method: 'post',
        url: apiUrl + '/mock/audio/',
        data: fd,
        processData: false,
        contentType: false
      }).then(function(data) {
        console.log(data);
        self.setState({speech: '' + data.data});
      });

    })}

    
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
          // strokeColor="#000000"
          // backgroundColor="#FF4081" 
          mimeType="audio/wav" />
        {/* <button onClick={this.startRecording} type="button">Start</button>
        <button onClick={this.stopRecording} type="button">Stop</button>
        <a href={this.state.audioLink}> Click for audio</a>
        <h1> Speech recognition: {this.state.speech}</h1> */}
        <App url={this.state.apiUrl} recordStart={this.startRecording} recordStop={this.stopRecording}></App>
      </div>
    );
  }
}

export default RecordPage;