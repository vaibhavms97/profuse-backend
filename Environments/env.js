const devEnvironment = require('./dev.env');
const prodEnvironment = require('./prod.env');

exports.env = () => {
    if (process.env.NODE_ENV?.includes('production')) {
        console.log("-----------------------------------", process.env.NODE_ENV);
        return prodEnvironment.prodEnvironment();
    } else if (process.env.NODE_ENV?.includes('development')) {
        console.log("-----------------------------------", process.env.NODE_ENV);
        return devEnvironment.devEnvironment();
    }
}