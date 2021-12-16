import React from 'react'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { Helmet } from "react-helmet"
import * as vars from '../components/variables'
import { useQuery, gql } from '@apollo/client'


const SERVICE = gql`
	query getService($id: ID!) {
		service(id: $id) {
			data {
				id,
				attributes {
					itemId,
					name,
					button,
					quote,
					headline,
					blockquote,
					preview {
						data {
							attributes {
								url
							}
						}
					},
					meta {
						title,
						description,
						keywords
					},
					section {
						media {
							data {
								attributes {
									url
									formats
								}
							}
						},
						title,
						text							
					}					
				}
			}
		}
	}
`

function ServiceSingle() {

	const { id } = useParams()
	const { loading, error, data } = useQuery(SERVICE, {
		variables: {
			id: id 
		} 
	})

	if (loading) return <p>Loading ...</p>
	if (error) return <p>Error :( </p>

	let pageAttributes	= data.service.data.attributes,
		metaSection 	= data.service.data.attributes.meta,
		contentSection 	= data.service.data.attributes.section,		
		slug 			= data.service.data.attributes.itemId

	let stateObj = {id}

	window.history.pushState(stateObj, id, slug)

	const keywordList = metaSection.keywords.map((keyword) => keyword)

	function SetMediaType({ title, media  }) {

		const video = ["mp4", "3gp" ],
			  url = new URL(media),
		      extension = url.pathname.split(".")[1]

		if (video.includes(extension)) {
			return (
		        <video 
		            itemProp="video" itemScope="itemscope" 
		            itemType="http://schema.org/VideoObject" 
		            autoPlay muted loop
		            className="col-12 col-md-6 p-0"
		        >
		            <source itemProp="embedUrl" type="video/mp4" src={media} />
		            <meta itemProp="caption" content={title} />
	    		</video>
			)
		} else {
			return (
	        	<picture 
	        		className="col-12 col-md-6 p-0"	
	        		itemProp="image" itemScope="itemscope" 
	        		itemType="http://schema.org/ImageObject" 
	        	>
		        	<img itemProp="image embedUrl" src={media} alt={title} />
		        </picture>			
			)
		}
	}	

	function GetContentSections() {

		return (
			<>
				{contentSection.map(({ text, title, media }, key) => (
					<>
						<article 
							key={key}
							className="row item"
							itemScope itemProp="exampleOfWork"                    
							itemType="http://schema.org/WebPageElement"> 

							<SetMediaType 								
								title = {title}
								media = {vars.BackendUrl + media.data.attributes.url}
							/>

					        <blockquote className="col-12 col-md-6 px-5 align-self-center">
					            <h4 itemProp="headline" className="pb-3">{title}</h4>
					            <ReactMarkdown itemProp="description">
					            	{text}
					            </ReactMarkdown>
					        </blockquote>
		        
						</article>
					</>
				))}
			</>
		)
	}

	return (
		<>        
			<main 	
				className="row flex-md-row project" 
            	id={pageAttributes.itemId} data-series-position={id}
            	itemProp="hasPart" itemScope itemType="http://schema.org/WebContent"
          	>
				<Helmet>
					<html lang="ro" itemScope itemType="http://schema.org/ItemPage" />
		            <title>{metaSection.title}</title>
		            <meta property="og:description" name="description" content={metaSection.description} />
		            <meta name="keywords" content={keywordList} />
		            <link rel="stylesheet" href="./../style/singleservice.css" />
				</Helmet>
		        <section className="service-section container d-flex flex-column justify-content-center justify-content-lg-start pt-lg-5">
		            <header className="row pt-5 pb-md-3 justify-content-center">
		                <h1 itemProp="name" className="py-5 py-md-0">{pageAttributes.headline}</h1>
		            </header>
		            <blockquote className="row p-2">
		                <p itemProp="description">
		                	{pageAttributes.blockquote}
		                </p>
		            </blockquote>
		        </section> 
		        <section className="service-section items container pb-5 pt-md-5"> 
	                        
	                <GetContentSections /> 	

	            </section>
			</main>
		</>
	)
}

export default ServiceSingle