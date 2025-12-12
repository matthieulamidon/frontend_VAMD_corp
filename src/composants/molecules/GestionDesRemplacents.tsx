// --- 1. Définition des types de données ---
// Chaque personne a un nom et une URL pour son icône (rôle ou visage)
export type MemberProps = {
  name: string;
  icon: string; // URL de l'image (png/jpg)
  roleName?: string; // Optionnel : pour l'accessibilité ou afficher le texte du rôle
};

type TeamListProps = {
  coach?: MemberProps; // Un seul coach principal
  substitutes: MemberProps[]; // Une liste de remplaçants
  staff: MemberProps[]; // Une liste de staff (managers, analystes...)
};

// --- 2. Sous-composant : Une ligne (Icone + Nom) ---
const TeamMemberRow = ({
  member,
  Jeux,
}: {
  member?: MemberProps;
  Jeux?: string;
}) => {
  if (!member) return null;

  const GOLD_COLOR = "#c9aa71";
  const RED_COLOR = "#FF4655";
  const BLUE_COLOR = "#0A74DA"; // couleur par défaut

  const selectedColor =
    Jeux === "League of Legends"
      ? GOLD_COLOR
      : Jeux === "Valorant"
        ? RED_COLOR
        : BLUE_COLOR; // Fortnite ou autre

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center", // Aligne verticalement au centre
        marginBottom: "12px",
        backgroundColor: "rgba(0, 0, 0, 0.4)", // Fond sombre léger
        padding: "8px 12px",
        borderRadius: "8px",
        backdropFilter: "blur(4px)", // Petit effet de flou moderne
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      {/* L'icône à gauche */}
      <img
        src={member.icon}
        alt={member.roleName || "icon"}
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%", // Rond
          objectFit: "cover",
          marginRight: "12px", // Espace entre icône et nom
          border: `2px solid ${selectedColor}`, // Bordure dorée style LoL
        }}
      />

      {/* Le nom à droite */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: "14px",
            textShadow: "0 1px 2px black",
          }}
        >
          {member.name}
        </span>
        {/* Petit texte gris pour le rôle si fourni (ex: "Top Laner") */}
        {member.roleName && (
          <span
            style={{
              color: "#aaa",
              fontSize: "10px",
              textTransform: "uppercase",
            }}
          >
            {member.roleName}
          </span>
        )}
      </div>
    </div>
  );
};

// --- 3. Sous-composant : Titre de section ---
const SectionTitle = ({ title, Jeux }: { title: string; Jeux?: string }) => {
  const GOLD_COLOR = "#c9aa71";
  const RED_COLOR = "#FF4655";
  const BLUE_COLOR = "#0A74DA"; // couleur par défaut

  const selectedColor =
    Jeux === "League of Legends"
      ? GOLD_COLOR
      : Jeux === "Valorant"
        ? RED_COLOR
        : BLUE_COLOR; // Fortnite ou autre
  return (
    <h3
      style={{
        color: `${selectedColor}`, // Couleur or/beige LoL
        fontSize: "12px",
        textTransform: "uppercase",
        letterSpacing: "2px",
        borderBottom: "1px solid rgba(201, 170, 113, 0.3)",
        paddingBottom: "4px",
        marginBottom: "10px",
        marginTop: "20px",
        fontWeight: "bold",
      }}
    >
      {title}
    </h3>
  );
};

// --- 4. Le Composant Principal ---
export function TeamSideList({
  coach,
  substitutes,
  staff,
  Jeux,
}: TeamListProps & { Jeux?: string }) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "300px", // Largeur de la colonne
        padding: "16px",
        backgroundColor: "#091428", // Fond bleu très foncé (LoL Hextech)
        borderRadius: "8px",
        fontFamily: "sans-serif",
      }}
    >
      {/* --- SECTION COACH --- */}
      <div style={{ marginTop: 0 }}>
        {" "}
        {/* Enlever la marge du premier titre */}
        <SectionTitle title="Head Coach" Jeux={Jeux} />
        <TeamMemberRow member={coach} Jeux={Jeux} />
      </div>

      {/* --- SECTION REMPLAÇANTS --- */}
      {substitutes.length > 0 && (
        <div>
          <SectionTitle title="Remplaçants" Jeux={Jeux} />
          {substitutes.map((sub, index) => (
            <TeamMemberRow key={index} member={sub} Jeux={Jeux} />
          ))}
        </div>
      )}

      {/* --- SECTION STAFF / AUTRES --- */}
      {staff.length > 0 && (
        <div>
          <SectionTitle title="Staff & Management" Jeux={Jeux} />
          {staff.map((member, index) => (
            <TeamMemberRow key={index} member={member} Jeux={Jeux} />
          ))}
        </div>
      )}
    </div>
  );
}
