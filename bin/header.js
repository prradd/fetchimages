const headerHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Fetch Images</title>
    
<style>
        @import url('https://fonts.googleapis.com/css2?family=El+Messiri:wght@400;500;600;700&display=swap');

        body {
            font-family: 'El Messiri', sans-serif;
        }
        .header {
            text-align: center;
        }

        .container {
            max-width: 1100px;
            margin: 0 auto;
            overflow: auto;
            padding: 0 40px;
        }

        .grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            align-items: center;
            height: 100%;
        }

        .element {
            width: 170px;
            height: 280px;
            padding: 10px;
            border: 2px rgba(237, 114, 9, 1) solid;
            border-radius: 5px;
        }

        .img-preview {
            max-width: 120px;
            max-height: 120px;
            border-radius: 5px;
            display: block;
            margin-left: auto;
            margin-right: auto;
            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.7);
        }

        .img-preview:hover {
            transition-duration: 100ms;
            transform: scale(1.1);
            -webkit-transform: scale(1.1);
        }

        .text-block {
            margin-top: 10px;
            margin-bottom: 10px;
            text-align: center;
        }

        a {
            text-decoration: none;
            font-weight: bold;
            font-size: large;
            color: rgba(237, 114, 9, 1);
        }

        a:hover {
            border-bottom: 2px rgba(237, 114, 9, 0.5) solid;
        }

        /* Tablets and under */
        @media (max-width: 1050px) {
            .grid {
                grid-template-columns: repeat(3, 1fr);;
            }
        }

        @media (max-width: 768px) {
            .grid {
                grid-template-columns: repeat(2, 1fr);;
            }
        }

    </style>

</head>
<body>
<div class="header">
    <p>Home assignment for <a href="mailto: shestakov.anton34@gmail.com">Anton Shestakov</a></p>
    <h1>Fetched images from given URL</h1>
    <h2>${process.argv[2]}</h2>
</div>
<div class="container grid">
`;

module.exports = headerHTML


