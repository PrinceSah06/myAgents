import { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { auth, googleProvider } from "../utils/firebase";
import api from "../utils/axios";
import { setUserData } from "../redux/userSlice";

const Home = () => {
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);

  const googleLogIn = async () => {
    setLoginError("");
    setIsSigningIn(true);
    try {
      const credential = await signInWithPopup(auth, googleProvider);
      const user = credential.user;

      const token = await user.getIdToken();

      // Firebase is the source of truth for the signed-in UI. The backend call
      // creates the app session used by protected API routes.
      dispatch(
        setUserData({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          avatar: user.photoURL,
        }),
      );

      await api.post("/api/auth/login", { token });
    } catch (error) {
      console.error("Google sign-in failed:", error);
      setLoginError(
        error?.code === "auth/popup-closed-by-user"
          ? "Sign-in was cancelled. Try again when you’re ready."
          : "Google sign-in succeeded, but the app server could not be reached. Start the gateway and auth service; refresh to retry the app session.",
      );
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0d0f14] text-white">
      {userData ? (
        <section className="flex min-h-screen items-center justify-center p-6">
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-[#13151c] p-8 text-center">
            {userData.avatar && (
              <img
                className="h-16 w-16 rounded-full"
                src={userData.avatar}
                alt=""
              />
            )}
            <h1 className="text-xl font-semibold">
              Welcome{userData.name ? `, ${userData.name}` : " to Cortex"}
            </h1>
            {userData.email && (
              <p className="text-sm text-slate-400">{userData.email}</p>
            )}
            {loginError && (
              <p className="max-w-sm text-sm text-amber-300" role="status">
                {loginError}
              </p>
            )}
          </div>
        </section>
      ) : (
        <section className="flex min-h-screen items-center justify-center bg-black/60 p-6 backdrop-blur-sm">
          <div className="flex w-full max-w-[340px] flex-col gap-5 rounded-2xl border border-white/10 bg-[#13151c] p-7">
            <div className="flex flex-col gap-1">
              <h1 className="text-[17px] font-semibold tracking-tight text-slate-100">
                Welcome to Cortex
              </h1>
              <p className="text-[13px] text-slate-400">
                Please log in to continue using the app.
              </p>
            </div>
            <button
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-white py-[11px] text-sm font-medium text-black/90 transition-colors hover:bg-gray-200 disabled:cursor-wait disabled:opacity-60"
              onClick={googleLogIn}
              disabled={isSigningIn}
            >
              <FcGoogle size={17} />
              {isSigningIn ? "Signing in…" : "Continue with Google"}
            </button>
            {loginError && (
              <p className="text-sm text-amber-300" role="alert">
                {loginError}
              </p>
            )}
          </div>
        </section>
      )}
    </main>
  );
};

export default Home;
