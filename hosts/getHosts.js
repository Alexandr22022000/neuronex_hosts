module.exports = (req) => {
    let host = req.hostname;
    if (req.ip.indexOf(host, 0) !== -1) return [];

    let firstDot = host.lastIndexOf('.');
    if (firstDot === -1) return [host];

    let secondDot = host.lastIndexOf('.', firstDot - 1);
    if (secondDot === -1) return [host];

    host = host.substring(secondDot + 1, host.length);
    return [host, ...req.subdomains];
};