import React from "react";
import { About, Header, Home } from "./components";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import CreateItems from "./pages/CreateItems";

function App() {
  return (
    <AnimatePresence>
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Header />
        <main className="mt-24 p-8 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/createitems" element={<CreateItems />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
