import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import main2 from "./assets/main2.mp4";

const ITEMS = [
  { id: "i", badge: "I", title: "MUSIC STREAM", subtitle: "Proyecto HTML + CSS", rank: 1 },
  { id: "ii", badge: "II", title: "CAMPUS BUILD", subtitle: "PROYECTO JAVASCRIPT", rank: 2 },
  { id: "iii", badge: "III", title: "NEO METRO", subtitle: "HACKATON", rank: 3 },
  { id: "iv", badge: "IV", title: "CHIBI PENGUIN STUDIO", subtitle: "RETO DE IA", rank: 4 },
];

// Edita la descripción y el href de cada proyecto desde aquí.
const PROJECT_DETAILS = [
  {
    id: "i",
    description: "Escribe aquí una breve descripción de Music Stream: su objetivo, las tecnologías que utilizaste y lo que aprendiste durante el proyecto.",
    href: "https://example.com/music-stream",
  },
  {
    id: "ii",
    description: "Escribe aquí una breve descripción de Campus Build: el problema que resuelve, sus funciones principales y tu aporte al desarrollo.",
    href: "https://example.com/campus-build",
  },
  {
    id: "iii",
    description: "Escribe aquí una breve descripción de Neo Metro: el reto de la hackatón, la solución propuesta y los resultados que obtuvo.",
    href: "https://example.com/neo-metro",
  },
  {
    id: "iv",
    description: "Escribe aquí una breve descripción de Chibi Penguin Studio: cómo aplicaste la IA y qué experiencia ofrece el proyecto.",
    href: "https://example.com/chibi-penguin-studio",
  },
];

export default function ResumePage() {
  const src = main2;
  const navigate = useNavigate();
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [mounted, setMounted] = useState(false);
  const selectedProject = PROJECT_DETAILS.find((project) => project.id === selectedProjectId);
  const selectedItem = ITEMS.find((item) => item.id === selectedProjectId);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "Escape" || e.key === "Backspace") navigate(-1);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  return (
    <div id="menu-screen">
      <video src={src} autoPlay loop muted playsInline />
      <div className="resume-entry-mask" aria-hidden="true">
        <video className="resume-entry-video" src={src} autoPlay loop muted playsInline />
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&display=swap');

        .resume-entry-mask {
          position: absolute;
          inset: 0;
          z-index: 9;
          overflow: hidden;
          background: #0047FF;
          clip-path: circle(0 at 50% 50%);
          animation: resume-entry-reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          pointer-events: none;
        }

        .resume-entry-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @keyframes resume-entry-reveal {
          from { clip-path: circle(0 at 50% 50%); }
          to { clip-path: circle(150vmax at 50% 50%); }
        }

        .resume-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          pointer-events: none;
        }

        .resume-stack {
          position: absolute;
          top: 9vh;
          left: 2.8vw;
          width: min(47vw, 720px);
          display: flex;
          flex-direction: column;
          gap: 10px;
          pointer-events: none;
          transform: scale(0.9);
          transform-origin: top left;
        }

        .resume-list-tag {
          font-family: 'Anton', sans-serif;
          font-size: 92px;
          line-height: 0.9;
          color: #f6fbff;
          letter-spacing: 2px;
          margin: 0 0 6px 12px;
          text-shadow: 0 2px 0 rgba(0,0,0,0.18);
          opacity: 0;
          transform: translateX(-24px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .resume-list-tag.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .resume-card-wrap {
          position: relative;
          width: 100%;
          padding: 0;
          border: 0;
          appearance: none;
          background: transparent;
          text-align: left;
          font: inherit;
          opacity: 0;
          transform: translateX(-48px);
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: all;
          cursor: pointer;
        }
        .resume-card-wrap.mounted {
          opacity: 1;
          transform: translateX(0);
        }
        .resume-card-wrap:focus-visible {
          outline: 3px solid #ffffff;
          outline-offset: 6px;
        }

        .resume-card {
          position: relative;
          height: 112px;
          background: #10185f;
          clip-path: polygon(0 0, 97% 0, 100% 100%, 3% 100%);
          box-shadow: 0 8px 0 rgba(5, 13, 59, 0.85);
          transition: transform 0.22s ease, background 0.22s ease, box-shadow 0.22s ease;
          overflow: visible;
        }
        .resume-card-wrap.active .resume-card {
          background: #ffffff;
          box-shadow: 10px 8px 0 #d63232;
          transform: translateX(6px);
        }

        .resume-card-inner {
          position: absolute;
          inset: 0;
          padding: 14px 22px 14px 62px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }

        .resume-badge {
          position: absolute;
          top: 10px;
          left: -10px;
          width: 56px;
          height: 70px;
          background: #0b113d;
          border: 3px solid #9cf7ff;
          clip-path: polygon(14% 0, 100% 0, 84% 100%, 0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(-8deg);
          box-shadow: 0 4px 0 rgba(0,0,0,0.28);
          transition: background 0.22s ease, border-color 0.22s ease;
        }
        .resume-badge-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 36px;
          color: #d2fdff;
          letter-spacing: 1px;
          transform: rotate(8deg);
        }
        .resume-card-wrap.active .resume-badge {
          background: #000;
          border-color: #000;
        }
        .resume-card-wrap.active .resume-badge-text {
          color: #fff;
        }

        .resume-title {
          font-family: 'Anton', sans-serif;
          font-size: 56px;
          line-height: 0.9;
          letter-spacing: 1px;
          color: #a5f6ff;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-title {
          color: #000;
        }

        .resume-rank {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 2px;
          flex-shrink: 0;
        }
        .resume-rank-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 2px;
          color: #9ffbff;
          transition: color 0.22s ease;
        }
        .resume-rank-number {
          font-family: 'Anton', sans-serif;
          font-size: 70px;
          line-height: 0.82;
          color: #9ffbff;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-rank-label,
        .resume-card-wrap.active .resume-rank-number {
          color: #000;
        }

        .resume-subtitle-bar {
          position: absolute;
          left: 64px;
          right: 14px;
          bottom: 12px;
          height: 34px;
          background: #85f4ff;
          clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
          display: flex;
          align-items: center;
          padding: 0 18px;
          transition: background 0.22s ease;
        }
        .resume-card-wrap.active .resume-subtitle-bar {
          background: #000;
        }

        .resume-subtitle {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          line-height: 1;
          letter-spacing: 1px;
          color: #041238;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-subtitle {
          color: #fff;
        }

        .resume-detail-panel {
          position: absolute;
          top: 9.5vh;
          right: 4.5vw;
          width: min(39vw, 620px);
          min-height: 74vh;
          z-index: 12;
          padding: 22px 24px 24px 24px;
          background: linear-gradient(180deg, rgba(15, 28, 105, 0.96) 0%, rgba(8, 16, 68, 0.97) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%);
          box-shadow:
            inset 0 0 0 1px rgba(133, 244, 255, 0.16),
            16px 16px 0 rgba(0, 6, 30, 0.55);
          overflow: hidden;
        }
        .resume-detail-panel::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(135deg, rgba(133, 244, 255, 0.08) 0 15%, transparent 15% 100%),
            linear-gradient(180deg, rgba(255,255,255,0.05), transparent 24%);
          pointer-events: none;
        }
        .resume-detail-top {
          position: relative;
          display: grid;
          grid-template-columns: 70px 1fr auto;
          align-items: center;
          gap: 14px;
          min-height: 92px;
          padding: 0 18px;
          background: linear-gradient(90deg, #8ef5ff 0%, #d3fdff 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          color: #08153f;
          box-shadow: 10px 0 0 rgba(255, 94, 136, 0.88);
        }
        .resume-detail-top-index {
          font-family: 'Anton', sans-serif;
          font-size: 46px;
          line-height: 1;
        }
        .resume-detail-top-title {
          font-family: 'Anton', sans-serif;
          font-size: 42px;
          line-height: 0.92;
          letter-spacing: 1px;
        }
        .resume-detail-top-progress {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 24px;
          letter-spacing: 2px;
          line-height: 1;
        }
        .resume-detail-close {
          width: 38px;
          height: 38px;
          border: 0;
          background: #08153f;
          color: #ffffff;
          font-family: 'Anton', sans-serif;
          font-size: 22px;
          line-height: 1;
          cursor: pointer;
          clip-path: polygon(0 0, 100% 0, 84% 100%, 0 100%);
        }
        .resume-detail-close:focus-visible,
        .resume-project-link:focus-visible {
          outline: 3px solid #ffffff;
          outline-offset: 4px;
        }
        .resume-project-description {
          position: relative;
          width: min(100%, 430px);
          aspect-ratio: 1;
          margin: 20px auto 0;
          padding: 34px 30px;
          background: rgba(8, 18, 72, 0.96);
          clip-path: polygon(0 0, 100% 0, calc(100% - 26px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(140, 239, 255, 0.22), 10px 10px 0 rgba(0, 6, 30, 0.26);
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow: hidden;
        }
        .resume-project-description::before {
          content: "PROJECT BRIEF";
          position: absolute;
          top: 16px;
          left: 20px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 19px;
          letter-spacing: 2px;
          color: #91f5ff;
        }
        .resume-project-description-text {
          position: relative;
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(22px, 2.1vw, 30px);
          line-height: 1.05;
          letter-spacing: 0.7px;
          color: #f2fcff;
        }
        .resume-project-link {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: min(100%, 430px);
          min-height: 48px;
          margin: 18px auto 0;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 25px;
          line-height: 1;
          letter-spacing: 1.5px;
          text-decoration: none;
          color: #06133b;
          background: #8df6ff;
          clip-path: polygon(0 0, 100% 0, calc(100% - 12px) 100%, 0 100%);
          transition: transform 0.18s ease, background 0.18s ease;
        }
        .resume-project-link:hover {
          background: #ffffff;
          transform: translateX(4px);
        }

        .resume-mobile-controls {
          display: none;
        }

        .resume-mobile-btn {
          border: 1px solid rgba(255, 255, 255, 0.28);
          background: rgba(6, 13, 55, 0.8);
          color: #fff;
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 1.2px;
          font-size: 13px;
          padding: 7px 12px;
          border-radius: 8px;
          min-width: 84px;
        }

        @media (max-width: 768px) {
          .resume-mobile-controls {
            position: fixed;
            left: 8px;
            right: 8px;
            bottom: max(8px, env(safe-area-inset-bottom));
            z-index: 20;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 8px;
            pointer-events: all;
          }
        }

      `}</style>

      <div className="resume-overlay">
        <div className="resume-stack">
          <div className={`resume-list-tag${mounted ? " mounted" : ""}`}>LISTADO DE MIS PROYECTOS</div>
          {ITEMS.map((item, index) => (
            <button
              type="button"
              key={item.id}
              className={`resume-card-wrap${selectedProjectId === item.id ? " active" : ""}${mounted ? " mounted" : ""}`}
              style={{ transitionDelay: `${index * 55}ms` }}
              onClick={() => {
                setSelectedProjectId((current) => current === item.id ? null : item.id);
              }}
              aria-expanded={selectedProjectId === item.id}
              aria-controls="project-detail-panel"
            >
              <div className="resume-card">
                <div className="resume-badge">
                  <div className="resume-badge-text">{item.badge}</div>
                </div>
                <div className="resume-card-inner">
                  <div className="resume-title">{item.title}</div>
                  <div className="resume-rank">
                    <div className="resume-rank-label">RANK</div>
                    <div className="resume-rank-number">{item.rank}</div>
                  </div>
                </div>
                <div className="resume-subtitle-bar">
                  <div className="resume-subtitle">{item.subtitle}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {selectedProject && selectedItem && (
          <section className="resume-detail-panel" id="project-detail-panel" aria-label={`Detalles de ${selectedItem.title}`}>
            <div className="resume-detail-top">
              <div className="resume-detail-top-index">{selectedItem.rank.toString().padStart(2, "0")}</div>
              <div className="resume-detail-top-title">{selectedItem.title}</div>
              <button
                className="resume-detail-close"
                type="button"
                onClick={() => setSelectedProjectId(null)}
                aria-label="Cerrar detalle del proyecto"
              >
                X
              </button>
            </div>

            <div className="resume-project-description">
              <p className="resume-project-description-text">{selectedProject.description}</p>
            </div>

            <a className="resume-project-link" href={selectedProject.href} target="_blank" rel="noreferrer">
              VISITAR PROYECTO ↗
            </a>
          </section>
        )}

      </div>

      <div className="resume-mobile-controls" aria-label="Resume mobile controls">
        <button className="resume-mobile-btn" type="button" onClick={() => navigate(-1)}>
          BACK
        </button>
      </div>
    </div>
  );
}
