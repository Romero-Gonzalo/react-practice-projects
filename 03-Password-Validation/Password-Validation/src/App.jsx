import { useMemo, useState } from "react";

const SPECIALS = new Set(["!", "?", "$", "%", "&", "#"]);

function hasSpecial(str) {
  for (const ch of str) if (SPECIALS.has(ch)) return true;
  return false;
}

export default function App() {
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");

  // Validaciones (en tiempo real)
  const checks = useMemo(() => {
    const min8 = pass.length >= 8;
    const hasNumber = /\d/.test(pass);
    const hasSign = hasSpecial(pass);
    const noSpaces = !/\s/.test(pass); // \s detecta espacios, tabs, etc.
    const match = pass.length > 0 && pass === confirm;

    return { min8, hasNumber, hasSign, noSpaces, match };
  }, [pass, confirm]);

  // Todo válido = botón habilitado
  const allValid =
    checks.min8 &&
    checks.hasNumber &&
    checks.hasSign &&
    checks.noSpaces &&
    checks.match;

  function onSubmit(e) {
    e.preventDefault();
    if (allValid) {
      alert("✅ Contraseña válida y confirmada!");
    }
  }

  // Componente mini para mostrar cada regla en verde/rojo
  function Rule({ ok, children }) {
    return (
      <li style={{ color: ok ? "green" : "red", marginBottom: 6 }}>
        {ok ? "✅" : "❌"} {children}
      </li>
    );
  }

  return (
    <div style={{ fontFamily: "Arial", maxWidth: 520, margin: "40px auto" }}>
      <h1>Validación de contraseña</h1>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <label>
          Contraseña:
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            style={{ marginLeft: 10, width: "100%", padding: 8 }}
            placeholder="Ingresá tu contraseña"
          />
        </label>

        <label>
          Confirmar contraseña:
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            style={{ marginLeft: 10, width: "100%", padding: 8 }}
            placeholder="Repetila"
          />
        </label>

        <div style={{ marginTop: 6 }}>
          <h3 style={{ margin: "10px 0" }}>Requisitos</h3>
          <ul style={{ paddingLeft: 18, margin: 0 }}>
            <Rule ok={checks.min8}>Mínimo 8 caracteres</Rule>
            <Rule ok={checks.hasNumber}>Al menos un número</Rule>
            <Rule ok={checks.hasSign}>
              Al menos un signo (!, ?, $, %, &, #)
            </Rule>
            <Rule ok={checks.noSpaces}>No contener espacios</Rule>
            <Rule ok={checks.match}>Ambas contraseñas deben coincidir</Rule>
          </ul>
        </div>

        <button
          type="submit"
          disabled={!allValid}
          style={{
            padding: 10,
            fontSize: 16,
            cursor: allValid ? "pointer" : "not-allowed",
            opacity: allValid ? 1 : 0.6,
            marginTop: 10,
          }}
        >
          Confirmar
        </button>
      </form>
    </div>
  );
}
