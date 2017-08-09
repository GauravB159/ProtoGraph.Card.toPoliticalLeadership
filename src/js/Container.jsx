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
    console.log(this.state.fetchingData);
    // get sample json data based on type i.e string or object
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
    // console.log(wordArray, "wordArray", el, el.scrollHeight, el.offsetHeight)
    while(el.scrollHeight > el.offsetHeight) {
      wordArray.pop();
      el.innerHTML = wordArray.join(' ') + '...' + '<span><a id="protograph_read_more">Read more</a></span>';
    }
    if(document.getElementById('protograph_read_more') !== null){
      document.getElementById('protograph_read_more').addEventListener('click', function(){
        document.querySelector('.protograph_explainer_text').style.height = 'auto';
        document.querySelector('.protograph_explainer_text').innerHTML = data.data.explainer_text;
        // console.log(props, "props")
        props.clickCallback();
      })
    }
  }

  renderLaptop() {
    console.log("This will work", this.state.dataJSON.card_data.length);
    if ( this.state.fetchingData ){
      return(<div>Loading</div>)
    } else {
      console.log(this, "hdjhga");
      var that = this;
      var dataReceived = this.state.dataJSON.card_data;
      console.log(dataReceived, "cooooosaoooooododododoodo");
      var cards = dataReceived.map(function(data, i){
        console.log(data, "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
        //var ids = `proto${i}`
        //console.log(data.iframe_url, i, ";;;;;;;;;;;;;;;;;;;;;");

        return(
          <tr>
            <td className="assembly-seg">{data.assembly_segment_name}</td>
            <td>{data.mla_name}</td>
            <td className="party-name"><ul><li>{data.party_name}</li></ul></td>
            <td className="assembly-seg">{data.mla_education}</td>
          </tr>
        )
      });


      const data = this.state.dataJSON.card_data;
      // let styles = this.state.dataJSON.configs ? {borderLeft: `5px solid ${this.state.dataJSON.configs.band_color}`} : undefined
      // styles["width"] = "100%";
      let header_style = this.state.dataJSON.configs ? {color: this.state.dataJSON.configs.band_color} : undefined;
      return (
        <div id="protograph_div">
          <table>
            <tr>
              <th>Assembly</th>
              <th>Name</th>
              <th>Party</th>
              <th>Education</th>
            </tr>
            {cards}
          </table>
        </div>
      )

    }
  }

  dataSet(data, ids){

    setTimeout(() => {
        if (!data.isRendered){
          data.isRendered = true;
          var p = new ProtoEmbed.initFrame(ids, data.iframe_url , "laptop");
          console.log(p, "this id");
          this.setState({initAllDivs: true})
        }
    }, 1000);
    console.log(data, "This function has been called", ids, data.iframe_url);

  }



  renderMobile() {
    console.log("MOBILE STATE WAS CALLED", this.state.dataJSON.card_data.length);
    if ( this.state.fetchingData ){
      return(<div>Loading</div>)
    } else {
      console.log(this, "hdjhga");
      var that = this;
      var dataReceived = this.state.dataJSON.card_data;
      console.log(dataReceived, "cooooosaoooooododododoodo");
      var cards = dataReceived.map(function(data, i){
        var ids = `proto${i}`
        //console.log(data.iframe_url, i, ";;;;;;;;;;;;;;;;;;;;;");

        return(
          <div id={ids} className="stream_cards" height="auto">{that.dataSet(data, ids)}</div>
        )
      });


      const data = this.state.dataJSON.card_data;
      let styles = this.state.dataJSON.configs ? {borderLeft: `5px solid ${this.state.dataJSON.configs.band_color}`} : undefined
      // styles["width"] = "100%";
      let header_style = this.state.dataJSON.configs ? {color: this.state.dataJSON.configs.band_color} : undefined;
      return (
        <div id="protograph_div" style = {styles}>
          {cards}
        </div>
      )

    }
  }

  renderScreenshot() {
    if (this.state.schemaJSON === undefined ){
      return(<div>Loading</div>)
    } else {
      const data = this.state.dataJSON.card_data;
      let styles = this.state.dataJSON.configs ? {borderLeft: `5px solid ${this.state.dataJSON.configs.band_color}`} : undefined
      let screenshot_styles =  {
        height:'auto'
      }
      return (
          <div id="ProtoScreenshot" className = "protograph_card_div" style = {styles}>
            {/* <h1 className="protograph_explainer_header"> {data.data.explainer_header} </h1> */}
            <div className="protograph_explainer_text" style = {screenshot_styles}>{data.data.explainer_text}</div>
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
