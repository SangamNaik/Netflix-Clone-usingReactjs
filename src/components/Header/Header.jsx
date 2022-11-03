import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../logo.png';
import { BsSearch } from 'react-icons/bs';

const Header = () => {
  return (
    <nav className="header">
      <img src={logo} alt="logo" />
      <div>
        <Link to="/tvshows">TV Shows</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/recently_added">Recently Added</Link>
        <Link to="/my_list">My List</Link>
      </div>
      <BsSearch />
    </nav>
  );
};

export default Header;
