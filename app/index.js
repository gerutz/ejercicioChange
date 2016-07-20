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
      label: 'Cueva Digital...',
      arrayObjetoMoneda : []
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
    const arrayMoneda = Object.keys(rates).map(function(moneda){
      return {
        nombre : moneda,
        valor : rates[moneda]
      };
    })

    console.log(arrayMoneda);

    this.setState({
      label: 'Cueva Digital: ',
      arrayObjetoMoneda : arrayMoneda,
      isLoading: false
    });
  };

  render() {

    let moneyArray = this.state.arrayObjetoMoneda.map(function(moneda){

      return <Cambio nombre={moneda.nombre} valor={moneda.valor}/>
    });

      return (
        <div>
            {moneyArray}
        </div>
      );
  }

}//end SimpleApp

class Cambio extends Component{
  render(){

    return(
        <div>
            <ul>
              <li>
                <span>Moneda : {this.props.nombre} </span>  <span> Cambio : {this.props.valor}</span>
              </li>
            </ul>
        </div>
    );
  }
}



ReactDOM.render(<SimpleApp />, node);
