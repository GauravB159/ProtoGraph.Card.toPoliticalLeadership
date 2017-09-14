import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import LeadershipCard from './Container.jsx';
import JSONSchemaForm from '../../lib/js/react-jsonschema-form';

export default class EditLeadershipCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 1,
      dataJSON: {
        card_data: {},
        configs: {}
      },
      mode: "laptop",
      publishing: false,
      schemaJSON: undefined,
      fetchingData: true,
      optionalConfigJSON: {},
      optionalConfigSchemaJSON: undefined
    }
    this.toggleMode = this.toggleMode.bind(this);
  }

  exportData() {
    let getDataObj = {
      step: this.state.step,
      dataJSON: this.state.dataJSON.card_data,
      schemaJSON: this.state.schemaJSON,
      optionalConfigJSON: this.state.dataJSON.configs,
      optionalConfigSchemaJSON: this.state.optionalConfigSchemaJSON
    }
    getDataObj["name"] = getDataObj.dataJSON.data.district.substr(0,225); // Reduces the name to ensure the slug does not get too long
    return getDataObj;
  }

  componentDidMount() {
    if (this.state.fetchingData){
      axios.all([axios.get(this.props.dataURL), axios.get(this.props.schemaURL), axios.get(this.props.optionalConfigURL), axios.get(this.props.optionalConfigSchemaURL)])
        .then(axios.spread((card, schema, opt_config, opt_config_schema) => {
          this.setState({
            fetchingData: false,
            dataJSON: {
              card_data: card.data,
              configs: opt_config.data
            },
            schemaJSON: schema.data,
            optionalConfigJSON: opt_config.data,
            optionalConfigSchemaJSON: opt_config_schema.data
          });
        }));
    }
  }

  onChangeHandler({formData}) {
    switch (this.state.step) {
      case 1:
        this.setState((prevStep, prop) => {
          let dataJSON = prevStep.dataJSON;
          dataJSON.card_data = formData
          return {
            dataJSON: dataJSON
          }
        })
        break;
      case 2:
        this.setState((prevStep, prop) => {
          let dataJSON = prevStep.dataJSON;
          dataJSON.configs = formData
          return {
            dataJSON: dataJSON
          }
        })
        break;
    }
  }

  onSubmitHandler({formData}) {
    switch(this.state.step) {
      case 1:
        this.setState({
          step: 2
        });
        break;
      case 2:
        if (typeof this.props.onPublishCallback === "function") {
          this.setState({ publishing: true });
          let publishCallback = this.props.onPublishCallback();
          publishCallback.then((message) => {
            this.setState({ publishing: false });
          });
        }
        break;
    }
  }

  renderSEO() {
    let data = this.state.dataJSON.card_data.data.details;
    let blockquote_string = data.map((d, i) => {
      return `<h3>${d.name}</h3><p>${d.party}</p><p>${d.assembly}</p></p>`
    })
    let seo_blockquote = '<blockquote>' + blockquote_string.join() + '</blockquote>'
    return seo_blockquote;
  }

  renderSchemaJSON() {
    switch(this.state.step){
      case 1:
        return this.state.schemaJSON;
        break;
      case 2:
        return this.state.optionalConfigSchemaJSON;
        break;
    }
  }

  renderFormData() {
    switch(this.state.step) {
      case 1:
        return this.state.dataJSON.card_data;
        break;
      case 2:
        return this.state.dataJSON.configs;
        break;
    }
  }

  showLinkText() {
    switch(this.state.step) {
      case 1:
        return '';
        break;
      case 2:
        return '< Back to building the card';
        break;
    }
  }

  showButtonText() {
    switch(this.state.step) {
      case 1:
        return 'Next';
        break;
      case 2:
        return 'Publish';
        break;
    }
  }

  onPrevHandler() {
    let prev_step = --this.state.step;
    this.setState({
      step: prev_step
    });
  }

  toggleMode(e) {
    let element = e.target.closest('a'),
      mode = element.getAttribute('data-mode');
    this.setState((prevState, props) => {
      let newMode;
      if (mode !== prevState.mode) {
        newMode = mode;
      } else {
        newMode = prevState.mode
      }

      return {
        mode: newMode
      }
    })
  }

  render() {

    if (this.state.fetchingData) {
      return(<div>Loading</div>)
    } else {
      return (
        <div className="proto-container">
          <div className="ui grid form-layout">
            <div className="row">
              <div className="four wide column proto-card-form">
                <div>
                  <div className="section-title-text">Fill the form</div>
                  <div className="ui label proto-pull-right">
                    toPoliticalLeadership
                  </div>
                </div>
                <JSONSchemaForm schema={this.renderSchemaJSON()}
                  onSubmit={((e) => this.onSubmitHandler(e))}
                  onChange={((e) => this.onChangeHandler(e))}
                  formData={this.renderFormData()}>
                  <a id="protograph-prev-link" className={`${this.state.publishing ? 'protograph-disable' : ''}`} onClick={((e) => this.onPrevHandler(e))}>{this.showLinkText()} </a>
                  <button type="submit" className={`${this.state.publishing ? 'ui primary loading disabled button' : ''} default-button protograph-primary-button`}>{this.showButtonText()}</button>
                </JSONSchemaForm>
              </div>
              <div className="twelve wide column proto-card-preview proto-share-card-div">
                <div className="protograph-menu-container">
                  <div className="ui compact menu">
                    <a className={`item ${this.state.mode === 'laptop' ? 'active' : ''}`}
                      data-mode='laptop'
                      onClick={this.toggleMode}
                    >
                      <i className="desktop icon"></i>
                    </a>
                    <a className={`item ${this.state.mode === 'mobile' ? 'active' : ''}`}
                      data-mode='mobile'
                      onClick={this.toggleMode}
                    >
                      <i className="mobile icon"></i>
                    </a>
                  </div>
                </div>
                <LeadershipCard
                  mode={this.state.mode}
                  dataJSON={this.state.dataJSON}
                  schemaJSON={this.state.schemaJSON}
                  optionalConfigJSON={this.state.optionalConfigJSON}
                  optionalConfigSchemaJSON={this.state.optionalConfigSchemaJSON}
                />
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}
