import React from "react"

export const BackendUrl = process.env.REACT_APP_STRAPI_URL || 'http://localhost:1337'
export const FrontendUrl = process.env.REACT_APP_CLIENT_URL || 'http://localhost:3000'
export const EmailServer = process.env.REACT_APP_EMAIL_SERVER_URL || 'http://localhost:5000/contact'