"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { LogOut, Save, ArrowLeft, Settings } from "lucide-react";

export default function AdminPage() {
  const router = useRouter();
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState("");

  // Campos configurables del evento
  const [form, setForm] = useState({
    alias_bancario: "",
    texto_regalos: "",
    mensaje_bienvenida: "",
    foto_pareja_url: ""
  });

  useEffect(() => {
    // 1. Verificamos que quien entra sea un anfitrión autenticado
    const usuarioGuardado = localStorage.getItem("invitado_boda");
    if (!usuarioGuardado) {
      router.push("/");
      return;
    }

    const datos = JSON.parse(usuarioGuardado);
    if (!datos.es_anfitrion) {
      // Si un invitado común intenta entrar tipear /admin, lo devolvemos al evento
      router.push("/evento");
      return;
    }

    // 2. Cargamos los datos actuales de configuración desde Supabase
    const obtenerConfiguracion = async () => {
      const { data, error } = await supabase.from('configuracion_evento').select('*').single();
      if (data && !error) {
        setForm({
          alias_bancario: data.alias_bancario || "",
          texto_regalos: data.texto_regalos || "",
          mensaje_bienvenida: data.mensaje_bienvenida || "",
          foto_pareja_url: data.foto_pareja_url || ""
        });
      }
      setCargando(false);
    };

    obtenerConfiguracion();
  }, [router]);

  const guardarCambios = async (e: React.FormEvent) => {
    e.preventDefault();
    setGuardando(true);
    setMensajeExito("");

    // Actualizamos específicamente la fila maestra con el ID fijo
    const { error } = await supabase
      .from('configuracion_evento')
      .update({
        alias_bancario: form.alias_bancario,
        texto_regalos: form.texto_regalos,
        mensaje_bienvenida: form.mensaje_bienvenida,
        foto_pareja_url: form.foto_pareja_url
      })
      .eq('id', '00000000-0000-0000-0000-000000000001');

    if (error) {
      alert("Hubo un error al guardar los cambios.");
    } else {
      setMensajeExito("¡Cambios guardados con éxito!");
      setTimeout(() => setMensajeExito(""), 3000);
    }
    setGuardando(false);
  };

  const cerrarSesion = () => {
    localStorage.removeItem("invitado_boda");
    router.push("/");
  };

  if (cargando) return <div className="h-screen bg-stone-900 flex items-center justify-center text-white">Cargando panel de control...</div>;

  return (
    <main className="min-h-screen bg-stone-900 text-white p-6 pb-20">
      
      {/* HEADER DE ADMINISTRACIÓN */}
      <header className="max-w-xl mx-auto flex justify-between items-center mb-8 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <button onClick={() => router.push('/evento')} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition" title="Ir a la invitación">
            <ArrowLeft size={18} />
          </button>
          <h1 className="font-serif text-2xl flex items-center gap-2">
            <Settings size={20} className="text-stone-400" /> Panel de Anfitriones
          </h1>
        </div>
        <button onClick={cerrarSesion} className="p-2 bg-red-500/20 text-red-300 rounded-full hover:bg-red-500/30 transition" title="Cerrar Sesión">
          <LogOut size={18} />
        </button>
      </header>

      {/* FORMULARIO DE CONFIGURACIÓN */}
      <form onSubmit={guardarCambios} className="max-w-xl mx-auto bg-stone-800/50 border border-white/10 p-6 rounded-3xl backdrop-blur-md space-y-6">
        
        <div>
          <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">Mensaje Breve de Bienvenida</label>
          <textarea 
            rows={3}
            value={form.mensaje_bienvenida}
            onChange={(e) => setForm({...form, mensaje_bienvenida: e.target.value})}
            className="w-full bg-stone-900 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-stone-400 transition"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">Alias Bancario (Regalos)</label>
          <input 
            type="text"
            value={form.alias_bancario}
            onChange={(e) => setForm({...form, alias_bancario: e.target.value})}
            className="w-full bg-stone-900 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-stone-400 transition font-mono"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">Texto Descriptivo de Regalos</label>
          <textarea 
            rows={3}
            value={form.texto_regalos}
            onChange={(e) => setForm({...form, texto_regalos: e.target.value})}
            className="w-full bg-stone-900 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-stone-400 transition"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest text-stone-400 mb-2">URL de la Foto o Ilustración de la Pareja</label>
          <input 
            type="text"
            placeholder="https://ejemplo.com/foto.jpg"
            value={form.foto_pareja_url}
            onChange={(e) => setForm({...form, foto_pareja_url: e.target.value})}
            className="w-full bg-stone-900 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-stone-400 transition"
          />
          <p className="text-[10px] text-stone-400 mt-1">Peguá el enlace directo de una imagen de internet o de tu almacenamiento.</p>
        </div>

        {mensajeExito && (
          <div className="bg-green-500/20 border border-green-500/30 text-green-300 p-3 rounded-xl text-center text-sm">
            {mensajeExito}
          </div>
        )}

        <button 
          type="submit"
          disabled={guardando}
          className="w-full bg-white text-stone-900 py-3 rounded-full font-medium hover:bg-stone-200 transition flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Save size={18} /> {guardando ? 'Guardando cambios...' : 'Guardar Cambios'}
        </button>

      </form>
    </main>
  );
}