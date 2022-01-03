import React from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from "react-helmet"
import ReactMarkdown from 'react-markdown'
import { dangerouslySetInnerHTML } from 'dangerously-set-html-content'
import { useQuery, gql } from '@apollo/client'
import HeroSection from '../components/HeroSection'
import * as vars from '../variables'

const ABOUT = gql`
	query GetAboutpage {
		aboutpage {
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
					},
					section {
						headline,
						text,
						button,
						link
					},
					steps 					
				}
			}
		}
	}
`

export default function AboutPage() {

	const { id } = useParams()
	const { loading, error, data } = useQuery(ABOUT, {
		variables: {
			id: id 
		} 
	})

	if (loading) return <p>Loading ...</p>
	if (error) return <p>Error :( </p>

		//console.log(data)

	let metaSection 	= data.aboutpage.data.attributes.meta,
		heroSection		= data.aboutpage.data.attributes.hero,
		contentSection 	= data.aboutpage.data.attributes.section,
		stepsSection	= data.aboutpage.data.attributes.steps,
		schemaLink		= "http://schema.org/"

	const keywordList = metaSection.keywords.map((keyword) => keyword)

	function BreadcrumbList() {
		return (
			<>
	            <ul className="d-none" itemScope itemType="http://schema.org/BreadcrumbList">
	            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
	            	<a itemProp="item" href={vars.FrontendUrl}><span itemProp="name">Colibri Studios</span></a>
	            	<meta itemProp="position" content="1" /></li>            			
				<li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
					<a itemProp="item" href={`${vars.FrontendUrl}/noi/`}><span itemProp="name">{metaSection.title}</span></a>
					<meta itemProp="position" content="2" /></li>
			    </ul>
			</>
		)
	}	

	function GetContentSections() {

		return (
			<>
				{contentSection.map(({ headline, text, button, link }, key) => (

					<section  
						key={key}
						className="container-fluid page-section py-5"
						itemScope itemProp="hasPart"                    
						itemType="http://schema.org/WebPageElement"> 
						<div className="row px-3 px-md-5">
							<div className="col-12 col-lg-6 px-md-5">
						        <h2 itemProp="headline">{headline}</h2>
						        <blockquote itemProp="description" className="py-4">
							        <ReactMarkdown>{text}</ReactMarkdown>
						        </blockquote>
						        <p itemProp="usageInfo" itemScope="itemscope" itemType="http://schema.org/WebContent">
						            <a 
						            	itemProp="url" 
						            	className="btn" 
						            	rel="tag" 
						            	href={link} 
						            	role="button"
						            >
						            	{button}
						            </a>
						        </p>
					        </div>
					        <div className="col-12 col-lg-6 px-5"></div> 
			       	    </div>  
					</section >
				))}
			</>
		)
	}

	function GetSteps() {
		return (
			<>
				<section className="container-fluid lower-section py-5" id="structure">
	        		<div className="row">
		                {stepsSection.map(({ identifier, quote }, key) => (
		                	<>
					            <dl 
					            	key={key}
					            	className="col-12 col-sm-6 col-lg-2 my-4 my-lg-0" 
					            	id={identifier}
					            >
					                <dt className="d-flex justify-content-center">{identifier}</dt>
					                <dd>{quote}</dd>
					            </dl>
					            <i className="ei ei-arrow_right d-none d-lg-flex flex-column pb-5 justify-content-center"></i>
					         </>                    	
		                    )
		                )} 
		            </div>
		        </section>
			</>
		)
	}

	return (
		<>        
			<main 	
				className="row" 
            	id="about" data-series-position={id}
            	itemProp="hasPart" itemScope itemType="http://schema.org/WebContent"
          	>
				<Helmet>
					<html lang="ro" itemScope="itemscope" itemType={schemaLink + metaSection.schematype} />
		            <title>{metaSection.title}</title>
		            <meta property="og:description" name="description" content={metaSection.description} />
		            <meta property="og:url" 						   content={`${vars.FrontendUrl}/noi/`} />
		            <meta name="keywords" content={keywordList} />
		            <link rel="stylesheet" href="./../style/aboutpage.css" />
				</Helmet>
				<template>
					<time dateTime={data.aboutpage.data.attributes.publishedAt} itemProp="datePublished">{data.aboutpage.data.attributes.publishedAt}</time>
					<time dateTime={data.aboutpage.data.attributes.updatedAt}   itemProp="dateModified"> {data.aboutpage.data.attributes.updatedAt}  </time>
					<meta itemProp="inLanguage" content="RO" />
				</template>	
				<BreadcrumbList />			

			    <HeroSection 
			    	headline = {heroSection.headline}
			    	quote 	 = {heroSection.quote}
			    />	

	            <GetContentSections />
	            <GetSteps />

			</main>
		</>
	)
}