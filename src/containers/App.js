import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/searchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import Modal from '../components/Modal';
import './App.css';



class App extends Component {
  constructor() {

    super()
    this.state = {
      countries: [],
      searchfield: '',
      countryNumber: 0,
      country: [],
      showModal: false,
      countrySummary: '',
      lat: 0,
      lng: 0,
      zoom: 0
    }
  }

  componentDidMount() {
    fetch('https://restcountries.com/v2/all')
      .then(res => res.json())
      .then((data) => {
        this.setState({ 
          countries: data,
          countryNumber: data.length,
          country: data[13]
         })
      })
      .catch(console.log)
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value });
  }

  setModal = ({ currentTarget }) => {
    let name = currentTarget.getAttribute('id')
    let obj = this.state.countries.find(o => o.name === name);
    this.setState({ 
      country: obj,
      showModal: true
    })
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${name}`)
    .then(res => res.json())
    .then((data)=>{
      this.setState({countrySummary: data})
    })
  }

  closeModal = () => {
    this.setState({ showModal: false })
  }

  handleMapViewChange = (zoom, lat, lng) => {
    this.setState({
      lat,
      lng,
      zoom
    })
  }

  render() {
    const { countries, searchfield, countryNumber, country, showModal, countrySummary, lng, lat, zoom } = this.state;
    const filteredCountries = countries.filter(input => {
      return input.name.toLocaleLowerCase().includes(searchfield.toLocaleLowerCase());
    })

    let modal;

    if (showModal) {
      modal = <Modal 
      show={showModal} 
      handleClose={this.closeModal} 
      country={country} 
      summary={countrySummary}
      lat={lat}
      lng={lng}
      onMapViewChange={this.handleMapViewChange}
      zoom={zoom}
      />
    }
    return !countries.length ?
      <h1>Loading</h1> :
      (
        <div className='tc'>
          <h1 className='f1'>Countries of the World</h1>
          <SearchBox searchChange={this.onSearchChange} number={countryNumber} />
          <Scroll>
            <ErrorBoundry>
              <CardList countries={filteredCountries} setModal={this.setModal} />
              {modal}
            </ErrorBoundry>
          </Scroll>
        </div>
      );
  }
}

export default App;
