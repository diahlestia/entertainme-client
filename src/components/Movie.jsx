import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom'
import '../Row.css'
import { BsPencilSquare, BsTrash, BsHeart } from "react-icons/bs";
import { Card, CardDeck } from 'react-bootstrap';
import { favorites } from '../index'

const DELETE_MOVIE = gql`
  mutation deleteMovie($_id: ID){
    deleteMovie(_id: $_id) {
      message
    }
  }
`;


const GET_MOVIE = gql`
  query getMovies {
    getMovies {
        _id
        title
        overview
        poster_path
        tags
    }
  }
`;


function MovieComponent({title, data, loading, error}) {

const [deleteMovie] = useMutation(DELETE_MOVIE);

const history = useHistory()

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const toUpdate = (id) => {
    history.push("/update/" + id)
  }

  const toDelete = (_id) => {
    deleteMovie(
      { 
        variables: { _id },
        refetchQueries: [
          {query: GET_MOVIE}
        ]
      }
    )
  }

  const toFavorites = (favMovie) => {
    let currentFavorites = favorites()
    let newFavorites = [...currentFavorites, favMovie]
    favorites(newFavorites)
  }

  return (
    <div>
        <h2 style={{marginLeft: 20}}>{title}</h2>
        <CardDeck className="ml-2">
          {
            data.getMovies.map((movie) => (
              <Card key={movie._id}  border="dark">
                <Card.Img variant="top" src={movie.poster_path} alt={movie.title}  className="thumbnail h-50 d-inline-block mw-100" />
                <Card.Body>
                  <Card.Title style={{textAlign: "center"}}>{movie.title}</Card.Title>
                  {movie.overview}
                </Card.Body>
                <Card.Footer className="d-flex justify-content-around">
                <BsPencilSquare style={{cursor:"pointer",}} onClick={() => toUpdate(movie._id)} >
                    </BsPencilSquare>
                    <BsTrash style={{cursor:"pointer",}} onClick={() => toDelete(movie._id)}>
                    </BsTrash>
                    <BsHeart style={{cursor:"pointer"}} onClick={() => toFavorites(movie)} />
                </Card.Footer>
              </Card>
            ))
          }
        </CardDeck>
        {/* <div className="row_poster">
        
          
            <div >
                <img 
                    className="row_poster"
                    
                />
                <div className="btn">
                
                </div>
              </div>

        
        </div> */}
    </div>
  );
}


export default MovieComponent;