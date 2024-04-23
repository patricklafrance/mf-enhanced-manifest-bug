// @ts-check

import { App } from "./App.jsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelloWorld } from "remote1/HelloWorld.jsx";
import { sayHello } from "remote2/sayHello.js";

const root = createRoot(document.getElementById("root"));

root.render(
    <StrictMode>
        <>
            <App />
            {HelloWorld && <HelloWorld />}
            {sayHello && <div>{sayHello()}</div>}
        </>
    </StrictMode>
);
