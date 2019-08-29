var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    concatCSS = require('gulp-concat-css'),
    less = require('gulp-less'),
    minifyCSS = require('gulp-cssnano'),
    prefix = require('gulp-autoprefixer'),
    bSync = require('browser-sync'),
    clean = require('gulp-clean'),
    mainBowerFiles = require('gulp-main-bower-files');


gulp.task('test', function() {
    console.log('Hello World');
})

gulp.task('copy', function() {
    return gulp.src('app/script/**/*.js')
        .pipe(gulp.dest('dist'));
})

gulp.task('uglify', function() {
    return gulp.src('app/script/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
})

gulp.task('concat', function() {
    return gulp.src('app/script/**/*.js')
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
})

gulp.task('scripts', function() {
    return gulp.src('app/script/**/*.js')
        .pipe(concat('main.min.js')) // 把所有js文件合并成一个 main.min.js 文件
        .pipe(uglify()) // 把js文件进行压缩
        .pipe(gulp.dest('dist/script'))
})

gulp.task('styles', function() {
    return gulp.src('app/styles/**/*.less')
        .pipe(less()) // 把less编译成css
        .pipe(concatCSS('main.min.css')) // 把所有css文件合并成一个 main.min.css 文件
        .pipe(minifyCSS()) // 对css文件进行压缩
        .pipe(prefix()) // 自动添加浏览器前缀
        .pipe(gulp.dest('dist/styles'))
})

gulp.task('jshint', function() {
    return gulp.src('app/script/**/*.js')
        .pipe(jshint()) // 检查js文件
        .pipe(jshint.reporter('default')) // 对代码进行报错提示
        .pipe(concat('main.min.js')) // 把所有js文件合并成一个 main.min.js 文件
        .pipe(uglify()) // 把js文件进行压缩
        .pipe(gulp.dest('dist/script'))
})

gulp.task('server', function(done) {
    bSync({
        server: {
            baseDir: ['dist']
        }
    });
    done();
})


gulp.task('default',
    gulp.series(
        gulp.parallel('styles', 'scripts'),
        'server',
        function watcher(done) {
            gulp.watch('app/script/**/*.js', gulp.parallel('scripts'));
            gulp.watch('app/styles/**/*.less', gulp.parallel('styles'));
            gulp.watch('dist/**/*', bSync.reload);
            done();
        }
    )
)

gulp.task('bower-files', function() {
    return gulp.src('bower.json')
    	.pipe(mainBowerFiles())
        .pipe(gulp.dest('dist/bower'));
})

gulp.task('clean-bower-files', function() {
    return gulp.src('dist/bower/*', { read: false })
        .pipe(clean({ force: true }))
})

gulp.task('bower',
    gulp.series(
        'clean-bower-files',
        gulp.parallel('bower-files')
    )
);

