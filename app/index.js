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
      label: 'Cueva Digital...'
    }
  }

  componentDidMount() {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
        if (xmlhttp.status === 200) {
          console.log(xmlhttp.responseText);
          this.processChange(JSON.parse(xmlhttp.responseText));
        } else if (xmlhttp.status === 400) {
          console.error('ERROR :(');
          this.setState({ isLoading: false, isError: true, label: 'Info no accesible' });
        } else {
          console.error('Unknown error');
          this.setState({ isLoading: false, isError: true, label: 'Info no accesible' });
        }
      }
    };

    xmlhttp.open("GET", "http://api.fixer.io/latest?base=USD", true);
    xmlhttp.send();
  }

  processChange(changeInfo) {
    const rates = changeInfo.rates;
    Object.keys(rates).map(function(moneda){
      console.log(moneda);
      console.log(rates[moneda]);
    })

    const base = changeInfo.base;
    const fecha = changeInfo.date;
    const real = changeInfo.rates.BRL;
    const dolarNeo = changeInfo.rates.NZD;
    const estado = changeInfo.current.condition.text;

    this.setState({
      label: 'Cueva Digital: ',
      monedaOriginal: base,
      fecha: fecha,
      cambioReal: real,
      cambioDolar: dolarNeo,
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
            <Cambio />
        </div>
      );
    }
  }
}

class Cambio extends Component{
  render(){

    return(
        <div>

        </div>

    );
  }
}



ReactDOM.render(<SimpleApp />, node);
