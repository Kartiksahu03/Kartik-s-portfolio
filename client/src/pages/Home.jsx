import { Helmet } from 'react-helmet-async';
import { useVisitorCount } from '../hooks/useVisitorCount';
import HeroSection from '../components/home/HeroSection';
import AboutSection from '../components/home/AboutSection';
import CurrentlySection from '../components/home/CurrentlySection';
import JourneySection from '../components/home/JourneySection';
import SkillsMarquee from '../components/home/SkillsMarquee';
import StatsSection from '../components/home/StatsSection';
import SkillsSection from '../components/home/SkillsSection';
import GitHubHeatmap from '../components/home/GitHubHeatmap';
import ProjectsSection from '../components/home/ProjectsSection';
import BlogPreview from '../components/home/BlogPreview';
import ContactSection from '../components/home/ContactSection';

const Home = () => {
  useVisitorCount('/');

  return (
    <>
      <Helmet>
        <title>Kartik Sahu | Full Stack Developer — Open to Work</title>
        <meta name="description" content="Portfolio of Kartik Sahu — Full Stack MERN Developer. Open to jobs and internships. Built FrHelp, Ecomzy, DevDetective and more." />
        <meta property="og:title" content="Kartik Sahu | Full Stack Developer" />
        <meta property="og:description" content="B.Tech graduate building scalable MERN apps with AI integrations. Open to work." />
      </Helmet>

      <HeroSection />
      <CurrentlySection />
      <AboutSection />
      <JourneySection />
      <SkillsMarquee />
      <StatsSection />
      <SkillsSection />
      <GitHubHeatmap />
      <ProjectsSection />
      <BlogPreview />
      <ContactSection />
    </>
  );
};

export default Home;
