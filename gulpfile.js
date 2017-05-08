const gulp = require('gulp');
const dest = require('gulp-dest');
const postcss = require('gulp-postcss');
const nestedcss = require('postcss-nested');
const cssVariables = require('postcss-css-variables');
const cssImports = require('postcss-import');
const iconFont = require('gulp-iconfont');
const iconFontCSS = require('gulp-iconfont-css');

gulp.task('css', () => (
  gulp.src('./css/main.css').pipe(postcss([
    cssImports, cssVariables, nestedcss
  ])).pipe(dest('./css', {ext: 'min.css'})).pipe(gulp.dest(''))
));


gulp.task('icons', () => (
  gulp.src('./img/icons/*.svg').pipe(iconFontCSS({
    fontName: 'icons-font',
    path: './css-icons-template.css',
    targetPath: '../../css/icons.css',
    fontPath: '../fonts/icons-font/'
  })).pipe(iconFont({
    fontName: 'icons-font',
    prependUnicode: false,
    formats: ['ttf', 'eot', 'woff', 'woff2', 'svg']
  })).pipe(gulp.dest('./fonts/icons-font'))
));

gulp.task('build', ['icons', 'css']);

gulp.task('dev', ['build'], () => {
  gulp.watch(['./css/**'], ['css']);
});