import Header from '@/components/Header/Component'
import Footer from '@/components/Footer'
import './assets/css/app.css'
import Script from 'next/script'
import { GoogleAnalytics } from '@next/third-parties/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from "@vercel/analytics/next"
import localFont from 'next/font/local'
import SmoothScroll from '@/components/SmoothScroll'

const fautive = localFont({
  src: './assets/fonts/Fautive-Regular.woff2',
  variable: '--fautive',
})

const marist = localFont({
  src: [
    {
      path: './assets/fonts/ABCMarist-Book.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './assets/fonts/ABCMarist-BookItalic.woff2',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--marist',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={`${fautive.variable} ${marist.variable}`} data-scroll-behavior='smooth'>
      <body className='bg-saint text-black'>
        <SmoothScroll />
        <main className='grid min-h-dvh grid-rows-[auto_1fr_auto]'>
          <Header />
          {children}
          <Footer />
        </main>
        <SpeedInsights />
        <Analytics />
      </body>
      <GoogleAnalytics gaId='G-XD3JQQYHHV' />
      {/* Booking Widget */}
      <Script
        id='boulevard-script'
        dangerouslySetInnerHTML={{
          __html: `
            (function (a) {
              var b = {
                businessId: "c972d42a-4fe1-4abd-9a18-86bdaca41bf3",
              };

              var c = a.createElement("script");
              var d = a.querySelector("script");

              c.src = "https://static.joinboulevard.com/injector.min.js";
              c.async = true;
              c.onload = function () {
                blvd.init(b);
              };

              d.parentNode.insertBefore(c, d);
            })(document);
          `,
        }}
      />
    </html>
  )
}
