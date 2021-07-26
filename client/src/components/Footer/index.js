import React from 'react';
import Blackanese from '../../assets/Blackanese.mp3';

const Footer = () => {
  return (
    <footer className="w-100 mt-auto mb-4 pb-6">
      <audio id="player" allow="autoplay" loop controls>
        <source src={Blackanese} type="audio/mpeg" />
      </audio><br />
      <div className="text-center">&copy;2021 Furious 6ix</div>
    </footer>
  );
};

export default Footer;
