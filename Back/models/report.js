const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Report = sequelize.define('Report', {
    report_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    report_type: {
        type: DataTypes.ENUM('Flooding', 'Wildfire', 'Landslide', 'Earthquake', 'Storm Damage', 'Other', 'Unsure'),
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    image_url: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.ENUM('pending', 'verified', 'rejected'),
        defaultValue: 'pending',
    },
});

// Define relationships
Report.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Report;
