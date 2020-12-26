#!/usr/bin/env node

const fs = require('fs');
const fetch = require('node-fetch');
const Jimp = require('jimp');
const {v4: uid} = require('uuid');

const fetchUrl = process.argv[2] || "https://www.haaretz.com";
const outputFolder = process.argv[3] || "tmp";

const headerHTML = require('./header');
const footerHTML = require('./footer');

// Create the folder if it doesn't exist
if (!fs.existsSync(outputFolder + "/original")) {
    fs.mkdirSync(outputFolder + "/original", {recursive: true});
}

if (!fs.existsSync(outputFolder + "/small")) {
    fs.mkdirSync(outputFolder + "/small", {recursive: true});
}

// Get Img urls into an array
async function getUrlList(url) {
    try {
        const res = await fetch(url);
        const page = await res.text();

        const re = RegExp('<img.*?src="([^"]*)".*?\\/?>', 'gmis');

        const urls = [];
        let match;
        while (match = re.exec(page)) {
            if (match[1]) urls.push(match[1]);
        }
        return urls;
    } catch (e) {
        return new Error(e.message);
    }
}

// Download each image to given folder
async function download(url) {
    return Jimp.read(url)
        .then(image => {
                const width = image.bitmap.width;
                const height = image.bitmap.height;
                const format = image.getExtension();
                const uniqueName = uid();
                const smallFileName = uniqueName + '.png';
                const fileName = uniqueName + '.' + format;

                return image
                    // Save original
                    .writeAsync(`${outputFolder}/original/${fileName}`)
                    .then(() => image
                        // Do stuff with the image.
                        .resize(120, Jimp.AUTO)
                        // Save small image
                        .writeAsync(`${outputFolder}/small/${smallFileName}`)
                    )
                    .then(() => {
                        return {
                            url,
                            fileName,
                            smallFileName,
                            width,
                            height,
                            format
                        }
                    })
            }
        )
        .catch(err => {
            console.log('ERROR', err)
        })
}

function generateHtml(fileList) {
    const innerHTML = fileList.length > 0 ? fileList.map((file) => {
        return (
            `
            <div class="element">
                <a href="./original/${file.fileName}"><img class="img-preview" src="./small/${file.smallFileName}"></a>
                <div class="text-block">
                    <a href="${file.url}" class="link">Original file link</a>
                    <p>Original image size: <b>${file.width}/${file.height}px</b></p>
                    <p>Format: <b>${file.format}</b></p>
                </div>
            </div>
            
            `
        )
    }).join('\n') : `<h2>No images were fetched from given URL</h2>`;

    fs.writeFile(
        `${outputFolder}/index.html`,
        headerHTML + innerHTML + footerHTML,
        'utf8',
        err => {
            err ? console.log(err) : console.log(`index.html generated in ${outputFolder}`)
        }
    );
    // console.log(innerHTML);
}

getUrlList(fetchUrl)
    .then(links => {
        console.log(`${links.length} image URLs were fetched`);
        return links;
    })
    .then(links => Promise.all(links.map(link => download(link))))
    .then(fileList => {
        generateHtml(fileList);
    });

