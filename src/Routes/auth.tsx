
import Cookies from 'js-cookie';

const TOKEN_KEY = 'jwtToken';

export const isLoggedIn = (): boolean => {
  const jwtToken = Cookies.get(TOKEN_KEY);
  return !!jwtToken; // Returns true if the token exists, false otherwise
};

export const setAuthToken = (token: string): void => {
  Cookies.set(TOKEN_KEY, token, { expires: 1, sameSite: 'strict', secure: true });
};

export const getAuthToken = (): string | null => {
  return Cookies.get(TOKEN_KEY) || null;
};

export const removeAuthToken = (): void => {
  Cookies.remove(TOKEN_KEY);
};

