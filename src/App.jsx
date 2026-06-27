import { AppProvider } from './context/AppContext.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import CatalogSection from './components/CatalogSection.jsx';
import PromoSection from './components/PromoSection.jsx';
import SimulatorSection from './components/SimulatorSection.jsx';
import ProfessionalsSection from './components/ProfessionalsSection.jsx';
import BudgetSection from './components/BudgetSection.jsx';
import FavoritesDrawer from './components/FavoritesDrawer.jsx';
import ComparePanel from './components/ComparePanel.jsx';
import CompareModal from './components/CompareModal.jsx';
import ProductModal from './components/ProductModal.jsx';
import Toast from './components/Toast.jsx';
import BackToTop from './components/BackToTop.jsx';
import WhatsAppFloat from './components/WhatsAppFloat.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <AppProvider>
      <Header />
      <Hero />
      <About />
      <CatalogSection />
      <PromoSection />
      <SimulatorSection />
      <ProfessionalsSection />
      <BudgetSection />
      <FavoritesDrawer />
      <ComparePanel />
      <CompareModal />
      <ProductModal />
      <Toast />
      <BackToTop />
      <WhatsAppFloat />
      <Footer />
    </AppProvider>
  );
}
