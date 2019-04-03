const gulp = require("gulp");
const gutil = require("gulp-util");
const install = require('gulp-install');
const path = require('path');
const shell = require('gulp-shell')

// Tasks relating build
gulp.task('build:server', shell.task('cd server && npm run build && cd build && mkdir -p public'));

gulp.task('build:client', shell.task('cd client && npm run build && rm -rf ../server/build/public/client && mv build ../server/build/public/client'));

gulp.task('build', gulp.series(
    'build:server',
    'build:client'
));

// Tasks relating dependencies
gulp.task('dependencies:client', () => {
    return gulp.src(['./client/package.json']).pipe(install());
});


gulp.task('dependencies:server', () => {
    return gulp.src(['./server/package.json']).pipe(install());
});

gulp.task('dependencies', gulp.series(
    'dependencies:client',
    'dependencies:server',
));

// Postinstall
gulp.task('postinstall', gulp.series(
    'dependencies',
    'build',
));

// Default task
gulp.task('default', gulp.parallel('dependencies'));
