import React, { Component } from "react";
import "./App.css";
import Movie from "./Movie";

class App extends Component {
  state = {};

  componentWillMount() {
    //1.시작하기 전, 데이터를 불러오기 좋은 시기
  }

  componentDidMount() {
    //3. 모든 것이 자리 잡은 상태

    this._getMovies();
  }

  _renderMovies = () => {
    const movies = this.state.movies.map(movie => {
      //title, poster는 받아온 data의 위치를 설정해야 한다.
      return (
        <Movie
          title={movie.title_english}
          poster={movie.medium_cover_image}
          genres={movie.genres}
          synopsis={movie.synopsis}
          key={movie.id}
        />
      );
    });
    return movies;
  };

  //async는 순서에 상관없이 진행된다. 따라서 _getMovies는 async function
  _getMovies = async () => {
    const movies = await this._callApi(); //await는 callApi가 하는 일이 "끝나기"를 기다린다. "성공적인 수행"이 아니라.
    //그런다음 작업이 "끝나면" 여기서부터 실행이 된다. (await 때문에)
    this.setState({
      movies
    });
  };

  _callApi = () => {
    //fetch로 ajax를 불러들인다.
    return (
      fetch("https://yts.am/api/v2/list_movies.json?sort_by=download_count")
        .then(response => response.json()) //위의 fetch로 받은 데이터만 인자로 받는다. 그리고 JSON으로 바꾼다.
        .then(json => json.data.movies) //JSON에서 필요한 부분을 반환한다.
        //이렇게 then을 붙여서 계속 뭔가 할 수 있다.(콜백 지옥에 빠질 수 있다.)
        .catch(err => console.log(err))
    ); //에러가 발생하면 잡아서 알려줘라
  };

  render() {
    //2.리액트 세계가 나타남
    const { movies } = this.state;
    return (
      <div className={movies ? "App" : "App--loading"}>
        {movies ? this._renderMovies() : "Loading"}
      </div>
    );
  }
}

export default App;
