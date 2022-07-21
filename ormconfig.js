module.exports = {
  type: process.env.TYPEORM_TYPE,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE || "admin_woocommerce",
  entities: [
    "src/models/*.ts"
  ],
  logging: false,
  synchronize: true
}