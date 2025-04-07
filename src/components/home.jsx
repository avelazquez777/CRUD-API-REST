import { Fragment } from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <Fragment>
            <h1>Bienvenido al Sistema de Gestión de Inventario</h1>
            <h3>Administra tus productos fácilmente</h3>
            <p>
                Este sistema te permite agregar, visualizar, modificar y eliminar productos.
                Tus datos se guardarán en localStorage para no perderse.
            </p>

            <div>
                <h4>Comienza por:</h4>
                <ul>
                    <li><Link to="/nuevos-productos">➕ Agregar Nuevo Producto</Link></li>
                    <li><Link to="/lista-productos">📋 Ver Lista de Productos</Link></li>
                </ul>
            </div>
        </Fragment>
    );
};

export default Home;

