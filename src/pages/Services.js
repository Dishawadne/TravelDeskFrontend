import React from 'react';
import './Services.css';

const Services = () => {
  return (
    <div className="services-container">
      <section className="intro">
        <div className="intro-content">
          <div className="intro-text">
          <h1>OUR SERVICES</h1>
            <p>
              TravelDesk uses proprietary data powered by MMGY Global to design multi-channel targeting strategies that deliver insight-driven messaging and content to travel audiences with precision accuracy. Our fully integrated approach ensures constantly improving and refining results.
            </p>
            <p>
              MMGY TravelDesk uses proprietary data combined with multi-channel targeting strategies to deliver travel messaging and content to audiences with precision accuracy. Our fully integrated approach ensures constantly improving and refining results.
            </p>
          </div>
          <div className="intro-image">
            <img src="/images/image2.jpg" alt="Travel Desk Services" />
          </div>
        </div>
      </section>

      <section className="details">
        <div className="details-content">
          <div className="details-image">
            <img src="/images/image3.jpg" alt="Contextual Targeting" />
          </div>
          <div className="details-text">
          <h2>CONTEXTUAL</h2>
            <p>
              TravelDesk delivers client messaging within contextually relevant content across the open web, ensuring optimal relevance and effectiveness.
            </p>
            <p>
              Display Targeting based on editorial subject or category of page.
            </p>
            <p>
              TravelDesk’s contextual site targeting can deliver client’s messaging to specific sites and URLs as part of open network programmatic campaigns.
            </p>
          </div>
        </div>
      </section>

      <section className="targeting">
        <div className="targeting-content">
          <div className="targeting-text">
          <h2>TRAVELLER INTENT TARGETING</h2>
            <p>
              TravelDesk gives clients access to a set of proprietary data segments based on real-world traveller intent.
            </p>
            <p>
              We have access to travel behavioral and consumer behavioral data from an extensive range of sources including leading DMPs, all executed within the TravelDesk platform.
            </p>
            <p>
              Hyper-targeting and geo-fencing allows us to deliver tailored and tactical messaging to audiences based on specific locations.
            </p>
            <p>
              TravelDesk integrates with more than 600 global inventory exchanges giving clients access to the world’s advertising inventory in display, video, native, connected TV, mobile, Digital OOH, and audio formats.
            </p>
          </div>
          <div className="targeting-image">
            <img src="/images/image4.jpg" alt="Targeting Data" />
          </div>
        </div>
      </section>

      {/* <section className="delivery">
        <div className="delivery-content">
          <div className="delivery-text">
          <h2>AUDIENCE RE-MARKETING AND LOOK-A-LIKE PROFILING</h2>
            <p>
              TravelDesk delivers an end-to-end solution for audience re-marketing and look-a-like profiling including tag management, ID resolution, and creative management.
            </p>
            <p>
              In addition to precise data-driven targeting solutions, TravelDesk offers travel brands a robust set of delivery solutions to help your advertising break through the clutter and deliver on-message to the right audience. Some of our unique solutions include:
            </p>
            <ul>
              <li><strong>Programmatic Connected TV:</strong> Reach targeted travelers and deliver broadcast television spots without the wasted impressions and cost of linear TV.</li>
              <li><strong>Dynamic Creative:</strong> Create multi-variable image, message, and offer delivery that is automatically updated based on the traveler viewing your ad.</li>
              <li><strong>Digital Out Of Home:</strong> Deliver out-of-home creative and messaging digitally with greater refinement in time, location, and audience targeting.</li>
              <li><strong>Lightbox:</strong> Generate greater engagement and more robust content and video delivery in our semi-custom rich media environment.</li>
            </ul>
          </div>
          
        </div>
      </section> */}
    </div>
  );
};

export default Services;
