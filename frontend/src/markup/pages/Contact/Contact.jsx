import React from 'react'
import AboutUs5 from '../../components/AboutUs/AboutUs5/AboutUs'
import ContactComponent from '../../components/Contact/Contact'
import AboutUs4 from '../../components/AboutUs/AboutUs4/AboutUs4'

function Contact() {
  return (
    <>
      <AboutUs5 title={"Contact Us"}  subtitle={"Contact Us"}/>
      <ContactComponent/>
      <AboutUs4/>
    </>
  );
}

export default Contact
