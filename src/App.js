import React, { useState } from "react";
import {useEffect} from "react";
import './App.css';
import './MovieCard';
import MovieCard from "./MovieCard";
//b0c596fb api key

const API_URL="http://www.omdbapi.com?apikey=b0c596fb";


const App = ()=>{

    const [movies,SetMovies]=useState([]);
    const [searchTerm,SetSearchTerm]=useState("");
    const searchMovies = async(title)=>{
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json();
        SetMovies(data.Search);
    }
    useEffect(()=>{
        searchMovies({searchTerm});

    },[])

    return(
<div className="app">
    <h1>MovieLand</h1>
    <div className="search">
        <input placeholder="Search for movies" value={searchTerm} onChange={(e)=>{SetSearchTerm(e.target.value)}} />
        <img src="./images/search.png" alt="Search icon" onClick={()=>{searchMovies(searchTerm)}} />
    </div>

    {movies.length>0
        ?(
            <div className="container">
                {movies.map((movie)=>(
                    <MovieCard movie={movie} />
                ))}
            </div>
        )
        :
        (
            <div className="empty">
                <h2>No movies found</h2>
            </div>
        )
    }
 
</div>
    );
}

export default App;