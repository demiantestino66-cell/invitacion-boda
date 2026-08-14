"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const router = useRouter();
  const [mostrarPin, setMostrarPin] = useState(false);
  const [pin, setPin] = useState('');
  const [cargando, setCargando] = useState(false);
  const [errorPin, setErrorPin] = useState('');

  const validarAcceso = async () => {
    if (pin.length !== 4) return;
    
    setCargando(true);
    setErrorPin('');

    // Buscamos al usuario en la base de datos por su PIN
    const { data, error } = await supabase
      .from('invitados')
      .select('*')
      .eq('pin_acceso', pin)
      .single();

    if (error || !data) {
      setErrorPin('Código incorrecto. Verificá tu invitación.');
      setPin('');
      setCargando(false);
    } else {
      // Guardamos los datos del usuario en el navegador
      localStorage.setItem('invitado_boda', JSON.stringify(data));
      
      // REDIRECCIÓN INTELIGENTE SEGÚN EL ROL
      if (data.es_anfitrion) {
        router.push('/admin'); // Panel de control de los novios
      } else {
        router.push('/evento'); // Invitación interactiva
      }
    }
  };

  return (
    <main className="min-h-screen bg-stone-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-sm w-full border border-stone-200">
        <h1 className="text-4xl font-serif text-stone-800 mb-2">Demian & Barbara</h1>
        <p className="text-stone-500 mb-8 uppercase tracking-widest text-sm">¡Nos casamos!</p>
        
        {!mostrarPin ? (
          <div>
            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100 mb-8">
              <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-2">Faltan</p>
              <span className="text-5xl font-light text-stone-800">120</span>
              <p className="text-xs text-stone-400 uppercase tracking-widest mt-2">Días</p>
            </div>
            <button 
              onClick={() => setMostrarPin(true)}
              className="w-full bg-stone-800 text-white py-3 rounded-full font-medium hover:bg-stone-700 transition-colors"
            >
              Ingresar con mi PIN
            </button>
          </div>
        ) : (
          <div>
            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100 mb-6">
              <p className="text-sm text-stone-600 mb-4 font-medium">Ingresá tu código de 4 dígitos</p>
              <input 
                type="password" 
                maxLength={4}
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                className="w-full text-center text-3xl tracking-[0.5em] p-4 rounded-xl border border-stone-200 focus:border-stone-800 outline-none bg-white font-mono"
                placeholder="••••"
              />
              {errorPin && <p className="text-red-500 text-xs mt-3 font-medium">{errorPin}</p>}
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => { setMostrarPin(false); setErrorPin(''); }}
                className="flex-1 bg-stone-200 text-stone-600 py-3 rounded-full font-medium hover:bg-stone-300"
              >
                Volver
              </button>
              <button 
                onClick={validarAcceso}
                className="flex-1 bg-stone-800 text-white py-3 rounded-full font-medium hover:bg-stone-700 disabled:opacity-50"
                disabled={pin.length < 4 || cargando}
              >
                {cargando ? '...' : 'Entrar'}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}