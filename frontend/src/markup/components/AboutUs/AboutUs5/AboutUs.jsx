import React from 'react'
import img from  '../../../../assets/images/bg/bg2.png'
function AboutUs({title, subtitle}) {
  return (
    <section
      className="page-title"
      style={{backgroundImage:`url(${img})`}}
    >
      <div className="auto-container">
        <h2>{title}</h2>
        <ul className="page-breadcrumb">
          <li>
            <a href="index.html">home</a>
          </li>
          <li>{subtitle}</li>
        </ul>
      </div>
      <h1 data-parallax='{"x": 200}'>Car Repairing</h1>
    </section>
  );
}

export default AboutUs
