import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Context from './components/Context';
import AreasOverview from './components/AreasOverview';
import AreaSection from './components/AreaSection';
import UseCasesGrid from './components/UseCasesGrid';
import WhyThree from './components/WhyThree';
import DeepDiveSection from './components/DeepDiveSection';
import EstimatesSection from './components/EstimatesSection';
import Roadmap from './components/Roadmap';
import Footer from './components/Footer';
import { areas } from './data/areas';
import { deepDives } from './data/deepDives';

export default function App() {
  const field = areas.find((a) => a.id === 'field')!;
  const officeHard = areas.find((a) => a.id === 'office-hard')!;
  const officeSoft = areas.find((a) => a.id === 'office-soft')!;

  return (
    <div className="relative">
      <Navigation />
      <main>
        <Hero />
        <Context />
        <AreasOverview />

        <AreaSection
          area={field}
          image={{ src: '/bimar-cv.png', caption: 'Компьютерное зрение на объекте: распознавание техники, людей и инцидентов (пример Bimar).' }}
        />
        <AreaSection area={officeHard} />
        <AreaSection area={officeSoft} />

        <UseCasesGrid />
        <WhyThree />

        {deepDives.map((dd) => (
          <DeepDiveSection key={dd.id} dd={dd} />
        ))}

        <EstimatesSection />
        <Roadmap />
      </main>
      <Footer />
    </div>
  );
}
