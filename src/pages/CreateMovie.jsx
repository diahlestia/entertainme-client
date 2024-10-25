import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, gql } from "@apollo/client"
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'
import InputTag from '../components/InputTag'



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

const ADD_MOVIE = gql`
    mutation createMovie($title: String,
        $overview: String,
        $poster_path: String,
        $popularity: String,
        $tags: [String]) {
    createMovie(title: $title,
        overview: $overview,
        poster_path: $poster_path,
        popularity: $popularity,
        tags: $tags) {
        title
        overview
        poster_path
        popularity
        tags
  }
}
`;

function CreateMovie() {

const history = useHistory()

const [createMovie, {data}] = useMutation(ADD_MOVIE)
const [inputData, setInputData] = useState({
    title: '',
    overview: '',
    poster_path: '',
    popularity: '',
    tags: []
})
//   if (loading) return 'Loading...';
const submitMovie = (e) => {
    e.preventDefault()
    createMovie(
        { variables: 
            {
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
        <h2 style={{textAlign: "center", justifySelf: "center"}}>Create New Movie</h2>
        <div>
        <Form onSubmit={submitMovie}
            className="col-md-4 col-md-offset-4"
        >
            <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter title" 
                onChange={(e) => setInputData({...inputData, title: e.target.value})} />
            </Form.Group>

            <Form.Group controlId="overview">
                <Form.Label>Overview</Form.Label>
                <Form.Control type="text" placeholder="Enter overview" 
                onChange={(e) => setInputData({...inputData, overview: e.target.value})} />
            </Form.Group>
            <Form.Group controlId="poster_path">
                <Form.Label>Poster Path</Form.Label>
                <Form.Control type="text" placeholder="Enter poster image" 
                onChange={(e) => setInputData({...inputData, poster_path: e.target.value})} />
            </Form.Group>
            <Form.Group controlId="popularity">
                <Form.Label>Popularity</Form.Label>
                <Form.Control type="text" placeholder="Enter popularity" 
                onChange={(e) => setInputData({...inputData, popularity: e.target.value})} />
            </Form.Group>
            <Form.Group controlId="tags">
                <Form.Label>Tags</Form.Label>
                <InputTag 
                onChange={(e) => setInputData({...inputData, tags: [...inputData.tags, e.target.value]})}
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


export default CreateMovie;