import { loginViaFacebook } from '../services/login';
import { cookies } from './getCookies';

export const onLoginViaFacebook = (response, setAuthCallback) => {
  loginViaFacebook({}, { fbToken: response.accessToken })
    .then((data) => {
      if (setAuthCallback) {
        setAuthCallback(true);
      }
      cookies.set('token', data.data.token, { maxAge: 60 * 60 * 24 });
    });
};
