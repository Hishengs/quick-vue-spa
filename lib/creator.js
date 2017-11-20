const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

class Creator {
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
	}

	// create API folder
	create (){
		this.startCreateTime = new Date().getTime();
		this.printLog('creating project');
		// project folder
		this.projectPath = path.join(this.baseDir, this.opt.folder.root);
		if(fs.existsSync(this.projectPath)){
			this.printLog('project folder exists, please remove it first.');
			return;
		}
		this.packageJson = require(path.join(__dirname, './demo/package.json'));
		this.query().then(() => {
			fs.mkdirSync(this.projectPath);
			this.createDist();
			this.createBuild();
			this.createAPI();
			this.createPage();
			this.createComponent();
			this.createStore();
			this.createPlugin();
			this.printLog('done');
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
				'Input your project name: ',
				'Do you need axios?(Y/N)',
				'Do you need iview?(Y/N)',
				'Do you need lodash?(Y/N)',
			]).then(answers => {
				this.opt.folder.root = answers[0];
				if(answers[1].toLowerCase() === 'n'){
					delete this.packageJson.axios;
				}
				if(answers[2].toLowerCase() === 'n'){
					delete this.packageJson.iview;
				}
				if(answers[3].toLowerCase() === 'n'){
					delete this.packageJson.lodash;
				}
				resolve();
			});
		});
	}

	printLog (msg){
		const currentTime = new Date().getTime();
		console.log(`>>> ${msg} +${currentTime - this.startCreateTime}ms`);
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

	createDist (){
		this.printLog('creating dist folder');
		// dist folder
		fs.mkdirSync(path.join(this.projectPath, this.opt.folder.dist));
	}

	createBuild (){
		this.printLog('creating build folder');
		// build folder
		fs.mkdirSync(path.join(this.projectPath, this.opt.folder.build));
	}

	createAPI (){
		this.printLog('creating api folder');
		// api folder
		// fs.mkdirSync(path.join(this.projectPath, this.opt.folder.api));
		this.copyFolder(path.join(__dirname, './demo/api'), path.join(this.projectPath, this.opt.folder.api));
	}

	createPage (){
		this.printLog('creating page folder');
		// page folder
		fs.mkdirSync(path.join(this.projectPath, this.opt.folder.page));
	}

	createComponent (){
		this.printLog('creating component folder');
		// component folder
		fs.mkdirSync(path.join(this.projectPath, this.opt.folder.component));
	}

	createStore (){
		this.printLog('creating store folder');
		// store folder
		fs.mkdirSync(path.join(this.projectPath, this.opt.folder.store));
	}

	createPlugin (){
		this.printLog('creating plugin folder');
		// plugin folder
		fs.mkdirSync(path.join(this.projectPath, this.opt.folder.plugin));
	}
};

const creator = new Creator();
creator.create();