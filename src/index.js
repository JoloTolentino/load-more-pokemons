import React from "react";
import { createRoot } from "react-dom/client";
import PokemonList from "./pokemon-list";

const container = document.getElementById("root");
// debugger
const root = createRoot(container);
root.render(<PokemonList />);
