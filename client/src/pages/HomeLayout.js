import { Alert, FormRow, HomePage, TableData } from "../components";
import home from "../assets/home.svg";
import { FaCaretDown, FaUserCircle } from "react-icons/fa";

import { useAppContext } from "../context/appContext";
import { useState } from "react";

const initialInput = {
  fullUrl: "",
  shortUrl: "",
  clicks: 0,
};

const HomeLayout = () => {
  const [showLogout, setShowLogout] = useState(false);
  const [values, setValues] = useState(initialInput);
  const { displayAlert, logoutUser, user, showAlert, setupUrl } =
    useAppContext();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { fullUrl } = values;
    if (!fullUrl) {
      displayAlert();
      return;
    }
    const currentUrl = { fullUrl };
    setupUrl({
      currentUrl,
    });
    setValues({ ...values, fullUrl: "" });
  };

  return (
    <HomePage>
      <nav>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
        </div>
        <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
          <button type="button" className="dropdown-btn" onClick={logoutUser}>
            logout
          </button>
        </div>
      </nav>
      <main className="home-page">
        {showAlert && <Alert />}
        <div className="info-container">
          <img src={home} alt="home page" className="img home-img" />
          <h1>
            shorti.fy <span>...free and always will be</span>
          </h1>
        </div>
        <form className="form form-link" onSubmit={onSubmit}>
          <FormRow
            type="text"
            labelText=" "
            name="fullUrl"
            value={values.fullUrl}
            handleChange={handleChange}
            placeholder="Shorten your link"
          />
          <button className="btn shorten-btn">shorten</button>
        </form>
        <div className="table-data">
          <table>
            <thead>
              <tr className="table-head">
                <th className="column1">No.</th>
                <th className="column2">Full URL</th>
                <th className="column3">Short URL</th>
                <th className="column4">Clicks</th>
              </tr>
            </thead>
            <tbody>
              <TableData />
            </tbody>
          </table>
        </div>
      </main>
    </HomePage>
  );
};

export default HomeLayout;
