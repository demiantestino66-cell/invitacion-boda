"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// ¡Tu lista oficial incrustada en el código! 100% a prueba de fallos.
const LISTA_INVITADOS = [
  { nombre: "Familia Urrutia Palermo", plato: "Plato Caliente" },
  { nombre: "Amorina Testino", plato: "Plato Frio" },
  { nombre: "Sofia Testino", plato: "Plato Caliente" },
  { nombre: "Mónica Melo", plato: "Plato Frio" },
  { nombre: "Iván Urrutia Testino", plato: "Plato Caliente" },
  { nombre: "Familia Carrizo Villaruel", plato: "Plato Caliente" },
  { nombre: "Lucia y David", plato: "Plato Frio" },
  { nombre: "Carola Negra Marcia", plato: "Plato Caliente" },
  { nombre: "Marisol y Cristian", plato: "Plato Frio" },
  { nombre: "Agustín Carpintero", plato: "Plato Caliente" },
  { nombre: "Claudia Melo", plato: "Plato Frio" },
  { nombre: "Familia Coronel Pena", plato: "Plato Caliente" },
  { nombre: "Familia Leiva Merino", plato: "Plato Frio" },
  { nombre: "Julio Leiva", plato: "Plato Caliente" },
  { nombre: "Lucaioli", plato: "Plato Frio" },
  { nombre: "Ariel Testino", plato: "Plato Caliente" },
  { nombre: "Nahuel Testino", plato: "Plato Frio" },
  { nombre: "Cristina Carrizo", plato: "Plato Caliente" },
  { nombre: "Fede Aguero", plato: "Plato Frio" },
  { nombre: "Turco Abdon", plato: "Plato Frio" },
  { nombre: "Guille Morejon", plato: "Plato Frio" },
  { nombre: "Familia Amat Falcon", plato: "Plato Caliente" },
  { nombre: "Marcel Carrizo", plato: "Plato Frio" },
  { nombre: "Laura y Chino", plato: "Plato Caliente" },
  { nombre: "Chino y Agos", plato: "Plato Frio" },
  { nombre: "Franco Carrizo", plato: "Plato Frio" },
  { nombre: "Vero y Juan", plato: "Plato Caliente" },
  { nombre: "Sofia Oyarzo", plato: "Plato Frio" },
  { nombre: "Kary Zalazar", plato: "Plato Frio" },
  { nombre: "Mica y Elian", plato: "Plato Caliente" },
  { nombre: "Rocio Lautaro y Fausto", plato: "Plato Frio" },
  { nombre: "Leti Pereyra", plato: "Plato Caliente" },
  { nombre: "Ayelen Melo", plato: "A definir" },
  { nombre: "Demián y Belén", plato: "A definir" },
  { nombre: "Familia Prueba", plato: "A definir" }
];

export default function LoginPage() {
  const [nombreIngreso, setNombreIngreso] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const router = useRouter();

  const manejarIngreso = (e: React.FormEvent) => {
    e.preventDefault();
    setMensajeError("");

    const inputLimpio = nombreIngreso.trim().toLowerCase();

    // Evitar que pongan solo 1 o 2 letras
    if (inputLimpio.length < 3) {
      setMensajeError("Por favor, escribí un poco más de tu nombre.");
      return;
    }

    // Buscador inteligente: se fija si lo que escribió el invitado está dentro de la lista
    const invitadoEncontrado = LISTA_INVITADOS.find(inv => 
      inv.nombre.toLowerCase().includes(inputLimpio) || 
      inputLimpio.includes(inv.nombre.toLowerCase())
    );

    if (invitadoEncontrado) {
      // Si lo encuentra, lo guarda y lo deja pasar al evento
      localStorage.setItem("invitado_boda", JSON.stringify(invitadoEncontrado));
      router.push("/evento");
    } else {
      setMensajeError("No encontramos tu nombre. Revisá si está bien escrito.");
    }
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fcfaf7', color: '#5d4a3a', padding: '20px' }}>
      <div className="tarjeta-invitacion" style={{ maxWidth: '400px', width: '100%', textAlign: 'center' }}>
        <h1 className="titulo-serif" style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Demián & Belén</h1>
        <p style={{ fontStyle: 'italic', marginBottom: '20px' }}>¡Nos casamos!</p>
        
        <form onSubmit={manejarIngreso}>
          <p style={{ fontSize: '0.95rem', marginBottom: '5px', fontWeight: 'bold' }}>Ingresá tu Nombre o Apellido</p>
          <p style={{ fontSize: '0.75rem', marginBottom: '15px', opacity: 0.8 }}>(O el nombre de tu grupo familiar)</p>
          
          <input 
            type="text" 
            value={nombreIngreso} 
            onChange={(e) => setNombreIngreso(e.target.value)}
            placeholder="Ej: Familia Urrutia"
            style={{ padding: '12px', fontSize: '1.1rem', textAlign: 'center', width: '90%', borderRadius: '6px', border: '1px solid #d2b48c', outline: 'none', marginBottom: '15px' }}
            required
          />
          
          {mensajeError && (
            <div style={{ backgroundColor: '#ffdddd', color: '#b22222', padding: '10px', borderRadius: '5px', marginBottom: '15px', fontSize: '0.85rem' }}>
              <strong>{mensajeError}</strong>
            </div>
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