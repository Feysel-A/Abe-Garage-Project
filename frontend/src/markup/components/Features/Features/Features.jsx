import React from "react";
import feature from "../../../../assets/images/banner/features.jpg";
function Features() {
  return (
    <section className="features-section">
      <div className="auto-container">
        <div className="row">
          <div className="col-lg-6">
            <div className="inner-container">
              <h2>
                Quality Service And <br /> Customer Satisfaction !!
              </h2>
              <div className="text">
                We utilize the most recent symptomatic gear to ensure your
                vehicle is fixed or adjusted appropriately and in an opportune
                manner. We are an individual from Professional Auto Service, a
                first class execution arrange, where free assistance offices
                share shared objectives of being world-class car administration
                focuses.
              </div>
            </div>
          </div>
          {/* <div className="col-lg-6">
            <div className="image">
              <img src={img} alt="" />
            </div>
          </div> */}
          <div className="col-md-6 ">
            <div className="hover-zoom">
              <img className="odometer " src={feature} alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
