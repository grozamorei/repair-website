const gulp = require('gulp')

gulp.task('server-tests', function () {
    console.log('test stub')
})

gulp.task('nodemon-run', ['server-tests'], function() {
    const nodemon = require('gulp-nodemon')
    const path = require('path')
    const nd = nodemon({
        script: './app.js',
        ext: 'js',
        cwd: './src/',
        tasks: (files) => {
            return ['server-tests']
        },
        env: {NODE_ENV: 'DEVELOPMENT'}
    })
})

gulp.task('default', ['server-tests', 'nodemon-run'])