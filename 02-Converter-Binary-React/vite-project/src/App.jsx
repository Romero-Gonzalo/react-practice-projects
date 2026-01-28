import { useMemo, useState } from "react";

const KIB = 1024;
const MIB = KIB * KIB;       // 1024^2
const GIB = KIB * KIB * KIB; // 1024^3

export default function ConversorBinario() {
  // Fuente de verdad: guardamos todo en Bytes
  const [bytes, setBytes] = useState(0);

  // Derivados (se recalculan automáticamente cuando cambia bytes)
  const mib = useMemo(() => bytes / MIB, [bytes]);
  const gib = useMemo(() => bytes / GIB, [bytes]);

  function toNumber(value) {
    // input type="number" puede entregar "" cuando borrás el campo
    if (value === "") return 0;
    return Number(value);
  }

  function onChangeBytes(e) {
    setBytes(toNumber(e.target.value));
  }

  function onChangeMiB(e) {
    const newMiB = toNumber(e.target.value);
    setBytes(newMiB * MIB);
  }

  function onChangeGiB(e) {
    const newGiB = toNumber(e.target.value);
    setBytes(newGiB * GIB);
  }

  return (
    <div style={{ fontFamily: "Arial", maxWidth: 520, margin: "40px auto" }}>
      <h1>Conversor de datos binarios</h1>
      <p>Entre bytes (B), mebibytes (MiB) y gibibytes (GiB)</p>

      <div style={{ display: "grid", gap: 12 }}>
        <label>
          Bytes (B):
          <input
            type="number"
            value={bytes}
            onChange={onChangeBytes}
            style={{ marginLeft: 10, width: "100%" }}
          />
        </label>

        <label>
          Mebibytes (MiB):
          <input
            type="number"
            value={mib}
            onChange={onChangeMiB}
            style={{ marginLeft: 10, width: "100%" }}
          />
        </label>

        <label>
          Gibibytes (GiB):
          <input
            type="number"
            value={gib}
            onChange={onChangeGiB}
            style={{ marginLeft: 10, width: "100%" }}
          />
        </label>
      </div>
    </div>
  );
}
