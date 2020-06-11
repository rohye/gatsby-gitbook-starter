import { Link } from "gatsby"
import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { trackGAEvents } from "./trackGA";
import fetch from "isomorphic-fetch"
import BannerStripe from './BannerStripe'
import "./header.css"

import Sidebar from "./sidebar";

const brandWhite = require("./images/white-logo.svg")
const brandBlue = require("./images/blue-logo.svg")
const discordBrandsBlock = require("./images/discord-brands-block.svg")
const twitterBrandsBlock = require("./images/twitter-brands-block.svg")
const githubHeader = require('./images/github-header.svg');
// const arrowForwardWhite = require("./images/arrow_forward-white.svg")

function myFunction() {
  var x = document.getElementById("navbar")
  if (x.className === "topnav") {
    x.className += " responsive"
  } else {
    x.className = "topnav"
  }
}

const Header = props => {
  const path = props.location.pathname
  const isBlueNav =
    path === "/" ||
    path === "/enterprise/" ||
    path === "/hasura-pro/" ||
    path === "/pricing/" ||
    path === "/user-stories/" ||
    path === "/react-graphql/" ||
    path === "/vue-graphql/" ||
    path === "/about/" ||
    path === "/realtime/" ||
    path === "/community/workshop-graphql-apis-faster-frontend-developers/" ||
    path === "/community/workshop-backend-3factor/" ||
    path === "/community/community-call/" ||
    path === "/partner-agencies/" ||
    path === "/learn/" ||
    path === "/learn" ||
    path === "/hasura-demo-webinar/" ||
    path === "/events/data-federation-hasura-graphql/"
      ? true
      : false
  const isCommunity = path === "/community/" ? true : false
  // const isHomeBannerStripe = path === "/" ? true : false
  let headerBGClassName
  let navBtnClassName
  let navBtnContact
  if (isBlueNav) {
    headerBGClassName = "blueBgColor"
    navBtnClassName = "navBtnHome"
    navBtnContact = "navBtnContactHome"
  } else {
    headerBGClassName = "transparentBgColor"
    navBtnClassName = "navBtn"
    navBtnContact = "navBtnContact"
  }
  const dbUrl = window.location.origin === 'https://hasura.io' ? 'https://data.hasura.io/v1/query' : 'https://data.hasura-stg.hasura-app.io/v1/query'
  const [githubCount, setGithubCount] = useState(null)
  const githubStarCount = () => {
    const bodyObj = {
      type: "select",
      args: {
        table: "github_repos",
        columns: ["star_count"],
        where: {
          $or: [
            {
              name: "graphql-engine",
            },
          ],
        },
      },
    }
    const options = {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(bodyObj),
      headers: {
        "Content-Type": "application/json",
      },
    }
    fetch(dbUrl, options)
      .then(response => {
        return response.json()
      })
      .then(data => {
        const githubStar = data[0].star_count
        setGithubCount(githubStar)
      })
      .catch(e => {
        console.error(e)
      })
  }
  useEffect(() => {
    githubStarCount()
  })
  return (
    <div>
      <BannerStripe/>
      <header
        id="header"
        className={
          headerBGClassName + (isCommunity ? " boxShadowCommunity" : "")
        }
      >
        <div className="container noPadd containerWidth">
          <div className="headerWrapper">
            <div className="navLeft">
              <div className="brand">
                <Link to="/">
                  <img src={isBlueNav ? brandWhite : brandBlue} alt="Logo" />
                </Link>
              </div>
              <a
                href="https://discordapp.com/invite/hasura"
                onClick={()=>trackGAEvents("Learn Course", "Social Click Header", "Discord")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="discordBtn">
                  <img src={discordBrandsBlock} alt={"Discord"} />
                </div>
              </a>
              <a
                href="https://twitter.com/hasurahq"
                onClick={()=>trackGAEvents("Learn Course", "Social Click Header", "Twitter")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="twitterBtn">
                  <img src={twitterBrandsBlock} alt={"Twitter"} />
                </div>
              </a>
              {
                (githubCount) ? (
                  <a
                    href="https://github.com/hasura/graphql-engine/"
                    onClick={()=>trackGAEvents("Learn Course", "Social Click Header", "Github")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className='gitHubBtn'
                  >
                    <div className='gitHubStars'>
                      <img src={githubHeader} alt='Github'/>
                      <span>Star</span>
                    </div>
                    <div className='gitHubCount'>
                      {githubCount}
                    </div>
                  </a>
                ) : null
              }
            </div>
            <div className={isBlueNav ? "navBlueBG" : "navWhiteBG"}>
              <ul className="navBarUL">
                <li>
                  <a
                    href='https://hasura.io/docs/'
                    onClick={()=>trackGAEvents("Learn Course", "HeaderClick", "Docs")}
                  >
                    Docs
                  </a>
                </li>
                <li>
                  <a
                    href={`https://hasura.io/blog/`}
                    onClick={()=>trackGAEvents("Learn Course", "HeaderClick", "Blog")}
                  >
                    Blog
                  </a>
                </li>
                <li className={(path === '/learn/') ? 'navListActive' : ''}>
                  <Link
                    to='/learn/'
                    onClick={()=>trackGAEvents("Learn Course", "HeaderClick", "Tutorials")}
                  >
                    Tutorials
                  </Link>
                </li>
                <li className={(path === '/enterprise/') ? 'navListActive' : ''}>
                  <Link to="/enterprise/" onClick={()=>trackGAEvents("Learn Course", "HeaderClick", "Enterprise")}>
                    Enterprise
                  </Link>
                </li>
                <li className={(path === '/hasura-pro/') ? 'navListActive' : ''}>
                  <Link to="/hasura-pro/" onClick={()=>trackGAEvents("Learn Course", "HeaderClick", "Hasura Pro")}>
                    Hasura Pro
                  </Link>
                </li>
                <li className={(path === '/pricing/') ? 'navListActive' : ''}>
                  <Link to="/pricing/" onClick={()=>trackGAEvents("Learn Course", "HeaderClick", "Pricing")}>
                    Pricing
                  </Link>
                </li>
                <li>
                  <a
                    href='https://hasura.io/docs/1.0/graphql/manual/getting-started/index.html'
                    onClick={()=>trackGAEvents("Learn Course", "HeaderClick", "Get Started")}
                  >
                    <button className={"commonBtn " + navBtnClassName}>
                      Get Started
                    </button>
                  </a>
                </li>
                <li>
                  <a
                    href='https://calendly.com/hasura/prod-expert-call'
                    onClick={()=>trackGAEvents("Learn Course", "HeaderClick", "Contact Us")}
                  >
                    <button className={"commonBtn " + navBtnContact}>
                      Talk to a Product Expert
                    </button>
                  </a>
                </li>
              </ul>
            </div>
            <div className={isBlueNav ? "navBlueBG" : "navWhiteBG"}>
              <span
                className="navBarToggle"
                aria-label="button"
                onKeyDown={()=>myFunction()}
                role="button"
                tabIndex="0"
                onClick={()=>myFunction()}
              >
                <span className={"iconBar"}></span>
                <span className={"iconBar"}></span>
                <span className={"iconBar"}></span>
              </span>
            </div>
            <div id="navbar" className="topnav">
              <div className="visibleMobile">
                <ul className="navBarULMobile">
                  <li>
                    <a
                      onClick={()=>{
                        trackGAEvents("Learn Course", "HeaderClickMobile", "Docs")
                        myFunction()
                      }}
                      href='https://hasura.io/docs/'
                    >
                      Docs
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={()=>{
                        trackGAEvents("Learn Course", "HeaderClickMobile", "Blog")
                        myFunction()
                      }}
                      href={`https://hasura.io/blog/`}
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <Link
                      onClick={()=>{
                        trackGAEvents("Learn Course", "HeaderClickMobile", "Tutorials")
                        myFunction()
                      }}
                      to='/learn/'
                    >
                      Tutorials
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={()=>{
                        trackGAEvents("Learn Course", "HeaderClickMobile", "Enterprise")
                        myFunction()
                      }}
                      to="/enterprise/"
                    >
                      Enterprise
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={()=>{
                        trackGAEvents("Learn Course", "HeaderClickMobile", "Hasura Pro")
                        myFunction()
                      }}
                      to="/hasura-pro/"
                    >
                      Hasura Pro
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={()=>{
                        trackGAEvents("Learn Course", "HeaderClickMobile", "Pricing")
                        myFunction()
                      }}
                      to="/pricing/"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <a
                      onClick={()=>{
                        trackGAEvents("Learn Course", "HeaderClickMobile", "Get Started")
                        myFunction()
                      }}
                      href='https://hasura.io/docs/1.0/graphql/manual/getting-started/index.html'
                    >
                      <button className={"commonBtn " + navBtnClassName}>
                        Get Started
                      </button>
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={()=>{
                        trackGAEvents("Learn Course", "HeaderClickMobile", "Contact Us")
                        myFunction()
                      }}
                      href='https://calendly.com/hasura/prod-expert-call'
                    >
                      <button className={"commonBtn " + navBtnContact}>
                        Talk to a Product Expert
                      </button>
                    </a>
                  </li>
                </ul>
                <Sidebar location={location} />
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}
Header.propTypes = {
  location: PropTypes.object,
}
export default Header
