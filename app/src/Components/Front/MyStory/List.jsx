import { useContext } from 'react';
import Row from './Row';
import FrontContext from '../FrontContext';

function List() {
  const { stories } = useContext(FrontContext);

  return (
    <>
      <h1 className='heading'>All Stories</h1>
      <div className='flex-card front'>
        {/* <div className='main-5 line-w'>
          <h5>Story</h5>
          <h5>Image</h5>
          <h5>Target Sum</h5>
          <h5>Sum Donated</h5>
          <h5>Remaining Sum</h5>
        </div> */}
        {stories && stories.map((r) => r.status === 1 && r.archive === 0 ? <Row key={r.id} row={r} /> : null)}
      </div>
    </>
  );
}

export default List;
