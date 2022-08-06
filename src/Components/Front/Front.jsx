import { useEffect, useState, useReducer } from 'react';
import Reducer from './Reducer';
import FrontContext from './FrontContext';
import Nav from './Nav';
import Create from './MyStory/Create'
import List from './MyStory/List'
import axios from 'axios';
// import { authConfig } from '../../Functions/auth';

function Front({ show }) {
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [message, setMessage] = useState(null);

  const [createData, setCreateData] = useState(null);

  const [stories, dispachStories] = useReducer(Reducer, []);

  const [givers, setGivers] = useState(null);

  const [createGiver, setCreateGiver] = useState(null);
  const [sumDonated, setSumDonated] = useState(null);

  // const [users, setUsers] = useState(null);

  const showMessage = (mes) => {
    setMessage(mes);
    setTimeout(() => setMessage(null), 5000);
  };

  // Simple Read FRONT
  useEffect(() => {
    axios.get('http://localhost:3003/istorijos').then((res) => {
      const action = {
        type: 'main_list',
        payload: res.data,
      }
      dispachStories(action);
    });
  }, [lastUpdate]);

  // Read FRONT givers
  useEffect(() => {
    axios.get('http://localhost:3003/aukotojai').then((res) => {
      setGivers(res.data);
    });
  }, [lastUpdate]);

  // CREATE Story
  useEffect(() => {
    if (null === createData) return;
    axios
      .post(
        'http://localhost:3003/istorijos',
        createData
      )
      .then((res) => {
        console.log(createData);
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [createData]);

  // CREATE Giver
  useEffect(() => {
    if (null === createGiver) return;
    axios
      .post(
        'http://localhost:3003/aukotojai',
        createGiver
      )
      .then((res) => {
        console.log(createGiver);
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [createGiver]);

  // EDIT SUM DONATED
  useEffect(() => {
    if (null === sumDonated) return;
    axios
      .put(
        'http://localhost:3003/auka/' + sumDonated.id, sumDonated,
      )
      .then((res) => {
        console.log(sumDonated);
        showMessage(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [sumDonated, createGiver]);

  // ////////////GET USER///////////////
  // function getUser() {
  //   return localStorage.getItem('username');
  // }

  // function userId() {
  //   const userId = users.filter((user) => user.name === getUser())[0].id;
  //   return userId;
  // }
  // console.log(getUser(), userId());

  return (
    <FrontContext.Provider
      value={{
        message,
        showMessage,
        stories,
        setCreateData,
        givers,
        setCreateGiver,
        setSumDonated,
      }}
    >
      {show === 'welcome' ? (
        <div>
          <Nav />
          <List />
        </div>
      ) : show === 'your_story' ?
        <div>
          <Nav />
          <Create />
        </div>
        : null}
    </FrontContext.Provider>
  );
}

export default Front;
