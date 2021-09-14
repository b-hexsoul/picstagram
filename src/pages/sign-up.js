import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { doesUsernameExist } from '../services/firebase';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';

export default function Login() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isInvalid =
    password.length < 4 || !email.includes('@') || username.length < 3 || fullName === '';

  const handleSignup = async (e) => {
    e.preventDefault();

    const usernameExists = await doesUsernameExist(username);
    console.log(usernameExists);
    if (usernameExists) {
      setError('This username is taken.');
      setUsername('');
    } else {
      try {
        const createdUser = await firebase.auth().createUserWithEmailAndPassword(email, password);
        console.log(createdUser);

        await createdUser.user.updateProfile({ displayName: username });

        await firebase.firestore().collection('users').add({
          userId: createdUser.user.uid,
          username: username.toLowerCase(),
          fullName: fullName,
          emailAddress: email,
          following: [],
          followers: [],
          dateCreated: Date.now()
        });

        history.push(ROUTES.DASHBOARD);
      } catch (error) {
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    document.title = 'Signup - Picstagram';
  }, []);

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img src="/images/iphone-with-profile.jpg" alt="Iphone with Picstagram Logo" />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4">
          <h1 className="flex justify-center w-full">
            <img src="/images/logo.png" alt="Picstagram" className="mt-2 w-6/12 mb-4" />
          </h1>

          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

          <form onSubmit={handleSignup} method="POST">
            <input
              aria-label="Enter your username"
              type="text"
              placeholder="Enter your username"
              value={username}
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setUsername(target.value)}
            />
            <input
              aria-label="Enter your full name"
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setFullName(target.value)}
            />
            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email address"
              value={email}
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setEmail(target.value)}
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              value={password}
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setPassword(target.value)}
            />
            <button
              type="submit"
              disabled={isInvalid}
              className={`bg-purple-secondary text-sm text-white w-full h-8 rounded ${
                isInvalid && 'opacity-50'
              }`}
            >
              Signup
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary">
          <p className="text-sm">
            Have an account?{` `}
            <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
