import React from "react";
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";

export default function NotFound() {
    
    const navigate = useNavigate();
    
    const meta = {
        title: "Pagina nu există :: Colibri Studios Iași",
        description: "Locație inexistentă pe site-ul Colibri Studios"
    }
    
  return (
    <main className="row" id="thankyou">
        <Helmet>
            <html lang="ro" />
            <title>{meta.title}</title>
            <meta property="og:description" name="description" content={meta.description} /> 
            <link rel="stylesheet" href="./../style/components.css" />
        </Helmet>    
          
        <section className="container-fluid page-section py-5" id="hero">
            <div className="row px-3 px-md-5">
                <div className="col-12 col-lg-8 px-md-5">
                    <h1 className="" itemProp="name">Pagina nu există</h1>
                </div>
                <div className="col-12 col-lg-4"></div>
            </div>
        </section>
          
        <section className="container-fluid page-section py-5" id="content">
            <blockquote className="row px-3 px-md-5 flex-column justify-content-center">
                <p className="text-center" itemProp="text">
                    <a href="./" rel="target">
                        Mergi la prima pagină
                    </a>

                    <br />sau<br />

                    <a  href="#"
                        data-href="previous"
                        onClick={() => navigate.goBack()} >
                        întoarce-te unde erai!
                    </a>
                </p>
            </blockquote>
        </section>

      </main>
  );
}