"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { MessageCircle, Clock, Utensils, Gift, MapPin, Check, Copy, UserCheck, Camera, Music, Pause, Wine, Shirt } from "lucide-react";

export default function EventoPage() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [plato, setPlato] = useState("A definir");
  const [copiado, setCopiado] = useState(false);
  const [montado, setMontado] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState({ dias: 0, horas: 0, minutos: 0, segundos: 0 });
  
  const [reproduciendo, setReproduciendo] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setMontado(true);
    const usuario = localStorage.getItem("invitado_boda");
    if (!usuario) {
      router.push("/");
    } else {
      const data = JSON.parse(usuario);
      setNombre(data.nombre);
      if (data.plato) {
        setPlato(data.plato);
      }
    }

    const fechaBoda = new Date("2026-12-04T13:00:00").getTime();

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

  const toggleMusica = () => {
    if (audioRef.current) {
      if (reproduciendo) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setReproduciendo(!reproduciendo);
    }
  };

  const IconStyle = { color: '#8c6239', margin: '0 auto 5px' };

  return (
    <main className="snap-container">
      <audio ref={audioRef} src="/musica.mp3" loop preload="auto" />

      <button onClick={toggleMusica} className="musica-flotante" title="Reproducir música">
        {reproduciendo ? <Pause strokeWidth={1.5} size={24} /> : <Music strokeWidth={1.5} size={24} />}
      </button>

      {/* FONDO DE COLLAGE */}
      <div className="fondo-collage">
        <img src="/collage/foto1.jpg" alt="Boda 1" />
        <img src="/collage/foto2.jpg" alt="Boda 2" />
        <img src="/collage/foto3.jpg" alt="Boda 3" />
        <img src="/collage/foto4.jpg" alt="Boda 4" />
      </div>

      <div className="petalos-container">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="petalo" style={{ left: `${Math.random() * 100}%`, animationDuration: `${Math.random() * 5 + 5}s`, animationDelay: `${Math.random() * 5}s` }} />
        ))}
      </div>

      <a href="https://wa.me/5492804556892" target="_blank" rel="noopener noreferrer" className="whatsapp-flotante" title="Consultar con Belén">
        <MessageCircle strokeWidth={1.5} size={28} />
      </a>

      {/* PORTADA */}
      <section className="slide tarjeta-invitacion fade-in">
        <h1 className="titulo-serif" style={{ fontSize: '3.2rem', lineHeight: '1.1' }}>Demián<br/><span style={{ fontSize: '1.5rem', fontStyle: 'italic', textTransform: 'lowercase' }}>&</span><br/>Belén</h1>
        <div className="separador-elegante"></div>
        <p className="italic" style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>"Estamos felices de que formes parte de este momento tan especial. Luego de 10 años de conocernos, compartir con ustedes siempre fue un placer y queremos celebrarlo."</p>
        
        {montado && (
          <div className="contador-premium">
            <div className="contador-item">
              <span style={{ fontSize: '1.6rem', fontWeight: '300', display: 'block' }}>{tiempoRestante.dias}</span>
              <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Días</span>
            </div>
            <div className="contador-item">
              <span style={{ fontSize: '1.6rem', fontWeight: '300', display: 'block' }}>{tiempoRestante.horas}</span>
              <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Hs</span>
            </div>
            <div className="contador-item">
              <span style={{ fontSize: '1.6rem', fontWeight: '300', display: 'block' }}>{tiempoRestante.minutos}</span>
              <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Min</span>
            </div>
            <div className="contador-item">
              <span style={{ fontSize: '1.6rem', fontWeight: '300', display: 'block' }}>{tiempoRestante.segundos}</span>
              <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Seg</span>
            </div>
          </div>
        )}
        <p style={{ marginTop: '10px', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Invitado/a: <strong>{nombre}</strong></p>
      </section>

      {/* CRONOGRAMA */}
      <section className="slide tarjeta-invitacion fade-in">
        <Clock strokeWidth={1.2} size={42} style={IconStyle} />
        <h2 className="titulo-serif" style={{ fontSize: '1.8rem' }}>Cronograma</h2>
        <div className="separador-elegante"></div>
        
        <div style={{ textAlign: 'center', marginTop: '15px', width: '100%', lineHeight: '1.6' }}>
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '1px' }}><strong>13:00 HS</strong></p>
            <p style={{ fontStyle: 'italic', opacity: 0.9 }}>Casamiento Civil</p>
            <p style={{ fontSize: '0.9rem' }}>Calle Ameghino, Trelew</p>
            <a href="https://maps.google.com/?q=Calle+Ameghino+Trelew" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', color: '#8c6239', marginTop: '8px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>
              <MapPin size={12} /> Ver Mapa
            </a>
          </div>

          <div>
            <p style={{ fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '1px' }}><strong>20:30 HS</strong></p>
            <p style={{ fontStyle: 'italic', opacity: 0.9 }}>Fiesta de Casamiento</p>
            <p style={{ fontSize: '0.9rem' }}>Salón Sitrajuch (Sáenz Peña 315)</p>
            <a href="https://maps.google.com/?q=Saenz+Pena+315+Trelew" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', color: '#8c6239', marginTop: '8px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>
              <MapPin size={12} /> Ver Mapa
            </a>
          </div>
        </div>
      </section>

      {/* BUFFET */}
      <section className="slide tarjeta-invitacion fade-in">
        <Utensils strokeWidth={1.2} size={42} style={IconStyle} />
        <h2 className="titulo-serif" style={{ fontSize: '1.8rem' }}>El Buffet</h2>
        <div className="separador-elegante"></div>
        <p style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>Buffet libre con contribución de los invitados a la mesa general. Habrá carne desmechada o flambeada para armar tus sándwiches.</p>
        <div style={{ marginTop: '20px', padding: '10px', background: 'rgba(255,255,255,0.4)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.5)' }}>
          <p style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Tu plato asignado</p>
          <p style={{ fontSize: '1.2rem', color: '#5c3a21', fontWeight: 'bold' }}>{plato}</p>
        </div>
      </section>

      {/* BEBIDAS */}
      <section className="slide tarjeta-invitacion fade-in">
        <Wine strokeWidth={1.2} size={42} style={IconStyle} />
        <h2 className="titulo-serif" style={{ fontSize: '1.8rem' }}>Bebida</h2>
        <div className="separador-elegante"></div>
        <p style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>Vamos a contar con Cerveza y Vino para la cena y el baile.</p>
        <p style={{ fontSize: '1.05rem', lineHeight: '1.6', marginTop: '10px' }}>Podés llevar tu conservadora con la bebida que prefieras.</p>
      </section>

      {/* VESTIMENTA */}
      <section className="slide tarjeta-invitacion fade-in">
        <Shirt strokeWidth={1.2} size={42} style={IconStyle} />
        <h2 className="titulo-serif" style={{ fontSize: '1.8rem' }}>Vestimenta</h2>
        <div className="separador-elegante"></div>
        <p style={{ fontSize: '1.05rem', lineHeight: '1.6', fontStyle: 'italic' }}>"Ese día podés ir vestido como más cómodo te sientas."</p>
      </section>

      {/* ÁLBUM DE FOTOS */}
      <section className="slide tarjeta-invitacion fade-in">
        <Camera strokeWidth={1.2} size={42} style={IconStyle} />
        <h2 className="titulo-serif" style={{ fontSize: '1.8rem' }}>Álbum Vivo</h2>
        <div className="separador-elegante"></div>
        <p style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>Queremos ver la fiesta a través de tus ojos. Subí tus fotos y videos en tiempo real durante el evento.</p>
        <a href="https://photos.app.goo.gl/TcqQRxkoZZvcHDS38" target="_blank" rel="noopener noreferrer" className="btn-boda" style={{ display: 'inline-block', textDecoration: 'none', marginTop: '20px' }}>
          Subir Fotos al Álbum
        </a>
      </section>

      {/* REGALOS */}
      <section className="slide tarjeta-invitacion fade-in">
        <Gift strokeWidth={1.2} size={42} style={IconStyle} />
        <h2 className="titulo-serif" style={{ fontSize: '1.8rem' }}>Regalos</h2>
        <div className="separador-elegante"></div>
        <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>Lo más importante es tu presencia, por eso preferimos no armar lista ni pretender presentes o que se pongan en gastos. Aquellos que quieran hacerlo, dejamos un alias a disposición.</p>
        <div style={{ background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.6)', padding: '12px', marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', borderRadius: '12px', backdropFilter: 'blur(5px)' }}>
          <strong style={{ fontFamily: 'monospace', fontSize: '1.1rem', letterSpacing: '1px' }}>demiantestino1988</strong>
          <button onClick={() => { navigator.clipboard.writeText("demiantestino1988"); setCopiado(true); setTimeout(() => setCopiado(false), 2000); }} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            {copiado ? <Check color="green" strokeWidth={2} size={20} /> : <Copy strokeWidth={1.5} size={20} />}
          </button>
        </div>
      </section>

      {/* CONFIRMACIÓN */}
      <section className="slide tarjeta-invitacion fade-in">
        <UserCheck strokeWidth={1.2} size={42} style={IconStyle} />
        <h2 className="titulo-serif" style={{ fontSize: '1.8rem' }}>¿Nos acompañás?</h2>
        <div className="separador-elegante"></div>
        <p style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>Si ese día no podés asistir, no te hagas problema, ¡avisanos!</p>
        <button onClick={confirmarAsistencia} className="btn-boda" style={{ marginTop: '25px', padding: '15px 30px', fontSize: '1.1rem' }}>Confirmar Asistencia</button>
      </section>
    </main>
  );
}