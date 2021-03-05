import React from "react";
import _ from "lodash";
import styled from "styled-components";
import { withPrefix, classNames } from "../utils";
import CtaButtons from "./CtaButtons";

const HeroImg = styled.img`
    &.hero-img{
      
    }

`;

export default class SectionHero extends React.Component {

  render() {
    let section = _.get(this.props, "section", null);
    return (
      
      <div id={_.get(section, "section_id", null)} className='hero-container'>
        <HeroImg
          className="hero-img"
          src={withPrefix(_.get(section, "image", null))}
          alt={_.get(section, "image_alt", null)}
        />
        <div className="hero-text-block">
          {_.get(section, "title", null) && (
            <div className="block-text-title ">
              {_.get(section, "title", null)}
            </div>
          )}
          {/* <div className="block-copy">
            {markdownify(_.get(section, "content", null))}
          </div> */}
          {_.get(section, "actions", null) && (
            <div className="block-buttons">
              <CtaButtons
                {...this.props}
                actions={_.get(section, "actions", null)}
              />
            </div>
          )}
        </div>
      </div>
  
      // <section
      //   id={_.get(section, "section_id", null)}
      //   className="section-hero block hero-block bg-accent outer"
      // >

      /* <div className="inner">
          <div className="grid">
            {_.get(section, "image", null) && (
              <div className="cell block-preview">
                <img
                  src={withPrefix(_.get(section, "image", null))}
                  alt={_.get(section, "image_alt", null)}
                />
              </div>
            )}
            <div className="cell block-content">
              {_.get(section, "title", null) && (
                <h2 className="block-title ">
                  {_.get(section, "title", null)}
                </h2>
              )}
              <div className="block-copy">
                {markdownify(_.get(section, "content", null))}
              </div>
              {_.get(section, "actions", null) && (
                <div className="block-buttons">
                  <CtaButtons
                    {...this.props}
                    actions={_.get(section, "actions", null)}
                  />
                </div>
              )}
            </div>
          </div>
        </div> */
      // </section>

      //   <div className="hero-image">

      // </div>
    );
  }
}
