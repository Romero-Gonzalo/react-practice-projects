import { useMemo, useState } from "react";

export default function App() {
  return (
    <div style={{ fontFamily: "Arial", maxWidth: 700, margin: "30px auto" }}>
      <h1>Prácticas</h1>

      <ProductoPrecio />
      <hr style={{ margin: "40px 0" }} />
      <NombrePeso />
    </div>
  );
}

///////////////////////////////////////////
// 5) Producto y Precio (React)
///////////////////////////////////////////

function ProductoPrecio() {
  const [producto, setProducto] = useState("");
  const [precio, setPrecio] = useState("");
  const [lista, setLista] = useState([]);

  function agregar() {
    const nombre = producto.trim();
    const p = Number(precio);

    if (nombre === "" || !Number.isFinite(p) || p < 0) return;

    setLista((prev) => [...prev, { nombre, precio: p }]);
    setProducto("");
    setPrecio("");
  }

  const masCaro = useMemo(() => {
    if (lista.length === 0) return null;
    return lista.reduce((max, item) =>
      item.precio > max.precio ? item : max
    );
  }, [lista]);

  const promedio = useMemo(() => {
    if (lista.length === 0) return 0;
    const suma = lista.reduce((acc, item) => acc + item.precio, 0);
    return suma / lista.length;
  }, [lista]);

  return (
    <section>
      <h2>5) Producto y Precio</h2>

      <input
        type="text"
        placeholder="Producto"
        value={producto}
        onChange={(e) => setProducto(e.target.value)}
      />

      <input
        type="number"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
      />

      <button onClick={agregar}>Agregar</button>

      <div style={{ marginTop: 10 }}>
        <span style={{ display: "block" }}>
          Producto más caro:{" "}
          <b>{masCaro ? `${masCaro.nombre} ($${masCaro.precio})` : "-"}</b>
        </span>

        <span style={{ display: "block" }}>
          Precio promedio: <b>${promedio.toFixed(2)}</b>
        </span>
      </div>

      <ul>
        {lista.map((item, i) => (
          <li key={i}>
            {item.nombre} - ${item.precio}
          </li>
        ))}
      </ul>
    </section>
  );
}

///////////////////////////////////////////
// 6) Nombre y Peso (lógica tipo HTML + JS)
///////////////////////////////////////////

function NombrePeso() {
  const [nombre, setNombre] = useState("");
  const [peso, setPeso] = useState("");
  const [personas, setPersonas] = useState([]);
  const [error, setError] = useState("");

  function agregar() {
    const n = nombre.trim();
    const p = Number(peso);

    if (n === "") {
      setError("El nombre no puede estar vacío.");
      return;
    }

    if (personas.some((per) => per.nombre.toLowerCase() === n.toLowerCase())) {
      setError("Nombre repetido.");
      return;
    }

    if (!Number.isFinite(p) || p <= 0) {
      setError("El peso debe ser mayor a 0.");
      return;
    }

    setPersonas((prev) => [...prev, { nombre: n, peso: p }]);
    setNombre("");
    setPeso("");
    setError("");
  }

  const masLiviana = useMemo(() => {
    if (personas.length === 0) return null;
    return personas.reduce((min, per) =>
      per.peso < min.peso ? per : min
    );
  }, [personas]);

  const promedio = useMemo(() => {
    if (personas.length === 0) return 0;
    const suma = personas.reduce((acc, per) => acc + per.peso, 0);
    return suma / personas.length;
  }, [personas]);

  return (
    <section>
      <h2>6) Nombre y Peso</h2>

      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <input
        type="number"
        placeholder="Peso"
        value={peso}
        onChange={(e) => setPeso(e.target.value)}
      />

      <button onClick={agregar}>Agregar</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {personas.map((per) => (
          <li key={per.nombre}>
            {per.nombre} ({per.peso} kg)
          </li>
        ))}
      </ul>

      <div>
        <span style={{ display: "block" }}>
          Persona más liviana:{" "}
          <b>
            {masLiviana
              ? `${masLiviana.nombre} (${masLiviana.peso} kg)`
              : "-"}
          </b>
        </span>

        <span style={{ display: "block" }}>
          Promedio de pesos: <b>{promedio.toFixed(2)} kg</b>
        </span>
      </div>
    </section>
  );
}
