var gulp = require('gulp-help')(require('gulp'));
var zip = require('gulp-zip');
var gutil = require('gulp-util');
var rimraf = require('rimraf');
var path = require('path');
var extensionPath = path.resolve(__dirname, 'extension');
var browserify = require('browserify');
var transform = require('vinyl-transform');
var through2 = require('through2');

gulp.task('default', ['build']);
gulp.task('build', 'Rebuild the extension files', ['extension-assets', 'extension-browserify']);

gulp.task('extension-browserify', 'Browserify the extension files', ['prepare'], function() {
  
  gulp.src('./src/index.js')
    .pipe(through2.obj(function (file, enc, next){
            browserify(file.path)
                .bundle(function(err, res){
                    // assumes file.contents is a Buffer
                    file.contents = res;
                    next(null, file);
                });
        }))
    .pipe(gulp.dest('./dist'))
});



gulp.task('extension-assets', 'Copy the extension source assets into the dist folder', ['prepare', 'chromex-assets'], function() {
  return gulp.src([
    './src/*.png',
    './src/*.svg',
    './src/*.json'
  ])
  .pipe(gulp.dest('./dist'));
});

gulp.task('chromex-assets', 'Assets required for the chromex code to work as expected', ['prepare'], function() {
  return gulp.src([
    './node_modules/chromex/scripts/*.js'
  ])
  .pipe(gulp.dest('./dist/scripts'));
});

gulp.task('prepare', 'Prepare the build', ['clean'], function() {
});

gulp.task('clean', 'Clean the extension dist directory', function(cb) {
  rimraf(path.join(extensionPath, 'dist'), cb);
});

gulp.task('package', 'Package the extension for deployment', ['build'], function() {
  return gulp.src([
    './dist/**',
  ], { base: './dist' })
  .pipe(zip('bundle.zip'))
  .pipe(gulp.dest('.//'));
});
