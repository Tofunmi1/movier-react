import React , {useState, useRef, useEffect} from 'react';
import './index.css';
import PropTypes from 'prop-types';
import axios from 'axios';

// const apiKey = '638b3be344c938b784d8f0fc4f84a603';

const MovieCard = (props) => {
  //props.movie.________ connects movieCard to movie
  return (
    <div className="movie">
      <figure className="movie__figure">
        <img
          src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${props.movie.poster_path}`}
          className="movie__poster"
        alt={props.movie.title}/>
        <figcaption>
          <span className="movie__vote">{props.movie.vote_average}</span>
        </figcaption>
        <h2 className="movie__title">{props.movie.title}</h2>
      </figure>
    </div>
  )
}

const Movies = ( {movies} ) => {
  return (
          <ul className='movies'>
            {movies.map(movie => (
                <li key={movie.id}>
                  <MovieCard movie={movie} />
                </li>
            ))}
          </ul>
  )
};

// Movies.propTypes = {
//   movies: PropTypes.arrayOf(PropTypes.object)
// }


//Our App
const App = () => {
  const [movieCard, setMovieCard] = useState([])
  //load ,setLoad for the changing input box
  const [load, setLoad] = useState(1)
  const query = useRef(null)
  
  useEffect (() =>{
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=638b3be344c938b784d8f0fc4f84a603`
  fetch (url)
          .then(response => response.json())
          .then(data => { 
            setMovieCard(data.results)
            setLoad(0)
            console.log(data)
          });
  }, [])

  const  searchMovie = (ev) =>  { 
    //Event listener for listening to type , because it is changing, anything changing is a state 
    let query = ev.target.value
    //if the spacings  are removed and the search box is empty
    if(query.trim() !== "" ) {
      const url = `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=638b3be344c938b784d8f0fc4f84a603`
  
      fetch (url)
      .then(response => response.json())
      .then(data => {
        setMovieCard(data.results)
        setLoad(0)
        console.log(data)
      });
    }
      
  }


  return (
    <>
    <form className='search'>
      <input 
      type='search' 
      className='input-field' 
      placeholder='Search for any movie' ref={query}
      onChange={searchMovie}/>
    {/* connect App to movies with movieCard state */}
    <div className='movies'>
        {load == 0  &&  <Movies movies={movieCard} className='movies'/> }
    </div> 
    </form>
    </>
  )
};

export default App;