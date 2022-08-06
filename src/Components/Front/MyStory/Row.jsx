import { useContext } from 'react';
import FrontContext from '../FrontContext';
import Donate from './Donate';

function Row({ row }) {
  const { givers } = useContext(FrontContext);

  return (
    <>
      <div className='main-5'>
        <h5>Story</h5>
        <h5>Image</h5>
        <h5>Target Sum</h5>
        <h5>Sum Donated</h5>
        <h5>Remaining Sum</h5>
      </div>
      <div className='main-5 line'>
        <p className='frame'>{row.text}</p>
        <img
          src={row.photo}
          alt='some_pic'
        />
        <p>{row.target_sum} Eur.</p>
        <p>{row.sum_donated} Eur.</p>
        <p style={{ color: row.sum_remaining > 0 ? 'crimson' : null }}>{row.sum_remaining} Eur.</p>
      </div>
      <div className="flex-nw line-w">
        <div className="com flex-col" style={{ width: '100%' }}>
          <h3>Donors of this idea:</h3>
          {givers && givers.filter(g => g.story_id === row.id).map((g, i) => <h4 key={i}>{g.name}: {g.sum} Eur.</h4>)}
        </div>
        {row.sum_remaining === 0 ?
          <p className='heading' style={{ color: 'gold' }}>The required amount has already been collected. Thank you for your donation!</p> :
          <Donate row={row} />
        }
      </div>
    </>
  );
}

export default Row;