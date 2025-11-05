import { useEffect, useRef, useState } from "react";
import "../../App.css";
import "../../accueil.css";

// Images
import BackgroundEsport from "../../assets/background_esport.jpg";
import EpicGames from "../../assets/sponsors/epicgames.png";
import Steam from "../../assets/sponsors/steam.png";
import Free from "../../assets/sponsors/free.png";
import SCO from "../../assets/sponsors/SCO.png";
import LeGaulois from "../../assets/sponsors/leGaulois.png";
import RTX from "../../assets/sponsors/RTX.png";
import MSI from "../../assets/sponsors/MSI.png";
import Corsair from "../../assets/sponsors/corsair.png";

// Tableau avec logo, lien et classe spécifique
const sponsors = [
  { id: "epicgames", src: EpicGames, link: "https://www.epicgames.com", class: "" },
  { id: "steam", src: Steam, link: "https://store.steampowered.com", class: "" },
  { id: "free", src: Free, link: "https://www.free.fr", class: "free" },
  { id: "sco", src: SCO, link: "https://www.sco.fr", class: "" },
  { id: "legaulois", src: LeGaulois, link: "https://www.legaulois.fr", class: "" },
  { id: "rtx", src: RTX, link: "https://www.nvidia.com/rtx", class: "rtx" },
  { id: "msi", src: MSI, link: "https://www.msi.com", class: "" },
  { id: "corsair", src: Corsair, link: "https://www.corsair.com", class: "" },
];

const BodyAccueil = () => {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const speed =0.5;
    const track = trackRef.current;
    if (!track) return;

    let raf: number;
    const totalWidth = track.scrollWidth / 2;

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
      <img
        src={BackgroundEsport}
        alt="Background"
        className="backgroundesport"
      />
      <div className="title-accueil">
        TU ES CAPABLE D'ACCOMPLIR DE GRANDES CHOSES
      </div>
      <div className="bodySponsors">
        <div
          className="sponsor-track"
          ref={trackRef}
          style={{ transform: `translateX(${position}px)` }}
        >
          {[...sponsors, ...sponsors].map((sponsor, index) => (
            <a
              key={`${sponsor.id}-${index}`}
              href={sponsor.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={sponsor.src}
                alt={`Sponsor ${sponsor.id}`}
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
