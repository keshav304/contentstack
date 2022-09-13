import React, { useState, useEffect } from 'react';
import getConfig from 'next/config';
import { onEntryChange } from '../sdk-plugin/index';
import Layout from '../components/layout';
import RenderComponents from '../components/render-components';
import { getHeaderRes, getFooterRes, getDemoRes } from '../helper/index';
import Slider from "../components/slider";
import SliderSidebar from "../components/sliderSidebar";
import SidebarOpenBtn from "../components/assets/sidebar-btn.png";

export default function Demo(props) {
  const {
    header, footer, result, entryUrl,
  } = props;
  const { CONTENTSTACK_LIVE_PREVIEW } = getConfig().publicRuntimeConfig;
  const [getHeader, setHeader] = useState(header);
  const [getFooter, setFooter] = useState(footer);
  const [getEntry, setEntry] = useState(result);
  const [isOpen, setIsOpen] = useState(false);
  const [personalizationBehaviours, setPersonalizationBehaviours] = useState([]);
  const [tags, setTags] = useState([]);
  const handleClickBehaviour = (name) => {
    if (personalizationBehaviours.indexOf(name) !== -1) {
      // eslint-disable-next-line max-len
      const filteredBehaviours = personalizationBehaviours.filter((behaviour) => behaviour !== name);
      setPersonalizationBehaviours(filteredBehaviours);
    } else {
      const updatedBehaviour = [...personalizationBehaviours, name];
      setPersonalizationBehaviours(updatedBehaviour);
    }
  };
  const handleClickTags = (name) => {
    if (tags.indexOf(name) !== -1) {
      const filteredTags = tags.filter((tag_name) => tag_name !== name);
      setTags(filteredTags);
    } else {
      const updatedTags = [...tags, name];
      setTags(updatedTags);
    }
  };
  const listenScrollEvent = (e) => {
    if (window.scrollY < 125 && window.isOpen) {
      document.querySelector('.sidebarIcon').style.marginLeft = '20.6%';
    }
    if (window.scrollY < 125 && !window.isOpen) {
      document.querySelector('.sidebarIcon').style.marginLeft = '17.6%';
    }
    if (window.scrollY > 125 && !window.isOpen) {
      document.querySelector('.sidebarIcon').style.marginLeft = '0.6%';
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);
  }, []);
  useEffect(() => {
    window.isOpen = isOpen;
    if (isOpen && window.scrollY < 125) {
      document.querySelector('.sidebarIcon').style.marginLeft = '20.6%';
    }
    if (!isOpen && window.scrollY < 125) {
      document.querySelector('.sidebarIcon').style.marginLeft = "17.6%";
    }
  }, [isOpen]);
  async function fetchData() {
    try {
      console.info('fetching live preview data...');
      const entryRes = await getDemoRes(entryUrl);
      const headerRes = await getHeaderRes();
      const footerRes = await getFooterRes();
      setHeader(headerRes);
      setFooter(footerRes);
      setEntry(entryRes);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    onEntryChange(() => {
      if (CONTENTSTACK_LIVE_PREVIEW === 'true') fetchData();
    });
  }, []);

  return (
    <Layout
      header={getHeader}
      footer={getFooter}
      page={result}
    >
      <div className="sidebarIcon">
        <img src="https://i.imgur.com/CnW2LF0.png" onClick={() => setIsOpen(!isOpen)} />
        <h2>Home</h2>
      </div>
      <div className="homeInfoContainer">

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Pellentesque in feugiat nulla. Integer a augue ut leo cursus convallis.

        </p>
      </div>
      <SliderSidebar
        isSidebarOpen={isOpen}
        setIsSidebarOpen={setIsOpen}
        setPersonalizationBehaviours={setPersonalizationBehaviours}
        setTags={setTags}
      />
      {getEntry?.page_components && (
        <RenderComponents
          pageComponents={getEntry.page_components}
          contentTypeUid="page"
          entryUid={getEntry.uid}
          locale={getEntry.locale}
          personalizationBehaviours={personalizationBehaviours}
          personalizationTags={tags}
        />
      )}
      <Slider />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  try {
    const entryRes = await getDemoRes(context.resolvedUrl);
    const headerRes = await getHeaderRes();
    const footerRes = await getFooterRes();
    return {
      props: {
        entryUrl: context.resolvedUrl,
        result: entryRes,
        header: headerRes,
        footer: footerRes,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
}
