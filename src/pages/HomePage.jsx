import React from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from "react-helmet"
import ReactMarkdown from 'react-markdown'
import { dangerouslySetInnerHTML } from 'dangerously-set-html-content'
import { useQuery, gql } from '@apollo/client'
import * as vars from '../components/variables'

const HOME = gql`
	query GetHomepage {
		homepage {
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
					section {
						headline,
						text,
						button,
						link,
						image { 
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

export default function HomePage() {

	const { id } = useParams()
	const { loading, error, data } = useQuery(HOME, {
		variables: {
			id: id 
		} 
	})

	if (loading) return <p>Loading ...</p>
	if (error) return <p>Error :( </p>

		//console.log(data)

	let metaSection 	= data.homepage.data.attributes.meta,
		contentSection 	= data.homepage.data.attributes.section,
		schemaLink		= "http://schema.org/"

	const keywordList = metaSection.keywords.map((keyword) => keyword)

	function GetContentSections() {

		return (
			<>
				{contentSection.map(({ headline, text, button, link, image }, key) => (

					<section  
						key={key}
						className="page-section container-fluid pt-5 px-md-5 mk_scroller_block"
						itemScope itemProp="hasPart"                    
						itemType="http://schema.org/WebPageElement"> 
						<div className="row px-3">
							<div className="col-12 col-lg-6 px-2 px-lg-5 d-flex flex-column justify-content-center">
					            <h2 itemProp="headline">{headline}</h2>
					            <p itemProp="text" className="py-4">
					            	<ReactMarkdown>{text}</ReactMarkdown>
					            </p>
					            <a 
					            	itemProp="url" 
					            	className="btn" 
					            	rel="tag" 
					            	href={link} 
					            	role="button"
					            >
					            	{button}
					            </a>
					        </div>	
				        	<figure 
				        		className="col-12 col-lg-6 py-5 px-2 d-flex d-md-block justify-content-center"	
				        		itemProp="image" itemScope="itemscope" 
				        		itemType="http://schema.org/ImageObject" 
				        	>
					        	<img 
					        		itemProp="image"
					        		className="img-fluid rounded mb-4 mb-lg-0"
					        		src={vars.BackendUrl + image.data.attributes.url} 
					        		alt={headline} 
					        	/>
					        </figure>
			       	    </div>  
					</section >
				))}
			</>
		)
	}

	return (
		<>        
			<main 	
				className="row" 
            	id="homepage-atf" data-series-position={id}
            	itemProp="hasPart" itemScope itemType="http://schema.org/WebContent"
          	>
				<Helmet>
					<html lang="ro" itemScope="itemscope" itemType={schemaLink + metaSection.schematype} />
		            <title>{metaSection.title}</title>
		            <meta property="og:description" name="description" content={metaSection.description} />
		            <meta name="keywords" content={keywordList} />
		            <link rel="stylesheet" href="./../style/homepage.css" />
				</Helmet>
				<template>
					<time dateTime={data.homepage.data.attributes.publishedAt} itemProp="datePublished">{data.homepage.data.attributes.publishedAt}</time>
					<time dateTime={data.homepage.data.attributes.updatedAt}   itemProp="dateModified"> {data.homepage.data.attributes.updatedAt}  </time>
					<meta itemProp="inLanguage" content="RO" />
				</template>

	            <GetContentSections />

			</main>
		</>
	)
}