import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer/Footer'
import './assets/css/app.scss'
import Script from 'next/script'
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <Header />
        {children}
        <Footer />
        {/* Instagram Widget */}
        <Script src='https://cdn.lightwidget.com/widgets/lightwidget.js' />
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
