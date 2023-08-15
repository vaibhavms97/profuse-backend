exports.prodEnvironment = () => {

    const keys = {
        db_root: process.env.DB_STRING,
        jwt_secret: process.env.JWT_SECRET,
    }
    return keys
}