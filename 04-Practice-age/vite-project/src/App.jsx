import { useMemo, useState } from "react";

export default function App() {
  // Inputs controlados
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");

  // Lista de personas (estado principal)
  const [personas, setPersonas] = useState([]);

  function agregarPersona() {
    const nombreLimpio = nombre.trim();
    const edadNum = Number(edad);

    // Validación mínima (evita agregar cosas vacías o edades raras)
    if (nombreLimpio === "" || !Number.isFinite(edadNum) || edadNum < 0) return;

    const nuevaPersona = { nombre: nombreLimpio, edad: edadNum };

    // Agregamos a la lista (sin mutar el array)
    setPersonas((prev) => [...prev, nuevaPersona]);

    // Blanqueamos campos
    setNombre("");
    setEdad("");
  }

  // c) ¿Existe una persona mayor de edad?
  const existeMayor = useMemo(() => {
    return personas.some((p) => p.edad >= 18);
  }, [personas]);

  // d) Promedio de edad
  const promedio = useMemo(() => {
    if (personas.length === 0) return 0;
    const suma = personas.reduce((acc, p) => acc + p.edad, 0);
    return Math.floor(suma / personas.length); // promedio entero (más prolijo para TPs)
  }, [personas]);

  return (
    <div style={{ fontFamily: "Arial", maxWidth: 560, margin: "40px auto" }}>
      <h1>Nombre y Edad</h1>

      <div style={{ display: "grid", gap: 12 }}>
        <label>
          Nombre:
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={{ marginLeft: 10, width: "100%", padding: 8 }}
            placeholder="Ej: Gonzalo"
          />
        </label>

        <label>
          Edad:
          <input
            type="number"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            style={{ marginLeft: 10, width: "100%", padding: 8 }}
            placeholder="Ej: 22"
          />
        </label>

        <button
          onClick={agregarPersona}
          style={{ padding: 10, fontSize: 16, cursor: "pointer" }}
        >
          Agregar
        </button>

        {/* c) Span mayor de edad */}
        <span style={{ fontWeight: "bold" }}>
          {existeMayor ? "Existe una persona mayor de edad" : ""}
        </span>

        {/* d) Span promedio */}
        <span>
          El promedio de edad de las personas de la lista es: <b>{promedio}</b>
        </span>

        {/* Lista visible (no lo pide explícito, pero ayuda a comprobar) */}
        <div style={{ marginTop: 10 }}>
          <h3>Lista</h3>
          {personas.length === 0 ? (
            <p style={{ color: "#666" }}>Todavía no agregaste personas.</p>
          ) : (
            <ul>
              {personas.map((p, i) => (
                <li key={i}>
                  {p.nombre} — {p.edad}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
