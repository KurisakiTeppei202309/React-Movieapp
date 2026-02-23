import './App.css';
import { Link } from 'react-router';

type Movie ={
    id : string;
    poster_path : string ;
    original_title : string;
}
type Props ={
    movie :Movie;
}
const MovieCard =(props : Props) =>{
    const { movie } = props ;
    return (
        <Link to ={`/movies/${movie.id}`} key={movie.id}>
          <h2>{movie.original_title}</h2>
          <img src ={`https://media.themoviedb.org/t/p/w300_and_h450_face${movie.poster_path} `}/>
        </Link>  
    )
}

export default MovieCard
