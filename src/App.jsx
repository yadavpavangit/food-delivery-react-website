import React from "react";
import { About, Header, MainContainer } from "./components";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import CreateItems from "./pages/CreateItems";

function App() {
  return (
    <AnimatePresence mode="wait">
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Header />
        <main className="mt-16 md:mt-20 px-8 md:px-16 py-8 w-full">
          <Routes>
            <Route path="/" element={<MainContainer />} />
            <Route path="/about" element={<About />} />
            <Route path="/createitems" element={<CreateItems />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
