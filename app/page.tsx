"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [nombreIngreso, setNombreIngreso] = useState("");
  const [error, setError] = useState(false);
  const [cargando, setCargando] = useState(false);
  const router = useRouter();

  const manejarIngreso = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setCargando(true);

    // Sacamos espacios vacíos al principio o al final por si tipean mal
    const nombreLimpio = nombreIngreso.trim();

    // BYPASS DE PRUEBA: Si escribís "Familia Prueba", te deja entrar directo para testear sin base de datos
    if (nombreLimpio.toLowerCase() === "familia prueba") {
      const invitadoFalso = { nombre: "Familia Prueba (Admin)" };
      localStorage.setItem("invitado_boda", JSON.stringify(invitadoFalso));
      router.push("/evento");
      return;
    }

    // Búsqueda real en Supabase (ilike ignora mayúsculas, minúsculas y busca coincidencias)
    const { data, error } = await supabase
      .from("invitados")
      .select("*")
      .ilike("nombre", nombreLimpio)
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      setError(true);
      setCargando(false);
    } else {
      localStorage.setItem("invitado_boda", JSON.stringify(data));
      router.push("/evento");
    }
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fcfaf7', color: '#5d4a3a', padding: '20px' }}>
      <div className="tarjeta-invitacion" style={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}>
        <h1 className="titulo-serif" style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Demián & Belén</h1>
        <p style={{ fontStyle: 'italic', marginBottom: '20px' }}>¡Nos casamos!</p>
        
        <form onSubmit={manejarIngreso}>
          <p style={{ fontSize: '0.95rem', marginBottom: '5px', fontWeight: 'bold' }}>Ingresá tu Nombre y Apellido</p>
          <p style={{ fontSize: '0.75rem', marginBottom: '15px', opacity: 0.8 }}>(O el nombre de tu grupo familiar)</p>
          
          <input 
            type="text" 
            value={nombreIngreso} 
            onChange={(e) => setNombreIngreso(e.target.value)}
            placeholder="Ej: Juan Perez"
            style={{ padding: '12px', fontSize: '1.1rem', textAlign: 'center', width: '90%', borderRadius: '6px', border: '1px solid #d2b48c', outline: 'none', marginBottom: '15px' }}
            required
          />
          
          {error && (
            <p style={{ color: '#b22222', fontSize: '0.85rem', marginBottom: '15px', padding: '0 10px' }}>
              No encontramos tu nombre. Revisá que esté bien escrito o contactate con nosotros.
            </p>
          )}

          <div>
            <button type="submit" className="btn-boda" disabled={cargando}>
              {cargando ? "Buscando..." : "Entrar"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}