import Image from "next/image";
const clients = [
  { name: "Intercity Riders", dark: true },
  { name: "Oneway Drop Taxi", dark: true },
  { name: "TaerG Laundry", dark: false },
  { name: "Vlasy Unisex Salon", dark: false },
];
export default function ClientMarquee() {
  return (
    <section className="client-marquee" aria-labelledby="client-title">
      <div className="client-marquee-heading">
        <div>
          <h2 id="client-title">Businesses we’ve worked with.</h2>
        </div>
      </div>
      <div
        className="client-marquee-window"
        tabIndex={0}
        role="group"
        aria-label="Client logos. Hover or focus here to pause scrolling."
      >
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
