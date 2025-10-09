import { useEffect, useRef, useState } from 'react';
import '../App.css';
import '../accueil.css';

// Images
import BackgroundEsport from '/background_esport.jpg';
import EpicGames from '/sponsors/epicgames.png';
import Steam from '/sponsors/steam.png';
import Free from '/sponsors/free.png';
import SCO from '/sponsors/SCO.png';
import LeGaulois from '/sponsors/leGaulois.png';
import RTX from '/sponsors/RTX.png';
import MSI from '/sponsors/MSI.png';
import Corsair from '/sponsors/corsair.png';

// Tableau avec logo, lien et classe spécifique
const sponsors = [
  { src: EpicGames, link: 'https://www.epicgames.com', class: '' },
  { src: Steam, link: 'https://store.steampowered.com', class: '' },
  { src: Free, link: 'https://www.free.fr', class: 'free' },
  { src: SCO, link: 'https://www.sco.fr', class: '' },
  { src: LeGaulois, link: 'https://www.legaulois.fr', class: '' },
  { src: RTX, link: 'https://www.nvidia.com/rtx', class: 'rtx' },
  { src: MSI, link: 'https://www.msi.com', class: '' },
  { src: Corsair, link: 'https://www.corsair.com', class: '' },
];

const BodyAccueil = () => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const speed = 0.5;
    const track = trackRef.current;
    if (!track) return;

    let raf: number;
    let totalWidth = track.scrollWidth / 2;

    const animate = () => {
      setPosition((prev) => {
        const newPos = prev - speed;
        return newPos <= -totalWidth ? 0 : newPos;
      });
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="body-accueil">
      <img src={BackgroundEsport} alt="Background" className="backgroundesport" />
      <div className='title-accueil'>
        TU ES CAPABLE D'ACCOMPLIR DE GRANDES CHOSES
      </div>
      <div className="bodySponsors">
        <div
          className="sponsor-track"
          ref={trackRef}
          style={{ transform: `translateX(${position}px)` }}
        >
          {[...sponsors, ...sponsors].map((sponsor, i) => (
            <a
              key={i}
              href={sponsor.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={sponsor.src}
                alt={`Sponsor ${i}`}
                className={`sponsors ${sponsor.class}`}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BodyAccueil;
