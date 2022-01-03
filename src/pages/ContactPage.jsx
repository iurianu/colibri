import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from "react-helmet"
import ReactMarkdown from 'react-markdown'
import { dangerouslySetInnerHTML } from 'dangerously-set-html-content'
import { useQuery, gql } from '@apollo/client'
import HeroSection from '../components/HeroSection'
import * as vars from '../variables'

const CONTACTPAGE = gql`
	query GetContactPage {
		contactpage {
			data {
				id,
				attributes {
					publishedAt,
					updatedAt,					
					meta {
						title,
						description,
						keywords,
						schematype
					},
					hero {
						headline,
						quote
					} 
					contactinfo {
						headline,
						description,
						adresa,
						codpostal,
						linkmaps,
						phonedisplay,
						phonelink,
						email
					},
					contactform {
						headline,
						placeholdernume,
						eroarenume,
						placeholdertel,
						eroaretel,
						placeholderemail,
						eroareemail,
						placeholdermesaj,
						eroareagreement,
						agreement,
						eroareagreement,
						buttondefault,
						buttonactive
					}					
				}
			}
		}
	}
`

export default function Contact() {

	const [status, setStatus] = useState("Ne auzim!");

	const handleSubmit = async (e) => {
	    
	    e.preventDefault();        
	    setStatus("Se trimite...")
	    
	    const emailServer = vars.EmailServer
	    const { name, phone, email, message } = e.target.elements
	    let details = {
	        name: name.value,
	        phone: phone.value,
	        email: email.value,
	        message: message.value,
	    }
	    let response = await fetch(emailServer, {
	        method: "POST",
	        headers: {
	            "Content-Type": "application/json;charset=utf-8",
	        },
	        body: JSON.stringify(details),
	    })
	    setStatus("Ne auzim!")
	    
	    let result = await response.json()
	    window.location.href = "./thankyou"
	}	

	const { id } = useParams()
	const { loading, error, data } = useQuery(CONTACTPAGE, {
		variables: {
			id: id 
		} 
	})

	if (loading) return <p>Loading ...</p>
	if (error) return <p>Error :( </p>

		//console.log(data)

	let pageInfoSection = data.contactpage.data.attributes,
			metaSection 	= data.contactpage.data.attributes.meta,
			heroSection		= data.contactpage.data.attributes.hero,
			infoSection 	= data.contactpage.data.attributes.contactinfo,
			formSection		= data.contactpage.data.attributes.contactform,
			schemaLink		= "http://schema.org/"

	const keywordList = metaSection.keywords.map((keyword) => keyword)

	const defaultState = formSection.butondefault,
		    activeState = formSection.buttonactive

	function BreadcrumbList() {
		return (
			<>
        <ul className="d-none" itemScope itemType="http://schema.org/BreadcrumbList">
	        <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
	        	<a itemProp="item" href={vars.FrontendUrl}><span itemProp="name">Colibri Studios</span></a>
	        	<meta itemProp="position" content="1" /></li>            			
					<li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
						<a itemProp="item" href={`${vars.FrontendUrl}/contact/`}><span itemProp="name">{metaSection.title}</span></a>
						<meta itemProp="position" content="2" /></li>
		    </ul>
			</>
		)
	}		    
   
  return (
  	    <main className="row" id="contact">
        <Helmet>
						<html lang="ro" itemScope="itemscope" itemType={schemaLink + metaSection.schematype} />
            <title>{metaSection.title}</title>
            <meta property="og:description" name="description" content={metaSection.description} />
            <meta property="og:url" 						   						 content={`${vars.FrontendUrl}/contact/`} />
            <meta name="keywords" content={keywordList} />
            <link rel="stylesheet" href="./../style/contact.css" />
        </Helmet> 

		<template>
			<time dateTime={pageInfoSection.publishedAt} itemProp="datePublished">{pageInfoSection.publishedAt}</time>
			<time dateTime={pageInfoSection.updatedAt}   itemProp="dateModified"> {pageInfoSection.updatedAt}  </time>
			<meta itemProp="inLanguage" content="RO" />
		</template>	 

		<BreadcrumbList />          

	    <HeroSection 
	    	headline = {heroSection.headline}
	    	quote 	 = {heroSection.quote}
	    />	               
          
	    <section 
	        className="container-fluid page-section py-5" 
	        id="second"
	        itemProp="potentialAction"
	        itemScope
	        itemType="http://schema.org/CommunicateAction">
	        <meta itemProp="target" content={`${vars.FrontendUrl}/contact/`} />
	        <div className="row px-3 px-md-5">  	    
		        <div className="col-12 col-lg-6 px-3 px-lg-5">
		            <h2 className="" itemProp="description">{infoSection.headline}</h2>
		            <div className="py-4" itemProp="disambiguatingDescription">
			            	<ReactMarkdown>
			            		{infoSection.description}
			            	</ReactMarkdown>
	            	</div>
		            <ul className="p-0" 
		                itemProp="location" 
		                itemScope 
		                itemType="https://schema.org/PostalAddress">
		                <li itemProp="name">
		                    <address className="m-0">
		                        <a  itemProp="url" 
		                            href={infoSection.linkmaps} 
		                            rel="tag nofollow noopener noreferrer" 
		                            target="_blank"
		                            >
		                            <span itemProp="addressCountry">România</span> -&nbsp;
		                            <span itemProp="addressLocality">Iași</span>,&nbsp;
		                            <span itemProp="streetAddress">{infoSection.adresa}</span>
		                            <span itemProp="postalCode" className="d-none">{infoSection.codpostal}</span>
		                        </a>
		                    </address>
		                </li>
		                <li itemProp="telephone">
		                    <a 
		                    	href={`tel:${infoSection.phonelink}`}>
		                    	{infoSection.phonedisplay}
		                    </a>
		                </li>
		                <li itemProp="email">
		                    <a 
		                    	href={`mailto:${infoSection.email}`} 
		                    	rel="tag">
		                    	{infoSection.email}
		                    </a>
		                </li>
		            </ul>
		        </div> 	    
		        <div className="col-12 col-lg-6 px-3 py-2">
		            <h3 itemProp="name">{formSection.headline}</h3>
		            <form className="needs-validation" onSubmit={handleSubmit}>
		              <div className="form-row">
		                <div className="col-md-6 mb-3">
		                    <input 	id="name" placeholder={formSection.placeholdernume}
		                    		type="text" className="form-control" required="required" 
		                    	/>
		                    <div className="invalid-feedback">{formSection.eroarenume}</div>
		                    <div className="valid-feedback">Arată OK!</div>
		                </div>
		                <div className="col-md-6 mb-3">
		                    <input 	id="phone" placeholder={formSection.placeholdertel} 
		                    		type="tel" className="form-control" required="required"
		                    		/>
		                    <div className="invalid-feedback">{formSection.eroaretel}</div>
		                    <div className="valid-feedback">Arată OK!</div>
		                </div>
		              </div>

		              	<div className="form-row">               
		                  	<div className="col-12 mb-3">
		                      	<input 	id="email" placeholder={formSection.placeholderemail}  
		                      			type="email" className="form-control" required="required"/>
		                      	<div className="invalid-feedback">{formSection.eroareemail}</div>
		                      	<div className="valid-feedback">Arată OK!</div>
		                	</div>
		              	</div>

		              <div className="form-row">               
		                  <div className="col-12 mb-3">
		                    <textarea 	id="message" placeholder={formSection.placeholdermesaj} 
		                    			className="form-control" rows="4" required="required"
		                    		></textarea>
		                    <div className="invalid-feedback">{formSection.eroaremesaj}</div> 
		                    <div className="valid-feedback">Arată OK!</div>
		                  </div>
		              </div>

		              <div className="form-group">
		                <div className="form-check">
		                  <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required="required"/>
		                  <label className="form-check-label" htmlFor="invalidCheck">
		                      {formSection.agreement}
		                  </label>
		                  <div className="invalid-feedback">
		                      {formSection.eroareagreement}
		                  </div>
		                </div>
		              </div>
		              <button className="btn btn-primary" type="submit">{status}</button>
		            </form> 
		         </div>
	        </div>
	    </section> 

      </main>
    )
}