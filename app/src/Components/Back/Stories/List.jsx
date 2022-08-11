import { useContext } from 'react';
import BackContext from '../BackContext';
import Story from './Story';

function List() {
  const { stories } = useContext(BackContext);

  return (
    <>
      <h1 className='heading'>All Stories</h1>
      <div className='flex-card'>
        <div className='main-5 line-w' style={{ width: '85%' }}>
          <h5>Story</h5>
          <h5>Image</h5>
          <h5>Target Sum</h5>
          <h5>Sum Donated</h5>
          <h5>Remaining Sum</h5>
        </div>
        {stories && stories.map((s) => s.archive === 1 ? null : <Story key={s.id} story={s} />)}
      </div>
    </>
  );
}

export default List;
