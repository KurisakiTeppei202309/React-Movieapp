import { useEffect, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import MovieCard from './MovieCard';

type Movie = {
  id : string;
  original_title : string;
  poster_path : string;
  overview : string;
};

type MovieJson = {
  adult : boolean;
  backdrop_path : string;
  genre_id : number[];
  id : number;
  original_language : string;
  original_title : string;
  overview : string ;
  popularity : string;
  poster_path : string;
  releace_date : string;
  title : string;
  video : boolean;
  vote_avarage : number;
  vote_count : number;
};

function App() {
  const fetchMovieList = async(searchKeyword = "")=>{
    let url = "";
    if (searchKeyword){
      url = `https://api.themoviedb.org/3/search/movie?query=${searchKeyword}&include_adult=false&language=ja&page=1`;
    }else{
      url = "https://api.themoviedb.org/3/movie/popular?language=ja&page=1";
    }

    // 処理が完了するまで待つawait
    const response = await fetch(url ,{
        headers:{
          Authorization : `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
        },
      }
    )
    const data = await response.json();
    // ???
    setMovieList(data.results.map((movie : MovieJson)=>({
      id : movie.id,
      original_title : movie.original_title,
      overview : movie.overview,
      poster_path : movie.poster_path,
    })));
  };
  // <変数[]>指定のtypeの型のみが入る->typescriptの導入
  const [keyword , setKeyword]= useState("");
  const [movieList , setMovieList] = useState<Movie[]>([]);

  // 画面が表示される前に実行（useEffect)※実際はuseEffectでデータ取得はしないほうが良い
  useEffect(()=>{
    fetchMovieList()
  },[]);
  // 依存配列：引数が変わるたびに実行する
  
  // 検索ボタンを押しての処理
  const  inputSearch= () =>{
    fetchMovieList(keyword);
  };

  return (
    // HTML
    <>
        <div className = "search-container">
          {/* onChange:状態の変化が起きた時（引数をイベント（e）と置く） */}
          <input type="text" value ={keyword} onChange={(e) => setKeyword(e.target.value) } placeholder="映画タイトルを検索..."/>
          <button onClick={inputSearch} className='search-button'>検索</button>
        </div>
        <div className='container'>
        {movieList
        // .filter((movie) => movie.original_title.includes(keyword))
        .map((movie)=>(
          <MovieCard movie={movie} key={movie.id} />
          ))}
      </div>
    </>
  );
};

export default App;
