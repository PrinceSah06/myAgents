import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Home from "./pages/Home";
import { auth } from "./utils/firebase";
import { setUserData } from "./redux/userSlice";
import api from "./utils/axios";

function App() {
  const dispatch = useDispatch();
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setAuthReady(false);

      if (user) {
        try {
          const token = await user.getIdToken();
          await api.post("/api/auth/login", { token });
        } catch (error) {
          console.error("Unable to establish the app session:", error);
          setAuthReady(true);
          return;
        }
      }

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
