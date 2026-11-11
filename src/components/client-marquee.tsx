"use client";
import { useState } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";
const clients = [
  { name: "Intercity Riders", dark: true },
  { name: "Oneway Drop Taxi", dark: true },
  { name: "TaerG Laundry", dark: false },
  { name: "Vlasy Unisex Salon", dark: false },
];
export default function ClientMarquee() {
  const [paused, setPaused] = useState(false);
  return (
    <section
      className="client-marquee"
      aria-labelledby="client-title"
      data-paused={paused}
    >
      <div className="client-marquee-heading">
        <div>
          <p className="eyebrow">
            <span /> OUR CLIENTS
          </p>
          <h2 id="client-title">Businesses we’ve worked with.</h2>
        </div>
        <button
          type="button"
          className="button button-outline"
          onClick={() => setPaused(!paused)}
          aria-pressed={paused}
          aria-label={paused ? "Resume client logos" : "Pause client logos"}
        >
          {paused ? <Play size={16} /> : <Pause size={16} />}
          <span>{paused ? "Resume logos" : "Pause logos"}</span>
        </button>
      </div>
      <div className="client-marquee-window">
        <div className="client-marquee-track">
          {[0, 1].map((group) => (
            <div
              className="client-marquee-group"
              key={group}
              aria-hidden={group === 1 ? true : undefined}
            >
              {[0, 1].map((repeat) => (
                <ul
                  className="client-logo-list"
                  key={repeat}
                  aria-label={
                    group === 0 && repeat === 0 ? "Wexoraa clients" : undefined
                  }
                  aria-hidden={repeat === 1 ? true : undefined}
                >
                  {clients.map((client, index) => (
                    <li
                      className={`client-logo-card ${client.dark ? "client-dark" : ""}`}
                      key={client.name}
                    >
                      <span
                        className={`client-logo-viewport ${index === 3 ? "client-tall" : ""}`}
                      >
                        <Image
                          src="/clients/client-logos.png"
                          alt={group === 0 && repeat === 0 ? client.name : ""}
                          width={2172}
                          height={724}
                          loading="eager"
                          sizes="960px"
                          className="client-sprite"
                          style={{ left: `${index * -100}%` }}
                        />
                      </span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
