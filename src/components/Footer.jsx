import React from "react";
import * as vars from './variables'

export default function Footer() {
  return (
    <footer className="row bg-dark align-items-center pt-5 pb-md-3">
        <div className="container d-flex p-sm-0 flex-column flex-md-row">
              <div className="col-12 col-md-4" id="footer-column-left">
                  <figure>
                      <img className="" alt="Colibri" itemProp="image" src={`${vars.FrontendUrl}/images/colibri-logo-footer.svg`} />
                  </figure>
                  <p className="">Crafted in gray matter with love and a smudge of creativity<span className="point">.</span></p>
                  <address className="pt-4">
                      <p><a rel="nofollow noopener noreferrer" target="_blank" href="https://goo.gl/maps/8SGiRLCHC7Yt17BL6">Iaşi, România</a></p>
                      <p><a href="mailto:office@colibridesign.ro">office@colibridesign.ro</a></p>
                      <p><a href="tel:0040749322076">0749 322 076</a></p>
                  </address>                  
              </div>
              <div className="col-12 col-md-4" id="footer-column-middle">
                  <p>We are a performance marketing agency that helps companies launch, grow, and scale<span className="point">.</span></p>
                  <ul className="services-list pl-0 pt-4" itemScope itemType="http://schema.org/SiteNavigationElement">
                      <li itemProp="name">
                          <a itemProp="url" rel="tag" title="Servicii" href="/services/branding">Branding</a>
                      </li>
                      <li itemProp="name">                          
                          <a itemProp="url" rel="tag" title="Servicii" href="/services/digital">Digital</a>
                      </li>
                      <li itemProp="name">
                          <a itemProp="url" rel="tag" title="Servicii" href="/services/marketing">Marketing</a>
                      </li>
                      <li itemProp="name">                          
                          <a itemProp="url" rel="tag" title="Servicii" href="/services/randari-vizualizari-3d">Design și Vizualizări 3D</a>
                      </li>                      
                      <li itemProp="name">                          
                          <a itemProp="url" rel="tag" title="Servicii" href="/services/consultanta">Consultanță</a>
                      </li>
                      <li itemProp="name">                          
                          <a itemProp="url" rel="tag" title="Servicii" href="/services/proiectare-design">Proiectare și arhitectură</a>
                      </li>
                  </ul>
              </div>
              <div className="col-12 col-md-4" id="footer-column-right">
                  <figure>                                    
                      <img alt="Harta Romania" src={`${vars.FrontendUrl}/images/harta-romania-unde-activam-colibri-design.svg`} />
                  </figure>
                  <ul className="social-list px-5 pt-2 d-flex flex-row justify-content-around">
                      <li><a className="social-link" href="https://www.youtube.com/" target="_blank" rel="nofollow noopener noreferrer" title="Youtube"><i className="fab fa-youtube"></i></a></li>
                      <li><a className="social-link" href="https://www.instagram.com/colibriconsulting/" target="_blank" rel="nofollow noopener noreferrer" title="Instagram"><i className="fab fa-instagram"></i></a></li>
                      <li><a className="social-link" href="https://www.facebook.com/ColibriConsult/" target="_blank" rel="nofollow noopener noreferrer" title="Facebook"><i className="fab fa-facebook-f"></i></a></li>
                  </ul>                  
              </div>
          </div>

          <section className="container-fluid" id="footer-band">
              <div className="row">
                  <nav className="container">
                      <ul className="row flex-column flex-md-row justify-content-between px-3 mb-0" itemScope itemType="http://schema.org/SiteNavigationElement">
                          <li itemProp="name">
                              <a itemProp="url" 
                                  href="" 
                                  rel="tag" 
                                  title="Termeni și condiții">
                                  Termeni și condiții
                              </a>
                          </li>
                          <li itemProp="name">
                              <a itemProp="url" 
                                  href="" 
                                  rel="tag" 
                                  title="Politică de confidențialitate">
                                  Politică de confidențialitate
                              </a>
                          </li>
                          <li itemProp="name">
                              <a itemProp="url" 
                                  href={`${vars.FrontendUrl}/sitemap`} 
                                  rel="tag" 
                                  title="Politică de confidențialitate">
                                  Hartă site
                              </a>
                          </li>                          
                          <li itemProp="name">
                              <a itemProp="url" 
                                  href="https://anpc.ro/" 
                                  rel="tag" 
                                  title="Agenția națională pentru protecția consumatorului">
                                  ANPC
                              </a>
                          </li>
                      </ul>
                  </nav>
              </div>
          </section>
    </footer>
  );
}