import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Card, CardDeck } from 'react-bootstrap';

const FETCH_FAVORITES = gql`
    query fetch_favorites {
        favorites @client
    }
`;

function Favorites() {

const {loading, error, data} = useQuery(FETCH_FAVORITES)

  return (
    <div>
        <h2 style={{textAlign: "center", justifySelf: "center"}}>Favorite Movie</h2>
        <CardDeck className="ml-2">
            {/* <p2>{JSON.stringify(data)}</p2> */}
          {
            data.favorites.map((favorite) => (
              <Card key={favorite._id}  border="dark">
                <Card.Img variant="top" src={favorite.poster_path} alt={favorite.title}  className="thumbnail h-50 d-inline-block mw-50" />
                <Card.Body>
                  <Card.Title style={{textAlign: "center"}}>{favorite.title}</Card.Title>
                  {favorite.overview}
                </Card.Body>
              </Card>
            ))
          }
        </CardDeck>
    
    </div>
  );
}


export default Favorites;