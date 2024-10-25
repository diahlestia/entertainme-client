import React, { useState } from 'react';
import { Card, CardDeck } from 'react-bootstrap';


function SeriesComponent({title, data, loading, error}) {

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div>
        <h2 style={{marginLeft: 20}}>{title}</h2>
        <CardDeck className="ml-2">
          {
            data.getTvSeries.map((series) => (
              <Card key={series._id}  border="dark">
                <Card.Img variant="top" src={series.poster_path} alt={series.title}  className="thumbnail h-50 d-inline-block mw-100" />
                <Card.Body>
                  <Card.Title style={{textAlign: "center"}}>{series.title}</Card.Title>
                  {series.overview}
                </Card.Body>
                {/* <Card.Footer>
                <BsPencilSquare style={{cursor:"pointer", marginRight: "35px"}} onClick={() => toUpdate(movie._id)} >
                    </BsPencilSquare>
                    <BsTrash style={{cursor:"pointer", marginRight: "35px"}} onClick={() => toDelete(movie._id)}>
                    </BsTrash>
                    <BsHeart style={{cursor:"pointer"}} />
                </Card.Footer> */}
              </Card>
            ))
          }
        </CardDeck>
    </div>
  );
}


export default SeriesComponent;