"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const manejarIngreso = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);

    // Buscamos en la tabla de invitados de Supabase el PIN ingresado
    const { data, error } = await supabase
      .from("invitados")
      .select("*")
      .eq("pin", codigo)
      .single();

    if (error || !data) {
      setError(true);
    } else {
      // Guardamos los datos del invitado en el navegador y lo mandamos al evento
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
          <p style={{ fontSize: '0.9rem', marginBottom: '10px' }}>Ingresá tu código de 4 dígitos</p>
          <input 
            type="password" 
            maxLength={4}
            value={codigo} 
            onChange={(e) => setCodigo(e.target.value)}
            style={{ padding: '10px', fontSize: '1.2rem', textAlign: 'center', width: '120px', letterSpacing: '5px', borderRadius: '6px', border: '1px solid #d2b48c', outline: 'none', marginBottom: '15px' }}
          />
          
          {error && (
            <p style={{ color: '#b22222', fontSize: '0.85rem', marginBottom: '15px' }}>
              Código incorrecto. Verificá tu invitación.
            </p>
          )}

          <div>
            <button type="submit" className="btn-boda">
              Entrar
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}