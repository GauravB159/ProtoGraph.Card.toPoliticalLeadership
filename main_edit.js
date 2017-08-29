import React from 'react';
import ReactDOM from 'react-dom';
import EditPoliticalLeadership from './src/js/edit_political_leadership_card.jsx';

ProtoGraph.Card.toPoliticalLeadership.prototype.getData = function (data) {
  return this.containerInstance.exportData();
}

ProtoGraph.Card.toPoliticalLeadership.prototype.renderSEO = function (data) {
  this.renderMode = 'SEO';
  return this.containerInstance.renderSEO();
}

ProtoGraph.Card.toPoliticalLeadership.prototype.renderEdit = function (onPublishCallback) {
  console.log(this.options);
  this.mode = 'edit';
  this.onPublishCallback = onPublishCallback;
  ReactDOM.render(
    <EditPoliticalLeadership
      dataURL={this.options.data_url}
      schemaURL={this.options.schema_url}
      optionalConfigURL={this.options.configuration_url}
      optionalConfigSchemaURL={this.options.configuration_schema_url}
      onPublishCallback={this.onPublishCallback}
      mode={this.mode}
      ref={(e) => {
        this.containerInstance = this.containerInstance || e;
      }}/>,
    this.options.selector);
}
