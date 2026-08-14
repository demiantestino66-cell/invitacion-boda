"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MessageCircle, Clock, Utensils, Gift, MapPin, Check, Copy, UserCheck, Camera } from "lucide-react";

export default function EventoPage() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    const usuario = localStorage.getItem("invitado_boda");
    if (!usuario) router.push("/");
    else setNombre(JSON.parse(usuario).nombre);
  }, [router]);

  const confirmarAsistencia = () => {
    const mensaje = `Hola Belén, soy ${nombre} y confirmo mi asistencia a su casamiento.`;
    window.open(`https://wa.me/5492804556892?text=${encodeURIComponent(mensaje)}`, "_blank");
  };

  return (
    <main className="snap-container">
      {/* Pétalos */}
      <div className="petalos-container">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="petalo" style={{ left: `${Math.random() * 100}%`, animationDuration: `${Math.random() * 5 + 5}s`, animationDelay: `${Math.random() * 5}s` }} />
        ))}
      </div>

      <a href="https://wa.me/5492804556892" target="_blank" rel="noopener noreferrer" className="whatsapp-flotante" title="Consultar con Belén">
        <MessageCircle size={28} />
      </a>

      {/* PORTADA */}
      <section className="slide tarjeta-invitacion">
        <h1 className="titulo-serif" style={{ fontSize: '3rem' }}>Demián & Belén</h1>
        <p className="italic">"Estamos felices de que formes parte de este momento tan especial. Luego de 10 años de conocernos, compartir con ustedes siempre fue un placer y queremos celebrarlo, no te pierdas los detalles de este evento."</p>
        <p style={{ marginTop: '20px', fontWeight: 'bold' }}>Invitado/a: {nombre}</p>
      </section>

      {/* CRONOGRAMA Y MAPAS */}
      <section className="slide tarjeta-invitacion">
        <Clock size={40} style={{ color: '#a0522d', margin: '0 auto 10px' }} />
        <h2 className="titulo-serif">Cronograma (4 de Dic)</h2>
        
        <div style={{ textAlign: 'left', marginTop: '15px', width: '100%' }}>
          <div style={{ marginBottom: '15px' }}>
            <p><strong>Mediodía:</strong> Casamiento Civil</p>
            <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>Calle Ameghino, Trelew</p>
            <a 
              href="https://maps.google.com/?q=Calle+Ameghino+Trelew" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', color: '#a0522d', marginTop: '4px', textDecoration: 'underline', fontWeight: '600' }}
            >
              <MapPin size={14} /> Ver ubicación en Google Maps
            </a>
          </div>

          <div>
            <p><strong>Noche:</strong> Fiesta de Casamiento</p>
            <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>Salón Sitrajuch (Sáenz Peña 315)</p>
            <a 
              href="https://maps.google.com/?q=Saenz+Pena+315+Trelew" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', color: '#a0522d', marginTop: '4px', textDecoration: 'underline', fontWeight: '600' }}
            >
              <MapPin size={14} /> Ver ubicación en Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* BUFFET */}
      <section className="slide tarjeta-invitacion">
        <Utensils size={40} style={{ color: '#a0522d', margin: '0 auto 15px' }} />
        <h2 className="titulo-serif">El Buffet</h2>
        <p>Buffet libre con contribución de los invitados a la mesa general. Habrá carne desmechada o flambeada para armar tus sándwiches.</p>
        <p style={{ marginTop: '10px', color: '#a0522d' }}>Tu plato asignado: <strong>Plato Caliente</strong></p>
      </section>

      {/* ÁLBUM DE FOTOS EN VIVO */}
      <section className="slide tarjeta-invitacion">
        <Camera size={40} style={{ color: '#a0522d', margin: '0 auto 15px' }} />
        <h2 className="titulo-serif">Álbum Compartido</h2>
        <p>Queremos ver la fiesta a través de tus ojos. Subí tus fotos y videos en tiempo real durante el evento.</p>
        <a 
          href="https://photos.app.goo.gl/TcqQRxkoZZvcHDS38" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn-boda" 
          style={{ display: 'inline-block', textDecoration: 'none', marginTop: '20px', lineHeight: 'normal' }}
        >
          Subir Fotos / Videos
        </a>
      </section>

      {/* REGALOS */}
      <section className="slide tarjeta-invitacion">
        <Gift size={40} style={{ color: '#a0522d', margin: '0 auto 15px' }} />
        <h2 className="titulo-serif">Regalos</h2>
        <p>Lo más importante es tu presencia, por eso preferimos no armar lista ni pretender presentes o que se pongan en gastos, pero aquellos que quieran hacerlo dejamos un alias a disposición.</p>
        <div style={{ background: '#fff', border: '1px solid #d2b48c', padding: '10px', marginTop: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', borderRadius: '6px' }}>
          <strong style={{ fontFamily: 'monospace' }}>demiantestino1988</strong>
          <button onClick={() => { navigator.clipboard.writeText("demiantestino1988"); setCopiado(true); setTimeout(() => setCopiado(false), 2000); }} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            {copiado ? <Check color="green" size={18} /> : <Copy size={18} />}
          </button>
        </div>
      </section>

      {/* CONFIRMACIÓN */}
      <section className="slide tarjeta-invitacion">
        <UserCheck size={40} style={{ color: '#a0522d', margin: '0 auto 15px' }} />
        <h2 className="titulo-serif">¿Nos acompañás?</h2>
        <p>Si ese día no podés asistir, no te hagas problema, ¡avisanos!</p>
        <button onClick={confirmarAsistencia} className="btn-boda" style={{ marginTop: '20px' }}>Confirmar Asistencia</button>
      </section>
    </main>
  );
}