import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { NEXT_URL } from 'src/lib/config';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    checkUserLoggedIn(), getCart();
  }, []);

  const register = async (user) => {
    const res = await fetch(`${NEXT_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      router.push('/');
    } else {
      setError(data.message);
      setError(null);
    }
  };

  const login = async ({ email: identifier, password }) => {
    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        identifier,
        password
      })
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      router.push('/');
    } else {
      setError(data.message);
      setError(null);
    }
  };

  const logout = async () => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: 'POST'
    });

    if (res.ok) {
      setUser(null);
      router.push('/');
    }
  };

  const checkUserLoggedIn = async (user) => {
    const res = await fetch(`${NEXT_URL}/api/user`);
    const data = await res.json();
    if (res.ok) {
      setUser(data.user);
    } else {
      setUser(null);
    }
  };

  const getCart = async (user) => {
    const res = await fetch(`${NEXT_URL}/api/cart`, {
      method: 'GET',
      body: JSON.stringify(user)
    });
    const data = await res.json();

    if (res.ok) {
      setCartItems(data);
    } else {
      setCartItems(null);
    }
  };

  const addCart = async ({ quan, products, userId }) => {
    console.log('data in addCart:', quan, products, userId);

    const res = await fetch(`${NEXT_URL}/api/addCart`, {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        quan,
        products,
        user: userId
      })
    });

    if (res.ok) {
      router.push(`/cart`);
      getCart();
    }
  };

  const deleteCart = async ({ products }) => {
    console.log('data in deleteCart:', products);

    const res = await fetch(`${NEXT_URL}/api/deleteCart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ products })
    });

    if (res.ok) {
      router.push(`/cart`);
      getCart();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        cartItems,
        getCart,
        addCart,
        deleteCart,
        register,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  return useContext(AuthContext);
}