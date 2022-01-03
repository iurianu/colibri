import * as vars from './variables'
import { NavLink } from "react-router-dom"

const pages = [
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

export default function SiteHeader() {
  return (
    <header className="row navigation">
      <nav className="navbar navbar-expand container-fluid justify-content-between px-md-5 py-0">
          <NavLink className="navbar-brand col-4 col-lg-6 py-0" to="/">
            <img className="" src={`${vars.FrontendUrl}/images/logo.svg`} alt="Logo" />
          </NavLink>
          <div className="col-8 col-lg-6 py-lg-0">
              <nav className="navbar navbar-expand-lg navbar-light d-flex justify-content-end place-content-end py-lg-0">

                    <button 
                    	className="navbar-toggler p-0" 
                    	type="button" 
                    	data-toggle="collapse" 
                    	data-target="#navbarSupportedContent" 
                    	aria-controls="navbarSupportedContent" 
                    	aria-expanded="false" 
                    	aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggle-line"></span>
                        <span className="navbar-toggle-line"></span>
                        <span className="navbar-toggle-line"></span>
                    </button>

                    <SiteMenu />

                </nav>              
          </div>
      </nav>
  </header>
  )
}

const SiteMenu = () => {
	return (
		<>
            <ul 
            	className="collapse navbar-collapse justify-content-between mb-0" 
            	id="navbarSupportedContent" 
            	itemScope="itemscope"
            	itemType="http://schema.org/SiteNavigationElement"
            >
	            {pages.map((page, key) => {
	            	return (
									<li key={key} itemProp="name" className="nav-item">
										<NavLink 
											itemProp="url"
											to={page.link}
											className={({ isActive }) => isActive? "nav-link active": 'nav-link'}
										>
											{page.title}
										</NavLink>
									</li>
		          	);
		        })}				
            </ul>		
		</>
	)
}

