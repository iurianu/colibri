import React from "react";
import { Link, useParams } from 'react-router-dom'
import { Helmet } from "react-helmet";
import HeroSection from '../components/HeroSection'
import { useQuery, gql } from '@apollo/client'
import * as vars from '../components/variables'

const SERVICES = gql`
    query GetServices {
        services {
            data {
                id,
                attributes {
                    itemId,
                    name,
                    button,
                    quote,
                    preview {
                        data {
                            attributes {
                                url
                            }
                        }
                    }
                }
            }
        }
    }
`

const SERVICESTR = gql`
    query GetServicesPage{
      servicepage {
          data {
            id,
            attributes {
              meta {
                title,
                description,
                keywords,
                schematype
              },
              hero {
                headline,
                quote
              },
              main {
                headline,
                blockquote,
                image {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              },
              headline,
              quote,
              CTA {
                headline,
                target,
                button
              }
              clients(pagination: {limit: 30}) {
                id,
                alt,
                logo {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
          }
        }
    }
`

function MainSection( { headline, blockquote, source } ){
    return (
        <section className="container-fluid page-section pb-2 pb-md-5 pt-5 px-5" id="service">
            <div className="row justify-content-center justify-content-md-start px-1 px-md-5"><h3>{headline}</h3></div>
            <div className="row flex-column-reverse flex-md-row px-1 px-md-4 pt-2 pt-md-5">
                <div className="col-12 col-md-6 px-md-4"><blockquote className="d-flex h-100">{blockquote}</blockquote></div>
                <div className="col-12 col-md-6 px-md-4">
                    <figure><a className="d-block text-center" data-href="" rel="tag" title="Fly Away!"><img src={source} alt={headline}/></a></figure>
                </div>
            </div>              
        </section>
    )
}

const Item = ({ title, desc, link, button }) => {
    
  if (!title) return <article />;
    
  return (
    <>
        <h4 itemProp="name" className="pt-5">{title}</h4>
        <p className="px-5 py-3 text-center" itemProp="description">{desc}</p>
        <Link 
            to={link}
            itemProp="url" role="button"
            className="btn" 
            rel="tag"                           
        >
            {button}
        </Link>
    </>
  );
};

function AllServices() {

    const { loading, error, data }  = useQuery(SERVICES)

    if (loading) return <p>Loading ...</p>
    if (error) return <p>Error :( </p>

  return (
      <>
        <section className="grid-container">
            {data.services.data.map(service => (
                <article key={service.id} 
                    id={service.attributes.itemId}
                    data-item-key={service.id}
                    className="grid-content"
                    itemScope itemProp="exampleOfWork"                    
                    itemType="http://schema.org/WebContent"
                >
                    <Item
                        title={service.attributes.name}
                        desc={service.attributes.quote}
                        button={service.attributes.button}
                        link={`/servicii/${service.id}`}
                    />
                </article>
            ))} 
        </section>
      </>
  );
}

function PageContent() {

    const { id } = useParams()
    const { loading, error, data } = useQuery(SERVICESTR, {
        variables: {
            id: id 
        } 
    })

    if (loading) return <p>Loading ...</p>
    if (error) return <p>Error :( </p>

    let pageInfoSection = data.servicepage.data.attributes,
        metaSection     = data.servicepage.data.attributes.meta,
        heroSection     = data.servicepage.data.attributes.hero,
        mainSection     = data.servicepage.data.attributes.main,
        ctaSection      = data.servicepage.data.attributes.CTA,
        clientsSection  = data.servicepage.data.attributes.clients,
        schemaLink      = "http://schema.org/"

    const keywordList = metaSection.keywords.map((keyword) => keyword)

    const ListClients = () => {
        return (
            <section className="container page-section pb-5" id="clients">
                <div className="row justify-content-center py-5 px-1 px-md-5">
                    <h2>Clienții noștri</h2>
                </div>
                    <div className="row px-1 px-md-4">

                        {clientsSection.map(client => (
                            <figure 
                                key={id} 
                                id={id}
                                data-item-key={client.alt}
                                className="col-12 col-md-6 col-lg-3 text-center">
                                <img    
                                    src={vars.BackendUrl + client.logo.data.attributes.url}
                                    alt={client.alt}
                                    title={client.alt} 
                                />
                            </figure>
                        ))}                          
                </div>
            </section>
        )      
    }

    function CtaSection() {
        return (
          <section class="container-fluid page-section d-flex flex-column text-center" id="cta-lp">
                <h2>{ctaSection.headline}</h2>
                <a 
                    className="btn" 
                    href={ctaSection.target} 
                    role="button"
                >
                    {ctaSection.button}
                </a>
          </section>
        );
    }

    return (
        <>        
            <Helmet>
                <html lang="ro" itemScope="itemscope" itemType={schemaLink + metaSection.schematype} />
                <title>{metaSection.title}</title>
                <meta property="og:description" name="description" content={metaSection.description} />
                <meta name="keywords" content={keywordList} />
                <link rel="stylesheet" href="./../style/servicespage.css" />
            </Helmet>
            <template>
                <time dateTime={pageInfoSection.publishedAt} itemProp="datePublished">{pageInfoSection.publishedAt}</time>
                <time dateTime={pageInfoSection.updatedAt}   itemProp="dateModified"> {pageInfoSection.updatedAt}  </time>
                <meta itemProp="inLanguage" content="RO" />
            </template>

            <HeroSection 
                headline = {heroSection.headline}
                quote    = {heroSection.quote}
            />  

            <MainSection 
                headline = {mainSection.headline}
                blockquote = {mainSection.blockquote}
                source = {vars.BackendUrl + mainSection.image.data.attributes.url}
            />  

            <section className="container-fluid page-section pt-5 px-0" id="something-else">
                <div className="grid-section">
                    <div className="grid-header d-flex flex-column align-self-center px-5 text-center">
                        <h2>{pageInfoSection.headline}</h2>
                        <p>{pageInfoSection.quote}</p>
                    </div>
                    <AllServices />
                </div>                     
            </section>
                
            <ListClients />
            <CtaSection />

        </>
    )
}


export default function Services() {
    
  return (
    <main className="row" id="services">  

        <PageContent />

    </main>
  );
}
