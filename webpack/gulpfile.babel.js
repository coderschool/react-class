import gulp from 'gulp';
import babel from 'gulp-babel';
import del from 'del';
import {argv} from 'yargs';
import webpack from 'webpack-stream';
import connect from 'gulp-connect';
import webpackConfig from './webpack.config.babel';

const paths = {
  allSrcJs: 'src/**/*.js?(x)',
  clientEntryPoint: 'src/app.jsx',  
  libDir: 'target/js',
};

gulp.task('clean', () => {
  var path = argv.output || paths.libDir;
  console.log(path);
  return del(path);
});

gulp.task('build', ['clean'], () => {
  var path = argv.output || paths.libDir;
  console.log(path);
  return gulp.src(paths.clientEntryPoint)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(path));
});

gulp.task('html', () => {
  gulp.src('./src/*.html')
    .pipe(connect.reload());
});

gulp.task('watch', () => {
  gulp.watch(paths.allSrcJs, ['build']);
  gulp.watch('./src/*.html', ['html']);
});

gulp.task('webserver', () => {
  connect.server({
    name: 'Dev App',
    root: ['target', 'src'],
    livereload: true,
    port: 9000,
    host: '0.0.0.0',
  });
});

gulp.task('default', ['webserver', 'watch', 'build']);
