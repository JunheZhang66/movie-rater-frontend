import React, {useState, useEffect} from 'react';
import './App.css';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form';
import {useCookies} from 'react-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import useFetch from './hooks/useFetch';

function App() {

    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [editedMovie, setEditedMovie] = useState(null);
    const [token, setToken, deleteToken] = useCookies(['mr-token'])

    const [data, loading, err] = useFetch()

    useEffect(() =>{
        setMovies(data)
    }, [data])

    useEffect(() => {
        console.log(token)
        if(!token['mr-token']) window.location.href = '/'
    }, [token])
    
    const movieSelected = movie =>{
        setSelectedMovie(movie)
        setEditedMovie(null)
    }

    const editClicked = movie =>{
        setEditedMovie(movie)
        setSelectedMovie(null)
    }

    const movieUpdated = movie =>{
        const newMovies = movies.map(mov => {
            if (mov.id === movie.id){
                return movie;
            }
            return mov; 
        })
        setMovies(newMovies)
    }

    const newMovie = evt => {
        setEditedMovie({title:'', description:''})
        setSelectedMovie(null)
    }

    const movieCreated = movie => {
        const newMovies = [...movies, movie];
        setMovies(newMovies)
    }

    const removeClicked = movie => {
        const newMovies = movies.filter(mov => mov.id !== movie.id)
        setMovies(newMovies)
    }

    const logoutUser = () => {
        deleteToken('mr-token');
    }

    return ( 
        <div className = "App" >
            <header className = "App-header" >
                <h1>
                <FontAwesomeIcon icon={faFilm} />
                    <span> Movie Rater </span> 
                </h1>
                <FontAwesomeIcon icon={faSignOutAlt} onClick={evt => logoutUser()}/>
            </header> 
            <div className="layout">
                <div>
                    <MovieList 
                    movies={movies} 
                    movieClicked={movieSelected} 
                    editClicked={editClicked} 
                    removeClicked={removeClicked}/>
                    <button onClick={newMovie}>Create Movie</button>
                </div>
                <MovieDetails movie={selectedMovie} updateMovie={movieSelected} />
                {editedMovie?
                (<MovieForm movie={editedMovie} movieUpdated={movieUpdated} movieCreated={movieCreated}/>)
                :null}
                
            </div>
        </div>
    );
}

export default App;