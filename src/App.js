import "./App.css";
import { Route, Routes, useNavigate,useLocation } from "react-router-dom";
import LandingPage from "./Landing/LandingPage";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Notification from "./Error/Notification";
import { useDispatch } from "react-redux";
import HorizontalNavigation from "./HorizontalNavigation/HorizontalNavigation";
import Navigation from "./Navigation/Navigation";
import { useEffect } from "react";
import PublicRoute from "./RouteComponent.js/PublicRoute";
import { checkUser } from "./utilityFunctions";
import Loading from "./Error/Loading";
import { setLoading } from "./store/userSlice";
import Profile from "./Profile/Profile";
function App() {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let {pathname} = useLocation()
  useEffect(() => {
    const userExists = async () => {
      // dispatch(setLoading(true));
      await checkUser(dispatch, navigate,pathname);
      // dispatch(setLoading(false));
    };
    userExists();
    // return () => setLoading(false);
  }, []);
  return (
    <>
      <Notification />
      <Loading />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          exact
          path="login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          exact
          path="register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          exact
          path="otp"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route path="home" element={<Navigation />}>
          <Route path="" element={<HorizontalNavigation />}>
            <Route
              index
              path="notes"
              element={
                <div
                  style={{ display: "flex", flexDirection: "column", flex: 1 }}
                >
                  Notes
                </div>
              }
            />
            <Route path="todos" element={<div>Todos</div>} />
            <Route path="pages" element={<div>Your Diary</div>} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
        <Route path="*" element={<div>Invalid Route</div>} />
      </Routes>
    </>
  );
}

export default App;
