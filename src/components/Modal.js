import '../styles/modal.css';
import Map from './Map';

const Modal = ({ handleClose, show, country, summary, lat, lng, zoom, onMapViewChange }) => {
  const showHideClassName = show ?
    "modal display-block"
    : "modal display-none";


  const url = summary.content_urls ? summary.content_urls.desktop.page : ''

  let map;

  if(country.latlng) {
    map =  <Map
    lat={lat}
    lng={lng}
    clat={country.latlng[0]}
    clng={country.latlng[1]}
    onMapViewChange={onMapViewChange}
    zoom={zoom}
  />
  } else {
    map = <p>No map Data</p>
  }

  return (
    <div className={showHideClassName}>
      <section className='modal-main bg-light-blue br3 pa3 ma2 shadow-5 tc'>
        <h1>{country.name}</h1>
        {country.capital ?
        <p>Capital City: {country.capital}</p>
        : <p>Capital City: No capital city data</p>
        }
        {country.currencies ? 
        <p>Currency: {country.currencies[0].name}({country.currencies[0].symbol})</p>
        : <p>Currency: No currency data</p>
        }
        <ul> Languages
          {country.languages.map((item, i) => {
            return <li>Name: {country.languages[i].name} Native Name: {country.languages[i].nativeName}</li>
          })
          }
        </ul>
        <p>{summary.extract}(via <a href={url} target='_blank' rel='noreferrer'>wikipedia</a>)</p>
         {map}
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </section>
    </div>
  );
};

export default Modal;