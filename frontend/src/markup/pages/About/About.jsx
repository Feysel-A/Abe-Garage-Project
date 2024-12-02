import React from 'react'
import AboutUs5 from '../../components/AboutUs/AboutUs5/AboutUs'
import AboutUs6 from '../../components/AboutUs/AboutUs6/AboutUs6'
import AboutUs2 from '../../components/AboutUs/AboutUs2/AboutUs2'
import AboutUs3 from '../../components/AboutUs/AboutUs3/AboutUs3'
import AboutUs4 from '../../components/AboutUs/AboutUs4/AboutUs4'
import AboutUs from '../../components/AboutUs/AboutUs/AboutUs'

function About() {
  return (
    <>
      <AboutUs5 title={"About Us"} subtitle={"About Us"}/>
      <AboutUs6/>
      <AboutUs/>
      <AboutUs2/>
      <AboutUs3/>
      <AboutUs4/>
    </>
  )
}

export default About