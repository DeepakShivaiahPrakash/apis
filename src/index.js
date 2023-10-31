// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );




import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Link,
} from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';

import ChangePasswordScenario from './changePassword'
<script src="https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js"></script>

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div style={{margin: '20px'}}>
        <h1>Routes</h1>
        <Link to="changePassword">Change Password</Link>
      </div>
    ),
  },
  {
    path: "changePassword",
    element: <ChangePasswordScenario />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();