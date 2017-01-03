var preprocessors = ['webpack'];
var loaders = ['awesome-typescript-loader'];
var reporters = ['progress'];

if (process.env.COVERAGE) {
    preprocessors.push('coverage');
    reporters.push('coverage');
    loaders.unshift('istanbul-instrumenter');
}

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            './test/*Spec.tsx'
        ],


        // list of files to exclude
        exclude: [
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            '**/*.tsx': ['webpack'],
            './src/**/*.ts': preprocessors,
            './src/**/*.tsx': preprocessors
        },

        webpack: {
            resolve: {
                extensions: ['', '.ts', '.tsx', '.js']
            },
            module: {
                loaders: [
                    {
                        exclude: /node_modules/,
                        loader: 'awesome-typescript-loader',
                        test: /Spec\.tsx$/
                    },
                    {
                        exclude: /Spec/,
                        loaders: loaders,
                        test: /\.tsx?$/
                    },
                    {
                        test: /\.scss$/,
                        loaders: ['style-loader', 'css-loader?modules&camelCase', 'sass-loader', 'postcss-loader?parser=postcss-scss']
                    }
                ]
            }
        },
        webpackMiddleware: {
            noInfo: true
        },
        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: reporters,


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
}
