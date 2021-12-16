import React from 'react'

export default function HeroSection( { headline, quote }) {
	return (
      <section className="container-fluid page-section py-5" id="hero">
        <div className="row px-3 px-md-5">
            <div className="col-12 col-lg-8 px-md-5">
                <h1>{headline}</h1>
                <blockquote><p>{quote}</p></blockquote>
            </div>
            <div className="col-12 col-lg-4 px-5"></div>                
        </div>
      </section>
	)
}
