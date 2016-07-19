import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import styles from './styles';

const node = document.getElementById('content');

class SimpleApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ciudad: '',
      temp: '',
      sensacion: '',
      estado: '',
      isLoading: true,
      isError: false,
      label: 'Cargando...'
    }
  }

  componentDidMount() {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
        if (xmlhttp.status === 200) {
          this.processWeather(JSON.parse(xmlhttp.responseText));
        } else if (xmlhttp.status === 400) {
          console.error('ERROR :(');
          this.setState({ isLoading: false, isError: true, label: 'Info no accesible' });
        } else {
          console.error('Unknown error');
          this.setState({ isLoading: false, isError: true, label: 'Info no accesible' });
        }
      }
    };

    xmlhttp.open("GET", "http://api.apixu.com/v1/current.json?key=124c02f5469e4f2f97f140231161907&q=Buenos%20Aires", true);
    xmlhttp.send();
  }

  processWeather(weatherInfo) {
    const name = weatherInfo.location.name;
    const temp = weatherInfo.current.temp_c;
    const sens = weatherInfo.current.feelslike_c;
    const estado = weatherInfo.current.condition.text;

    this.setState({
      label: 'Clima en: ',
      ciudad: name,
      temp: temp,
      sensacion: sens,
      estado: estado,
      isLoading: false
    });
  };

  render() {
    if (this.state.isLoading || this.state.isError) {
      return (
        <h1> {this.state.label } </h1>
      );
    } else {
      return (
        <div>
          <h1>{ this.state.label } </h1>
          <span> { this.state.ciudad } </span><br />
          <span> Temperatura: { this.state.temp } C </span><br />
          <span> Sensación Termica: {this.state.sensacion } C </span><br />
          <span> Estado: { this.state.estado } </span><br />
        </div>
      );
    }
  }
}

ReactDOM.render(<SimpleApp />, node);
