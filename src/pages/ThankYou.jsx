import React from "react"
import { useNavigate } from 'react-router-dom'
import { Helmet } from "react-helmet"

export default function ThankYou() {
    
    const navigate = useNavigate()
    
    const meta = {
        title: "Mulțumim :: Colibri Studios Iași",
        description: "Mesajul a fost trimis către Colibri Studios"
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
                <div className="col-12 text-center">
                    <h1 className="" itemProp="name">Mulțumim!</h1>
                    <p itemProp="description">Mesajul a fost trimis!</p>
                </div>
            </div>
        </section>
          
        <section className="container-fluid page-section py-5" id="content">
            <blockquote className="row px-3 px-md-5 flex-column justify-content-center">
                <p className="text-center" itemProp="text">
                    <a href="./" rel="target">
                        Mergi la prima pagină
                    </a>

                    <br />sau<br />

                    <a  data-location="previous"
                        data-href="previous"
                        style={{cursor: "pointer"}}
                        onClick={() => navigate(-1)} >
                        întoarce-te unde erai!
                    </a>
                </p>
            </blockquote>
        </section>          

      </main>
  );
}