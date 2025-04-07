import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ItemProduct = ({ producto, eliminarProducto }) => {
  const [modoEdicion, setModoEdicion] = useState(false);
  const [nombre, setNombre] = useState(producto.nombre);
  const [precio, setPrecio] = useState(producto.precio);
  const [year, setYear] = useState(producto.year);
  const [cpu, setCpu] = useState(producto.cpu);
  const [hardDisk, setHardDisk] = useState(producto.hardDisk);
  const navigate = useNavigate();

  const actualizarProducto = async () => {
    const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];

    const nuevosProductos = productosGuardados.map(p =>
      p.id === producto.id
        ? {
            ...p,
            nombre,
            precio: parseFloat(precio),
            year: parseInt(year, 10),
            cpu,
            hardDisk
          }
        : p
    );


    localStorage.setItem("productos", JSON.stringify(nuevosProductos));


    if (producto.apiId) {
      try {
        const response = await fetch(`https://api.restful-api.dev/objects/${producto.apiId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: nombre,
            data: {
              precio: parseFloat(precio),
              year: parseInt(year, 10),
              cpu,
              hardDisk
            }
          })
        });

        if (!response.ok) {
          console.warn("No se pudo actualizar el producto en la API.");
        } else {
          console.log("Producto actualizado en la API correctamente.");
        }
      } catch (error) {
        console.error("Error al actualizar producto en la API:", error);
      }
    }

    setModoEdicion(false);
  };

  return (
    <li>
      {modoEdicion ? (
        <>
          <input type="number" value={producto.id} disabled />
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} />
          <input type="number" value={year} onChange={(e) => setYear(e.target.value)} />
          <input type="text" value={cpu} onChange={(e) => setCpu(e.target.value)} />
          <input type="text" value={hardDisk} onChange={(e) => setHardDisk(e.target.value)} />
          <button onClick={actualizarProducto}>Guardar</button>
        </>
      ) : (
        <>
          <span>
            ID: {producto.id} - {producto.nombre} - ${producto.precio} - Año: {producto.year} - CPU: {producto.cpu} - Disco: {producto.hardDisk}
          </span>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            <button onClick={() => setModoEdicion(true)}>Editar</button>
            <button onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
          </div>
        </>
      )}
    </li>
  );
};

export default ItemProduct;
