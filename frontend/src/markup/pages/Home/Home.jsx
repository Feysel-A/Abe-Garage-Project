import React from 'react'
import TopBanner from '../../components/TopBanner/TopBanner'
import AboutUs from '../../components/AboutUs/AboutUs/AboutUs'
import Service from '../../components/Service/Service/Service'
import Features from '../../components/Features/Features/Features'
import AboutUs2 from '../../components/AboutUs/AboutUs2/AboutUs2'
import AboutUs3 from '../../components/AboutUs/AboutUs3/AboutUs3'
import AboutUs4 from '../../components/AboutUs/AboutUs4/AboutUs4'

function Home() {
  return (
    <>
      <TopBanner/>
      <AboutUs/>
      <Service/>
      <Features/>
      <AboutUs2/>
      <AboutUs3/>
      <AboutUs4/>
    </>
  )
}

export default Home
