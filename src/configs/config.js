const DB_URL = process.env.DB_URL || 'mongodb+srv://mohitjustforme:9i9BrSGsRzkb2YfS@crm.jjuvioe.mongodb.net/?retryWrites=true&w=majority&appName=CRM';
const PORT = process.env.PORT || 3000;
const SECRET = process.env.SECRET || "JWT@123";

module.exports = { DB_URL, PORT };