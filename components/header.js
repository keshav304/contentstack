import React from "react";
import Link from "next/link";
import parse from "html-react-parser";
import Tooltip from "./tool-tip";
import MobileSidebar from "./mobileSidebar";

export default function Header(props) {
  const { header } = props;

  return (
    <header className="header">

      {/* {header.notification_bar.show_announcement ? typeof header.notification_bar.announcement_text === "string"
          && (
            <div
              className="note-div"
            >
              <div>
                {parse(header.notification_bar.announcement_text)}
              </div>
            </div>
          ) : null} */}
      <Link href="/demo-page"><h1>Personify XP Demo</h1></Link>
      <MobileSidebar />
      {/*
      <div className="max-width header-div">
        <div className="wrapper-logo" > */}
      {/* <Link className="logo-tag" title="Contentstack" href="/demo-page">
            <img
              className="logo"
              src={header.logo.url}
              alt={header.title}
              title={header.title}
            />
          </Link> */}
      {/* <h1></h1? */}
      {/* </div>
        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label className="menu-icon" htmlFor="menu-btn">
          <span className="navicon" />
        </label>
        <nav className="menu">
          <ul className="nav-ul header-ul">
            {header.navigation_menu?.map((list) => (
              <li key={list.label} className="nav-li">
                <Link href={list.page_reference[0].url}>
                  <a
                    className={
                      router.pathname === list.page_reference[0].url
                        ? "active"
                        : ""
                    }
                  >
                    {list.label}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </nav> */}

      {/* <div className="json-preview">
          <Tooltip content="JSON Preview" direction="top">
            <span
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              <img src="/json.svg" alt="JSON Preview icon" />
            </span>
          </Tooltip>
        </div> */}
      {/* </div> */}
    </header>
  );
}
