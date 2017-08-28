import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
export default class ExplainerCard extends React.Component {
  constructor(props) {
    super(props)

    let stateVar = {
      fetchingData: true,
      dataJSON: {
        card_data: {},
        configs: {}
      },
      initAllDivs: false,
      schemaJSON: undefined,
      optionalConfigJSON: {},
      optionalConfigSchemaJSON: undefined
    };
    if (this.props.dataJSON) {
      stateVar.fetchingData = false;
      stateVar.dataJSON = this.props.dataJSON;
    }

    if (this.props.optionalConfigJSON) {
      stateVar.optionalConfigJSON = this.props.optionalConfigJSON;
    }

    if (this.props.optionalConfigSchemaJSON) {
      stateVar.optionalConfigSchemaJSON = this.props.optionalConfigSchemaJSON;
    }

    this.state = stateVar;
  }

  exportData() {
    return document.getElementById('protograph_div').getBoundingClientRect();
  }

  componentDidMount() {
    if (this.state.fetchingData){
      axios.all([axios.get(this.props.dataURL), axios.get(this.props.optionalConfigURL), axios.get(this.props.optionalConfigSchemaURL)])
        .then(axios.spread((card, opt_config, opt_config_schema) => {
        console.log("componentDidMount - Done")
          this.setState({
            fetchingData: false,
            dataJSON: {
              card_data: card.data,
              configs: opt_config.data
            },
            optionalConfigJSON: opt_config.data,
            optionalConfigSchemaJSON: opt_config_schema.data
          });
        }));
    }
  }

  componentDidUpdate() {
    let elem = document.querySelector('.protograph_explainer_text')
    //this.multiLineTruncate(elem)
  }

  getScreenSize() {
    let w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      width = w.innerWidth || e.clientWidth || g.clientWidth,
      height = w.innerHeight|| e.clientHeight|| g.clientHeight;

    return {
      width: width,
      height: height
    };
  }

  multiLineTruncate(el) {
    let data = this.state.dataJSON.card_data,
      wordArray = data.data.explainer_text.split(' '),
      props = this.props;
    while(el.scrollHeight > el.offsetHeight) {
      wordArray.pop();
      el.innerHTML = wordArray.join(' ') + '...' + '<span><a id="protograph_read_more">Read more</a></span>';
    }
    if(document.getElementById('protograph_read_more') !== null){
      document.getElementById('protograph_read_more').addEventListener('click', function(){
        document.querySelector('.protograph_explainer_text').style.height = 'auto';
        document.querySelector('.protograph_explainer_text').innerHTML = data.data.explainer_text;
        props.clickCallback();
      })
    }
  }

  renderLaptop() {
    if ( this.state.fetchingData ){
      return(<div>Loading</div>)
    } else {
      var that = this;
      var dataReceived = this.state.dataJSON.card_data.data.details;
      var cards = dataReceived.map(function(data, i){
        let logo = "bjp.png";
        let party_name = "none"
        if (data.party=="BJP") {
          logo = "https://pbs.twimg.com/profile_images/812531108092874753/frVON4bm_400x400.jpg";
          party_name="bjp";
        }
        else {
          logo = "https://pbs.twimg.com/profile_images/709367473095573505/1rSy_xxJ_400x400.jpg";
          party_name="bsp";
        }
        return(
          <tr id={party_name}>
            <td className="mobile-mla-name"><h5 className="leader-name">{data.name}</h5></td>
            <td className="mobile-mla-assembly"><p>{data.assembly}</p></td>
            <td className="mobile-mla-assets"><p>{data.assets}</p></td>
            <td className="mobile-mla-education"><p>{data.education}</p></td>
            <td className="mobile-mla-party"><img src={logo}/></td>
          </tr>
        )
      });


      const data = this.state.dataJSON.card_data.data.details;
      let header_style = this.state.dataJSON.configs ? {color: this.state.dataJSON.configs.band_color} : undefined;
      return (
        <div id="protograph_div" className="laptop-div">
          <p id="assembly_location">{this.state.dataJSON.card_data.data.district}</p>
          <h3 id="card_title">{this.state.dataJSON.card_data.data.title}</h3>
          <div className="card-scrollable">
            <table className="mla-table">
              <tr>
                <th className="mobile-mla-name">Name</th>
                <th className="mobile-mla-assembly">Assembly</th>
                <th className="mobile-mla-assets">Assets</th>
                <th className="mobile-mla-education">Education</th>
                <th className="mobile-mla-party">Party</th>
              </tr>
              {cards}
            </table>
          </div>
        </div>
      )

    }
  }

  // dataSet(data, ids){
  //
  //   setTimeout(() => {
  //       if (!data.isRendered){
  //         data.isRendered = true;
  //         var p = new ProtoEmbed.initFrame(ids, data.iframe_url , "laptop");
  //         this.setState({initAllDivs: true})
  //       }
  //   }, 1000);
  //
  // }



  renderMobile() {
    if ( this.state.fetchingData ){
      return(<div>Loading</div>)
    } else {
      var that = this;
      var dataReceived = this.state.dataJSON.card_data.data.details;
      var cards = dataReceived.map(function(data, i){
        let logo = "bjp.png";
        let party_name = "none"
        if (data.party=="BJP") {
          logo = "https://pbs.twimg.com/profile_images/812531108092874753/frVON4bm_400x400.jpg";
          party_name="bjp";
        }
        else {
          logo = "https://pbs.twimg.com/profile_images/709367473095573505/1rSy_xxJ_400x400.jpg";
          party_name="bsp";
        }
        return(
          <div className="mla-details" id={party_name}>
            <img src={logo}/>
            <h5 className="leader-name">{data.name}</h5>
            <p className="status-titles">Assembly</p>
            <p>{data.assembly}</p>
            <div className="mla-info" id="mla_party_div">
              <p className="status-titles">Party</p>
              <p>{data.party}</p>
            </div>
            <div className="mla-info" id="mla_edu_div">
              <p className="status-titles">Education</p>
              <p>{data.education}</p>
            </div>
          </div>
        )
      });


      const data = this.state.dataJSON.card_data.data.details;
      // let styles = this.state.dataJSON.configs ? {borderLeft: `5px solid ${this.state.dataJSON.configs.band_color}`} : undefined
      // styles["width"] = "100%";
      let header_style = this.state.dataJSON.configs ? {color: this.state.dataJSON.configs.band_color} : undefined;
      return (
        <div id="protograph_div" className="mobile-div">
          <p id="assembly_location">{this.state.dataJSON.card_data.data.district}</p>
          <h3 id="card_title">{this.state.dataJSON.card_data.data.title}</h3>
          <div className="card-scrollable">
            {cards}
          </div>
        </div>
      )

    }
  }

  renderScreenshot() {
    if ( this.state.fetchingData ){
      return(<div>Loading</div>)
    } else {
      const data = this.state.dataJSON.card_data;
      let styles = this.state.dataJSON.configs ? {borderLeft: `5px solid ${this.state.dataJSON.configs.band_color}`} : undefined
      let screenshot_styles =  {
        height:'auto'
      }

      var that = this;
      var dataReceived = this.state.dataJSON.card_data.data.details;

      var cards = dataReceived.map(function(data, i){
        let logo = "bjp.png";
        let party_name = "none"
        if (data.party=="BJP") {
          logo = "https://pbs.twimg.com/profile_images/812531108092874753/frVON4bm_400x400.jpg";
          party_name="bjp";
        }
        else {
          logo = "https://pbs.twimg.com/profile_images/709367473095573505/1rSy_xxJ_400x400.jpg";
          party_name="bsp";
        }
        return(
          <div className="mla-details" id={party_name}>
            <img src={logo}/>
            <h5 className="leader-name">{data.name}</h5>
            <p className="status-titles">Assembly</p>
            <p>{data.assembly}</p>
            <div className="mla-info" id="mla_party_div">
              <p className="status-titles">Party</p>
              <p>{data.party}</p>
            </div>
            <div className="mla-info" id="mla_edu_div">
              <p className="status-titles">Education</p>
              <p>{data.education}</p>
            </div>
          </div>
        )
      });



      return (
          <div id="ProtoScreenshot" className = "protograph_card_div">
            <p id="assembly_location">{this.state.dataJSON.card_data.data.district}</p>
            <h3 id="card_title">{this.state.dataJSON.card_data.data.title}</h3>
            <div className="card-scrollable">
              {cards}
            </div>
          </div>

      )
    }
  }

  render() {
    switch(this.props.mode) {
      case 'laptop' :
        return this.renderLaptop();
        break;
      case 'mobile' :
        return this.renderMobile();
        break;
      case 'tablet' :
        return this.renderLaptop();
        break;
      case 'screenshot' :
          return this.renderScreenshot();
          break;
    }
  }
}
