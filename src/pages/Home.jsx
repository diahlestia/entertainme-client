import React, { useState } from 'react';
import MovieComponent from '../components/Movie';
import SeriesComponent from '../components/Series';
import EditMovie from '../pages/EditMovie'
import { gql, useQuery } from '@apollo/client';


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

const GET_SERIES = gql`
  query getTvSeries {
    getTvSeries {
        _id
        title
        overview
        poster_path
        tags
    }
    }
`;

function Home() {

  const { loading: loadingMovies, error: errorMovies, data: dataMovies } = useQuery(GET_MOVIE);
  const { loading: loadingSeries, error: errorSeries, data: dataSeries } = useQuery(GET_SERIES);

  return (
    <div className="row">
      {/* <h2>Home, My first Apollo app 🚀</h2> */}
      <MovieComponent title="Movies"  data={dataMovies} loading={loadingMovies} error={errorMovies} />
      <SeriesComponent title="Series" data={dataSeries} loading={loadingSeries} error={errorSeries} />
    </div>
  );
}


export default Home;