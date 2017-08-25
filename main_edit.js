import React from 'react';
import ReactDOM from 'react-dom';
import EditLeadershipMLACard from './src/js/edit_leadership_mla_card.jsx';

ProtoGraph.Card.toLeadershipMLA.prototype.getData = function (data) {
  return this.containerInstance.exportData();
}

ProtoGraph.Card.toLeadershipMLA.prototype.renderSEO = function (data) {
  this.renderMode = 'SEO';
  return this.containerInstance.renderSEO();
}

ProtoGraph.Card.toLeadershipMLA.prototype.renderEdit = function (onPublishCallback) {
  console.log(this.options);
  this.mode = 'edit';
  this.onPublishCallback = onPublishCallback;
  ReactDOM.render(
    <EditLeadershipMLACard
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
