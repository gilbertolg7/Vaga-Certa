const sequelize = require('../config/database');

const db = {};

db.sequelize = sequelize;
db.Sequelize = require('sequelize');

db.User = require('./user')(sequelize, db.Sequelize.DataTypes);
db.Company = require('./company')(sequelize, db.Sequelize.DataTypes);
db.Job = require('./job')(sequelize, db.Sequelize.DataTypes);

// Associations (optional)
db.Company.hasMany(db.Job, { foreignKey: 'companyId' });
db.Job.belongsTo(db.Company, { foreignKey: 'companyId' });

module.exports = db;
