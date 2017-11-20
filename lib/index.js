const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

module.exports= class Creator {
  constructor (opt){
    this.opt = Object.assign({
      folder: {
        root: 'vue-spa',
        dist: 'dist',
        build: 'build',
        api: 'api',
        page: 'page',
        component: 'component',
        store: 'store',
        plugin: 'plugin',
      }
    }, opt || {});
    this.baseDir = process.cwd();
    this.demoPath = path.join(__dirname, 'demo');
  }

  // start create
  start (){
    // get the package setting
    this.packageJson = require(path.join(this.demoPath, './package.json'));
    this.query().then(() => {
      // set project path
      this.projectPath = path.join(this.baseDir, this.opt.folder.root);
      // check if project folder is existed
      if(fs.existsSync(this.projectPath)){
        this.printLog('project folder exists, please remove it first.');
        return;
      }
      // create the project folder
      this.startCreateTime = new Date().getTime();
      this.printLog('creating project.', { before: '\n' });
      fs.mkdirSync(this.projectPath);
      // create files outer
      this.createOuterFiles(this.demoPath, this.projectPath);
      // save package.json
      fs.writeFileSync(path.join(this.projectPath, './package.json'), JSON.stringify(this.packageJson, null, 2));
      // create all folder from demo
      ['dist', 'build', 'api', 'page', 'component', 'store', 'plugin'].forEach(name => {
        this.printLog(`creating ${name} folder.`);
        fs.mkdirSync(path.join(this.projectPath, this.opt.folder[name]));
        this.copyFolder(path.join(this.demoPath, this.opt.folder[name]), path.join(this.projectPath, this.opt.folder[name]));
      });
      this.printLog('done.');
      console.log(`\nTo get started, cd "${this.opt.folder.root}", run "npm install", then run "npm run dev".`);
      console.log('Hava a nice day!\n');
    }).catch(e => {
      throw e;
    });
  }

  // query config from cmd line of user
  query (){
    return new Promise((resolve, reject) => {
      inquirer.prompt([
        {
          type: 'input',
          name: 'projectName',
          message: 'Input your project name: '
        },
        {
          type: 'input',
          name: 'needAxios',
          message: 'Do you need axios?(Y/N)',
        },
        {
          type: 'input',
          name: 'neediView',
          message: 'Do you need iview?(Y/N)',
        },
        {
          type: 'input',
          name: 'needLodash',
          message: 'Do you need lodash?(Y/N)',
        },        
      ]).then(answers => {
        this.opt.folder.root = answers['projectName'];
        this.packageJson.name = answers['projectName'];
        if(answers['needAxios'].toLowerCase() === 'n'){
          delete this.packageJson.dependencies.axios;
        }
        if(answers['neediView'].toLowerCase() === 'n'){
          delete this.packageJson.dependencies.iview;
        }
        if(answers['needLodash'].toLowerCase() === 'n'){
          delete this.packageJson.dependencies.lodash;
        }
        resolve();
      });
    });
  }

  printLog (msg, opt = {}){
    const currentTime = new Date().getTime();
    console.log((opt.before || '') + `>>> ${msg} +${currentTime - this.startCreateTime}ms` + (opt.after || ''));
  }

  copyFolder (src, dist){
    const srcFilelist = fs.readdirSync(src);
    if(!fs.existsSync(dist)){
      fs.mkdirSync(dist);
    }
    srcFilelist.forEach(file => {
      if(fs.statSync(path.join(src, file)).isFile()){
        fs.writeFileSync(path.join(dist, file), fs.readFileSync(path.join(src, file)));
      }else if(fs.statSync(path.join(src, file)).isDirectory()){
        this.copyFolder(path.join(src, file), path.join(dist, file));
      }
    });
  }

  createOuterFiles (src, dist){
    const outerFiles = fs.readdirSync(src);
    outerFiles.forEach(file => {
      if(fs.statSync(path.join(src, file)).isFile() && file !== 'package.json'){
        fs.writeFileSync(path.join(dist, file), fs.readFileSync(path.join(src, file)));
      }
    });
  }

};