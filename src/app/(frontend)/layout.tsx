import Header from '@/components/Header/Component'
import Footer from '@/components/Footer/Footer'
import './assets/css/app.css'
import Script from 'next/script'
import { GoogleAnalytics } from '@next/third-parties/google'
import localFont from 'next/font/local'

const apRegular = localFont({
  src: './assets/fonts/apercu-regular.woff',
  display: 'swap',
  variable: '--ap',
})

const opt = localFont({
  src: './assets/fonts/optima.woff',
  display: 'swap',
  variable: '--opt',
})

const apBold = localFont({
  src: './assets/fonts/apercu-bold.woff',
  display: 'swap',
  variable: '--ap-bold',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={`${apRegular.variable} ${opt.variable} ${apBold.variable}`}>
      <body className='bg-secondary font-sans'>
        <div className='grid min-h-dvh grid-rows-[auto_1fr_auto]'>
          <Header />
          {children}
          <Footer />
        </div>
      </body>
      {/* Instagram Widget */}
      <Script src='https://cdn.lightwidget.com/widgets/lightwidget.js' />
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
