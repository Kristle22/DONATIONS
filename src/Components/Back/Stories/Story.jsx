import { useContext } from 'react';
import BackContext from '../BackContext';

function Order({ story }) {
  const { setDeleteStory, setStatus } = useContext(BackContext);

  const storyId = story.id;
  const handleConfirm = () => {
    setStatus({ id: storyId });
  };

  const handleDelete = () => {
    setDeleteStory({ id: storyId });
  };

  return (
    <div className='flex-row'>
      <div className='main-5 line'>
        <p className='frame'>{story.text}</p>
        <img
          src={story.photo}
          alt='some_pic'
        />
        <p>{story.target_sum} Eur.</p>
        <p>{story.sum_donated} Eur.</p>
        <p style={{ color: story.sum_remaining > 0 ? '#d45449' : null }}>{story.sum_remaining} Eur.</p>
      </div>
      <div className='btns order'>
        {story.status === 1 ? (
          <button type='button' className='edt book' onClick={handleConfirm}>
            CONFIRMED
          </button>
        ) : (
          <button type='button' className='edt book pending' onClick={handleConfirm}>
            NOT CONFIRMED
          </button>
        )}
        <button type='button' className='dlt book' onClick={handleDelete}>
          REM-OVE
        </button>
      </div>
    </div >
  );
}

export default Order;
