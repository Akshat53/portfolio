import './_signal/signal.css';
import Intro from './_signal/Intro';
import Nav from './_signal/Nav';
import Hero from './_signal/Hero';
import Ticker from './_signal/Ticker';
import Statement from './_signal/Statement';
import Channels from './_signal/Channels';
import Line from './_signal/Line';
import Spectrum from './_signal/Spectrum';
import Dial from './_signal/Dial';
import Footer from './_signal/Footer';
import Effects from './_signal/Effects';

// Signal: the portfolio behaves like a live call, because that is what Akshat builds.
// Dial in, tune through six channels (each project demonstrates itself), follow the line
// of his career, read his frequency response, then place a call.
export default function Home() {
  return (
    <div className="sig">
      {/* Entrance states only apply once JS is known to run, so the page never hides content without it. */}
      <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('sig-js')" }} />
      <Intro />
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <Statement />
        <Channels />
        <Line />
        <Spectrum />
        <Dial />
      </main>
      <Footer />
      <Effects />
      <div className="s-grain" aria-hidden="true" />
    </div>
  );
}
