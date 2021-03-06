import React, { useEffect } from 'react';
import { Router } from '@reach/router';
import { useSelector, useDispatch } from 'react-redux';

import Profile from './components/Profile/Profile';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Search from './components/Search/Search';
import Upload from './components/Upload/Upload';
import View from './components/View/View';
import Navigate from './components/Navigate/Navigate';
import PasswordReset from './components/PasswordReset/PasswordReset';


import { auth, generateUserDocument } from './Firebase/firebase';
import { setUser, selectUser } from './Firebase/firebaseSlice';

import './App.css';

const App = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const user = await generateUserDocument(userAuth);
        const { uid, displayName, email, photoURL } = user;
        dispatch(setUser({ uid, displayName, email, photoURL }));
      }
    });
  }, [auth]);

  return user ? (
    <Router>
      <Navigate path="/" />
      <Profile path="/profile"/>
      <Search path="/search"/>
      <Upload path="/upload"/>
      <View path="/view"/>
    </Router>
  ) : (
    <Router>
      <SignIn path="/" />
      <SignUp path="signUp" />
      <PasswordReset path="passwordReset" />
    </Router>
  );
};

export default App;
