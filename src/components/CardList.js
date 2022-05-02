import React from 'react';
import Card from './Card';



const CardList = ({ countries }) => {
  return(
    <div>
      {
        countries.map((item, i) => {
          return (
            <Card
              key={i}
              name={countries[i].name.common}
              region={countries[i].subregion}
              flag={countries[i].flags.svg}
              population={countries[i].population}
            />
        );
      })
      }
    </div>
  );
}

export default CardList;
