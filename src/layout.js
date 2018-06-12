const layout = (assets, markup) => `
<!doctype html>
<html lang="">
<head>
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta charset="utf-8" />
  <title>Babeli</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  ${assets.client.css ? `<link rel="stylesheet" href="${assets.client.css}">` : ''}
  ${process.env.NODE_ENV === 'production' ? `<script src="${assets.client.js}" defer></script>` : `<script src="${assets.client.js}" defer crossorigin></script>`}
</head>
<body>
  <div id="root">${markup}</div>
</body>
</html>
`;

export default layout;
