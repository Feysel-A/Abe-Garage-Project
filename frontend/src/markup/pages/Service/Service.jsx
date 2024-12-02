import React from "react";
import AboutUs5 from "../../components/AboutUs/AboutUs5/AboutUs";
import Service from "../../components/Service/Service/Service";
import AboutUs2 from "../../components/AboutUs/AboutUs2/AboutUs2";
import AboutUs3 from "../../components/AboutUs/AboutUs3/AboutUs3";
import AboutUs4 from "../../components/AboutUs/AboutUs4/AboutUs4";
function ServicePage() {
  return (
    <div>
      <AboutUs5 title={"Our Services"} subtitle={"Services"} />
      <Service />
      <AboutUs2 />
      <AboutUs3 />
      <AboutUs4 />
    </div>
  );
}

export default ServicePage;
