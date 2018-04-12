const server=require('node-http-server');

server.deploy(
  {
      port:8081,
      root:'./'
  },
  serverReady
);
function serverReady(server){
  //  console.log( `Server on port ${server.config.port} is now up`);
}
