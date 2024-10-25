import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  makeVar
} from "@apollo/client";

const defaultValue = [
  {
    title: "Moana",
    overview: "Beach girl",
    poster_path: "https://ae01.alicdn.com/kf/HTB1emlJAfuSBuNkHFqDq6xfhVXaQ/Kustom-Kanvas-Lukisan-Dinding-Moana-Poster-Moana-Maui-Stiker-Dinding-Kartun-Film-Vaiana-Wallpaper-Dekorasi-Kamar.jpg",
    tags: ["Adventure", "Animation"]
  }
]

export const favorites = makeVar(defaultValue)

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache({
    typePolicies: { 
      Query: {
        fields: { 
          favorites: { 
            read() { 
              return favorites()
            }
          }
        }
      }
    }
  })
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
