const gulp = require('gulp');
const dest = require('gulp-dest');
const postcss = require('gulp-postcss');
const nestedcss = require('postcss-nested');
const cssVariables = require('postcss-css-variables');
const cssImports = require('postcss-import');
const iconFont = require('gulp-iconfont');
const iconFontCSS = require('gulp-iconfont-css');

gulp.task('css', () => (
  gulp.src('./src/css/main.css').pipe(postcss([
    cssImports, cssVariables, nestedcss
  ])).pipe(dest('./dist/css', {ext: 'min.css'})).pipe(gulp.dest(''))
));

gulp.task('copy:img', () => (
  gulp.src('./src/img/*.*').pipe(gulp.dest('./dist/img'))
));

gulp.task('copy:fonts', () => (
  gulp.src('./src/fonts/**').pipe(gulp.dest('./dist/fonts'))
));

gulp.task('copy:html', () => (
  gulp.src('./src/index.html').pipe(gulp.dest('./dist'))
));

gulp.task('copy:favicon', () => (
  gulp.src('./src/favicon.png').pipe(gulp.dest('./dist'))
));

gulp.task('copy', ['copy:img', 'copy:fonts', 'copy:html', 'copy:favicon']);

gulp.task('icons', () => (
  gulp.src('./src/img/icons/*.svg').pipe(iconFontCSS({
    fontName: 'icons-font',
    path: './css-icons-template.css',
    targetPath: '../../css/icons.css',
    fontPath: '../fonts/icons-font/'
  })).pipe(iconFont({
    fontName: 'icons-font',
    prependUnicode: false,
    formats: ['ttf', 'eot', 'woff', 'woff2', 'svg']
  })).pipe(gulp.dest('./dist/fonts/icons-font'))
));

gulp.task('build', ['icons', 'css', 'copy']);

gulp.task('dev', ['build'], () => {
  gulp.watch(['./src/css/**'], ['css']);
});