import React from 'react'
import Background from '../../assets/background1.jpg'
import Meeting from '../../assets/meeting3.jpg'
// import Background from '../../assets/background1.jpg'
import './HeroSection.css'
const HeroSection = () => {
    return (
        <div className="hero_container">
                         
            

             <div className="event_section">

                <div className="thought_sec">
                    <p>“It is very rare or impossible that an event can be negative from all point of view.”</p>
                    <h3>Dalai Lama</h3>
                </div>
                <div className="event_pic">
                    <span className="pic2" ></span>
                    <img src={Meeting} alt="event" />
                </div>

            </div> 
        </div>
    )
}

export default HeroSection
