import React from 'react'
import HeroSection from './sections/HeroSection' 
import OurStory from './sections/ourStory'
import ReviewSection from './sections/reviewSection'
import Collection from './sections/collection'
import Routine from './sections/Routine'


const Home = () => {
  return (
    <>
      <HeroSection />
      <Collection />
      <OurStory />
      <Routine />
      <ReviewSection />
    </>
  );
}

export default Home