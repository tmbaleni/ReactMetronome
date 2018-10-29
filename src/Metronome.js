import React, { Component } from 'react';
import click1 from './click1.wav';
import click2 from './click2.wav';

class Metronome extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            playing: false,
            count: 0,
            bpm: 70,
            beatsPerMeasure: 4
        }
        // Create Audio objects with the files Webpack loaded,
        // and we'll play them later.
        this.click1 = new Audio(click1);
        this.click2 = new Audio(click2);
    }
    handleBpmChange(e){
        const bpm = e.target.value;
        if (this.state.playing) {
            // Stop the old timer and start a new one
            clearInterval(this.timer);
            this.timer = setInterval(this.playClick, (60 / bpm) * 1000);
        
            // Set the new BPM, and reset the beat counter
            this.setState({
              count: 0,
              bpm
            });
          } else {
            // Otherwise just update the BPM
            this.setState({ bpm });
          }
    }
    handleClick = e => {
        // play audio when clicked
        this.click1.play();
        //toggle button text from play to stop
        if(this.state.playing){
            //clear timer
            clearInterval(this.timer);
            this.setState({playing: false})
        }else {
            //set timer
            this.timer = setInterval(
                //play stop sound
                this.playClick,
                (60 / this.state.bpm) * 1000
              );
            this.setState({playing: true}, this.playClick)
        }
    }
    playClick = () => {
        const { count, beatsPerMeasure } = this.state;

        // The first beat will have a different sound than the others
        if (count % beatsPerMeasure === 0) {
            this.click2.play();
          } else {
            this.click1.play();
          }
          this.setState(state => ({
            count: (state.count + 1) % state.beatsPerMeasure
          }));
    } 
    render(){
        const { playing, bpm } = this.state;
        return <div>
            <h2 className="title">React Metronome</h2>
            <h3 className="title">{bpm} BPM</h3>
            <input id='bpmSlider' type='range' min='60' max='240' value={bpm} step='1' onChange={this.handleBpmChange.bind(this)} />
            <button onClick={this.handleClick}>{playing?'Stop':'Start'}</button>
        </div>
    }
}

export default Metronome;