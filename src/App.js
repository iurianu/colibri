import { useState, useEffect } from 'react'
import { Navigate, BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"

import SiteHeader from './components/SiteHeader'
import Footer from './components/Footer'
import Homepage from './pages/HomePage'
import Aboutpage from './pages/AboutPage'
import Portfolio from './pages/Portfolio'
import Services from './pages/Services'
import Contact from './pages/ContactPage'
import ThankYou from './pages/ThankYou'
import NotFound from './pages/NotFound'
import ProjectSingle from './pages/ProjectSingle'
import ServiceSingle from './pages/ServiceSingle'

const client = new ApolloClient({
  uri: "http://localhost:1337/graphql",
  cache: new InMemoryCache()
})

export default function App(){

  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <SiteHeader />
        <Routes>
          <Route exact path="/"           element={<Homepage />}      />
          <Route path="/noi"              element={<Aboutpage />}     />
          <Route path="/portofoliu"       element={<Portfolio />}     />
          <Route path="/servicii"         element={<Services />}      />
          <Route path="/contact"          element={<Contact />}       />
          <Route path="/thankyou"         element={<ThankYou />}      />
          <Route path="/proiect/:id"      element={<ProjectSingle />} />
          <Route path="/servicii/:id"     element={<ServiceSingle />} />
          <Route path="*"                 element={<NotFound />}      />
        </Routes>
        <Footer />
      </ApolloProvider>
    </BrowserRouter>
  );
}