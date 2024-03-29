import React from "react";

import Section from "./section";
import HeroBanner from "./hero-banner";
import BlogBanner from "./blog-banner";
import CardSection from "./card-section";
import TeamSection from "./team-section";
import BlogSection from "./blog-section";
import SectionBucket from "./section-bucket";
import AboutSectionBucket from "./about-section-bucket";
import SectionWithHtmlCode from "./section-with-html-code";
import Carousel from "./carousel";
import CategorySection from "./category-section";
import ProductsSection from "./products-section"
import Slider from "./slider";
import Pdp from "./Pdp"
import PdpCarousel from "./PdpCarousel"
import CategoryInfo from "./category-info"
import DynamicContent from "./dynamic-content";

export default function RenderComponents(props) {
  const {
    pageComponents, blogsPage, about, entryUid, contentTypeUid, locale,personalizationBehaviours,personalizationTags
  } = props;
  return (
    <div data-pageref={entryUid} data-contenttype={contentTypeUid} data-locale={locale}>
      {pageComponents?.map((component, key) => {
        if (component.hero_banner) {
          return blogsPage ? (
            <BlogBanner
              blog_banner={component.hero_banner}
              key={`component-${key}`}
            />
          ) : (
            <HeroBanner
              hero_banner={component.hero_banner}
              title={about ? "about" : "home"}
              key={`component-${key}`}
            />
          );
        }
        if (component.section) {
          return (
            <Section section={component.section} key={`component-${key}`} />
          );
        }
        if (component.section_with_buckets) {
          return about ? (
            <AboutSectionBucket
              sectionWithBuckets={component.section_with_buckets}
              key={`component-${key}`}
            />
          ) : (
            <SectionBucket
              section={component.section_with_buckets}
              key={`component-${key}`}
            />
          );
        }
        if (component.from_blog) {
          return (
            <BlogSection blogs={component.from_blog} key={`component-${key}`} />
          );
        }
        if (component.section_with_cards) {
          return (
            <CardSection
              cards={component.section_with_cards.cards}
              key={`component-${key}`}
            />
          );
        }
        if (component.section_with_html_code) {
          return (
            <SectionWithHtmlCode
              embedCode={component.section_with_html_code}
              key={`component-${key}`}
            />
          );
        }
        if (component.our_team) {
          return (
            <TeamSection
              ourTeam={component.our_team}
              key={`component-${key}`}
            />
          );
        }
        if (component.Carousel){
          return (
            <Carousel
              products={component.Carousel}
              key={`component-${key}`}
              personalizationBehaviours={personalizationBehaviours}
              personalizationTags={personalizationTags}
            />
          );
        }
        if (component.Sidebar) {
          return (
            <CategorySection
              props={component.Sidebar}
              key={`component-${key}`}
            />
          )
        }
        if(component.Product_Section) {
          return (
            <ProductsSection
              props={component.Product_Section}
              key={`component-${key}`}
              personalizationBehaviours={personalizationBehaviours}
              personalizationTags={personalizationTags}
            />
          )
        }
        if (component.Home_Slider) {
        return (
          <Slider
            props={component.Home_Slider}
            key={`component-${key}`}
            personalizationBehaviours={personalizationBehaviours}
            personalizationTags={personalizationTags}
          />
        )
      }
      if (component.Product_Page) {
        return (
          <Pdp
            props={component.Product_Page}
            key={`component-${key}`}
          />
        )
      }
      if (component.PdpCarousel) {
        return (
          <PdpCarousel
            props={component.PdpCarousel}
            key={`component-${key}`}
          />
        )
      }
      if(component.PLP_Products_Section) {
          return (
            <ProductsSection
              props={component.PLP_Products_Section}
              key={`component-${key}`}
            />
          )
      }
      if (component.PLP_Category_Info) {
        return (
            <CategoryInfo
              props={component.PLP_Category_Info}
              key={`component-${key}`}
            />
          )
      }
      if (component.dynamic_content) {
        return (
           <DynamicContent
            props={component.dynamic_content}
            key={`component-${key}`}
           />
          )
      }
      })}
    </div>
  );
}
