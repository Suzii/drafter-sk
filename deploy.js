const FtpDeploy = require('ftp-deploy');
const ftpDeploy = new FtpDeploy();

const config = {
  username: "vr007700",
  host: "ftp.drafter.sk",
  port: 21,
  localRoot: __dirname + "/build",
  remoteRoot: "/_sub/beta/",
};


ftpDeploy.on('uploading', function(data) {
  console.log(`...${data.percentComplete}%`);
  console.log(`Uploading: ${data.filename}`);
});
ftpDeploy.on('uploaded', function(data) {
  console.log(data);         // same data as uploading event
});

ftpDeploy.deploy(config, function(err) {
  if (err)
    console.log(err);
  else
    console.log('finished');
});
