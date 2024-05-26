import { GoogleOAuthProvider } from '@react-oauth/google';
import getSocket, {
  connectSocket,
  disconnectSocket
} from 'config/app/socket.io';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RouteIndex from 'routes/index.routes';
import store from 'store';
import './App.scss';

const App = () => {
  const socket = getSocket();

  // useEffect(() => {
  //   connectSocket();
  //
  //   return () => {
  //     if (socket.connected) disconnectSocket();
  //   };
  // }, [socket.connect, socket.connected]);

  return (
    <div className='w-100 app'>
      <Provider store={store}>
        <GoogleOAuthProvider
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
          onScriptLoadError={() => toast.error('Error in Google Login')}
        >
          <BrowserRouter>
            <RouteIndex />
            <ToastContainer position='top-right' />
          </BrowserRouter>
        </GoogleOAuthProvider>
      </Provider>
    </div>
  );
};

export default App;
