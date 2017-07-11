// executes on both client and server side
// on the client it is a optomistic update of the collection, makes the app look instant
// on the server if it is validated ok it is saved to the database
// on the server if it is not valid it is removed from the client collection

import { Mongo } from 'meteor/mongo';
import validUrl from 'valid-url';
import { check, Match } from 'meteor/check';

Meteor.methods({
  'links.insert': function(url) {
    // console.log("attempting to save", url);

    // check throws error if inner function fails which can be used to show the user
    // Match.where is used because it is a custom validation
    // validUrl checks if url is valid using npm package valid-url
    check(url, Match.Where(url => validUrl.isUri(url)));


    // generate token e.g. uv7vi
    // generates random numbers between 0 and 9 or a - z
    // converts to a string
    // of 5 digits long
    const token = Math.random().toString(36).slice(-5);
    // inserts record into collection (url, token and number of times its been visited
    // starting at 0 visits
    Links.insert({ url, token, clicks: 0 });
  }
});

export const Links = new Mongo.Collection('links');
