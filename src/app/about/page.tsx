import { maybeGetAssetURL } from '@/contentful'
import Iframe from 'react-iframe'
import SlideAndFade from '@/components/SlideAndFade'
import { quotesData } from '@/constants'
import { StaffMemberGrid } from '@/components/StaffMember'
import Quotes from '@/components/Quotes'
import HeroSection from '@/components/HeroSection'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | Saint Rose',
}

function processResponse(responseData) {
  const assets = responseData.includes.Asset.map((asset) => {
    return { id: asset.sys.id, url: asset.fields.file.url }
  })

  const staffMembers = responseData.items.map((member) => {
    const fields = member.fields

    const staging = {
      order: fields.order,
      name: fields.name,
      role: fields.role,
      photoSmall: maybeGetAssetURL('smallPhoto', fields, assets),
      photoLarge: maybeGetAssetURL('largePhoto', fields, assets),
      bio: fields.bio,
      video: maybeGetAssetURL('video', fields, assets),
      instagram: fields.instagram,
      location: fields.location,
    }

    return staging
  })

  return staffMembers
}

export default async function About() {
  const staffEndpoint = `${process.env.API_BASE_URL}/spaces/${process.env.API_SPACE_ID}/entries?access_token=${process.env.API_TOKEN}&content_type=staff&order=fields.order`
  // Fetch staff data
  const staffData = await fetch(staffEndpoint)
  const staffDataJson = await staffData.json()
  const staffMembers = processResponse(staffDataJson)

  return (
    <div className='about'>
      <div className='content-container'>
        <div className='content'>
          <div className='inner-content-container'>
            <div className='header'>
              <SlideAndFade delay={1.25}>
                <h5>Meet the team</h5>
              </SlideAndFade>
              <SlideAndFade delay={1.45}>
                <h3>
                  Not-your-ordinary-hairdressers. Meet the people behind the chair. See someone you
                  vibe with? Let us know when you book and we&apos;ll make the match.
                </h3>
              </SlideAndFade>
            </div>

            <SlideAndFade delay={1.65}>
              <StaffMemberGrid staffMembers={staffMembers} />
            </SlideAndFade>
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
                url='https://cdn.lightwidget.com/widgets/d9467bad991b50808baea81bd806ab73.html'
                width='100%'
                height='auto'
                scrolling='no'
                display='initial'
                position='relative'
                // allowtransparency='true'
                // style='width:100%;border:0;overflow:hidden;'
              />
            </div>

            <Quotes quotes={quotesData} />
          </div>
        </div>
      </div>
    </div>
  )
}
