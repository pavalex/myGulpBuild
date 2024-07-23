const gulp = require('gulp')
const less = require('gulp-less')
const del = require('del')
const rename = require('gulp-rename')
const cleanCSS = require('gulp-clean-css')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')

const paths = {
    styles: {
        src: 'src/styles/**/*.less',
        dest: 'dist/css/'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'dist/js/'
    }
}

// Удаление папки dist
function clean() {
    return del(['dist'])
}

// Стили
function styles() {
    return gulp.src(paths.styles.src)                   // Берем файлы из src
        .pipe(less())                                   // Компиляция Less файлов
        .pipe(cleanCSS())                               // Минификация и оптимизация CSS файлов
        .pipe(rename({                                  // Переименовывает файлы
            basename: 'main',
            suffix: '.min'
        }))                               
        .pipe(gulp.dest(paths.styles.dest))             // Помещаем файлы в dist     
}

// Скрипты
function scripts() {
    return gulp.src(paths.scripts.src, {                // Берем файлы из src
        sourcemaps: true
    })
        .pipe(babel())                                  // Преобразует Java Script в старый стандарт
        .pipe(uglify())                                 // Сжатие и оптимизация Java Script кода
        .pipe(concat('main.min.js'))                    // Объединение нескольких файлов в один
        .pipe(gulp.dest(paths.scripts.dest))            // Помещаем файлы в dist 
}

// Отслеживание изменений
function watch() {
    gulp.watch(paths.styles.src, styles)
    gulp.watch(paths.scripts.src, scripts)
}

const build = gulp.series(clean, gulp.parallel(styles, scripts), watch)         // Последовательное и параллельное выполнение задач

exports.clean = clean
exports.styles = styles
exports.watch = watch
exports.scripts = scripts
exports.build = build
exports.default = build