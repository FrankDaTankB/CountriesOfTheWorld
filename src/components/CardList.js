import React from 'react';
import Card from './Card';



const CardList = ({ countries }) => {
  return(
    <div>
      {
        countries.map((name, i) => {
          return (
            <Card
              key={i}
              name={countries[i].name}
              region={countries[i].subregion}
              flag={countries[i].flag}
              population={countries[i].population}
            />
        );
      })
      }
    </div>
  );
}

export default CardList;
