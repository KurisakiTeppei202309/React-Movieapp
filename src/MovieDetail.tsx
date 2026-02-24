import { useEffect,useState} from "react";
import { useParams } from "react-router";
import './MovieDetail.css';


type MoviedetailJson ={
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: null;
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string;
  id: string;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number
};

type Movie = {
  id: string;
  original_title: string;
  overview: string;
  poster_path: string;
  year: number;
  rating: number;
  runtime: number;
  score: number;
  genres: string[];  
};
// ここをモーダルにしたい
function MovieDetail(){
    const [movie , setMovie] = useState<Movie | null>(null);
    const {movieId} = useParams();

    const fetchMovieDetail =async () =>{
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?language=ja`,{
                headers:{
                    Authorization : `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
                },
            }
        );
        const data = (await response.json() )as MoviedetailJson;
        setMovie({
            id: data.id,
            original_title: data.title,
            poster_path: data.poster_path,
            year: Number(data.release_date.split("-")[0]),
            rating: data.vote_average,
            runtime: data.runtime,
            score: data.vote_count,
            overview: data.overview,
            genres: data.genres.map((genre : {id:number; name:string;}) => genre.name),
        });
    };
    useEffect(()=>{
        fetchMovieDetail();
    },[movieId]);


    
    return (
    <div>
        {/* movieというデータがあれば以下を表示＞＞ */}
        {movie && (
        <div>
          <h2>{movie.original_title}</h2>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.original_title}
          />
          <h3>概要</h3>
          <p>{movie.overview}</p>
          <p>公開年：{movie.year}年</p>
          {/* <p>{movie.rating}</p> */}
          <p>上映時間：{movie.runtime}分</p>
          {/* <p>{movie.score}</p> */}
          <p>ジャンル：{movie.genres}</p>
        </div>
        )}
    </div>
    );
};

export default MovieDetail