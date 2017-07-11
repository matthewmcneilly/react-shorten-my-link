import { Meteor } from 'meteor/meteor';
import { Links } from '../imports/collections/links';
// middleware are functions that are called when requests come in
// WebApp is the server component of meteor, handles incoming requests and what
// to do with them
import { WebApp } from 'meteor/webapp';
// like express - parses urls then does something
import ConnectRoute from 'connect-route';

Meteor.startup(() => {
  Meteor.publish('links', function() {
    return Links.find({});
  });
});

// request, response and next middleware to run
function onRoute(req, res, next) {
  // go through links collection and take first record which has a token which matches
  const link = Links.findOne({ token: req.params.token });

  if (link) {
    // If we find a link object, redirect the user to the
    // long URL

    // update link counter on database
    // uses mongo style modifiers
    // increments the links click count by 1
    // meteor method not required here as it taking place on the server
    // meteor method would be used if client is updating the database
    Links.update(link, { $inc: { clicks: 1 }});

    // 307 status code - temporary redirect
    // url is the full url
    res.writeHead(307, { 'Location': link.url });
    // send response back to user
    res.end();
  } else {
    // If we don't find a link object, send the user
    // to our middleware if there is one
    // then back to the react application
    next();
  }
}

// creates middleware that takes an incoming http request
// if requests matches localhost:3000/singlestringofcharacterds then execute onRoute function
// i.e. if accessing a shorturl call redirect function
const middleware = ConnectRoute(function(router) {
  router.get('/:token', onRoute);
});

WebApp.connectHandlers.use(middleware);

// would log all the information about the request
// .use(req => console.log(reg));
