import React from 'react';
import '../index.css';
import '../styles/Subscription.css';
import Sub from '../images/sub3.png';


function Subscription()
{
    return(
        <div className='sub_parent'>
            <div className="bg_ele11"></div>
            <div className="bg_ele12"></div>
            <div className='sub_content'>
                <img src={Sub}/>
                <div className='sub_right'>
                    <div className="subs_heading">
                        <h1>Discover & Wander - </h1>
                        <h2>Subscribe</h2>
                        <h1>Now!</h1>
                    </div>
                    <p>Subscribe to our newsletter for the latest travel inspirations, exclusive deals, and thrilling destinations. Embark on a journey of wanderlust with our curated content, bringing the world's wonders to your inbox. Don't miss out on new horizons, travel tips, and exciting offers. Join us now and let the adventure begin!</p>
                    <form>
                        <input   type="text" placeholder="Enter your email address"/>
                        <button type="submit">Subscribe</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Subscription;