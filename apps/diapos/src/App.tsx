import { RevealSlides } from "react-reveal-slides";
import RevealNotes from "reveal.js/plugin/notes/notes";
import RevealZoom from "reveal.js/plugin/zoom/zoom";
import "reveal.js/dist/reveal.css";
import "reveal.js/plugin/highlight/monokai.css";
import 'reveal.js/dist/theme/black.css'

function App() {
  return (
 <div style={{
  width: '100vw',
  height: '100vh',
  backgroundColor: '#000',
  padding : 0,
  margin :0,
  position: 'absolute',
  overflow: 'hidden'
 }}>
     <RevealSlides
      controls={false}
      plugins={[RevealZoom, RevealNotes]}
      onStateChange={(state) => console.log(state)}
    >
      <section key="1" >
        <section key="0-0">
          <h2 style={{
          color: '#fff',
          }}>react-reveal-slides</h2>
          <p>Create dynamic Reveal.js slideass</p>
        </section>
        <section key="0-1">
          <ul>
            <li className="fragment">
              Easily make presentation content dynamic
            </li>
            <li className="fragment">Easily add presentations to React apps</li>
            <li className="fragment">
              Embed React components inside presentations
            </li>
          </ul>
        </section>
      </section>
  
    </RevealSlides>
 </div>
  );
}

export default App;
