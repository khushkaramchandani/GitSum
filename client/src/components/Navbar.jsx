import { FiGithub } from 'react-icons/fi';
import './Navbar.css';

export default function Navbar() {
  return (
    <div className="navbar-wrapper">
      <nav className="navbar-capsule" id="navbar">
        <div className="navbar-capsule__left">
          <span className="navbar-capsule__brand">GitSum</span>
        </div>

        <div className="navbar-capsule__center">
          <img src="/favicon.png" alt="GitSum Logo" className="navbar-capsule__logo" />
        </div>

        <div className="navbar-capsule__right-links">
          <a href="/" className="navbar-capsule__link">Home</a>
          <a href="https://github.com/khushkaramchandani/gitsum" target="_blank" rel="noopener noreferrer" className="navbar-capsule__icon-link">
            <FiGithub size={20} />
          </a>
        </div>
      </nav>

      {/* Absolute positioned traditional brand info, outside the capsule for clean look, or we can just drop it to keep it minimal per your reference. Let's keep it simple. */}
      {/* 
      <div className="navbar__brand-left">
        <span className="navbar__title">GitSum</span>
      </div> 
      */}
    </div>
  );
}
