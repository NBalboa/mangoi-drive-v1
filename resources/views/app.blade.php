<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="https://kit.fontawesome.com/c393acf5ae.js" crossorigin="anonymous"></script>
    <script src="https://www.paypal.com/sdk/js?client-id={{config("paypal.client_id")}}&currency={{config("paypal.currency")}}"></script>
    @viteReactRefresh
    @vite('resources/js/app.jsx')
    @inertiaHead
</head>

<body>
    @inertia
</body>

</html>
