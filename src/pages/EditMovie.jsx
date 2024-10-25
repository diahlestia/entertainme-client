import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, gql, useLazyQuery } from "@apollo/client"
import { Button, Form } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom'

const GET_MOVIE_BY_ID = gql`
  query getMovieById($_id: ID) {
    getMovieById(_id: $_id) {
        _id
        title
        overview
        poster_path
        tags
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

const UPDATE_MOVIE = gql`

    mutation updateMovie(
        $_id: ID,
        $title: String,
        $overview: String,
        $poster_path: String,
        $popularity: String,
        $tags: [String]) {
    updateMovie(
        _id: $_id,
        title: $title,
        overview: $overview,
        poster_path: $poster_path,
        popularity: $popularity,
        tags: $tags
     ) {
        message
        }
    }
`;

function UpdateMovie() {

const { id } = useParams()
const [updateMovie, {data: updatedMovie}] = useMutation(UPDATE_MOVIE)
const { loading, error, data } = useQuery(GET_MOVIE_BY_ID, { variables: { _id: id } });
const [editData, setEditData] = useState({})
const history = useHistory()

console.log(data, "data")

const [inputData, setInputData] = useState({
    title: '',
    overview: '',
    poster_path: '',
    popularity: '',
    tags: []
})
useEffect(() => {
    if (data) {
        setEditData(data);
    }
}, [data])

console.log(editData, "edit data")    
console.log(loading)
    if (loading) return <p>Loading ...</p>
    if (error) return `Error! ${error.message}`;


const submitMovie = (e) => {
    e.preventDefault()
    updateMovie(
        {   variables: {
                _id: id,
                title: inputData.title,
                overview: inputData.overview,
                poster_path: inputData.poster_path,
                popularity: inputData.popularity,
                tags: inputData.tags
            },
            refetchQueries: [
                {query: GET_MOVIE}
            ]   
        }
    )
    history.push("/")
}
    

  return (
    <div>
        <h2 style={{textAlign: "center", justifySelf: "center"}}>Update Movie</h2>
        <div>
            <p>{!loading && JSON.stringify(data)}</p>
        <Form 
        onSubmit={submitMovie}
        className="col-md-4 col-md-offset-4"
        >   
            <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" 
                value={data.getMovieById.title} 
                onChange={(e) => setInputData({...inputData, title: e.target.value})} 
                />
            </Form.Group>

            <Form.Group controlId="overview">
                <Form.Label>Overview</Form.Label>
                <Form.Control type="text" 
                value={data.getMovieById.overview}
                onChange={(e) => setInputData({...inputData, overview: e.target.value})} 
                />
            </Form.Group>
            <Form.Group controlId="poster_path">
                <Form.Label>Poster Path</Form.Label>
                <Form.Control type="text" 
                value={data.getMovieById.poster_path}
                onChange={(e) => setInputData({...inputData, poster_path: e.target.value})} 
                />
            </Form.Group>
            <Form.Group controlId="popularity">
                <Form.Label>Popularity</Form.Label>
                <Form.Control type="text" 
                value={data.getMovieById.popularity}
                onChange={(e) => setInputData({...inputData, popularity: e.target.value})} 
                />
            </Form.Group>
           
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
        </div>
    </div>
  );
}


export default UpdateMovie;