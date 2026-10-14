import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { Hero } from './sections/Hero';
import { Systeme } from './sections/Systeme';
import { Laboratoire } from './sections/Laboratoire';
import { Croissance } from './sections/Croissance';
import { Fractale } from './sections/Fractale';
import { Projet } from './sections/Projet';
import { Contact } from './sections/Contact';

function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Systeme />
        <Laboratoire />
        <Croissance />
        <Fractale />
        <Projet />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
