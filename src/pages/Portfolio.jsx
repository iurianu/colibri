import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Helmet } from "react-helmet"
import HeroSection from '../components/HeroSection'
import { useQuery, gql } from '@apollo/client'

import * as vars from '../components/variables'

const PROJECTS = gql`
	query GetProjects {
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

const PAGESTR = gql`
	query GetPage {
		portfolio {
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
				}
			}
		}
	}
`

function StaticContent() {

	const { id } = useParams()
	const { loading, error, data } = useQuery(PAGESTR, {
		variables: {
			id: id 
		} 
	})

	if (loading) return <p>Loading ...</p>
	if (error) return <p>Error :( </p>

		//console.log(data)

	let metaSection 	= data.portfolio.data.attributes.meta,
		heroSection 	= data.portfolio.data.attributes.hero,
		schemaLink		= "http://schema.org/"

	const keywordList = metaSection.keywords.map((keyword) => keyword)

	return (
		<>        
				<Helmet>
					<html lang="ro" itemScope="itemscope" itemType={schemaLink + metaSection.schematype} />
		            <title>{metaSection.title}</title>
		            <meta property="og:description" name="description" content={metaSection.description} />
		            <meta name="keywords" content={keywordList} />
		            <link rel="stylesheet" href="./../style/portfolio.css" />
				</Helmet>
				<template>
					<time dateTime={data.portfolio.data.attributes.publishedAt} itemProp="datePublished">{data.portfolio.data.attributes.publishedAt}</time>
					<time dateTime={data.portfolio.data.attributes.updatedAt}   itemProp="dateModified"> {data.portfolio.data.attributes.updatedAt}  </time>
					<meta itemProp="inLanguage" content="RO" />
				</template>
			    <HeroSection 
			    	headline = {heroSection.headline}
			    	quote 	 = {heroSection.quote}
			    />				
		</>
	)
}

function Items() {
	const { loading, error, data }  = useQuery(PROJECTS)

	if (loading) return <p>Loading ...</p>
	if (error) return <p>Error :( </p>

		console.log(data)

	return (
		<section 
			className="container-fluid d-flex p-0 w-100"
			id="listing"
			itemProp="mainEntity"
			itemScope="itemscope"
			itemType="http://schema.org/CollectionPage"
		>
			{data.projects.data.map(proiect => (
				<article 
					key={proiect.id} 
					id={proiect.attributes.itemId}
					data-item-key={proiect.id}
					className="col-12 col-sm-6 p-0 project-card" 
					itemScope itemProp="exampleOfWork" itemType="http://schema.org/WebContent"					
				>
					<figure
						className="w-100 h-100"
						style={{
							backgroundImage: `url('${vars.BackendUrl + proiect.attributes.preview.data.attributes.url}')`
						}}
					>
		              	<figcaption className="justify-content-center align-items-center">
	                  		<Link 
	                  			to={`/proiect/${proiect.id}`}
	                  			itemProp="url" 
	                  			className="d-block" 
	                  			rel="tag"	                  		
		                  	>
		                    	<span itemProp="name">{proiect.attributes.name}</span>
		                  	</Link>
		              	</figcaption>
					</figure>
				</article>
			))}
		</section>
	)
}

export default function Portfolio() {
	return (
		<>
	        <main className="row flex-md-row" id="portfolio">

                <StaticContent />  
				<Items />

			</main>
		</>
	)
}
