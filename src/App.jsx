import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { UserProvider } from "./contexts/UserContext";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import PostDetailsPage from "./pages/PostDetailsPage";
import Videos from "./pages/Videos";
import Gaming from "./pages/Gaming";
import Groups from "./pages/Groups";
import Notifications from "./pages/Notifications";


function App() {
  return (
    <UserProvider>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/settings/:id" element={<Settings />} />
          <Route path="/post/:id" element={<PostDetailsPage />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/gaming" element={<Gaming />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
