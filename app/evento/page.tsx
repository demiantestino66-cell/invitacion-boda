"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MessageCircle, Clock, Utensils, Gift, MapPin, Check, Copy, UserCheck, Camera } from "lucide-react";

export default function EventoPage() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [copiado, setCopiado] = useState(false);
  const [montado, setMontado] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState({ dias: 0, horas: 0, minutos: 0, segundos: 0 });

  useEffect(() => {
    setMontado(true);
    const usuario = localStorage.getItem("invitado_boda");
    if (!usuario) router.push("/");
    else setNombre(JSON.parse(usuario).nombre);

    // Cuenta regresiva para el 4 de Diciembre de 2026
    const fechaBoda = new Date("2026-12-04T00:00:00").getTime();

    const actualizarContador = () => {
      const ahora = new Date().getTime();
      const diferencia = fechaBoda - ahora;

      if (diferencia > 0) {
        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

        setTiempoRestante({ dias, horas, minutos, segundos });
      }
    };

    actualizarContador();
    const intervalo = setInterval(actualizarContador, 1000);
    return () => clearInterval(intervalo);
  }, [router]);

  const confirmarAsistencia = () => {
    const mensaje = `Hola Belén, soy ${nombre} y confirmo mi asistencia a su casamiento.`;
    window.open(`https://wa.me/5492804556892?text=${encodeURIComponent(mensaje)}`, "_blank");
  };

  return (
    <main className="snap-container">
      {/* FONDO DE COLLAGE ANIMADO */}
      <div className="fondo-collage">
        <img src="/collage/foto1.jpg" alt="Boda 1" />
        <img src="/collage/foto2.jpg" alt="Boda 2" />
        <img src="/collage/foto3.jpg" alt="Boda 3" />
        <img src="/collage/foto4.jpg" alt="Boda 4" />
      </div>

      {/* Pétalos */}
      <div className="petalos-container">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="petalo" style={{ left: `${Math.random() * 100}%`, animationDuration: `${Math.random() * 5 + 5}s`, animationDelay: `${Math.random() * 5}s` }} />
        ))}
      </div>

      <a href="https://wa.me/5492804556892" target="_blank" rel="noopener noreferrer" className="whatsapp-flotante" title="Consultar con Belén">
        <MessageCircle size={28} />
      </a>

      {/* PORTADA CON CONTADOR */}
      <section className="slide tarjeta-invitacion">
        <h1 className="titulo-serif" style={{ fontSize: '3rem' }}>Demián & Belén</h1>
        <p className="italic" style={{ marginBottom: '15px' }}>"Estamos felices de que formes parte de este momento tan especial. Luego de 10 años de conocernos, compartir con ustedes siempre fue un placer y queremos celebrarlo, no te pierdas los detalles de este evento."</p>
        
        {/* CONTADOR DE TIEMPO */}
        {montado && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', margin: '20px 0', background: 'rgba(255,255,255,0.7)', padding: '10px', borderRadius: '8px', border: '1px solid #d2b48c' }}>
            <div>
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold', display: 'block' }}>{tiempoRestante.dias}</span>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Días</span>
            </div>
            <div>
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold', display: 'block' }}>{tiempoRestante.horas}</span>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Hs</span>
            </div>
            <div>
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold', display: 'block' }}>{tiempoRestante.minutos}</span>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Min</span>
            </div>
            <div>
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold', display: 'block' }}>{tiempoRestante.segundos}</span>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Seg</span>
            </div>
          </div>
        )}

        <p style={{ marginTop: '10px', fontWeight: 'bold' }}>Invitado/a: {nombre}</p>
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
          href="https://photos.app.goo.gl/TU_LINK_DE_GOOGLE_PHOTOS" 
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