import React from 'react';
import ReactDOM from 'react-dom';
import LeadershipMLACard from './src/js/Container.jsx';

window.ProtoGraph = window.ProtoGraph || {};
window.ProtoGraph.Card = window.ProtoGraph.Card || {};


ProtoGraph.Card.toLeadershipMLA = function () {
  this.cardType = 'LeadershipMLACard';
}

ProtoGraph.Card.toLeadershipMLA.prototype.init = function (options) {
  this.options = options;
}

ProtoGraph.Card.toLeadershipMLA.prototype.getData = function (data) {
  return this.containerInstance.exportData();
}

ProtoGraph.Card.toLeadershipMLA.prototype.renderLaptop = function (data) {
  this.mode = 'laptop';
  ReactDOM.render(
    <LeadershipMLACard
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

ProtoGraph.Card.toLeadershipMLA.prototype.renderMobile = function (data) {
  this.mode = 'mobile';
  ReactDOM.render(
    <LeadershipMLACard
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

ProtoGraph.Card.toLeadershipMLA.prototype.renderScreenshot = function (data) {
  this.mode = 'screenshot';
  ReactDOM.render(
    <LeadershipMLACard
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
