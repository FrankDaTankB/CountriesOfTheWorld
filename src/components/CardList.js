import React from 'react';
import Card from './Card';



const CardList = ({ countries, setModal }) => {
  return(
    <div>
      {
        countries.map((item, i) => {
          return (
            <Card
              key={i}
              name={countries[i].name}
              region={countries[i].subregion}
              flag={countries[i].flags.svg}
              population={countries[i].population}
              setModal={setModal}
            />
        );
    })
      }
    </div>
  );
}

export default CardList;
