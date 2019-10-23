import React, {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/searchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';



class App extends Component {
  constructor() {

    super()
    this.state = {
      countries: [],
      searchfield: ''
    }
  }

  componentDidMount() {
        fetch('https://restcountries.eu/rest/v2/all')
        .then(res => res.json())
        .then((data) => {
          this.setState({ countries: data })
        })
        .catch(console.log)
      }


  onSearchChange = (event) => {
    this.setState({searchfield: event.target.value});
  }

  render() {
    const { countries, searchfield } = this.state;
    const filteredCountries = countries.filter(country =>{
      return country.name.toLowerCase().includes(searchfield.toLowerCase());
    })
    return !countries.length ?
    <h1>Loading</h1> :
    (
      <div className='tc'>
        <h1 className='f1'>Countries of the World</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <Scroll>
          <ErrorBoundry>
            <CardList countries={filteredCountries} />
          </ErrorBoundry>
        </Scroll>
      </div>
    );
  }
}

export default App;
