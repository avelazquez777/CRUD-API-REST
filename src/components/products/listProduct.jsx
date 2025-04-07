import { useState, useEffect } from "react";
import ItemProduct from "./ItemProduct";
import { useNavigate } from "react-router-dom";

const ListProduct = () => {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = () => {
    const productosGuardados = JSON.parse(localStorage.getItem("productos") || "[]");
    setProductos(productosGuardados);
  };

  const eliminarProducto = async (id) => {
    const productoAEliminar = productos.find(p => p.id === id);
    const nuevosProductos = productos.filter(producto => producto.id !== id);
    setProductos(nuevosProductos);
    localStorage.setItem("productos", JSON.stringify(nuevosProductos));

    if (productoAEliminar?.apiId) {
      try {
        const response = await fetch(`https://api.restful-api.dev/objects/${productoAEliminar.apiId}`, {
          method: "DELETE"
        });

        if (!response.ok) {
          console.warn("No se pudo eliminar en la API.");
        } else {
          console.log("Producto eliminado de la API.");
        }
      } catch (error) {
        console.error("Error al eliminar de la API:", error);
      }
    }
  };

  const eliminarTodos = async () => {
    if (window.confirm("¿Seguro que deseas eliminar todos los productos?")) {
      const productosConApiId = productos.filter(p => p.apiId);


      for (const producto of productosConApiId) {
        try {
          await fetch(`https://api.restful-api.dev/objects/${producto.apiId}`, {
            method: "DELETE"
          });
        } catch (error) {
          console.error(`Error al eliminar ${producto.apiId} de la API`, error);
        }
      }


      setProductos([]);
      localStorage.removeItem("productos");
    }
  };

  return (
    <div>
      <h2>Lista de Productos</h2>
      <button onClick={eliminarTodos}>Eliminar Todos</button>
      <button onClick={() => navigate("/")}>Volver al Home</button>
      <button onClick={() => navigate("/nuevos-productos")}>Agregar Nuevo Producto</button>

      {productos.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <ul>
          {productos.map(producto => (
            <ItemProduct
              key={producto.id}
              producto={producto}
              eliminarProducto={eliminarProducto}
              recargarProductos={cargarProductos} 
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListProduct;
