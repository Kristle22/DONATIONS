import { useContext, useRef, useState } from 'react';
import FrontContext from '../FrontContext';
import Photo from './Photo';


function Create() {
  const { setCreateData } = useContext(FrontContext);

  const fileInput = useRef();
  const [image, setImage] = useState(null);

  const [text, setText] = useState('');
  const [targetSum, setTargetSum] = useState('');

  const handleCreate = () => {
    const data = {
      text,
      photo: image,
      targetSum: parseFloat(targetSum),
      sumRemaining: parseFloat(targetSum),
    };
    setCreateData(data);
    setText('');
    setTargetSum('');
    setImage(null);
    fileInput.current.value = null;
  };

  return (
    <>
      <h1 className='heading'>Your story</h1>
      <div className="flex donate">
        <div className='form create front'>
          <div className='feedback com'>
            <form className='flex'>
              <label>Present your ideas:</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder='Write your comment here...'
              ></textarea>
              <label style={{ marginTop: '15px' }}>Enter target Sum:</label>
              <input style={{ maxWidth: '100px' }}
                className='create'
                type='text'
                onChange={(e) => {
                  setTargetSum(e.target.value);
                }}
                value={targetSum}
                placeholder='... Eur.'
              />
              <Photo />
              <button className='put' onClick={handleCreate}>
                <svg className='put'>
                  <use href='#post' />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Create;
