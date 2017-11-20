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
		this.demoPath = path.join(__dirname, 'demo');
	}

	// create API folder
	create (){
		this.startCreateTime = new Date().getTime();
		this.printLog('creating project');
		this.packageJson = require(path.join(__dirname, './demo/package.json'));
		this.query().then(() => {
			// project folder
			this.projectPath = path.join(this.baseDir, this.opt.folder.root);
			if(fs.existsSync(this.projectPath)){
				this.printLog('project folder exists, please remove it first.');
				return;
			}
			fs.mkdirSync(this.projectPath);
			this.createOuterFiles(this.demoPath, this.projectPath);
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
				// save package.json
				fs.writeFileSync(path.join(__dirname, './demo/package.json'), JSON.stringify(this.packageJson));
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

	createOuterFiles (src, dist){
		const outerFiles = fs.readdirSync(src);
		outerFiles.forEach(file => {
			if(fs.statSync(path.join(src, file)).isFile()){
				fs.writeFileSync(path.join(dist, file), fs.readFileSync(path.join(src, file)));
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
		this.copyFolder(path.join(__dirname, './demo/build'), path.join(this.projectPath, this.opt.folder.build));
	}

	createAPI (){
		this.printLog('creating api folder');
		// api folder
		this.copyFolder(path.join(__dirname, './demo/api'), path.join(this.projectPath, this.opt.folder.api));
	}

	createPage (){
		this.printLog('creating page folder');
		// page folder
		this.copyFolder(path.join(__dirname, './demo/page'), path.join(this.projectPath, this.opt.folder.page));
	}

	createComponent (){
		this.printLog('creating component folder');
		// component folder
		this.copyFolder(path.join(__dirname, './demo/component'), path.join(this.projectPath, this.opt.folder.component));
	}

	createStore (){
		this.printLog('creating store folder');
		// store folder
		this.copyFolder(path.join(__dirname, './demo/store'), path.join(this.projectPath, this.opt.folder.store));
	}

	createPlugin (){
		this.printLog('creating plugin folder');
		// plugin folder
		this.copyFolder(path.join(__dirname, './demo/plugin'), path.join(this.projectPath, this.opt.folder.plugin));
	}
};

const creator = new Creator();
creator.create();