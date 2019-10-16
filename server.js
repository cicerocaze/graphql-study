var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

var root = { hello: () => 'Hello world!' };

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.get('/', function(req, res) {
    res.sendFile('./index.html', {root: __dirname});
});

app.use('/static', express.static('public'));

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));