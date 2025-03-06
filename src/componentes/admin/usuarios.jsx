import { useEffect, useState } from "react";
import axios from "axios";
import Navadmin from "./navadmin";

const Usuarios = () => {
  return (
    <>
        <Navadmin></Navadmin>
        <main>
          <h1>Lista de Usuarios</h1>
        </main>
    </>
  );
};

export default Usuarios;
