import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Links } from '../../imports/collections/links';

class LinkList extends Component {
  renderRows() {
    // helper method
    // generate a row for each link containing the full url, shortend url and its link
    // and the number of visits (clicks)
    // links passed in as props
    return this.props.links.map(link => {
      const { url, clicks, token } = link;
      // same as 'http://localhost:3000/' + token
      // es6 template string, instead of string concatination
      const shortLink = `http://localhost:3000/${token}`;

      return (
        <tr key={token}>
          <td>{url}</td>
          <td>
            <a href={shortLink}>{shortLink}</a>
          </td>
          <td>
            {clicks}
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>URL</th>
            <th>Address</th>
            <th>Clicks</th>
          </tr>
        </thead>
        <tbody>
          {this.renderRows()}
        </tbody>
      </table>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('links');

  // makes all published links available as props for link_list
  return { links: Links.find({}).fetch() };
}, LinkList);
