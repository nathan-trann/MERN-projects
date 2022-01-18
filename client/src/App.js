import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  HomeLayout,
  Landing,
  ProtectedRoute,
  RedirectRoute,
  Register,
} from "./pages";
import Error from "./pages/Error";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomeLayout />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/:shortId" element={<RedirectRoute />}></Route>
        <Route path="/landing" element={<Landing />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
