import React from 'react'
import Header from '../components/Header'
// import Footer from '../components/Footer'
// import PageTransition from '../components/PageTransition'
import '../assets/css/app.scss'
import Script from 'next/script'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <Header />
        {children}
        {/* <Footer /> */}
        <Script
          src='https://cdn.lightwidget.com/widgets/lightwidget.js'
          strategy='beforeInteractive'
        />
      </body>
    </html>
  )
}
