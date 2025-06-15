import React, { useState, useRef } from 'react'
import { API_BASE_URL, API_SPACE_ID, API_TOKEN, maybeGetAssetURL } from '../contentful'
import Iframe from 'react-iframe'
import SlideAndFade from './SlideAndFade'
import Axios from 'axios'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import MediaQuery from 'react-responsive'
import Nav from './Nav'
import { MOBILEBP, DESKTOPTRANSITIONBP, quotesData } from '../constants'
import StaffMember from './StaffMember'
import StaffMemberSpotlight from './StaffMemberSpotlight'
import Quotes from './Quotes'
import Footer from './Footer'
import HeroSection from './HeroSection'

function preloadImage(imageURL) {
  const img = new Image()
  img.src = imageURL
}

function processResponse(responseData) {
  const assets = responseData.includes.Asset.map((asset) => {
    return { id: asset.sys.id, url: asset.fields.file.url }
  })

  const staffMembers = responseData.items.map((member) => {
    const fields = member.fields

    const staging = {}
    staging.order = fields.order
    staging.name = fields.name
    staging.role = fields.role
    staging.photoSmall = maybeGetAssetURL('smallPhoto', fields, assets)
    staging.photoLarge = maybeGetAssetURL('largePhoto', fields, assets)
    staging.bio = fields.bio
    staging.video = maybeGetAssetURL('video', fields, assets)
    staging.instagram = fields.instagram
    staging.location = fields.location

    return staging
  })

  return staffMembers
}

function disableParentScroll() {
  const root = document.documentElement
  root.className += ' disable-scroll'
  document.body.classList.add('disable-scroll')
}

function enableParentScroll() {
  const root = document.documentElement
  root.className = root.className.replace('disable-scroll', '')
  document.body.className = document.body.className.replace('disable-scroll', '')
}

function About() {
  const [showSpotlight, setShowSpotlight] = useState(false)
  const [selectedStaffMember, setSelectedStaffMember] = useState({})
  const [staffMembers, setStaffMembers] = useState(
    Array(6).fill({
      name: '',
      role: '',
      photoSmall: '',
      photoLarge: '',
      bio: '',
      video: '',
      location: '',
    }),
  )

  const container = useRef(null)

  // Fetch staff data
  React.useEffect(() => {
    const staffEndpoint = `${API_BASE_URL}/spaces/${API_SPACE_ID}/entries?access_token=${API_TOKEN}&content_type=staff&order=fields.order`
    Axios.get(staffEndpoint)
      .then((result) => {
        const fetchedStaffMembers = processResponse(result.data)
        setStaffMembers(fetchedStaffMembers)
        fetchedStaffMembers.forEach((member) => {
          preloadImage(member.photoSmall)
          preloadImage(member.photoLarge)
        })
      })
      .catch((error) => console.log('error: ', error))
    return enableParentScroll
  }, [])

  const handleStaffMemberSelect = (staffMemberData) => {
    if (!showSpotlight) {
      disableParentScroll()
      setShowSpotlight(true)
      setSelectedStaffMember(staffMemberData)
    }
  }

  const handleClearStaffMemberSelect = () => {
    enableParentScroll()
    setShowSpotlight(false)
    setSelectedStaffMember({})
  }

  return (
    <div className='about' ref={container}>
      <TransitionGroup component={null}>
        {showSpotlight && (
          <CSSTransition in={showSpotlight} timeout={500} classNames='display' unmountOnExit>
            <StaffMemberSpotlight
              staffMemberDetails={selectedStaffMember}
              closeHandler={handleClearStaffMemberSelect}
            />
          </CSSTransition>
        )}
      </TransitionGroup>

      <Nav />

      <div className='content-container'>
        <div className='content'>
          <div className='inner-content-container'>
            <MediaQuery minWidth={DESKTOPTRANSITIONBP}>
              <div className='header'>
                <SlideAndFade delay={1250}>
                  <h5>Meet the team</h5>
                </SlideAndFade>
                <SlideAndFade delay={1450}>
                  <h3>
                    Not-your-ordinary-hairdressers. Meet the people behind the chair. See someone
                    you vibe with? Let us know when you book and we&apos;ll make the match.
                  </h3>
                </SlideAndFade>
              </div>

              <SlideAndFade delay={1650}>
                <div className='staff-container'>
                  {staffMembers.map((staffMemberData, index) => (
                    <StaffMember
                      key={index}
                      staffMemberData={staffMemberData}
                      staffMemberSelectHandler={handleStaffMemberSelect}
                    />
                  ))}
                </div>
              </SlideAndFade>
            </MediaQuery>

            <MediaQuery maxWidth={MOBILEBP}>
              <SlideAndFade delay={1250}>
                <div>
                  <div className='header'>
                    <h5>Meet the team</h5>
                    <h3>
                      Not-your-ordinary-hairdressers. Meet the people behind the chair. See someone
                      you vibe with? Let us know when you book and we&apos;ll make the match.
                    </h3>
                  </div>
                  <div className='staff-container'>
                    {staffMembers.map((staffMemberData, index) => (
                      <StaffMember
                        key={index}
                        staffMemberData={staffMemberData}
                        staffMemberSelectHandler={handleStaffMemberSelect}
                      />
                    ))}
                  </div>
                </div>
              </SlideAndFade>
            </MediaQuery>
          </div>

          <HeroSection
            title='Our story'
            video='https://videos.ctfassets.net/2f8bh3xz5t4r/3DuvQsjnxpIwzKaJZy1blR/030264480575e159921baa017a2b6a61/our-story.mp4'
            leftText={
              "There's a reason we're good at what we do, and it's because of where we came from."
            }
            rightParagraphs={[
              "After several years of training with some of the world's top stylists and traveling all over the country doing shows and working in salon education, owner and founder Timothy Silmon dreamt up a place where the beauty-obsessed could not only work, but also create lasting connections through their craft. Saint Rose was born out of Timothy's dream for a “non-salon” - a space that is kind, warm, and inviting. Since then, it has grown into something even better: the most genuine and timeless beauty salon to ever hit Houston. And it makes you feel right at home.",
              'The vintage TV, hand-crafted workspaces, couture wallpaper, and quirky embellishments around the salon all work to create an atmosphere that balances nostalgia with the optimism of new ideas. “I wanted to create spaces that have a timeless feeling” Timothy says, “a place where older generations reminisce and the younger generations use it as backdrop for the perfect photo”.',
              'From a snip of hair to a sip of our delicious loose-leaf tea, we customize every experience our clients have. Because who wants ordinary?',
            ]}
          />

          <div className='our-clients'>
            <HeroSection
              title='Our clients'
              image='https://images.ctfassets.net/2f8bh3xz5t4r/17EFNaEJN2pKw4jMIHAn3S/20152047334829e72ae6fa99ebcfadd6/our-clients.jpg'
              leftText='But what do our amazing clients actually say about us? Read our reviews below and see why they keep coming back.'
              rightParagraphs={[
                'We take our level of quality and care seriously and show it through every moment of your time with us. Our guests come back for the genuine commitment we have to them and their needs and our consistency when we deliver. Book today and experience Saint Rose for yourself.',
              ]}
            />

            <div className='video-review'>
              <video id='who-we-are-vid' autoPlay loop muted controls playsInline>
                <source
                  src={
                    'https://videos.ctfassets.net/2f8bh3xz5t4r/5ZvdMsfyzeY51Loi7YRbPq/a7ffc0bfeef8b0bf403d30a583ae6b56/who_we_are.mp4'
                  }
                  type='video/mp4'
                />
              </video>
            </div>

            <div className='instagram-reviews'>
              <Iframe
                src='https://cdn.lightwidget.com/widgets/d9467bad991b50808baea81bd806ab73.html'
                width='100%'
                height='auto'
                scrolling='no'
                display='initial'
                position='relative'
                allowtransparency='true'
                style='width:100%;border:0;overflow:hidden;'
              />
            </div>

            <div className='quotes'>
              <div className='quotes-wrapper'>
                <Quotes quotes={quotesData} />
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
      <div className='entrance' />
      <div className='exit' />
      <div className='exit-2' />
    </div>
  )
}

export default About
