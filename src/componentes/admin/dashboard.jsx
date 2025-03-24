import React, { useEffect, useState } from "react";
import Navadmin from "./navadmin";
import "../../CSS/dashboard.css";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
);

const Dashboard = () => {
  const [estadisticas, setEstadisticas] = useState({
    totalUsuarios: 1200,
    usuariosActivos: 850,
    nuevosUsuarios: 50,
    totalCursos: 300,
    cursosPopulares: 10,
    cursosRecientes: 5,
    ingresosTotales: 15000,
    ventasRecientes: 200,
    ventasPorCurso: 50,
  });

  const dataUsuarios = {
    labels: ["Total Usuarios", "Usuarios Activos", "Nuevos Usuarios"],
    datasets: [
      {
        label: "Usuarios",
        data: [
          estadisticas.totalUsuarios,
          estadisticas.usuariosActivos,
          estadisticas.nuevosUsuarios,
        ],
        backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f"],
      },
    ],
  };

  const dataCursos = {
    labels: ["Total Cursos", "Cursos Populares", "Cursos Recientes"],
    datasets: [
      {
        label: "Cursos",
        data: [
          estadisticas.totalCursos,
          estadisticas.cursosPopulares,
          estadisticas.cursosRecientes,
        ],
        backgroundColor: ["#ff6384", "#36a2eb", "#cc65fe"],
      },
    ],
  };

  const dataVentas = {
    labels: ["Ingresos Totales", "Ventas Recientes", "Ventas por Curso"],
    datasets: [
      {
        label: "Ventas",
        data: [
          estadisticas.ingresosTotales,
          estadisticas.ventasRecientes,
          estadisticas.ventasPorCurso,
        ],
        backgroundColor: ["#ffce56", "#ff6384", "#36a2eb"],
      },
    ],
  };

  return (
    <>
      <Navadmin />
      <div className="dashboard-container">
        <h1>Dashboard del Administrador</h1>
        <div className="estadisticas">
          <div className="card">
            <h2>Usuarios</h2>
            <Bar data={dataUsuarios} />
          </div>
          <div className="card">
            <h2>Cursos</h2>
            <Pie data={dataCursos} />
          </div>
          <div className="card">
            <h2>Ventas</h2>
            <Line data={dataVentas} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
