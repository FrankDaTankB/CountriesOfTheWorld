import React from 'react';

function Card( { flag, name, region, population, setModal } ){
  return(
    <div 
    className='bg-light-blue dib br3 pa3 ma2 grow shadow-5 tc'
    id={name}
    onClick={setModal}
    >
      <img className="h3 w4" alt='countryFlag' src={flag}/>
      <div>
        <h2>{name}</h2>
        <p>{region}</p>
        <p>Population: {population}</p>
      </div>
    </div>
  );
}

export default Card;
