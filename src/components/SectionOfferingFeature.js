import React from "react";
import _ from "lodash";
import styled from "styled-components";
import { htmlToReact, withPrefix, markdownify, classNames } from "../utils";
import CtaButtons from "./CtaButtons";

const OfferingIndexDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: left;
`;

const FeatureTitle = styled.h2`
  font-weight: normal;
  font-size: 42px;
  line-height: 50px;
  max-width: 1024px;
  margin: auto;
  padding: 20px 0;
  padding-bottom: 100px;

  &#about_us_team{
    padding-bottom: 10px;
    font-weight: 900;
  }

  @media only screen and (max-width: 801px) {
    padding-bottom: 20px;
    &#about_us_team{
      padding-bottom: 30px;
      font-weight: 900;
      padding-top: 10px;
      font-size: 28px;
    }
  }
`;

// only about-us-team will have subtitle for now
const FeatureSubtitle = styled.p`
  font-weight: 900;
  font-size: 15px;
  line-height: 10px;
  max-width: 1024px;
  margin: auto;
  padding-bottom: 0px;

  @media only screen and (max-width: 801px) {
    padding-bottom: 20px;
  }
`;

const InnerDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1024px;
  margin: auto;

    & .border-black{
      border: 1px solid black;
      background-color: white;
      border-radius: 0px;
    }

  .feature-container {
    display: flex;
    flex-direction: row;
    padding: 50px 0;

    .content-container {
      flex: 1;
      padding-right: 60px;

      .feature-title {
        font-weight: 800;
        font-size: 30px;
        line-height: 24px;
        font-family: "fort-bold";
      }

      .feature-content {
        font-size: 13px;
        line-height: 21px;
        font-weight: 500;
      }
    }

    .content-container.left {
      flex: 1;
      padding-right: 0px;
      .feature-title {
        font-weight: 800;
        font-size: 30px;
        line-height: 24px;
        font-family: "fort-bold";
      }

      .feature-content {
        font-size: 13px;
        line-height: 21px;
        font-weight: 500;

        @media only screen and (max-width:801px){
          width: 350px;
          font-size: 13px;
        }
      }
    }

    .feature-image {
      width: 500px;
      flex: 1;
    }

    .feature-image-left{
      width: 500px;
      padding-right: 50px;
    }

    @media only screen and (max-width: 801px) {
      flex-wrap: wrap;
      flex-direction: column;
      width: 100%;
      padding-top: 0px;
      
      .feature-image {
        width: 100%;
      }

      .feature-image-left{
        width: 100%;
        margin-bottom: 15px;
      }
    }
  }
`;

export default class SectionOfferingFeature extends React.Component {
  render() {
    const section = _.get(this.props, "section", null);
    const section_id = _.get(section, "section_id", null);
    const alphabet = ["A","B","C","D"];
    
    return (
      <section
        id={_.get(section, "section_id", null)}
        className={
          "block features-block bg-" +
          _.get(section, "background", null) +
          " outer"
         }
         > 
         {_.get(section, "subtitle", null) && (
            <FeatureSubtitle className="block-subtitle">
              {htmlToReact(_.get(section, "subtitle", null))}
            </FeatureSubtitle>
          )}
          
          {_.get(section, "title", null) && (
             <div className="title">
            <FeatureTitle id={_.get(section, "section_id", null)}> {_.get(section, "title", null)}</FeatureTitle>
            </div>
          )}
       
        {_.get(section, "features", null) && (
          <InnerDiv>
            {_.map(_.get(section, "features", null), (feature, feature_idx) => (
              <div key={feature_idx} className="feature-container">
                {/* <div className="grid"> */}
                {_.get(feature, "image", null) &&  (_.get(feature,"image_position",null)) && (
                  <div className="feature-image-left">
                    <img
                      src={withPrefix(_.get(feature, "image", null))}
                      alt={_.get(feature, "image_alt", null)}
                    />
                  </div>
                )}
                <div className={classNames("content-container",{'left':_.get(feature,"image_position",null)})}>
                {((section_id === "amplify") || (section_id === "features")) && <OfferingIndexDiv>
                    <div className="offerings-index">{ section_id === "amplify" ? alphabet[feature_idx ]: "" }</div>
                    <h3 className="feature-title">
                      {(section_id === "amplify" ? "- ": "") + (_.get(feature, "title", null))}
                    </h3>
                 </OfferingIndexDiv>
                }
                  <div className={classNames("feature-content",{'left':_.get(feature,"image_position",null)})}>
                    {markdownify(_.get(feature, "content", null))}
                  </div>
                  
                  {_.get(feature, "actions", null) && (
                    <div className="block-buttons">
                      <CtaButtons
                        {...this.props}
                        actions={_.get(feature, "actions", null)}
                      />
                    </div>
                  )}
                </div>
                {_.get(feature, "image", null) &&  !(_.get(feature,"image_position",null)) && (
                  <div className="feature-image">
                    <img
                      src={withPrefix(_.get(feature, "image", null))}
                      alt={_.get(feature, "image_alt", null)}
                    />
                  </div>
                )}
                {/* </div> */}
              </div>
            ))}
          </InnerDiv>
        )}
      </section>
    );
  }
}
