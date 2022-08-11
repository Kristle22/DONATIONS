import { useEffect, useState, useReducer } from 'react';
import Reducer from './Reducer';
import BackContext from './BackContext';
import Nav from './Nav';
import StoriesCrud from './Stories/Crud';
import axios from 'axios';
import { authConfig } from '../../Functions/auth';

function Back({ show }) {
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [message, setMessage] = useState(null);

  const [stories, dispachStories] = useReducer(Reducer, []);

  const [status, setStatus] = useState(0);

  const [archive, setArchive] = useState(0);

  const showMessage = (mes) => {
    setMessage(mes);
    setTimeout(() => setMessage(null), 5000);
  };

  // Read
  useEffect(() => {
    axios
      .get('http://localhost:3003/istorijos', authConfig())
      .then((res) => {
        const action = {
          type: 'main_list',
          payload: res.data,
        };
        dispachStories(action);
      });
  }, [lastUpdate]);

  // Delete Story
  useEffect(() => {
    if (null === archive) return;
    axios
      .put('http://localhost:3003/archyvas/' + archive.id, archive, authConfig())
      .then((res) => {
        console.log(archive);
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [archive]);

  // Edit STATUS
  useEffect(() => {
    if (null === status) return;
    axios
      .put('http://localhost:3003/statusas/' + status.id, status, authConfig())
      .then((res) => {
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [status]);

  return (
    <BackContext.Provider
      value={{
        stories,
        message,
        setStatus,
        setArchive,
      }}
    >
      {show === 'admin' ? (
        <>
          <Nav />
          <div className='admin'>
            <div className='center'>
              <img
                src={require('../../img/admin-1.png')}
                alt='admin panel'
                style={{
                  maxWidth: '350px',
                  opacity: '0.5'
                }}
              />
            </div>
          </div>
        </>
      ) : show === 'stories' ? (
        <StoriesCrud />
      ) : null}
    </BackContext.Provider>
  );
}

export default Back;
