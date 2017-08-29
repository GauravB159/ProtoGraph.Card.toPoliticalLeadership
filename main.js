import React from 'react';
import ReactDOM from 'react-dom';
import PoliticalLeadershipCard from './src/js/Container.jsx';

window.ProtoGraph = window.ProtoGraph || {};
window.ProtoGraph.Card = window.ProtoGraph.Card || {};


ProtoGraph.Card.toPoliticalLeadership = function () {
  this.cardType = 'PoliticalLeadershipCard';
}

ProtoGraph.Card.toPoliticalLeadership.prototype.init = function (options) {
  this.options = options;
}

ProtoGraph.Card.toPoliticalLeadership.prototype.getData = function (data) {
  return this.containerInstance.exportData();
}

ProtoGraph.Card.toPoliticalLeadership.prototype.renderLaptop = function (data) {
  this.mode = 'laptop';
  ReactDOM.render(
    <PoliticalLeadershipCard
      dataURL={this.options.data_url}
      schemaURL={this.options.schema_url}
      optionalConfigURL={this.options.configuration_url}
      optionalConfigSchemaURL={this.options.configuration_schema_url}
      mode={this.mode}
      clickCallback={this.options.onClickCallback}
      ref={(e) => {
        this.containerInstance = this.containerInstance || e;
      }}/>,
    this.options.selector);
}

ProtoGraph.Card.toPoliticalLeadership.prototype.renderMobile = function (data) {
  this.mode = 'mobile';
  ReactDOM.render(
    <PoliticalLeadershipCard
      dataURL={this.options.data_url}
      schemaURL={this.options.schema_url}
      optionalConfigURL={this.options.configuration_url}
      optionalConfigSchemaURL={this.options.configuration_schema_url}
      mode={this.mode}
      clickCallback={this.options.onClickCallback}
      ref={(e) => {
        this.containerInstance = this.containerInstance || e;
      }}/>,
    this.options.selector);
}

ProtoGraph.Card.toPoliticalLeadership.prototype.renderScreenshot = function (data) {
  this.mode = 'screenshot';
  ReactDOM.render(
    <PoliticalLeadershipCard
      dataURL={this.options.data_url}
      schemaURL={this.options.schema_url}
      optionalConfigURL={this.options.configuration_url}
      optionalConfigSchemaURL={this.options.configuration_schema_url}
      mode={this.mode}
      ref={(e) => {
        this.containerInstance = this.containerInstance || e;
      }}/>,
    this.options.selector);
}
