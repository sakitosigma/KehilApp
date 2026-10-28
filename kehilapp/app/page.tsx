"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const icons: Record<string, string> = {
  home: "M3 10.5 12 3l9 7.5M5.5 9v11h13V9M9 20v-6h6v6",
  calendar: "M7 3v4m10-4v4M4 9h16M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z",
  map: "m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Zm6-3v15m6-12v15",
  food: "M3 2v7a4 4 0 0 0 8 0V2M7 2v20m14-20v20m0-20c-3 2-4 5-4 9h4",
  compass: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm4.2-14.2-2.7 6.7-6.7 2.7 2.7-6.7 6.7-2.7Z",
  user: "M20 21v-2a7 7 0 0 0-14 0v2m7-11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z",
  arrow: "M5 12h14m-6-6 6 6-6 6",
  image: "M4 3h16a1 1 0 0 1 1 1v16H3V4a1 1 0 0 1 1-1Zm0 13 4-4 4 4 3-3 6 6M8 8h.01",
};

function Icon({ name }: { name: string }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={icons[name]} /></svg>;
}

function getCountdown(target: Date, now: number) {
  const difference = Math.max(0, target.getTime() - now);
  const days = Math.floor(difference / 86_400_000);
  const hours = Math.floor((difference % 86_400_000) / 3_600_000);
  const minutes = Math.floor((difference % 3_600_000) / 60_000);
  const seconds = Math.floor((difference % 60_000) / 1_000);
  return { days, hours, minutes, seconds };
}

function getNextShabbatTarget() {
  const current = new Date();
  const target = new Date(current);
  const daysUntilFriday = (5 - current.getDay() + 7) % 7;
  target.setDate(current.getDate() + daysUntilFriday);
  target.setHours(20, 30, 0, 0);
  if (target.getTime() <= current.getTime()) target.setDate(target.getDate() + 7);
  return target.getTime();
}

export default function Home() {
  const [now, setNow] = useState<number | null>(null);
  const [shabbatTarget, setShabbatTarget] = useState<number | null>(null);
  useEffect(() => {
    const update = () => setNow(Date.now());
    setShabbatTarget(getNextShabbatTarget());
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const untilShabbat = now && shabbatTarget ? getCountdown(new Date(shabbatTarget), now) : { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const format = (count: ReturnType<typeof getCountdown>) => `${String(count.days * 24 + count.hours).padStart(2, "0")}:${String(count.minutes).padStart(2, "0")}:${String(count.seconds).padStart(2, "0")}`;

  return (
    <main className="home-screen">
      <aside className="rail">
        <a className="pin-logo" href="#inicio" aria-label="KehilApp inicio"><Image src="/kehilapp-logo.png" alt="Logo de KehilApp" width={64} height={64} priority /></a>
        <nav className="rail-nav" aria-label="Navegación principal">
          <a className="rail-link selected" href="#inicio"><Icon name="home" /><span>Inicio</span></a>
          <a className="rail-link" href="#calendario"><Icon name="calendar" /><span>Calendario</span></a>
          <a className="rail-link" href="#mapa"><Icon name="map" /><span>Mapa</span></a>
          <a className="rail-link" href="#recetas"><Icon name="food" /><span>Recetas</span></a>
          <a className="rail-link" href="#guia"><Icon name="compass" /><span>Guía</span></a>
        </nav>
        <a className="rail-link profile-link" href="#perfil"><Icon name="user" /><span>Perfil</span></a>
      </aside>

      <section className="home-main" id="inicio">
        <div className="hero-scene" aria-hidden="true" />
        <header className="hero-header"><a className="mobile-logo" href="#inicio" aria-label="KehilApp inicio"><Image src="/kehilapp-logo.png" alt="" width={48} height={48} priority /></a><a className="wordmark" href="#inicio">KehilApp</a><div className="location"><span className="location-dot" />Madrid, España</div></header>
        <section className="countdown-area" aria-label="Cuenta regresiva para Shabbat">
          <article className="countdown-card primary-countdown"><h1>Tiempo hasta shabbat</h1><p>{format(untilShabbat)}</p><span>{untilShabbat.days ? `${untilShabbat.days} días` : "horas : minutos : segundos"}</span></article>
          <div className="secondary-countdowns">
            <article className="countdown-card"><h2>Hora comienzo shabbat</h2><p>20:30</p></article>
            <article className="countdown-card"><h2>Hora fin shabbat</h2><p>21:30</p></article>
          </div>
        </section>

        <section className="dashboard-content">
          <article className="tourism-card" id="guia"><p className="card-kicker">EXPLORÁ MADRID</p><h2>Comenzá tu guía turística</h2><p className="tourism-copy">Sinagogas, mercados y lugares kosher, armados a tu medida.</p><a className="circle-arrow" href="#mapa" aria-label="Explorar la guía"><Icon name="arrow" /></a></article>
          <article className="parasha-card"><div className="parasha-copy"><span className="parasha-label">PARASHÁ DE LA SEMANA</span><h2>Lej Lejá</h2><p>Dios llama a Abraham a dejar su tierra y le promete una gran descendencia. Así comienza el viaje de fe del pueblo judío.</p><a className="read-more" href="#parasha">Leer más <Icon name="arrow" /></a></div><div className="parasha-gallery" aria-label="Imágenes de la parashá"><div className="gallery-tile gallery-large"><Icon name="image" /></div><div className="gallery-tile"><Icon name="image" /></div><div className="gallery-tile"><Icon name="image" /></div></div></article>
          <div className="mobile-quick-links"><a id="calendario" href="#calendario">Ver calendario</a><a id="mapa" href="#mapa">Explorar mapa</a><a id="recetas" href="#recetas">Recetas kosher</a><a id="perfil" href="#perfil">Mi perfil</a></div>
        </section>
      </section>
    </main>
  );
}
