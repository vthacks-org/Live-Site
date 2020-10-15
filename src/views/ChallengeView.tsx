import React from 'react';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

const ChallengeView: React.FC = () => {
	return (
		<Container id="contact-view" fluid>
			<Col>
				<h2>Tracks</h2>
				<p>
					At uOttaHack 3, hackers are to enter into one of our three hacking tracks, broad categories that
					represent real life industries in tech and build their projects around them. Hackers still have
					complete creative freedom with what their project actually does, but they should be making an effort
					to relate it to the specific track.
				</p>
				<h5>Details</h5>
				<ul>
					<li>Teams are allowed to enter ONE and ONLY one track.</li>
					<li>
						Your project must relate somehow to problems, challenges, and new ideas relevant to the track
						found in the real world.
					</li>
				</ul>
				<h4>
					FinTech Track{' '}
					<span role="img" aria-label="credit card emoji">
						💳
					</span>
				</h4>
				<p>
					Financial technology has become a rapidly growing industry that serves both consumers and
					businesses. Recent years have seen the rise of products aimed at improving financial literacy,
					mobile banking, cryptocurrency, investing apps, and more. Projects in this track should aim to
					improve on existing financial infrastructure, bring new innovations in the sector for consumers, and
					apply modern technology to the traditional financial world.
				</p>
				<h4>
					HealthTech Track{' '}
					<span role="img" aria-label="pills emoji">
						💊💊
					</span>
				</h4>
				<p>
					Health technology is a broad industry that includes any products or services that improve the
					delivery, payment, and consumption of care. Companies in this sector aim at innovating the crucial
					patient-practitioner relationship with a modern approach. Products can include fitness and lifestyle
					improvement apps, patient care systems, e-commerce based pharmaceuticals, and more. Projects in this
					track should aim to improve the average patient’s quality of life, increase the efficiency of
					medical practitioners, and bring new concepts to an industry where patient safety is the highest
					priority.
				</p>
				<h4>
					Smart Delivery Track - Sponsored by InnovaPost{' '}
					<span role="img" aria-label="truck emoji">
						🚚
					</span>
				</h4>
				<p>
					Today’s extremely fast pace of e-commerce has created an even greater demand for highly efficient
					delivery systems, where consumers expect short delivery times without any risk of delays. Delivery
					technology has evolved to grow beyond just traditional shipments, now it can connect restaurants
					with customers all across the city, bring groceries to your doorstep, and even bring thousands of
					items to your doorstep in a matter of hours. Projects in this track should aim at taking delivery to
					its' innovation, introducing delivery tech to completely new industry, and applying modern
					technology (hardware or software) to the delivery pipeline.
				</p>
				<h2>Challenges</h2>
				<h4>Deloitte</h4>
				<p>
					We want you to conceptualize how the Government could connect youth programs and services to
					Canadians who need them the most. Our government clients understand that programs and services made
					available to youth are difficult to access and understand, especially for some vulnerable
					populations. What marketing initiatives, tools and platforms could best support this objective and
					the strategy of the Government of Canada? Ideas could include:
				</p>
				<ul>
					<li>A Facebook Messenger bot to answer program eligibility questions</li>
					<li>A web-based aggregator of youth programs</li>
					<li>A personal account to manage program enrolments And anything else you can come up with!</li>
				</ul>
				<p>
					<a href="https://drive.google.com/file/d/1_nM7aqAfHiiXcPSjQ2gZO4Na-v0N3pSr/view?usp=sharing">
						Link to the full slide deck
					</a>
				</p>
				<h4>Solace</h4>
				<p>
					Build your hack using Solace PubSub+ message broker technology. The Solace PubSub+ message broker
					allows your applications to communicate with each other through a publish/subscribe interface over
					multiple messaging protocols (MQTT, AMQP, REST, SMF) via our Solace PubSub+ Cloud service. The best
					hack selected by Solace judges will win 4 sets of Apple Airpods! Join Solace engineers at our
					workshop Saturday at 8:00am for a hands-on workshop where you can learn how to integrate compatible
					messaging APIs into your applications. Drop by our booth Friday night to talk ideas and architecture
					for your hack and to get your Solace PubSub+ Cloud account. Check out our hackathon website (
					<a href="http://uottahack.solace.cloud">http://uottahack.solace.cloud</a>) for example applications
					and ideas to kickstart your hacks. Ping us on Slack if you can’t find us in person and we can help
					get your Solace PubSub+ accounts setup from there too.
				</p>
			</Col>
		</Container>
	);
};

export default ChallengeView;
