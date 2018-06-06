'use strict';
var path = require('path');
var modRewrite = require('connect-modrewrite');

// Default settings
module.exports.uglifyJs = process.env.UGLIFYJS || true;
module.exports.minifyCss = process.env.MINIFYCSS || true;
module.exports.cacheBust = process.env.CACHEBUST || false;
module.exports.optimizeImages = process.env.OPTIMIZEIMAGES || true;
module.exports.optimizeCss = process.env.OPTIMIZECSS || false;
module.exports.lintJs = process.env.LINTJS || false;

// Default paths
var app = 'app';
var tmp = '.tmp';
var dist = 'dist';
var bowerDir = 'bower_components';

// Default paths in app folder
var data = 'data';
var fonts = 'fonts';
var images = 'images';
var sprites = 'sprites';
var scripts = 'scripts';
var styles = 'styles';
var views = 'views';

// Rewrite rules enables removing .html extensions in development.
// This are possible routes for same test.html file:
// http://localhost:3000/test.html
// http://localhost:3000/test
var rewriteRules = [
  '^/$ - [L]', // default site root handling (index.html)
  '.html$ - [L]', // ignore routes ends with '.html'
  '(.*)/$ $1/index.html [L]', // routes with trailing slash are directories -> rewrite to directory index.html
  '\\/\[a-zA-Z0-9_\\-\@.]+\\.\[a-zA-Z0-9]+$ - [L]', // ignore files with extension (eg. .css, .js, ...)
  '(.*)$ $1.html [L]' // redirect routes ends with string without trailing slash to original html
];

// Browser sync task config
module.exports.browserSync = {
  dev: {
    server: {
      baseDir: [tmp, app],
      routes: {
        '/bower_components': bowerDir
      }
    },
    notify: false,
    debugInfo: false,
    host: 'localhost',
    middleware: [
      modRewrite(rewriteRules)
    ]
  },
  dist: {
    server: {
      baseDir: dist
    },
    notify: false,
    debugInfo: false,
    host: 'localhost',
    middleware: [
      modRewrite(rewriteRules)
    ]
  }
};

// Build size task config
module.exports.buildSize = {
  srcAll: dist + '/**/*',
  cfgAll: {
    title: 'build',
    gzip: true
  },
  srcCss: path.join(dist, styles, '/**/*'),
  cfgCss: {
    title: 'CSS',
    gzip: true
  },
  srcJs: path.join(dist, scripts, '/**/*'),
  cfgJs: {
    title: 'JS',
    gzip: true
  },
  srcImages: path.join(dist, images, '/**/*'),
  cfgImages: {
    title: 'Images',
    gzip: false
  }
};

// Clean task config
// Be carefull what you cleaning!
module.exports.clean = [tmp, dist];

// Copy fonts task config
module.exports.copyFonts = {
  src: [
    path.join(app, fonts, '**/*'), 'bower_components/**/*.{eot,svg,ttf,woff,woff2}' // bower-fonts
  ],
  dest: dist + '/fonts'
};


// Copy extras task config
module.exports.copyExtras = {
  src: [
    app + '/*.*',
    '!' + app + '/*.html'
  ],
  dest: dist,
  cfg: {
    dot: true
  }
};

// Images task config
module.exports.sprites = {
  src: path.join(app, sprites, '/*'),
  svg: path.join(images, '/svg/sprite.svg'),
  dest: path.join(app, '/')
};


// Images task config
module.exports.images = {
  src: path.join(app, images, '**/*.{gif,png,jpg}'),
  srcSVG: path.join(app, images, '**/*.svg'),
  dest: dist + '/images',
  cfg: {
    progressive: true,
    interlaced: true,
    svgoPlugins: [{cleanupIDs: false}]
  }
};

// JSHint task config
module.exports.eslint = {
  src: [
    path.join(app, scripts,'**/*.js'),
    path.join('!' + app, scripts,'plugins/**/*.js') // do not lint external plugins
  ]
};

// User scripts task
module.exports.scripts = {
  src: path.join(app, scripts, '**/*.js'),
  dest: path.join(tmp, scripts)
};

// Styles task config
module.exports.styles = {
  src: path.join(app, styles, '*.scss'),
  dest: path.join(tmp,styles),
  sassCfg: {},
  autoprefixerCfg: {browsers: ['> 0.01%', 'IE 9']}
};

// Templates task config
module.exports.templates = {
  src: path.join(app, views, '*.pug'),
  srcBuild: path.join(tmp, 'pug/*.pug'),
  dest: tmp,
  destBuild: path.join(dist),
  cfg: {
    pretty: true,
    compileDebug: true
  }
};

// TemplatesData task config
module.exports.templatesData = {
  src: path.join(app, views, data, '/**/*.json'),
  dest: app + '/views',
  dataName: 'data.json',
  dataPath: path.join(app, views, 'data.json')
};

module.exports.useref = {
  src: path.join(app, views, '/**/*.pug'),
  dest: dist,
  destPug: path.join(tmp, 'pug'),
  assetsCfg: {
    searchPath : app
  },
  revManifestCfg: {merge: true}
};

// Watch task config
module.exports.watch = {
  sprites: path.join(app, sprites, '/*'),
  styles: path.join(app, styles, '/**/*.scss'),
  pug: [
    path.join(app, views, '/**/*.pug'),
    path.join(app, views, data, '/**/*.json')
  ],
  scripts: path.join(app, scripts, '/**/*.js'),
  wiredep: 'bower.json'
};

// Wiredep task config
module.exports.wiredep = {
  sass: {
    src: path.join(app, styles, '/*.scss'),
    dest: path.join(app, styles),
    cfg: {
      ignorePath: '',
      overides: {}
    }
  },
  pug: {
    src: path.join(app, views, '/layouts/*.pug'),
    dest: path.join(app, views, '/layouts'),
    cfg: {
      exclude: ['modernizr'],
      ignorePath: '../../',
      overides: {}
    }
  }
};
