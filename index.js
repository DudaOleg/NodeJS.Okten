// const fs = require('fs');
// const path = require('path');

// ------------------------------------------------------Це як створював
// fs.mkdir(path.join(__dirname, "2000"),
//         err => {
//     if (err) throw new Error(err);
//     console.log('Папка 1800 створена');
//
//     fs.writeFile(path.join(__dirname, '2000', 'Julia.txt'),
//     '{"gender": "female"}',
//         err => {
//         if (err) throw new Error(err);
//         console.log('Файл Ira створено');
//     });
// });
//
// fs.mkdir(path.join(__dirname, '1800'),
//         err => {
//     if (err) throw new Error(err);
//     console.log('Папка 2000 створена');
//
//     fs.writeFile(path.join(__dirname, '1800', 'Oleg.txt'),
//         '{"gender": "male"}',
//         err => {
//         if (err) throw  new Error(err);
//             console.log('Файл Oleg створенно');
//     });
//
// });
//------------------------------------------------------------


// 1-Завдання
// const folderOne = path.join(__dirname, '1800');
// const folderTwo = path.join(__dirname, '2000');
//
// male(folderOne, folderTwo);
//
// function male(first, second) {
//     fs.readdir(first, (err, files) => {
//         if (err) throw new Error(err);
//         files.forEach(file => {
//             const PathFile = path.join(first, file);
//             stat(first, second, file, PathFile)
//         });
//     });
// };
//
// function rename(first, second, file) {
//     fs.rename(path.join(first, file), path.join(second, file), err => {
//         if (err) throw new Error(err);
//     });
// };
//
// function readFile(first, second, file) {
//     fs.readFile(path.join(first, file), (err, textFromFile) => {
//         if (err) throw new Error(err);
//         let data = JSON.parse(textFromFile);
//         if (data.gender === 'male') {
//             rename(first, second, file)
//         }
//     });
// };
//
// function stat(first, second, file, PathFile) {
//     fs.stat(PathFile, (err, stats) => {
//         if (err) throw new Error(err);
//         if (stats.isFile()) {
//             readFile(first, second, file)
//         }
//     });
// };
//
//
// female(folderTwo, folderOne);
//
// function female(first, second) {
//     fs.readdir(first, (err, files) => {
//         if (err) throw new Error(err);
//         files.forEach(file => {
//             const PathFile = path.join(first, file)
//             statFemale(first, second, file, PathFile)
//         });
//     });
// };
//
// function renameFemale(first, second, file) {
//     fs.rename(path.join(first, file), path.join(second, file), err => {
//         if (err) throw new Error(err);
//     });
// };
//
// function readFileFemale(first, second, file) {
//     fs.readFile(path.join(first, file), (err, textFromFile) => {
//         if (err) throw new Error(err);
//         let data = JSON.parse(textFromFile);
//         if (data.gender === 'female') {
//             renameFemale(first, second, file)
//         }
//     });
// };
//
// function statFemale(first, second, file, PathFile) {
//     fs.stat(PathFile, (err, stats) => {
//         if (err) throw new Error(err);
//         if (stats.isFile()) {
//             readFileFemale(first, second, file)
//         }
//     });
// };


// 2-Завдання *

// const folder = path.join(__dirname, 'First');
//
// const moveFolder = (folderPath) => {
//     fs.readdir(folderPath,
//         (err, files) => {
//             if (err) throw new Error(err);
//             files.forEach(file => {
//                 fs.stat(path.join(folderPath, file), (errStat, stats) => {
//                     if (errStat) throw new Error(errStat);
//                     if (stats.isFile()) {
//                         fs.rename(path.join(folderPath, file), path.join(__dirname, 'newFolder', file), errRename => {
//                             if (errRename) throw new Error(errRename);
//                         });
//                         return;
//                     }
//
//                     moveFolder(path.join(folderPath, file));
//                 });
//             });
//         });
// };
//
// moveFolder(folder);