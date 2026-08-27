import * as React from "react";

/**
 * Bespoke SVG artwork for each project thumbnail.
 * Engineering-themed — no stock photos, no flat illustrations.
 */

type ThumbProps = {
  className?: string;
};

export function CleardocsArt({ className = "" }: ThumbProps) {
  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Cleardocs — REST API backend"
    >
      <rect width="400" height="300" fill="#f1ece1" />

      {/* API endpoint ladder */}
      {[
        { m: "GET", p: "/v1/orders", c: "#14110d" },
        { m: "POST", p: "/v1/orders", c: "#d24a1c" },
        { m: "GET", p: "/v1/docs/:id", c: "#14110d" },
        { m: "PUT", p: "/v1/docs/:id", c: "#14110d" },
        { m: "DEL", p: "/v1/docs/:id", c: "#14110d" },
        { m: "GET", p: "/v1/users", c: "#14110d" },
      ].map((r, i) => (
        <g key={i} transform={`translate(40, ${50 + i * 32})`}>
          <rect x="0" y="0" width="50" height="20" fill={r.c} />
          <text
            x="25"
            y="14"
            textAnchor="middle"
            fontFamily="ui-monospace, monospace"
            fontSize="10"
            fill={r.c === "#d24a1c" ? "#f1ece1" : "#f1ece1"}
            letterSpacing="1"
          >
            {r.m}
          </text>
          <text
            x="64"
            y="14"
            fontFamily="ui-monospace, monospace"
            fontSize="11"
            fill="#14110d"
          >
            {r.p}
          </text>
          <line
            x1="0"
            y1="28"
            x2="320"
            y2="28"
            stroke="#14110d"
            strokeOpacity="0.08"
          />
        </g>
      ))}

      {/* status dot top-right */}
      <g transform="translate(330, 50)">
        <circle cx="14" cy="10" r="5" fill="#4c5a3a" />
        <text
          x="26"
          y="14"
          fontFamily="ui-monospace, monospace"
          fontSize="10"
          fill="#14110d"
          opacity="0.6"
        >
          200
        </text>
      </g>

      {/* footnote */}
      <text
        x="40"
        y="276"
        fontFamily="ui-monospace, monospace"
        fontSize="10"
        fill="#14110d"
        opacity="0.6"
      >
        15+ endpoints · 1M+ records · 90–95% coverage
      </text>
    </svg>
  );
}

export function StockBazaarArt({ className = "" }: ThumbProps) {
  // Distributed system: 3 nodes, leader + replicas, arrows
  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Stock Bazaar — distributed system with replication"
    >
      <rect width="400" height="300" fill="#4c5a3a" />

      {/* connection lines (drawn first) */}
      <g stroke="#f1ece1" strokeOpacity="0.5" strokeWidth="1.2" strokeDasharray="3 3">
        <line x1="120" y1="120" x2="200" y2="120" />
        <line x1="200" y1="120" x2="280" y2="120" />
        <line x1="120" y1="120" x2="200" y2="200" />
        <line x1="280" y1="120" x2="200" y2="200" />
      </g>

      {/* leader node (center top) */}
      <g transform="translate(170, 90)">
        <rect width="60" height="60" fill="#d24a1c" />
        <text
          x="30"
          y="28"
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="10"
          fill="#f1ece1"
          letterSpacing="1"
        >
          LEADER
        </text>
        <text
          x="30"
          y="44"
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="14"
          fill="#f1ece1"
        >
          ★
        </text>
      </g>

      {/* replica 1 (left) */}
      <g transform="translate(90, 90)">
        <rect width="60" height="60" fill="none" stroke="#f1ece1" strokeWidth="1.5" />
        <text
          x="30"
          y="28"
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="9"
          fill="#f1ece1"
          opacity="0.8"
          letterSpacing="1"
        >
          REPLICA
        </text>
        <text
          x="30"
          y="46"
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="12"
          fill="#f1ece1"
        >
          ○
        </text>
      </g>

      {/* replica 2 (right) */}
      <g transform="translate(250, 90)">
        <rect width="60" height="60" fill="none" stroke="#f1ece1" strokeWidth="1.5" />
        <text
          x="30"
          y="28"
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="9"
          fill="#f1ece1"
          opacity="0.8"
          letterSpacing="1"
        >
          REPLICA
        </text>
        <text
          x="30"
          y="46"
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="12"
          fill="#f1ece1"
        >
          ○
        </text>
      </g>

      {/* cache pill below */}
      <g transform="translate(150, 180)">
        <rect width="100" height="28" fill="#f1ece1" />
        <text
          x="50"
          y="18"
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="10"
          fill="#4c5a3a"
          letterSpacing="1"
        >
          LRU CACHE
        </text>
      </g>

      {/* corner labels */}
      <text
        x="32"
        y="32"
        fontFamily="ui-monospace, monospace"
        fontSize="10"
        fill="#f1ece1"
        opacity="0.7"
        letterSpacing="2"
      >
        3 SERVICES · HTTP / REST
      </text>
      <text
        x="32"
        y="270"
        fontFamily="Georgia, serif"
        fontStyle="italic"
        fontSize="20"
        fill="#f1ece1"
      >
        stock bazaar
      </text>
      <text
        x="32"
        y="288"
        fontFamily="ui-monospace, monospace"
        fontSize="10"
        fill="#f1ece1"
        opacity="0.6"
        letterSpacing="2"
      >
        LOG SYNC · AUTO RE-ELECT
      </text>
    </svg>
  );
}

export function SpamClassifierArt({ className = "" }: ThumbProps) {
  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Spam classifier — NLP pipeline"
    >
      <rect width="400" height="300" fill="#14110d" />

      {/* Pipeline stages */}
      {/* Stage 1: raw email */}
      <g transform="translate(30, 80)">
        <rect width="70" height="80" fill="none" stroke="#f1ece1" strokeWidth="1.2" />
        <text
          x="35"
          y="20"
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="9"
          fill="#f1ece1"
          opacity="0.6"
          letterSpacing="1"
        >
          EMAIL
        </text>
        <text x="8" y="40" fontFamily="Georgia, serif" fontSize="10" fill="#f1ece1">
          <tspan x="8" dy="0">Dear sir, I</tspan>
          <tspan x="8" dy="12">have a deal…</tspan>
        </text>
      </g>

      {/* arrow 1 */}
      <path d="M105 120 L130 120" stroke="#d24a1c" strokeWidth="1.5" />
      <path d="M125 116 L130 120 L125 124" stroke="#d24a1c" strokeWidth="1.5" fill="none" />

      {/* Stage 2: tokens */}
      <g transform="translate(135, 80)">
        <rect width="70" height="80" fill="none" stroke="#f1ece1" strokeWidth="1.2" />
        <text
          x="35"
          y="20"
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="9"
          fill="#f1ece1"
          opacity="0.6"
          letterSpacing="1"
        >
          TOKENS
        </text>
        {["dear", "sir", "deal", "$$$"].map((t, i) => (
          <text
            key={t}
            x="35"
            y={40 + i * 11}
            textAnchor="middle"
            fontFamily="ui-monospace, monospace"
            fontSize="9"
            fill="#f1ece1"
          >
            {t}
          </text>
        ))}
      </g>

      {/* arrow 2 */}
      <path d="M210 120 L235 120" stroke="#d24a1c" strokeWidth="1.5" />
      <path d="M230 116 L235 120 L230 124" stroke="#d24a1c" strokeWidth="1.5" fill="none" />

      {/* Stage 3: TF-IDF vector */}
      <g transform="translate(240, 80)">
        <rect width="70" height="80" fill="none" stroke="#f1ece1" strokeWidth="1.2" />
        <text
          x="35"
          y="20"
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="9"
          fill="#f1ece1"
          opacity="0.6"
          letterSpacing="1"
        >
          TF-IDF
        </text>
        {[0.8, 0.6, 0.4, 0.2].map((v, i) => (
          <rect
            key={i}
            x="10"
            y={32 + i * 11}
            width={v * 50}
            height="6"
            fill="#d24a1c"
          />
        ))}
      </g>

      {/* arrow 3 */}
      <path d="M315 120 L340 120" stroke="#d24a1c" strokeWidth="1.5" />
      <path d="M335 116 L340 120 L335 124" stroke="#d24a1c" strokeWidth="1.5" fill="none" />

      {/* Stage 4: classifier output */}
      <g transform="translate(345, 80)">
        <rect width="40" height="80" fill="#d24a1c" />
        <text
          x="20"
          y="40"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontStyle="italic"
          fontSize="11"
          fill="#f1ece1"
        >
          spam
        </text>
        <text
          x="20"
          y="58"
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="10"
          fill="#f1ece1"
        >
          96%
        </text>
      </g>

      {/* Title and labels */}
      <text
        x="32"
        y="32"
        fontFamily="ui-monospace, monospace"
        fontSize="10"
        fill="#f1ece1"
        opacity="0.7"
        letterSpacing="2"
      >
        MULTINOMIAL · NAIVE BAYES
      </text>
      <text
        x="32"
        y="240"
        fontFamily="Georgia, serif"
        fontStyle="italic"
        fontSize="22"
        fill="#f1ece1"
      >
        spam classifier
      </text>
      <text
        x="32"
        y="260"
        fontFamily="ui-monospace, monospace"
        fontSize="10"
        fill="#f1ece1"
        opacity="0.6"
        letterSpacing="2"
      >
        ~5,000 EMAILS · 94–96% ACCURACY
      </text>
    </svg>
  );
}

export function GuestCheckoutArt({ className = "" }: ThumbProps) {
  // E-commerce flow: cart → form → confirmation
  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Guest checkout — three-step flow"
    >
      <rect width="400" height="300" fill="#c8b89e" />

      {/* 3 step blocks */}
      {/* Step 1: Cart */}
      <g transform="translate(30, 90)">
        <rect width="100" height="100" fill="#14110d" />
        <text
          x="50"
          y="20"
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="9"
          fill="#f1ece1"
          opacity="0.7"
          letterSpacing="2"
        >
          STEP 01
        </text>
        {/* mini cart icon */}
        <g transform="translate(35, 38)" stroke="#f1ece1" strokeWidth="1.4" fill="none">
          <path d="M0 0h30l4 22H8z" />
          <circle cx="12" cy="30" r="2" fill="#f1ece1" />
          <circle cx="26" cy="30" r="2" fill="#f1ece1" />
        </g>
        <text
          x="50"
          y="92"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontStyle="italic"
          fontSize="13"
          fill="#f1ece1"
        >
          cart
        </text>
      </g>

      {/* arrow */}
      <path d="M135 140 L160 140" stroke="#14110d" strokeWidth="1.5" />
      <path d="M155 136 L160 140 L155 144" stroke="#14110d" strokeWidth="1.5" fill="none" />

      {/* Step 2: Form */}
      <g transform="translate(165, 90)">
        <rect width="100" height="100" fill="#d24a1c" />
        <text
          x="50"
          y="20"
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="9"
          fill="#f1ece1"
          opacity="0.9"
          letterSpacing="2"
        >
          STEP 02
        </text>
        {/* form lines */}
        <g stroke="#f1ece1" strokeWidth="1.2">
          <line x1="20" y1="44" x2="80" y2="44" />
          <line x1="20" y1="58" x2="80" y2="58" />
          <line x1="20" y1="72" x2="60" y2="72" />
        </g>
        <text
          x="50"
          y="92"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontStyle="italic"
          fontSize="13"
          fill="#f1ece1"
        >
          details
        </text>
      </g>

      {/* arrow */}
      <path d="M270 140 L295 140" stroke="#14110d" strokeWidth="1.5" />
      <path d="M290 136 L295 140 L290 144" stroke="#14110d" strokeWidth="1.5" fill="none" />

      {/* Step 3: Done */}
      <g transform="translate(300, 90)">
        <rect width="70" height="100" fill="#14110d" />
        <text
          x="35"
          y="20"
          textAnchor="middle"
          fontFamily="ui-monospace, monospace"
          fontSize="9"
          fill="#f1ece1"
          opacity="0.7"
          letterSpacing="2"
        >
          STEP 03
        </text>
        {/* checkmark */}
        <path
          d="M22 50 L32 62 L52 38"
          stroke="#4c5a3a"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text
          x="35"
          y="92"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontStyle="italic"
          fontSize="13"
          fill="#f1ece1"
        >
          paid
        </text>
      </g>

      {/* Labels */}
      <text
        x="32"
        y="32"
        fontFamily="ui-monospace, monospace"
        fontSize="10"
        fill="#14110d"
        opacity="0.6"
        letterSpacing="2"
      >
        NO ACCOUNT · ONE TRANSACTION
      </text>
      <text
        x="32"
        y="260"
        fontFamily="Georgia, serif"
        fontStyle="italic"
        fontSize="22"
        fill="#14110d"
      >
        guest checkout
      </text>
      <text
        x="32"
        y="280"
        fontFamily="ui-monospace, monospace"
        fontSize="10"
        fill="#14110d"
        opacity="0.6"
        letterSpacing="2"
      >
        SHIPPED TO PRODUCTION · Q2 2023
      </text>
    </svg>
  );
}

export function ProjectArt({ id, className = "" }: { id: string; className?: string }) {
  switch (id) {
    case "cleardocs":
      return <CleardocsArt className={className} />;
    case "stock-bazaar":
      return <StockBazaarArt className={className} />;
    case "spam-classifier":
      return <SpamClassifierArt className={className} />;
    case "guest-checkout":
      return <GuestCheckoutArt className={className} />;
    default:
      return null;
  }
}
