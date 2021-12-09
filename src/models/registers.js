
module.exports = (sequelize, DataTypes) => {
    const registers = sequelize.define("registers",
        {
            firstname: DataTypes.STRING,
            
            lastname: DataTypes.STRING,
            email: {
                type: DataTypes.STRING,
                defaultValue: 'test@gmail.com'
            },
            gender: {
                type: DataTypes.STRING
            },
            password: {
                type: DataTypes.STRING
            },
            Confirmpassword: {
                type: DataTypes.STRING,
                require: true
            },

          

        })
    return registers;
}
