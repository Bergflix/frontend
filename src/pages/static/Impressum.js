import React, { useEffect } from "react";
import "./style.scss";

const Impressum = (props) => {
  useEffect(() => props.setBackground && props.setBackground(''));

  return (
    <div id={"static-container"}>
      <div>
        <h1>Impressum</h1>
      </div>
      <div>
        <p>Niklas Daniel Jürgens<br />
                Philosophenweg 18<br />19243 Wittenburg</p>
        <p>Telefon: 016094912941<br />
                E-Mail: <a href="mailto:business@bergflix.de">business@bergflix.de</a><br />
        </p>
        <br /><h2>Hinweis gem&auml;&szlig;
            Online-Streitbeilegungs-Verordnung</h2><p>Nach geltendem Recht sind wir
        verpflichtet, Verbraucher auf die Existenz der Europ&auml;ischen
        Online-Streitbeilegungs-Plattform hinzuweisen, die f&uuml;r die Beilegung von
        Streitigkeiten genutzt werden kann, ohne dass ein Gericht eingeschaltet werden
        muss. F&uuml;r die Einrichtung der Plattform ist die Europ&auml;ische Kommission
        zust&auml;ndig. Die Europ&auml;ische Online-Streitbeilegungs-Plattform ist hier
            zu finden: <a href="http://ec.europa.eu/odr" target="_blank"
            rel="nofollow noopener noreferrer">http://ec.europa.eu/odr</a>. Unsere E-Mail lautet: <a
              href="mailto:business@bergflix.de">business@bergflix.de</a></p><p>Wir weisen
              aber darauf hin, dass wir nicht bereit sind, uns am Streitbeilegungsverfahren im
              Rahmen der Europ&auml;ischen Online-Streitbeilegungs-Plattform zu beteiligen.
              Nutzen Sie zur Kontaktaufnahme bitte unsere obige E-Mail und
            Telefonnummer.</p><br /><br /><h2>Disclaimer – rechtliche Hinweise</h2>
            § 1 Warnhinweis zu Inhalten<br />
            Die kostenlosen und frei zugänglichen Inhalte dieser Webseite wurden mit
            größtmöglicher Sorgfalt erstellt. Der Anbieter dieser Webseite übernimmt jedoch
            keine Gewähr für die Richtigkeit und Aktualität der bereitgestellten kostenlosen
            und frei zugänglichen journalistischen Ratgeber und Nachrichten. Namentlich
            gekennzeichnete Beiträge geben die Meinung des jeweiligen Autors und nicht immer
            die Meinung des Anbieters wieder. Allein durch den Aufruf der kostenlosen und
            frei zugänglichen Inhalte kommt keinerlei Vertragsverhältnis zwischen dem Nutzer
            und dem Anbieter zustande, insoweit fehlt es am Rechtsbindungswillen des
            Anbieters.<br />
        <br />
            § 2 Externe Links<br />
            Diese Website enthält Verknüpfungen zu Websites Dritter ("externe Links"). Diese
            Websites unterliegen der Haftung der jeweiligen Betreiber. Der Anbieter hat bei
            der erstmaligen Verknüpfung der externen Links die fremden Inhalte daraufhin
            überprüft, ob etwaige Rechtsverstöße bestehen. Zu dem Zeitpunkt waren keine
            Rechtsverstöße ersichtlich. Der Anbieter hat keinerlei Einfluss auf die aktuelle
            und zukünftige Gestaltung und auf die Inhalte der verknüpften Seiten. Das Setzen
            von externen Links bedeutet nicht, dass sich der Anbieter die hinter dem Verweis
            oder Link liegenden Inhalte zu Eigen macht. Eine ständige Kontrolle der externen
            Links ist für den Anbieter ohne konkrete Hinweise auf Rechtsverstöße nicht
            zumutbar. Bei Kenntnis von Rechtsverstößen werden jedoch derartige externe Links
            unverzüglich gelöscht.<br />
        <br />
            § 3 Urheber- und Leistungsschutzrechte<br />
            Die auf dieser Website veröffentlichten Inhalte unterliegen dem deutschen
            Urheber- und Leistungsschutzrecht. Jede vom deutschen Urheber- und
            Leistungsschutzrecht nicht zugelassene Verwertung bedarf der vorherigen
            schriftlichen Zustimmung des Anbieters oder jeweiligen Rechteinhabers. Dies gilt
            insbesondere für Vervielfältigung, Bearbeitung, Übersetzung, Einspeicherung,
            Verarbeitung bzw. Wiedergabe von Inhalten in Datenbanken oder anderen
            elektronischen Medien und Systemen. Inhalte und Rechte Dritter sind dabei als
            solche gekennzeichnet. Die unerlaubte Vervielfältigung oder Weitergabe einzelner
            Inhalte oder kompletter Seiten ist nicht gestattet und strafbar. Lediglich die
            Herstellung von Kopien und Downloads für den persönlichen, privaten und nicht
            kommerziellen Gebrauch ist erlaubt.<br />
        <br />
            Die Darstellung dieser Website in fremden Frames ist nur mit schriftlicher
            Erlaubnis zulässig.<br />
        <br />
            § 4 Besondere Nutzungsbedingungen<br />
            Soweit besondere Bedingungen für einzelne Nutzungen dieser Website von den
            vorgenannten Paragraphen abweichen, wird an entsprechender Stelle ausdrücklich
            darauf hingewiesen. In diesem Falle gelten im jeweiligen Einzelfall die
            besonderen Nutzungsbedingungen.<p>Quelle: <a
          href="https://www.juraforum.de/impressum-generator/">Impressum Vorlage von
            JuraForum.de</a></p>
      </div>
    </div>
  );
};

export default Impressum;
