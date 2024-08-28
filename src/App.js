import React from 'react';
import EVChart from './components/EVChart';
import { useInView } from 'react-intersection-observer';
import './App.css';

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
  return (
    <div className="App">
      <h1 className='heading'>EV Population Dashboard</h1>

      <div className="contents">
        <Section
          title="EV Count by Make"
          description="This chart displays the number of electric vehicles by their make. It helps you understand which brands are leading in electric vehicle production."
          className="full-width"
        >
          <EVChart dataUrl="/my-app/ev_count_by_make.json" label="EV Count by Make" chartType="bar" />
        </Section>

        <Section
          title="EV Count by Model Year"
          description="This chart shows the distribution of electric vehicles based on their model year, giving insights into the evolution of electric vehicle adoption over time."
          className="full-width"
        >
          <EVChart dataUrl="/ev_count_by_year.json" label="EV Count by Model Year" chartType="line" />
        </Section>

        <div className="two-column">
          <Section
            title="EV Count by City"
            description="This horizontal bar chart visualizes the distribution of electric vehicles across different cities, helping identify areas with higher adoption rates."
            className="chart-container"
          >
            <EVChart dataUrl="/ev_count_by_city.json" label="EV Count by City" chartType="horizontalBar" />
          </Section>
          <Section
            title="Electric Range Distribution"
            description="This bar chart displays the distribution of electric vehicles based on their electric range. It provides insights into the typical range capabilities of different EV models."
            className="chart-container"
          >
            <EVChart dataUrl="/electric_range_distribution.json" label="Electric Range Distribution" chartType="bar" />
          </Section>
        </div>

        <div className="two-column">
          <Section
            title="EV Type Count"
            description="This doughnut chart shows the count of different types of electric vehicles. It helps you understand the proportion of Battery Electric Vehicles (BEVs) vs. Plug-in Hybrid Electric Vehicles (PHEVs)."
            className="chart-container"
          >
            <EVChart dataUrl="/ev_type_count.json" label="EV Type Count" chartType="doughnut" />
          </Section>
          <Section
          title="EV Count by Clean Alternative Fuel Vehicle (CAFV) Eligibility"
          description="This doughnut chart visualizes the distribution of electric vehicles across different Alternative fuel eligibility. It helps identify which counties have higher EV alternative fuel."
          className="chart-container"
        >
          <EVChart dataUrl="/ev_by_clean_alternative.json" label="EV Count by Clean Alternative Fuel Vehicle (CAFV) Eligibility" chartType="doughnut" />
        </Section>
          {/* <Section
            title="EV Model Distribution"
            description="This bubble chart visualizes the distribution of electric vehicles by model, with the bubble size indicating the number of vehicles for each model."
            className="chart-container"
          >
            <EVChart dataUrl="/ev_model.json" label="EV Model Distribution" chartType="bubble" />
          </Section> */}
        </div>

        <Section
          title="EV Count by Legislative District"
          description="This bar chart shows the count of electric vehicles by legislative district. It provides insights into how EV adoption varies across different legislative areas."
          className="full-width"
        >
          <EVChart dataUrl="/ev_by_district.json" label="EV count by District" chartType="bar" />
        </Section>

        <Section
          title="EV Count by County"
          description="This pie chart visualizes the distribution of electric vehicles across different counties. It helps identify which counties have higher EV adoption rates."
          className="full-width"
        >
          <EVChart dataUrl="/ev_by_country.json" label="EV count by Country" chartType="pie" />
        </Section>

        {/* <Section
          title="EV Count by Clean Alternative Fuel Vehicle (CAFV) Eligibility"
          description="This doughnut chart visualizes the distribution of electric vehicles across different Alternative fuel eligibility. It helps identify which counties have higher EV alternative fuel."
          className="full-width"
        >
          <EVChart dataUrl="/ev_by_clean_alternative.json" label="EV Count by Clean Alternative Fuel Vehicle (CAFV) Eligibility" chartType="doughnut" />
        </Section> */}

        <Section
            title="EV Model Distribution"
            description="This bubble chart visualizes the distribution of electric vehicles by model, with the bubble size indicating the number of vehicles for each model."
            className="full-width"
          >
            <EVChart dataUrl="/ev_model.json" label="EV Model Distribution" chartType="bubble" />
          </Section>
      </div>
    </div>
  );
};

export default App;
