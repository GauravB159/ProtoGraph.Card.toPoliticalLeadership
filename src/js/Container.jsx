import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
export default class LeadershipCard extends React.Component {
  constructor(props) {
    super(props)

    let stateVar = {
      fetchingData: true,
      dataJSON: {
        card_data: {},
        configs: {}
      },
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

  renderLaptop() {
    if ( this.state.fetchingData ){
      return(<div>Loading</div>)
    } else {
      var dataReceived = this.state.dataJSON.card_data.data.details;
      var cards = dataReceived.map(function(data, i){
        return(
          <tbody key={i}>
            <tr>
              <td className="mobile-mla-name"><h5 className="leader-name">{data.name}</h5></td>
              <td className="mobile-mla-assembly"><p>{data.assembly}</p></td>
              <td className="mobile-mla-party"><p>{data.party}</p></td>
            </tr>
          </tbody>
        )
      });
      const data = this.state.dataJSON.card_data.data.details;
      return (
        <div id="protograph_div" className="laptop-div">
          <p id="assembly_location">{this.state.dataJSON.card_data.data.district}</p>
          <h3 id="card_title">Leadership MP</h3>
          <div className="card-scrollable">
            <table className="mla-table">
              <thead>
                <tr>
                  <th className="mobile-mla-name">Name</th>
                  <th className="mobile-mla-assembly">Assembly</th>
                  <th className="mobile-mla-party">Party</th>
                </tr>
              </thead>
              {cards}
            </table>
          </div>
        </div>
      )
    }
  }

  renderMobile() {
    if ( this.state.fetchingData ){
      return(<div>Loading</div>)
    } else {
      var dataReceived = this.state.dataJSON.card_data.data.details;
      var cards = dataReceived.map(function(data, i){
        return(
          <div key={i} className="mla-details">
            <h5 className="leader-name">{data.name}</h5>
            <div className="mla-info" id="mla_party_div">
              <p className="status-titles">Constituency</p>
              <p>{data.assembly}</p>
            </div>
            <div className="mla-info" id="mla_party_div">
              <p className="status-titles">Party</p>
              <p>{data.party}</p>
            </div>
          </div>
        )
      });
      const data = this.state.dataJSON.card_data.data.details;
      return (
        <div id="protograph_div" className="mobile-div">
          <p id="assembly_location">{this.state.dataJSON.card_data.data.district}</p>
          <h3 id="card_title">Leadership MP</h3>
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
      var dataReceived = this.state.dataJSON.card_data.data.details;

      var cards = dataReceived.map(function(data, i){
        return(
          <div key={i} className="mla-details">
            <h5 className="leader-name">{data.name}</h5>
            <div className="mla-info" id="mla_party_div">
              <p className="status-titles">Constituency</p>
              <p>{data.assembly}</p>
            </div>
            <div className="mla-info" id="mla_party_div">
              <p className="status-titles">Party</p>
              <p>{data.party}</p>
            </div>
          </div>
        )
      });
      return (
          <div id="ProtoScreenshot">
            <p id="assembly_location">{this.state.dataJSON.card_data.data.district}</p>
            <h3 id="card_title">Leadership MP</h3>
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
      case 'screenshot' :
          return this.renderScreenshot();
          break;
    }
  }
}
