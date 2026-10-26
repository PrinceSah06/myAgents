import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Home from "./pages/Home";
import { auth } from "./utils/firebase";
import { setUserData } from "./redux/userSlice";

function App() {
  const dispatch = useDispatch();
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(
        setUserData(
          user
            ? {
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                avatar: user.photoURL,
              }
            : null,
        ),
      );
      setAuthReady(true);
    });

    return unsubscribe;
  }, [dispatch]);

  if (!authReady) {
    return <main className="min-h-screen bg-[#0d0f14]" aria-label="Loading" />;
  }

  return <Home />;
}

export default App;
