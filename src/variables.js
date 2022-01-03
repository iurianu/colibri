import React from 'react'
import { useQuery, gql } from '@apollo/client'

export const BackendUrl = process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337'
export const FrontendUrl = process.env.REACT_APP_CLIENT_URL || 'http://localhost:3000'
export const EmailServer = process.env.REACT_APP_EMAIL_SERVER_URL || 'http://localhost:5000/contact'

export const pages = [
	{
		title: "Noi",
		link: "/noi",
	},	
	{
		title: "Portofoliu",
		link: "/portofoliu",
	},
	{
		title: "Servicii",
		link: "/servicii",
	},
	{
		title: "Contact",
		link: "/contact",
	},
]

const SERVICES = gql`
    query ListServices {
        services {
            data {
                id,
                attributes {
                    name
                }
            }
        }
    }
`

const Item = ({ title, link }) => {
    
  if (!title) return <div />
    
  return (
    <>
        <a  href={link}
            itemProp="url" 
            title={title}
            className="" 
            rel="tag"                           
        >
            {title}
        </a>
    </>
  )
}

export const AllServices = () => {

    const { loading, error, data }  = useQuery(SERVICES)

    if (loading) return <p>Loading ...</p>
    if (error) return <p>Error :( </p>

  return (
      <>
	      <ul className="services-list pl-0 pt-4" itemScope itemType="http://schema.org/SiteNavigationElement">
	            {data.services.data.map(service => (
	                <li itemProp="name" 
	                	key={service.id} 
	                    data-item-key={service.attributes.name}
	                >
	                    <Item
	                        title={service.attributes.name}
	                        link={`/servicii/${service.id}`}
	                    />
	                </li>
	            ))} 
           </ul>
      </>
  )
}