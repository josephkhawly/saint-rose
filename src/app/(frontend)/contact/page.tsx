import { Metadata } from 'next'
import SlideAndFade from '@/components/SlideAndFade'

import styles from './contact.module.css'
import Image from 'next/image'

interface GalleryImageProps {
  src: string
  alt: string
  aspectRatio: string
  sizes?: string
}

function GalleryImage({
  src,
  alt,
  aspectRatio,
  sizes = '(max-width: 768px) 100vw, 33vw',
}: GalleryImageProps) {
  return (
    <div
      className={styles['column-image']}
      style={{
        position: 'relative',
        aspectRatio,
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        style={{
          objectFit: 'cover',
        }}
      />
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Contact Us | Saint Rose',
}

export default function Contact() {
  return (
    <div className={styles.contact}>
      <div className='content'>
        <SlideAndFade delay={1}>
          <div className={styles['sub-nav']}>Contact us</div>
          <div className={styles['text-content']}>
            <h3>
              Tucked away in the heart of one of Houston&rsquo;s most eclectic and dynamic
              neighborhoods, Saint Rose was born out of a dream to create one of the top beauty
              salons in Houston - a space that is chic while also kind, warm, and inviting. Since
              then, it has grown into something even better: the most genuine and timeless luxury
              hair salon to hit Houston.
            </h3>
            <h3>
              Within our walls you&rsquo;ll find haircuts that transform, curly cuts that define,
              and more. From easy-going highlights or dimensional low-lights to the boldest looks,
              it is our delight to have you!
            </h3>
            <div className={styles['location-contact-container']}>
              <div className={styles['location-and-hours-body']}>
                <h4>Location & Hours</h4>
                <div className={styles['address']}>
                  <h5>3316 Mount Vernon St.</h5>
                  <h5>Houston, TX 77006</h5>
                </div>
                <div className={styles['hours']}>
                  <h5>Tue-Fri 8:30AM-9PM</h5>
                  <h5>Sat 8:30AM-4PM</h5>
                </div>
                <div className={styles['hours']}>
                  <h5>Closed Sundays & Mondays</h5>
                </div>
                <p>Hours may vary based on client needs and stylist availability.</p>
              </div>
              <div className={styles['contact-body']}>
                <h4>Contact</h4>
                <div className={styles['address']}>
                  <h5>
                    <a href='tel:3468022183'>(346) 802-2183</a>
                  </h5>
                  <h5>
                    <a href='mailto:info@hairbysaintrose.com'>info@hairbysaintrose.com</a>
                  </h5>
                </div>
              </div>
            </div>
            <div className={styles['gallery']}>
              <div className={styles['column']}>
                <div className={styles['gallery-title']}>Discover our space</div>
                <GalleryImage
                  src='/images/gallery/STR- Landing-1.webp'
                  alt='Saint Rose Landing'
                  aspectRatio='0.8'
                />
                <GalleryImage
                  src='/images/gallery/STR- Taylor- 2.webp'
                  alt='Saint Rose Taylor'
                  aspectRatio='0.8'
                />
                <GalleryImage
                  src='/images/gallery/STR- Entry-2.webp'
                  alt='Saint Rose Entry'
                  aspectRatio='0.667'
                />
                <GalleryImage
                  src='/images/gallery/STR- Entry-1.webp'
                  alt='Saint Rose Entry'
                  aspectRatio='0.8'
                />
                <GalleryImage
                  src='/images/gallery/STR- Plum Room-Detail-2.webp'
                  alt='Saint Rose Plum Room Detail'
                  aspectRatio='0.667'
                />
              </div>
              <div className={styles['column']}>
                <GalleryImage
                  src='/images/gallery/STR- Ramiro-1.webp'
                  alt='Saint Rose Ramiro'
                  aspectRatio='0.667'
                />
                <GalleryImage
                  src='/images/gallery/STR- Retail-1.webp'
                  alt='Saint Rose Retail'
                  aspectRatio='0.667'
                />
                <GalleryImage
                  src='/images/gallery/STR- Ramiro-2.webp'
                  alt='Saint Rose Ramiro'
                  aspectRatio='0.667'
                />
                <GalleryImage
                  src='/images/gallery/STR- Retail-2.webp'
                  alt='Saint Rose Retail'
                  aspectRatio='0.667'
                />
              </div>
              <div className={styles['column']}>
                <div className={styles['gallery-top-spacing']}></div>
                <GalleryImage
                  src='/images/gallery/STR- Waiting Area.webp'
                  alt='Saint Rose Waiting Area'
                  aspectRatio='0.667'
                />
                <GalleryImage
                  src='/images/gallery/STR- Plum Room-Detail-1.webp'
                  alt='Saint Rose Plum Room Detail'
                  aspectRatio='0.8'
                />
                <GalleryImage
                  src='/images/gallery/STR- Taylor-3.webp'
                  alt='Saint Rose Taylor'
                  aspectRatio='0.667'
                />
                <GalleryImage
                  src='/images/gallery/STR- Taylor-1.webp'
                  alt='Saint Rose Taylor'
                  aspectRatio='0.8'
                />
              </div>
            </div>
          </div>
        </SlideAndFade>
      </div>
    </div>
  )
}
