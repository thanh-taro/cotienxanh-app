const path = require('path')
const FtpDeploy = require('ftp-deploy')
const config = {
  user: 'thanhnt@cotienxanh.edu.vn',
  password: 'LL{YM}J^1ZIl',
  host: 'cotienxanh.edu.vn',
  port: 21,
  localRoot: path.join(__dirname, 'build'),
  remoteRoot: '/vuihoc.cotienxanh.edu.vn',
  include: ['*'],
  deleteRemote: true,
  forcePasv: true
}

const ftpDeploy = new FtpDeploy()
ftpDeploy.deploy(config, function (error) {
  if (error) console.log(error)
  else console.log('finished')
})
