import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGO_DB_URI);
const db = client.db(process.env.AUTH_DB_NAME);

export const auth = betterAuth({
  //...other options
  emailAndPassword: { 
    enabled: true, 
  }, 
  socialProviders: {
      google: { 
       clientId:
          process.env.GOOGLE_CLIENTID,
          clientSecret: process.env.GOOGLE_SECRET
      }
  },
  sessions:{
    cookieCache:{
      enabled:true,
      strategy:"jwt",
      //max 7 days
      maxAge:7*24*60*60
    }
  },
  plugins:[
    jwt()
  ],
  database: mongodbAdapter(db, {
   
    client
  }),
  user:{
    additionalFields:{
        role:{
            default:"seeker"
        },
        isPremium: {
          type: "boolean",
          default: false,
        }
    }
  }
});