import React, {Component} from 'react';
import '../../layout/css/styles-monitor.css'
import '../../layout/css/styles-tablet.css'
import '../../layout/css/styles-phone.css'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'

// Images
import brand from '../../layout/img/Brand.svg'
import featurebar from '../../layout/img/Featurebar.svg'
import featurebarTabMob from '../../layout/img/Featurebar-TabMob.svg'
import softwareengineeringBadge from '../../layout/img/Softwareengineering-Badge.svg'
import datascienceBadge from '../../layout/img/DataScience-Badge.svg'
import frontendBadge from '../../layout/img/Front-endDeveloping-Badge.svg'
import logoFooter from '../../layout/img/Logo-Footer.svg'
import paperplane from '../../layout/img/Paperplane.svg'
import facebook from '../../layout/img/Facebook.svg'
import twitter from '../../layout/img/Twitter.svg'
import youtube from '../../layout/img/Youtube.svg'

class PublicPage extends Component {
    
    render() {
        return (
            <div>
                <div class="clearfix"></div>
                    <div class="features-container">
                        <img src={brand} id="brand" alt="Brand transparent"/>
                        <div class="page-wrapper">
                            <h1>What can syntaxive offer you:</h1>
                            <img src={featurebar} id="featurebar" alt="green Featurebar"/>
                            <img src={featurebarTabMob} id="featurebar-TabMob" alt="featurebar-TabMob"/>
                            <div class="feature-card">
                                <h2>Discussions</h2>
                                <p id="description-text">Exchange information with other developers about new solution approaches.</p>
                            </div>
                            <div class="feature-card">
                                <h2>Practice & Learn</h2>
                                <p id="description-text">Try your hand at practice problems, submit your solutions in the language of your choice and receive points to move up your syntaxive rank.</p>
                            </div>
                            <div class="feature-card">
                                <h2>Compete & Hunt</h2>
                                <p id="description-text">Select from 400+ challenges to create and customize code that
                                    will be rewarded if selected.</p>
                            </div>
                        </div>
                    </div>
                <div class="page-wrapper">
                    <div class="help-container">
                        <h1>How can syntaxive help you?</h1>
                        <div class="helpcard">
                            <img src={softwareengineeringBadge} alt="Softwareengineering-Badge"/>
                            <h2>Software Engineering</h2>
                            <button id="discButton"><a href="#header">Enter Discussion</a></button>
                        </div>
                        <div class="helpcard">
                            <img src={datascienceBadge} alt="DataScience-Badge"/>
                            <h2>Data Science</h2>
                            <button id="discButton"><a href="#header">Enter Discussion</a></button>
                        </div>
                        <div class="helpcard">
                            <img src={frontendBadge} alt="Front-endDeveloping-Badge"/>
                            <h2>Front-end Developing</h2>
                            <button id="discButton"><a href="#header">Enter Discussion</a></button>
                        </div>
                    </div>
                </div>
                <div class="clearfix"></div>
                <div class="footer">
                    <img src={logoFooter} id="footerlogo" alt="Logofooter"/>
                    <p id="newsletter-p">Newsletter</p>
                    <div class="newsletterbox">
                        <label for="emailboxfooter">Newsletter</label>
                        <input type="text" id="emailboxfooter" placeholder="Your E-mail"/>
                        <button id="paperplane"><img src={paperplane} alt="paperplane"/></button>
                    </div>
                    <div class="clearfix"></div>
                    <div class="footernav">
                        <a href="#header">Home</a>
                        <a href="#header">About us</a>
                        <a href="#header">Contact</a>
                    </div>
                    <div class="socialmedia">
                        <a href="facebook.com"><img src={facebook} alt="facebook"/></a>
                        <a href="twitter.com"><img src={twitter} alt="twitter"/></a>
                        <a href="youtube.com"><img src={youtube} alt="youtube"/></a>
                    </div>
                    <p>@Copyright 2021 - syntaxive</p>
                </div>
            </div>
        )
    }
}

export default PublicPage