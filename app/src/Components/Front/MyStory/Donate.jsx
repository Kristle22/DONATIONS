import { useContext, useState } from "react";
import FrontContext from "../FrontContext";

function Donate({ row }) {

  const { setCreateGiver, setSumDonated } = useContext(FrontContext);

  const [name, setName] = useState('');
  const [donateSum, setDonateSum] = useState('');

  const storyId = row.id;
  const handleDonate = () => {
    const data = {
      name, donateSum, storyId,
    };
    setCreateGiver(data);
    setSumDonated({ id: storyId, donateSum: donateSum })
    setName('');
    setDonateSum('');
    console.log(storyId);
  };

  return (
    <>
      <div className="flex-col frame" style={{ width: 'fit-content' }}>
        <h2>You'd like this idea? Donate!</h2>
        <div className="flex-nw">
          <div className="flex-col">
            <input style={{ minWidth: '100%', width: '200px', padding: '10px', marginTop: '10px' }}
              type='text'
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
              placeholder='Your name...'
            />
            <input style={{ maxWidth: '130px', padding: '10px', marginTop: '10px' }}
              type='text'
              onChange={(e) => {
                setDonateSum(e.target.value);
              }}
              value={donateSum}
              placeholder='... Eur.'
            />
            <div className="btns" style={{ width: '100%' }}>
            </div>
          </div>
          <button type='button' className='edt' onClick={handleDonate}>
            DONATE
          </button>
        </div>
      </div>
    </>
  )
}

export default Donate;