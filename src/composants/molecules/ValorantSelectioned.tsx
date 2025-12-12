import React from "react";

// --- 1. TYPES SIMPLIFIÉS ---
// Juste des strings, pas d'objets complexes
type SimpleValorantProps = {
  duelist: string;
  sentinel: string;
  initiator: string;
  controller: string;
  flex: string;
};

// --- 2. ICÔNES SVG VALORANT ---
const Icons = {
  duelist: (
    <svg viewBox="0 0 100 100" fill="#ECE8E1" width="24" height="24">
      <path d="M50 8.5L12.5 91.5H87.5L50 8.5Z" />
    </svg>
  ),
  sentinel: (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="#ECE8E1"
      strokeWidth="10"
      width="24"
      height="24"
    >
      <path d="M50 10L85 30V60L50 90L15 60V30L50 10Z" />
      <rect x="42" y="35" width="16" height="30" fill="#ECE8E1" stroke="none" />
    </svg>
  ),
  initiator: (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="#ECE8E1"
      strokeWidth="8"
      width="24"
      height="24"
    >
      <circle cx="50" cy="50" r="35" />
      <path d="M30 30L70 70M70 30L30 70" />
    </svg>
  ),
  controller: (
    <svg viewBox="0 0 100 100" fill="#ECE8E1" width="24" height="24">
      <circle cx="25" cy="35" r="15" />
      <circle cx="75" cy="35" r="15" />
      <path d="M50 90L20 50H80L50 90Z" />
    </svg>
  ),
  flex: (
    <svg viewBox="0 0 100 100" fill="#ECE8E1" width="24" height="24">
      <rect x="35" y="10" width="30" height="80" />
      <rect x="10" y="35" width="80" height="30" />
    </svg>
  ),
};

// --- 3. SOUS-COMPOSANT LIGNE ---
const RoleRow = ({
  roleName,
  playerName,
  icon,
}: {
  roleName: string;
  playerName: string;
  icon: React.ReactNode;
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      backgroundColor: "#1F2326", // Gris foncé
      padding: "12px 16px",
      marginBottom: "8px",
      borderLeft: "4px solid #FF4655", // Barre Rouge à gauche
      boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
      transition: "transform 0.2s",
    }}
  >
    {/* Conteneur Icône */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "40px",
        height: "40px",
        backgroundColor: "#0F1923",
        borderRadius: "4px",
        marginRight: "16px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      {icon}
    </div>

    {/* Textes */}
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span
        style={{
          color: "#FF4655", // Rouge Valorant
          fontSize: "10px",
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: "1px",
          marginBottom: "2px",
        }}
      >
        {roleName}
      </span>
      <span
        style={{
          color: "white",
          fontSize: "18px",
          fontWeight: "bold",
          textTransform: "uppercase",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {playerName}
      </span>
    </div>
  </div>
);

// --- 4. COMPOSANT PRINCIPAL ---
export function SimpleValorantSideList({
  duelist,
  sentinel,
  initiator,
  controller,
  flex,
}: SimpleValorantProps) {
  return (
    <div
      style={{
        width: "96%",
        height: "100%", // S'adapte au parent (ex: 441px)
        backgroundColor: "#0F1923", // Fond Noir/Bleu Valorant
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // Centre verticalement si il y a de la place
      }}
    >
      <RoleRow roleName="Duelist" playerName={duelist} icon={Icons.duelist} />
      <RoleRow
        roleName="Sentinel"
        playerName={sentinel}
        icon={Icons.sentinel}
      />
      <RoleRow
        roleName="Initiator"
        playerName={initiator}
        icon={Icons.initiator}
      />
      <RoleRow
        roleName="Controller"
        playerName={controller}
        icon={Icons.controller}
      />
      <RoleRow roleName="Polyvalent" playerName={flex} icon={Icons.flex} />
    </div>
  );
}
