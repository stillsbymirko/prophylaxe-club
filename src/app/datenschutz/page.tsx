import { LegalLayout } from "@/components/LegalLayout";
import { operatorAddressLines, siteConfig } from "@/lib/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
};

export default function DatenschutzPage() {
  const { operator } = siteConfig;
  const address = operatorAddressLines();

  return (
    <LegalLayout title="Datenschutzerklärung">
      <p className="lead text-slate-600">
        Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Diese
        Datenschutzerklärung informiert Sie darüber, welche Daten beim Besuch
        von {siteConfig.name} verarbeitet werden — und welche bewusst nicht.
      </p>

      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO):
      </p>
      <p>
        {address.map((line) => (
          <span key={line}>
            {line}
            <br />
          </span>
        ))}
        E-Mail:{" "}
        <a href={`mailto:${operator.email}`}>{operator.email}</a>
      </p>

      <h2>2. Grundsatz: Keine Patientendaten</h2>
      <p>
        {siteConfig.name} ist bewusst datensparsam konzipiert. Es werden{" "}
        <strong>keine personenbezogenen Daten von Patienten</strong> erhoben,
        gespeichert oder verarbeitet — insbesondere keine Namen, E-Mail-Adressen
        oder Telefonnummern von Patienten.
      </p>
      <p>
        Die Erstellung des Kalendertermins (.ics-Datei) erfolgt{" "}
        <strong>ausschließlich im Browser</strong> des Nutzers. Dabei werden
        keine Daten an uns übermittelt.
      </p>

      <h2>3. Welche Daten verarbeiten wir?</h2>

      <h3>3.1 Praxis-Stammdaten (Link-Generator)</h3>
      <p>
        Wenn eine Zahnarztpraxis über den Link-Generator einen Patienten-Link
        erstellt, speichern wir folgende Praxis-Stammdaten:
      </p>
      <ul>
        <li>Praxisname</li>
        <li>Buchungs-URL</li>
        <li>Telefonnummer der Praxis</li>
        <li>Praxisadresse (Straße, PLZ und Ort — erscheint im Kalendertermin)</li>
        <li>Individueller Slug (z.&nbsp;B. „praxis-mueller“)</li>
        <li>
          Optional: E-Mail-Adresse der Praxis (nur wenn beim Erstellen angegeben
          — zum Versand des Bearbeitungs-Links)
        </li>
        <li>
          Geheimer Bearbeitungs-Token (technischer Zugangsschlüssel, kein
          Patientenbezug)
        </li>
      </ul>
      <p>
        <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO
        (Vertragserfüllung bzw. vorvertragliche Maßnahmen) und Art. 6 Abs. 1
        lit. f DSGVO (berechtigtes Interesse an der Bereitstellung des
        Dienstes).
      </p>
      <p>
        <strong>Speicherdauer:</strong> Die Daten verbleiben gespeichert, solange
        der Patienten-Link benötigt wird. Auf Anfrage können Einträge gelöscht
        werden (siehe Abschnitt 8).
      </p>
      <p>
        <strong>Speicherort:</strong> Die Daten werden in einer Redis-Datenbank
        bei Upstash (Serverless-Datenbank) gespeichert. In der lokalen
        Entwicklungsumgebung können die Daten alternativ in einer JSON-Datei
        abgelegt werden.
      </p>

      <h3>3.2 E-Mail-Versand (optional)</h3>
      <p>
        Wenn eine Zahnarztpraxis optional eine E-Mail-Adresse angibt, kann der
        persönliche Bearbeitungs-Link per E-Mail zugesandt werden. Dabei
        verarbeiten wir:
      </p>
      <ul>
        <li>E-Mail-Adresse der Praxis (Empfänger)</li>
        <li>Praxisname (in Betreff und Inhalt der E-Mail)</li>
        <li>Patienten-Link und Bearbeitungs-Link (URLs in der E-Mail)</li>
      </ul>
      <p>
        Der Versand erfolgt über den Dienst{" "}
        <strong>Resend, Inc.</strong> (Auftragsverarbeiter). Resend verarbeitet
        die genannten Daten ausschließlich zum Versand der E-Mail und speichert
        sie gemäß den Angaben des Anbieters für einen begrenzten Zeitraum in
        Protokolldaten.
      </p>
      <p>
        <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO
        (Durchführung des gewünschten Dienstes) und Art. 6 Abs. 1 lit. f DSGVO
        (berechtigtes Interesse an zuverlässiger Zustellung des
        Bearbeitungs-Links).
      </p>
      <p>
        <strong>Speicherdauer:</strong> Die E-Mail-Adresse wird zusammen mit den
        Praxis-Stammdaten in unserer Datenbank gespeichert, solange der Eintrag
        besteht. Sie kann jederzeit gelöscht oder geändert werden (siehe
        Abschnitt 8).
      </p>

      <h3>3.3 Server-Logfiles (Hosting)</h3>
      <p>
        Beim Aufruf unserer Website werden durch den Hosting-Anbieter
        automatisch technische Informationen erfasst (Server-Logfiles):
      </p>
      <ul>
        <li>IP-Adresse (gekürzt bzw. anonymisiert, je nach Anbieter)</li>
        <li>Datum und Uhrzeit der Anfrage</li>
        <li>aufgerufene URL</li>
        <li>Browsertyp und -version</li>
        <li>Betriebssystem</li>
      </ul>
      <p>
        <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO
        (berechtigtes Interesse an der sicheren Bereitstellung und
        Fehleranalyse der Website).
      </p>
      <p>
        <strong>Speicherdauer:</strong> Die Logdaten werden vom Hosting-Anbieter
        für einen begrenzten Zeitraum gespeichert und anschließend gelöscht.
      </p>

      <h2>4. Auftragsverarbeiter</h2>
      <p>
        Wir setzen folgende Dienstleister als Auftragsverarbeiter gemäß Art. 28
        DSGVO ein:
      </p>

      <h3>Vercel Inc.</h3>
      <p>
        Hosting und Auslieferung der Website.
        <br />
        Website:{" "}
        <a
          href="https://vercel.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          vercel.com
        </a>
        <br />
        Datenschutz:{" "}
        <a
          href="https://vercel.com/legal/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          vercel.com/legal/privacy-policy
        </a>
      </p>

      <h3>Upstash, Inc.</h3>
      <p>
        Speicherung der Praxis-Stammdaten (Redis-Datenbank).
        <br />
        Website:{" "}
        <a
          href="https://upstash.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          upstash.com
        </a>
        <br />
        Datenschutz:{" "}
        <a
          href="https://upstash.com/trust/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          upstash.com/trust/privacy
        </a>
      </p>

      <h3>Resend, Inc.</h3>
      <p>
        Versand des optionalen Bearbeitungs-Links per E-Mail an Zahnarztpraxen.
        <br />
        Website:{" "}
        <a
          href="https://resend.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          resend.com
        </a>
        <br />
        Datenschutz:{" "}
        <a
          href="https://resend.com/legal/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          resend.com/legal/privacy-policy
        </a>
      </p>
      <p>
        Mit allen genannten Anbietern wurden bzw. werden
        Auftragsverarbeitungsverträge (AVV) abgeschlossen.
      </p>

      <h2>5. Cookies &amp; Tracking</h2>
      <p>
        Diese Website setzt <strong>keine Tracking-Cookies</strong> und
        verwendet keine Analyse-Tools wie Google Analytics. Es werden keine
        Marketing- oder Profiling-Cookies eingesetzt.
      </p>
      <p>
        Technisch notwendige Cookies können durch den Hosting-Anbieter im
        Rahmen der Auslieferung gesetzt werden. Da wir kein separates
        Tracking betreiben, ist kein Cookie-Einwilligungsbanner erforderlich.
      </p>

      <h2>6. Datenübermittlung in Drittländer</h2>
      <p>
        Vercel, Upstash und Resend können Daten in den USA verarbeiten. Die
        Übermittlung erfolgt auf Grundlage von Angemessenheitsbeschlüssen
        (EU-US Data Privacy Framework) und/oder Standardvertragsklauseln der
        EU-Kommission gemäß Art. 46 DSGVO.
      </p>

      <h2>7. Datensicherheit</h2>
      <p>
        Wir setzen technische und organisatorische Maßnahmen ein, um Ihre
        Daten gegen zufällige oder vorsätzliche Manipulation, Verlust oder
        unbefugten Zugriff zu schützen. Die Übertragung erfolgt über
        verschlüsselte HTTPS-Verbindungen (TLS).
      </p>

      <h2>8. Ihre Rechte</h2>
      <p>Sie haben gegenüber uns folgende Rechte hinsichtlich Ihrer Daten:</p>
      <ul>
        <li>
          <strong>Auskunft</strong> (Art. 15 DSGVO)
        </li>
        <li>
          <strong>Berichtigung</strong> (Art. 16 DSGVO)
        </li>
        <li>
          <strong>Löschung</strong> (Art. 17 DSGVO)
        </li>
        <li>
          <strong>Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO)
        </li>
        <li>
          <strong>Datenübertragbarkeit</strong> (Art. 20 DSGVO)
        </li>
        <li>
          <strong>Widerspruch</strong> (Art. 21 DSGVO)
        </li>
      </ul>
      <p>
        Zur Ausübung Ihrer Rechte wenden Sie sich bitte an:{" "}
        <a href={`mailto:${operator.email}`}>{operator.email}</a>
      </p>
      <p>
        Sie haben zudem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde
        zu beschweren. Zuständig für Berlin ist:
      </p>
      <p>
        Berliner Beauftragte für Datenschutz und Informationsfreiheit
        <br />
        Friedrichstraße 219
        <br />
        10969 Berlin
        <br />
        <a
          href="https://www.datenschutz-berlin.de"
          target="_blank"
          rel="noopener noreferrer"
        >
          www.datenschutz-berlin.de
        </a>
      </p>

      <h2>9. Änderungen dieser Datenschutzerklärung</h2>
      <p>
        Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie
        stets den aktuellen rechtlichen Anforderungen entspricht oder um
        Änderungen unserer Leistungen abzubilden. Für Ihren erneuten Besuch
        gilt dann die neue Datenschutzerklärung.
      </p>

      <p className="text-sm text-slate-500">
        Stand: Juni 2026
      </p>
    </LegalLayout>
  );
}
