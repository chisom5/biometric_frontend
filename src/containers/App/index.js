import React, { Component } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./protectedRoute";

// routes
import Login from "../Login";
import SignUp from "../SignUp";
import AuthViewWrapper from "../auth";
import Users from "../auth/Users";
import FileManagement from "../auth/File";
import FourZeroFour from "../NotFound";

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          {/* <Route index path="/" element={<SignUp />} /> */}
          <Route path="/" element={<Login />} />

          <Route element={<ProtectedRoute />}>
          <Route path="/d" element={<AuthViewWrapper />}>
            <Route path="file_upload" element={<FileManagement />} />
            <Route path="users" element={<Users />} />
          </Route>
          </Route>

          <Route path="*" element={<FourZeroFour />} />
        </Routes>
      </Router>
    );
  }
}
export default App;
