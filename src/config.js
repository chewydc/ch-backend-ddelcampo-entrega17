//-------------------------------------------------------------------
// Entregable 17: Persistencia
// Fecha de entrega: 11-02-22
// Alumno: Damian del Campo
//-------------------------------------------------------------------
import path from 'path'
import dotenv from 'dotenv'
dotenv.config({path: path.resolve('./credenciales.env')})

export default {
    fileSystem: {
        path: process.env.FS_FOLDER || 'DB'
    },
    mongodb: {
        url: process.env.MONGO_URL || 'mongodb+srv://admin:PASS@XXX.mongodb.net/ecommerce',
        options: {
            serverSelectionTimeoutMS: process.env.MONGO_TO || 5000
        }
    },
    server: {
        port: process.env.SERVER_PORT || 8080,
        modo: process.env.SERVER_MODO || 'FORK',
        session: process.env.SESSION_SECRET_KEY || 'keysecret',
        persistenciaMsj: process.env.MENSAJES_PERSIST || 'file',
        persistenciaProd: process.env.PRODUCTOS_PERSIST || 'file',
        persistenciaUser: process.env.USUARIOS_PERSIST || 'mongodb'
    },
    firebase: {
        serviceAccount: {
            "type": process.env.FIREBASE_TYPE ||"service_account",
            "project_id": process.env.FIREBASE_PROJECT_ID ||"basefirebase-XXX",
            "private_key_id": process.FIREBASE_PRIVATE_KEY_ID || "XXX",
            "private_key": process.env.FIREBASE_PRIVATE_KEY || "XXX\n-----END PRIVATE KEY-----\n",
            "client_email": process.env.FIREBASE_CLIENT_EMAIL || "XXX@appspot.gserviceaccount.com",
            "client_id": process.env.FIREBASE_CLIENT_ID || "XXX",
            "auth_uri": process.env.FIREBASE_AUTH_URI || "https://accounts.google.com/o/oauth2/auth",
            "token_uri": process.env.FIREBASE_TOKEN_URI || "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL || "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": process.env.FIREBASE_AUTH_CLIENT_X509_CERT_URL || "https://www.googleapis.com/robot/v1/metadata/x509/basefirebase-XXX%40appspot.gserviceaccount.com"
          },
        url: process.env.FIREBASE_URL || "https://basefirebase-XXX.firebaseio.com"
    }
}