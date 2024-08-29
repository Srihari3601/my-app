import React from 'react';
import EVChart from './components/EVChart';
import { useInView } from 'react-intersection-observer';
import './App.css';
import EVCountYear from './data/ev_count_by_year.json';
import EVCountRange from './data/electric_range_distribution.json';
import EVCountFuelAlternative from './data/ev_by_clean_alternative.json';
import EVCountCountry from './data/ev_by_country.json';
import EVCountDistrict from './data/ev_by_district.json';
import EVCountCity from './data/ev_count_by_city.json';
import EVCountMake from './data/ev_count_by_make.json';
import EVCountModel from './data/ev_model.json';
import EVCountType from './data/ev_type_count.json';
import { useState, useEffect } from 'react';

const Section = ({ title, description, children, className }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className={`section ${className} ${inView ? 'visible' : ''}`}>
      <h2>{title}</h2>
      <p>{description}</p>
      {children}
    </section>
  );
};

const App = () => {
  const [isScrolledPast, setIsScrolledPast] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolledPast(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const introSection = document.querySelector('.introduction');
    if (introSection) {
      observer.observe(introSection);
    }

    return () => {
      if (introSection) {
        observer.unobserve(introSection);
      }
    };
  }, []);
  return (
    <div className="App">
      <h1 className={`heading  ${isScrolledPast ? 'scrolled-past' : ''}`}>EV Population Dashboard</h1>

      <div className="contents">
        <Section
          title="Introduction to Electric Vehicles (EVs)"
          description="Electric vehicles (EVs) are vehicles that are either partially or fully powered on electric power. They have the potential to significantly reduce greenhouse gas emissions and dependence on fossil fuels. The future of EVs looks promising with advancements in battery technology, increased range, and growing infrastructure for charging stations. This dashboard provides insights into the current state and trends of EV adoption."
          className="introduction full-width"
        />

        <Section
          title="EV Count by Make"
          description="This chart displays the number of electric vehicles by their make. It helps you understand which brands are leading in electric vehicle production."
          className="full-width"
        >
          <EVChart data={EVCountMake} label="EV Count by Make" chartType="bar" />
        </Section>

        <Section
          title="EV Count by Model Year"
          description="This chart shows the distribution of electric vehicles based on their model year, giving insights into the evolution of electric vehicle adoption over time."
          className="full-width"
        >
          <EVChart data={EVCountYear} label="EV Count by Model Year" chartType="line" />
        </Section>

        <div className="two-column">
          <Section
            title="EV Count by City"
            description="This horizontal bar chart visualizes the distribution of electric vehicles across different cities, helping identify areas with higher adoption rates."
            className="chart-container"
          >
            <EVChart data={EVCountCity} label="EV Count by City" chartType="bar" />
          </Section>
          <Section
            title="Electric Range Distribution"
            description="This bar chart displays the distribution of electric vehicles based on their electric range. It provides insights into the typical range capabilities of different EV models."
            className="chart-container"
          >
            <EVChart data={EVCountRange} label="Electric Range Distribution" chartType="bar" />
          </Section>
        </div>

        <div className="two-column">
          <Section
            title="EV Type Count"
            description="This doughnut chart shows the count of different types of electric vehicles. It helps you understand the proportion of Battery Electric Vehicles (BEVs) vs. Plug-in Hybrid Electric Vehicles (PHEVs)."
            className="chart-container"
          >
            <EVChart data={EVCountType} label="EV Type Count" chartType="doughnut" />
          </Section>
          <Section
            title="EV Count by Clean Alternative Fuel Vehicle (CAFV) Eligibility"
            description="This doughnut chart visualizes the distribution of electric vehicles across different Alternative fuel eligibility. It helps identify which counties have higher EV alternative fuel."
            className="chart-container"
          >
            <EVChart data={EVCountFuelAlternative} label="EV Count by Clean Alternative Fuel Vehicle (CAFV) Eligibility" chartType="doughnut" />
          </Section>
        </div>

        <Section
          title="EV Count by Legislative District"
          description="This bar chart shows the count of electric vehicles by legislative district. It provides insights into how EV adoption varies across different legislative areas."
          className="full-width"
        >
          <EVChart data={EVCountDistrict} label="EV count by District" chartType="bar" />
        </Section>

        <Section
          title="EV Count by County"
          description="This pie chart visualizes the distribution of electric vehicles across different counties. It helps identify which counties have higher EV adoption rates."
          className="full-width"
        >
          <EVChart data={EVCountCountry} label="EV count by Country" chartType="pie" />
        </Section>

        <Section
          title="EV Model Distribution"
          description="This Horizontal Bar chart visualizes the distribution of electric vehicles by model, with the bubble size indicating the number of vehicles for each model."
          className="full-width"
        >
          <EVChart data={EVCountModel} label="EV Model Distribution" chartType="horizontalBar" />
         </Section>
      </div>
    </div>
  );
};

export default App;
