import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
    const [nombre, setNombre] = useState('');
    const [year, setYear] = useState('');
    const [precio, setPrecio] = useState('');
    const [cpu, setCpu] = useState('');
    const [hardDisk, setHardDisk] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const productosGuardados = JSON.parse(localStorage.getItem("productos"));

        if (!productosGuardados || productosGuardados.length === 0) {
            localStorage.setItem("productos", JSON.stringify([]));
        }

        const ultimoId = productosGuardados.length > 0 ? productosGuardados[productosGuardados.length - 1].id : 0;
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!nombre || !precio || !year || !cpu || !hardDisk) {
            alert("Todos los campos son obligatorios.");
            return;
        }
    
        const productData = {
            name: nombre,
            data: {
                year: Number(year),
                price: Number(precio),
                cpu_model: cpu,
                hard_Disk_Size: Number(hardDisk)
            }
        };
    
        try {
            const response = await fetch('https://api.restful-api.dev/objects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];
                const ultimoId = productosGuardados.length > 0
                    ? productosGuardados[productosGuardados.length - 1].id
                    : 0;
    
                const nuevoProducto = {
                    id: ultimoId + 1,
                    nombre,
                    year,
                    precio,
                    cpu,
                    hardDisk,
                    apiId: data.id 
                };
    
                productosGuardados.push(nuevoProducto);
                localStorage.setItem("productos", JSON.stringify(productosGuardados));
    
                navigate("/nuevos-productos"); 
            } else {
                setError("Error al crear producto en la API.");
            }
        } catch (err) {
            console.error("Error:", err);
            setError("Fallo al conectar con la API.");
        }
    };
    

    return (
        <div>
            <h2>Crear Nuevo Producto</h2>
            <form onSubmit={handleSubmit}>
                <label>Nombre:</label>
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />

                <label>Año:</label>
                <input type="number" value={year} onChange={(e) => setYear(e.target.value)} required />

                <label>Precio:</label>
                <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} required />

                <label>Modelo CPU:</label>
                <input type="text" value={cpu} onChange={(e) => setCpu(e.target.value)} required />

                <label>Tamaño Hard Disk (especificar: gb, mb, tb):</label>
                <input type="text" value={hardDisk} onChange={(e) => setHardDisk(e.target.value)} required />

                <button type="submit">Crear Producto</button>
            </form>
            <button onClick={() => navigate("/")}>Volver al Home</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default CreateProduct;
