import React, { useEffect, useState } from 'react';
import './Home.scss';
import axios from 'axios';
import { BiPlay } from 'react-icons/bi';
import { AiOutlinePlus } from 'react-icons/ai';

const API_KEY = '19f84e11932abbc79e6d83f82d6d1045';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

const popular = 'popular';
const top_rated = 'top_rated';
const now_playing = 'now_playing';
const upcoming = 'upcoming';

// const fetchData = async (rowName) => {
//   const {
//     data: { results },
//   } = await axios.get(`${BASE_URL}/movie/${rowName}?api_key=${API_KEY}`);
//   return results;
// };

const Card = ({ img }) => {
  return <img className="card" src={img} alt="moviePoster"></img>;
};

const Row = ({ title, categories = [] }) => {
  return (
    <div className="row">
      <h2>{title}</h2>;
      <div>
        {categories.map((category, index) => {
          return (
            <Card
              key={index}
              img={`${IMAGE_BASE_URL}${category.poster_path}`}
            />
          );
        })}
      </div>
    </div>
  );
};

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [popularTVShows, setPopularTVShows] = useState([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      const {
        data: { results },
      } = await axios.get(`${BASE_URL}/movie/${popular}?api_key=${API_KEY}`);
      setPopularMovies(results);
    };
    const fetchTopRatedMovies = async () => {
      const {
        data: { results },
      } = await axios.get(`${BASE_URL}/movie/${top_rated}?api_key=${API_KEY}`);
      setTopRatedMovies(results);
    };
    const fetchNowPlayingMovies = async () => {
      const {
        data: { results },
      } = await axios.get(
        `${BASE_URL}/movie/${now_playing}?api_key=${API_KEY}`
      );
      setNowPlayingMovies(results);
    };
    const fetchUpcomingMovies = async () => {
      const {
        data: { results },
      } = await axios.get(`${BASE_URL}/movie/${upcoming}?api_key=${API_KEY}`);
      setUpcomingMovies(results);
    };

    fetchPopularMovies();
    fetchTopRatedMovies();
    fetchNowPlayingMovies();
    fetchUpcomingMovies();

    const fetchPopularTVShows = async () => {
      const {
        data: { results },
      } = await axios.get(`${BASE_URL}/tv/${popular}?api_key=${API_KEY}`);
      setPopularTVShows(results);
    };

    fetchPopularTVShows();
  }, []);

  return (
    <section className="home">
      <div
        className="banner"
        style={{
          backgroundImage: popularMovies[0]
            ? `url(${`${IMAGE_BASE_URL}${popularMovies[0].poster_path}`})`
            : 'black',
        }}
      >
        {popularMovies[0] && <h1>{popularMovies[0].title}</h1>}
        {popularMovies[0] && <p>{popularMovies[0].overview}</p>}

        <div>
          <button>
            <BiPlay />
            Play
          </button>
          <button>
            My List <AiOutlinePlus />
          </button>
        </div>
      </div>

      <Row title={'Popular'} categories={popularMovies} />
      <Row title={'Top Rated'} categories={topRatedMovies} />
      <Row title={'Now Playing'} categories={nowPlayingMovies} />
      <Row title={'Upcoming'} categories={upcomingMovies} />
      <Row title={'TV Shows'} categories={popularTVShows} />
      <Row title={'Movies'} />
      <Row title={'Recently Viewed'} />
      <Row title={'My List'} />
    </section>
  );
};

export default Home;
