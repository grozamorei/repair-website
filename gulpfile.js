const DEBUG_PORT = 3001
const RELOAD_TIMER = 200

const gulp = require('gulp')

gulp.task('server-tests', () => {
    console.log('test stub')
})

gulp.task('nodemon-run', ['server-tests'], () => {
    const nodemon = require('gulp-nodemon')
    const livereload = require('gulp-livereload')
    livereload.listen()

    nodemon({
        script: './app.js',
        ext: 'js',
        cwd: './src/',
        env: {NODE_ENV: 'DEVELOPMENT', PORT: DEBUG_PORT}
    }).on('restart', (files) => {
        setTimeout(()=> {
            gulp.src(files).pipe(livereload())
        }, RELOAD_TIMER)
    })
})

gulp.task('default', ['server-tests', 'nodemon-run'])