import { Link, NavLink } from 'react-router-dom';
import Message from './Message';

function Nav() {

  return (
    <>
      <nav className='nav'>
        <NavLink
          to='/'
          className='nav-link'
          style={({ isActive }) => (isActive ? { color: 'crimson' } : null)}
        >
          All Stories
          {/* {getUser()} */}
        </NavLink>
        <NavLink
          to='/your_story'
          className='nav-link'
          style={({ isActive }) => (isActive ? { color: 'crimson' } : null)}
        >
          Share your story
          {/* {getUser()} */}
        </NavLink>
        <Link
          to='/logout'
          className='logout'>
          Logout
        </Link>
      </nav>
      <Message />
    </>
  );
}

export default Nav;
