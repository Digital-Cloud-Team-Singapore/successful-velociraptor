import React, {Component} from "react";
import _, { toUpper } from "lodash";
import styled from "styled-components";
import CustomTabs from './customtabs';
import { htmlToReact, withPrefix, classNames } from "../utils";
import SectionCtaSwift from './SectionCtaSwift';
import Iframe from 'react-iframe';

const BgDiv = styled.section`
    .block-title{
      font-weight: 900;
      padding-left: 15%;
      font-size: 30px;
    }
    .block-subtitle{
      color: black;
      font-weight: 200;
      font-size: 14px;
      text-align: left;
      width: 700px;
      margin-top: 60px;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 0px;
    }

    @media only screen and (max-width: 801px){
      .block-title{
        font-weight: 900;
        padding-left: 10%;
        font-size: 30px;
      }

      .block-subtitle{
        color: black;
        font-weight: 200;
        font-size: 12px;
        text-align: left;
        width: 300px;
        margin-top: 10px;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 0px;
      }

      && .grid.outer{
        padding: 1.33333em 5vw;
      }
    }

    .themesswift-cell.grow{
        box-sizing: border-box;
        padding-left: 0.8333rem;
        padding-right: 0.8333rem;
        position: relative;
        flex-basis: 33%;
        margin-bottom: 30px;
        cursor: pointer;
        transition: all .2s ease-in-out;
        
        &:hover {
          transform: scale(1.2);
          z-index: 100;
        }

        @media only screen and (max-width: 801px){
          flex-basis: 50%;
          margin-bottom: 30px;
          
        }
    }
    //#region custom tab
    .grid{
      &.grid-custom{  
        justify-content:center
      }
      &.outer{
        padding: 2.333em 21.8vw;
      }
      .themeswift-avatar{
          width: 100%;
        }
    }
    //#endregion custom tab

  &.themeswift-block{
      padding-top: 0px;
    &.bg-F7F7F1{
      background-color: #F7F7F1;
    }
    .themeswift-block.tab{
    }  
    .bg-1D242C{
      background-color: #1D242C;
    }
    .grid-tab{
      justify-content: center;
      align-items: baseline;

      @media only screen and (max-width: 801px){
       align-items: center;
      }
    }
    .block-subtitle-tab{
      color: white;
      font-weight: 400;
      font-size: 17px;

      @media only screen and (max-width: 801px){
        margin-top: 10px;
        margin-bottom: 0px;
      }
    }
  }
`;


export default class ThemesSwift extends Component {

  state = {
    activeTab: "All themes"
  };
  
  changeActiveState =(tab)=>{
    console.log('new tab change', tab);
    this.setState({
      activeTab:tab
    })
  };



  render() {
    let section = _.get(this.props, "section", null);
    let tab_items = _.get(section, "tab_items", null);
    console.log('props are', this.props)
    let subtitle_1 = (_.find(tab_items, {label: this.state.activeTab.toUpperCase()})).subtitle_1;
    return (
          <BgDiv
            id={_.get(section, "section_id", null)}
            className={
              "block themeswift-block bg-" +
              _.get(section, "background", null) +
              ""
            }
          >
          <div className="themeswift-block tab">
           <div className={"grid grid-tab bg-"+ _.get(section, "tab_background", null)}> 
            {_.get(section, "tab_title", null) && (
              <p className="block-subtitle-tab">{_.get(section, "tab_title", null)}</p>
            )}
            <CustomTabs tellParent={this.changeActiveState.bind(this)}> 
            {_.map(tab_items, (tab_item, tab_idx)=>(
                  <div key={tab_idx} label={tab_item.label}>
                  </div> 
            ))}
            </CustomTabs> 
            </div>           
          </div>
             {_.get(section, "tab_title", null) && (
              <h2 className="block-title">{this.state.activeTab}</h2>
            )}
            {_.get(_.find(tab_items, {label: this.state.activeTab.toUpperCase()}), "subtitle_1", null) && (
              <p className="block-subtitle">
                {htmlToReact(subtitle_1)}
              </p>
            )}
          {_.get(section, "grid_items", null) && (toUpper(this.state.activeTab) === toUpper("all themes")) && (
          // <div className="">
            <div className="grid outer">
            {/* use .map to loop through */}
            {_.map(_.get(section, "grid_items", null), (grid_item, review_idx) => (
              <div key={review_idx} className="themesswift-cell grow">
                {_.get(grid_item, "image", null) && (
                  <div class="theme-iframe"> 
                  <img
                    className="themeswift-avatar"
                    src={withPrefix(_.get(grid_item, "image", null))}
                    alt={_.get(grid_item, "image_alt", null)}
                  />

                  </div>
                )}

                {/* 
                <div className="industry-footer">
                  <p className="industry-text">
                    {htmlToReact(_.get(review, "title", null))}
                  </p>
                  <p className="industry-subtitle">
                    {htmlToReact(_.get(review, "subtitle", null))}
                  </p>
                </div> */}
              </div>
            ))}
            {/* </div> */}
          </div>
        )}
        {/* This is for custom tab */}
        { (toUpper(this.state.activeTab) === toUpper("custom")) && (
          // <div className="">
            <div className="grid grid-custom">
              <SectionCtaSwift {...this.props.section}></SectionCtaSwift>
            {/* </div> */}
          </div>
        )}
         {/* This is for custom tab */}
      </BgDiv>
    );
  }
}
