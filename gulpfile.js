const DEBUG_PORT = 3001
const RELOAD_TIMER = 200
const isWin = /^win/.test(process.platform)

const gulp = require('gulp')
const nodemon = require('gulp-nodemon')
const livereload = require('gulp-livereload')

//
// CLIENT TASKS
//

gulp.task('clean-static', () => {
    const clean = require('gulp-clean')
    return gulp.src([
        'src/static/*.js', 
        'src/static/*.css', 
        'src/static/*.html'
        ], 
        {read: false}).pipe(clean())
})

gulp.task('deploy-static', ['clean-static'], () => {
    const concat = require('gulp-concat')
    const uglify = require('gulp-uglify')

    // deploy minified js
    gulp.src('src/static-src/js/*.js')
        .pipe(uglify())
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./src/static'))

    // deploy minified css
    gulp.src('src/static-src/css/*.css')
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('./src/static'))

    // deploy assets
    gulp.src('src/static-src/assets/*.*')
        .pipe(gulp.dest('./src/static/content'))

    // deploy html
    gulp.src('src/static-src/*.html')
        .pipe(gulp.dest('./src/static'))
})

//
// SERVER TASKS
//

gulp.task('server-tests', () => {
    console.log('test stub')
})

gulp.task('nodemon-run', ['server-tests', 'deploy-static'], () => {
    livereload.listen()

    nodemon({
        script: './app.js',
        ext: 'js html css',
        cwd: './src/',
        env: {NODE_ENV: 'DEVELOPMENT', PORT: DEBUG_PORT},
        tasks: (files) => {
            let needReload = false
            files.forEach((f) => {
                if (f.match(/.*static-src./i)) needReload = true
                if (f.match(/.*app.js/i)) needReload = true
            })
            if (needReload) {
                gulp.src(files).pipe(livereload())
                return ['deploy-static']
            }
            return []
        }
    })
})

gulp.task('default', ['nodemon-run'])