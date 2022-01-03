import React from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from "react-helmet"
import ReactMarkdown from 'react-markdown'
import * as vars from '../variables'
import { dangerouslySetInnerHTML } from 'dangerously-set-html-content'
import { useQuery, gql } from '@apollo/client'

const PROJECT = gql`
	query getProject($id: ID!) {
		project(id: $id) {
			data {
				id,
				attributes {
					itemId,
					name,
					meta {
						title,
						description,
						keywords
					},
					preview {
						data {
							attributes {
								url
							}
						}
					},					
					identity {
						headline,
						banner {
							data {
								attributes {
									url
								}
							}
						},
						quote,
						subtitle,
						blockquote
					},
					services,
					section {
						media {
							data {
								attributes {
									url,
									formats
								}
							}
						},
						title,
						text							
					},
					CTA {
						headline,
						target,
						button
					}					
				}
			}
		}
	}
`

const PROJECTS = gql`
	query Projects {
		projects {
			data {
				id,
				attributes {
					itemId,
					name,
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

function GetSiblings(){
	const { id } = useParams()

	const { loading, error, data } = useQuery(PROJECTS, {
			variables: {
				id: id
			} 
		})	

	if (loading) return <p>Loading ...</p>
	if (error) return <p>Error :( </p>

	const projectArray = data.projects.data,
		  arrLength = projectArray.length,
		  idStrValue = String(id),
		  projectId = Number(id),
		  itemPosition = projectArray.findIndex(item => item.id === id),
		  lastItemId = projectArray.slice(-1)[0].id

		  console.log(lastItemId)

	const GetPreviousItem = () => {
		const { id } = useParams()

		let prevItemId
		let thisItemPosition = itemPosition - 1

		if (itemPosition == 0){
			prevItemId = lastItemId
		} else {
			prevItemId = projectArray[thisItemPosition].id
		}

		const { loading, error, data } = useQuery(PROJECT, {
			variables: {
				id: prevItemId
			} 
		})	
			
		if (loading) return <p>Loading ...</p>
		if (error) return <p>Error :( </p>

		const shortPath = data.project.data.attributes				

		return(
	        <>
	            <li className="col-6 pr-0 prev" style={{ backgroundImage: `url("${vars.BackendUrl + shortPath.preview.data.attributes.url}")` }}>
	                <a href={`/proiect/${prevItemId}`} rel="tag" title={shortPath.name}>
	                    <h4>Proiectul anterior</h4>
	                </a>
	            </li>
	        </>		
		)
	}

	function GetNextItem() {
		const { id } = useParams()

		let nextItemId

			if (projectId == lastItemId){
				nextItemId = projectArray[0].id
			} else {
				nextItemId = projectArray[itemPosition + 1].id
			}

			const { loading, error, data } = useQuery(PROJECT, {
				variables: {
					id: nextItemId
				} 
			})


		if (loading) return <p>Loading ...</p>
		if (error) return <p>Error :( </p>

		const shortPath = data.project.data.attributes

		return(
	        <>
	            <li className="col-6 pl-0 next" style={{ backgroundImage: `url("${vars.BackendUrl + shortPath.preview.data.attributes.url}")` }}>
	                <a href={`/proiect/${nextItemId}`} rel="tag" title={shortPath.name}>
	                    <h4>Urm&#259;torul proiect</h4>
	                </a>
	            </li>
	        </>			
		)
	}	

	return (
		<>
			<section className="col-12 pt-5 px-0 siblings">
                <ul className="row p-0 mb-0">
                	<GetPreviousItem />
                	<GetNextItem />
                 </ul>
            </section>
        </>
	)
}	


const ProjectSingle = () => {

	const { id } = useParams()
	const { loading, error, data } = useQuery(PROJECT, {
		variables: {
			id: id
		} 
	})	

	if (loading) return <p>Loading ...</p>
	if (error) return <p>Error :( </p>

	let metaSection 	= data.project.data.attributes.meta,
		identitySection = data.project.data.attributes.identity,
		servicesSection = data.project.data.attributes.services,
		contentSection 	= data.project.data.attributes.section,
		ctaSection		= data.project.data.attributes.CTA,
		pageAttributes	= data.project.data.attributes,
		slug 			= data.project.data.attributes.itemId

	let stateObj = {id}

	window.history.pushState(stateObj, id, slug)

	const keywordList = metaSection.keywords.map((keyword) => keyword)

	function SetMediaType({ media, title }) {

		const video = ["mp4", "3gp" ],
			  url = new URL(media),
		      extension = url.pathname.split(".")[1]	      

		if (video.includes(extension)) {
			return (
		        <video 
		            itemProp="associatedMedia" itemScope 
		            itemType="http://schema.org/MediaObject" 
		            autoPlay muted loop
		            className="col-12 col-md-6 p-0 d-none"
		        >
		            <source itemProp="url" type="video/mp4" src={media} />
		            <meta itemProp="caption" content={title} />
	    		</video>
			)
		} else {
			return (
	        	<picture 
	        		className="col-12 col-md-6 p-0"	
	        		itemProp="image" itemScope 
	        		itemType="http://schema.org/ImageObject" 
	        	>

		        	<img itemProp="image" src={media} alt={title} title={title} />
		        	<meta itemProp="description" content={title} />
		        </picture>			
			)
		}
	}

	function BreadcrumbList() {
		return (
			<>
	            <ul className="d-none" itemScope itemType="http://schema.org/BreadcrumbList">
		            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
		            	<a itemProp="item" href={vars.FrontendUrl}><span itemProp="name">Colibri Studios</span></a>
		            	<meta itemprop="position" content="1" /></li>
	        		<li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
	        			<a itemProp="item" href={`${vars.FrontendUrl}/portofoliu/`}><span itemProp="name">Portofoliu</span></a>
	        			<meta itemprop="position" content="2" /></li>	            			
					<li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
						<a itemProp="item" href={`${vars.FrontendUrl}/proiect/${id}`}><span itemProp="name">{pageAttributes.name}</span></a>
						<meta itemprop="position" content="3" /></li>
			    </ul>
			</>
		)
	}	

	function GetContentSections() {

		return (
			<>
				{contentSection.map(({ text, title, media }, key) => (

					<article 
						key={key}
						className="row flex-column flex-md-row justify-content-center item-section"
						itemScope itemProp="hasPart"                    
						itemType="http://schema.org/WebPageElement"> 
      			        <SetMediaType 
							media = {vars.BackendUrl + media.data.attributes.url}
							title = {title}
						/>

				        <blockquote className="col-12 col-md-6 px-5 align-self-center">
				            <h4 itemProp="headline" className="pb-3">{title}</h4>
				            <div itemProp="description">
					            <ReactMarkdown>{text}</ReactMarkdown>
				            </div>
				        </blockquote>		        
					</article>
				))}
			</>
		)
	}

	return (
		<>        
			<main 	
				className="row flex-md-row project" 
            	id={data.project.data.attributes.itemId} data-series-position={data.project.data.attributes.itemId}
            	itemProp="hasPart" itemScope itemType="http://schema.org/WebContent"
          	>
				<Helmet>
					<html lang="ro" itemScope itemType="http://schema.org/ItemPage" />
		            <title>{metaSection.title}</title>
		            <meta property="og:description" name="description" content={metaSection.description} />
		            <meta property="og:url" 						   content={`${vars.FrontendUrl}/proiect/${id}`} />
		            <meta name="keywords" content={keywordList} />
		            <link rel="stylesheet" href="./../style/singlepost.css" />
				</Helmet>

	            <section 
	                className="item-hero col-12 d-flex flex-column text-center justify-content-center" 
	                style={{backgroundImage: `url('${vars.BackendUrl + identitySection.banner.data.attributes.url}')`}}
	            >
	            	<meta itemProp="name" content={metaSection.title} />
	                <h1 itemProp="headline">{identitySection.headline}</h1>
	                <h3 itemProp="disambiguatingDescription" dangerouslySetInnerHTML={{__html: identitySection.quote}} />
	            </section>

	            <article className="item-section col-12 pt-5">
	                <section className="row pt-5">
	                    <div className="offset-md-1 col-12 col-md-8 pb-3 mb-5">
	                        <h3 itemProp="headline">{identitySection.subtitle}</h3>
	                        <blockquote itemProp="description" className="mt-3 mb-5"  dangerouslySetInnerHTML={{__html: identitySection.blockquote}} />
	                        <h5 itemProp="headline" className="text-uppercase pt-3 pb-2">Servicii oferite:</h5>
	                        <ul itemProp="offers" itemScope itemType="http://schema.org/AggregateOffer">
		                        {servicesSection.map((service, key) => {
		                            return (
		                                    <li key={key} itemProp="itemOffered" itemScope itemType="http://schema.org/Service">
		                                    	<span itemProp="name">{service}</span>
		                                    </li>
		                            )
		                        })}   
	                        </ul>
	                    </div>	                    

                      	<div className="container-fluid" id="content-area">
	                        
	                        	<BreadcrumbList />
	                        	<GetContentSections />	
                        
	                        <div 
	                        	itemProp="potentialAction" itemScope itemType="http://schema.org/AssessAction"
	                        	className="row flex-column justify-content-between align-items-center py-5" 
	                        	id="referral">
	                            <h4 className="pt-5" itemProp="name">{ctaSection.headline}</h4>
	                            <a 
	                            	className="btn referral-button p-3 my-5 d-block" 
		                            rel="nofollow noopener noreferrer" 
		                            itemProp="target"
		                            href={ctaSection.target} 
	                            >
	                            	{ctaSection.button}
	                            </a>
	                        </div>

	                        <GetSiblings />

	                    </div>
	                </section>
	            </article>
			</main>
		</>
	)
}

export default ProjectSingle