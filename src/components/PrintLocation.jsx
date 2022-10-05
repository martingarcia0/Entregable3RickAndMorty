import React from 'react'

const PrintLocation = ({location}) => {
    


  return (
    <article>
        <h1>{location?.name}</h1>
        <ul>
            <li><span>Type: </span>{location?.name}</li>
            <li><span>Dimension: </span>{location?.dimension}</li>
            <li><span>Population: </span>{location?.residents.length}</li>
        </ul>
    </article>
  )
}

export default PrintLocation