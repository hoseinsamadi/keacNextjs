type P = { className?: string };
const s = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const LogoMark = ({ className }: P) => (
  <svg viewBox="0 0 40 40" className={className} aria-hidden>
    <path d="M20 3 34 11v18L20 37 6 29V11z" fill="rgba(55,214,195,0.08)" stroke="#37d6c3" strokeWidth="1.8" />
    <path d="M14 12v16M14 20l12-8M14 20l12 8" stroke="#f2b64a" strokeWidth="2.4" strokeLinecap="round" />
    <circle cx="14" cy="12" r="1.8" fill="#37d6c3" />
    <circle cx="14" cy="28" r="1.8" fill="#37d6c3" />
    <circle cx="26" cy="12" r="1.8" fill="#37d6c3" />
    <circle cx="26" cy="28" r="1.8" fill="#37d6c3" />
  </svg>
);

export const INet = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...s}>
    <circle cx="5" cy="6" r="2.2" />
    <circle cx="19" cy="6" r="2.2" />
    <circle cx="12" cy="18" r="2.2" />
    <path d="M6.8 7.4 10.4 16M17.2 7.4 13.6 16M7.2 6h9.6" />
  </svg>
);
export const IShield = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...s}>
    <path d="M12 3 5 5.8v5.4c0 4.6 3 7.8 7 9.8 4-2 7-5.2 7-9.8V5.8z" />
    <path d="m9 11.5 2.2 2.2L15.5 9.4" />
  </svg>
);
export const IWave = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...s}>
    <circle cx="12" cy="14" r="1.6" fill="currentColor" stroke="none" />
    <path d="M8.5 10.5a5 5 0 0 1 7 0M5.8 7.6a9 9 0 0 1 12.4 0M9.8 17.5 7 20.3M14.2 17.5l2.8 2.8" />
  </svg>
);
export const IEye = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...s}>
    <path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12z" />
    <circle cx="12" cy="12" r="2.6" />
    <path d="M12 2.8v1.6M12 19.6v1.6" />
  </svg>
);
export const IRack = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...s}>
    <rect x="4" y="3.5" width="16" height="7" rx="1.2" />
    <rect x="4" y="13.5" width="16" height="7" rx="1.2" />
    <path d="M7 7h.01M7 17h.01M10 7h2M10 17h2" strokeWidth="2.2" />
  </svg>
);
export const ICode = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...s}>
    <path d="m8 7-5 5 5 5M16 7l5 5-5 5M13.4 4.5l-2.8 15" />
  </svg>
);
export const IFlow = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...s}>
    <rect x="3.5" y="3.5" width="7" height="7" rx="1.4" />
    <rect x="13.5" y="13.5" width="7" height="7" rx="1.4" />
    <path d="M17 13.2V9.8a2.8 2.8 0 0 0-2.8-2.8H10.8M7 10.8v3.4A2.8 2.8 0 0 0 9.8 17h3.4" />
    <path d="m12.6 5.2-1.8 1.8 1.8 1.8M11.4 18.8l1.8-1.8-1.8-1.8" />
  </svg>
);
export const IChart = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...s}>
    <path d="M3.5 3.5v17h17" />
    <path d="m7 14 3.5-4 3 2.5L18 7" />
    <circle cx="18" cy="7" r="1.4" fill="currentColor" stroke="none" />
  </svg>
);
export const IPhone = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...s}>
    <path d="M5.5 4h3l1.5 4-2 1.5a12.5 12.5 0 0 0 6.5 6.5L16 14l4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3.5 6.2 2 2 0 0 1 5.5 4z" />
  </svg>
);
export const IMail = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...s}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
    <path d="m4.5 7.5 7.5 6 7.5-6" />
  </svg>
);
export const IPin = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...s}>
    <path d="M12 21s-6.5-5.7-6.5-10.5a6.5 6.5 0 0 1 13 0C18.5 15.3 12 21 12 21z" />
    <circle cx="12" cy="10.3" r="2.3" />
  </svg>
);
export const IClock = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...s}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7v5l3.5 2" />
  </svg>
);
export const IArrow = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...s}>
    <path d="M19 12H5.5M11 5.5 4.5 12l6.5 6.5" />
  </svg>
);
export const ISearch = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...s}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="m15.5 15.5 4.5 4.5" />
  </svg>
);
export const ICheck = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...s}>
    <path d="m4.5 12.5 5 5L19.5 7" />
  </svg>
);
export const ISend = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...s}>
    <path d="M20.5 3.5 3.5 10.2l6.3 2.4 2.4 6.3zM20.5 3.5 9.8 12.6" />
  </svg>
);
export const IUsers = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...s}>
    <circle cx="9" cy="8.5" r="3.2" />
    <path d="M3.5 19.5c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
    <path d="M15.5 5.7a3.2 3.2 0 0 1 0 5.6M17.5 14.9c1.8.7 3 2.3 3 4.6" />
  </svg>
);
export const IGear = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...s}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2M6 6l1.4 1.4M16.6 16.6 18 18M18 6l-1.4 1.4M7.4 16.6 6 18" />
  </svg>
);
export const IDoc = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...s}>
    <path d="M6 3.5h8l4 4v13H6z" />
    <path d="M14 3.5v4h4M9 12h6M9 15.5h6M9 8.5h2" />
  </svg>
);
export const IBolt = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...s}>
    <path d="M13 3 5 13.5h5.5L11 21l8-10.5h-5.5z" />
  </svg>
);
export const IMedal = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...s}>
    <circle cx="12" cy="9" r="5.5" />
    <path d="m9.5 13.7-2 6.8 4.5-2.6 4.5 2.6-2-6.8M12 6.5l.9 1.8 2 .3-1.45 1.4.35 2-1.8-1-1.8 1 .35-2L9.1 8.6l2-.3z" strokeWidth="1.3" />
  </svg>
);
export const ILayers = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...s}>
    <path d="m12 3.5 8.5 4.5L12 12.5 3.5 8z" />
    <path d="m3.5 12.5 8.5 4.5 8.5-4.5M3.5 16.5 12 21l8.5-4.5" />
  </svg>
);
export const ICompass = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...s}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="m15.5 8.5-2 5-5 2 2-5z" />
  </svg>
);
export const ICalendar = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...s}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
    <path d="M3.5 9.5h17M8 3v3.5M16 3v3.5M8 13.5h.01M12 13.5h.01M16 13.5h.01M8 17h.01M12 17h.01" strokeWidth="2" />
  </svg>
);
export const IQuote = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    <path
      d="M9.5 6C6 7.5 4 10 4 13.5c0 2.6 1.6 4.5 3.9 4.5 2 0 3.5-1.5 3.5-3.5S10 11 8 11h-.4c.5-1.7 1.8-3 3.6-3.9L9.5 6zm9 0c-3.5 1.5-5.5 4-5.5 7.5 0 2.6 1.6 4.5 3.9 4.5 2 0 3.5-1.5 3.5-3.5S19 11 17 11h-.4c.5-1.7 1.8-3 3.6-3.9L18.5 6z"
      fill="currentColor"
    />
  </svg>
);
export const IChevron = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...s}>
    <path d="m6 9.5 6 6 6-6" />
  </svg>
);
export const ILink = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...s}>
    <path d="M10 14a4.5 4.5 0 0 0 6.4.4l3-3a4.5 4.5 0 0 0-6.4-6.4l-1.5 1.5" />
    <path d="M14 10a4.5 4.5 0 0 0-6.4-.4l-3 3a4.5 4.5 0 0 0 6.4 6.4l1.5-1.5" />
  </svg>
);
export const ITelegram = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...s}>
    <path d="m20.5 4.5-17 6.7 5 1.9m12-8.6-2.5 14-7-6.5m9.5-7.5-9.5 7.5m0 0 .4 4.6 2.6-3" />
  </svg>
);
export const IInstagram = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...s}>
    <rect x="4" y="4" width="16" height="16" rx="4.5" />
    <circle cx="12" cy="12" r="3.6" />
    <path d="M16.8 7.2h.01" strokeWidth="2.6" />
  </svg>
);
export const ILinkedin = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...s}>
    <rect x="4" y="4" width="16" height="16" rx="2.5" />
    <path d="M8 10.5V16M8 7.8h.01M12 16v-3.2a2 2 0 0 1 4 0V16M12 10.5V16" strokeWidth="2" />
  </svg>
);
export const IYoutube = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...s}>
    <rect x="3" y="6" width="18" height="12.5" rx="3.5" />
    <path d="m10.5 9.5 4.5 2.7-4.5 2.7z" fill="currentColor" stroke="none" />
  </svg>
);
export const IMenu = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...s}>
    <path d="M4 7h16M4 12h16M4 17h10" />
  </svg>
);
export const IClose = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...s}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

export const productIcon = (key: string, className = "w-7 h-7") => {
  const map: Record<string, (p: P) => React.JSX.Element> = {
    net: INet,
    shield: IShield,
    wave: IWave,
    eye: IEye,
    rack: IRack,
    code: ICode,
    flow: IFlow,
    chart: IChart,
  };
  const C = map[key] ?? INet;
  return <C className={className} />;
};
