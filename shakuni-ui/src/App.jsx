import './App.css'
import { GlobalFooter } from './pages/global/GlobalFooter'
import { GlobalHeader } from './pages/global/GlobalHeader'
import ShakkuniRoute from './util/ShakuniRoute'

function App() {

  return (
    <section>
      <ShakkuniRoute />
      <GlobalHeader />
      <GlobalFooter />
    </section>
  );
}

export default App
