var gulp = require('gulp')
var server = require('gulp-webserver')
var bysass = require('gulp-sass')
var url = require('url')
var yscss = require('gulp-clean-css')
var fs = require('fs')
var path = require('path')
console.log(yscss)
gulp.task('yscss', function() {
    return gulp.src('./src/sass/*.scss')
        .pipe(bysass())
        .pipe(yscss())
        .pipe(gulp.dest('./newsrc/css'))
})

gulp.task('server', function() {
    return gulp.src('./src')
        .pipe(server({
            port: 8899,
            open: true,
            middleware: function(req, res, next) {
                console.log(req.url)
                var pathname = url.parse(req.url).pathname
                if (pathname == '/favicon.ico') {
                    res.end()
                    return
                }
                if (pathname == '/api/aa') {

                } else {
                    pathname = pathname == '/' ? 'html/index.html' : pathname
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }
            }
        }))
})

//监听yscss
gulp.task('watch', function() {
    return gulp.watch('./src/sass/*.scss', gulp.series('yscss'))
})
gulp.task('hb', gulp.series('yscss', 'server', 'watch'))