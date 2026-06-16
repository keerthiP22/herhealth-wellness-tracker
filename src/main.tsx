import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { WellnessProvider }
from "./context/wellnessContext";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <WellnessProvider>
      <App />
    </WellnessProvider>
  </React.StrictMode>
);