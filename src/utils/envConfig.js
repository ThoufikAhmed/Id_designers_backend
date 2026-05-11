/**
 * @module utils/envConfig
 */

const envConfig = () => {
  const {
    DB_MYSQL_USERNAME,
    DB_MYSQL_PASSWORD,
    DB_MYSQL_HOST,
    DB_MYSQL_DBNAME,
    DB_MYSQL_PORT
  } = process.env

  const { NODE_ENV, SERVER_PORT } = process.env

  const {
    MAIL_SENDER,
    MAIL_HOST,
    MAIL_PORT,
    MAIL_USER,
    MAIL_PASS
  } = process.env

  const {
    S3_BUCKET_ID,
    S3_BUCKET_SECRET,
    S3_BUCKET_NAME,
    S3_BUCKET_REGION
  } = process.env

  // 🔹 MySQL Validation
  if (
    !DB_MYSQL_USERNAME ||
    !DB_MYSQL_PASSWORD ||
    !DB_MYSQL_HOST ||
    !DB_MYSQL_DBNAME ||
    !DB_MYSQL_PORT
  ) {
    throw new Error('The MySQL environment variables are not defined')
  }

  // 🔹 Server Validation
  if (!NODE_ENV || !SERVER_PORT) {
    throw new Error('The Server environment variables are not defined')
  }

  // 🔹 Mail Validation
  if (
    !MAIL_SENDER ||
    !MAIL_HOST ||
    !MAIL_PORT ||
    !MAIL_USER ||
    !MAIL_PASS
  ) {
    throw new Error('The Nodemailer environment variables are not defined')
  }

  // 🔹 S3 Validation
  if (
    !S3_BUCKET_ID ||
    !S3_BUCKET_SECRET ||
    !S3_BUCKET_NAME ||
    !S3_BUCKET_REGION
  ) {
    throw new Error('The S3 bucket environment variables are not defined')
  }
}

module.exports = envConfig