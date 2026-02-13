import express from "express";
import { ENV } from "./lib/env.js";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./lib/db.js";
import cors from "cors"
import { serve } from "inngest/express"
import { inngest, functions } from "./lib/inngest.js";
import { clerkMiddleware } from '@clerk/express'
import chatRoutes from "./routes/chatRoutes.js"
import sessionRoutes from "./routes/sessionRoutes.js"

// 1. RECREATE __dirname FOR ES MODULES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// middleware
app.use(express.json());
// credentials: true meaning?? => server alloes a browser to include cookies on request
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true}));
app.use(clerkMiddleware()); // this adds auth field to request object: req.auth()

app.use("/api/inngest", serve({client: inngest, functions}));
app.use("/api/chat", chatRoutes)
app.use("/api/sessions", sessionRoutes)

app.get("/health", (req, res) => {
    res.status(200).json({msg : "api is up and running"});
})

// make our app ready for deployment
if (ENV.NODE_ENV === "production") {
    // 2. PATH FIX: Go up 2 levels (../../) to escape 'src' and 'backend'
    app.use(express.static(path.join(__dirname, "../../frontend/dist")));

    // 3. EXPRESS 5 FIX: Use '*splat' for the wildcard
    app.get("*splat", (req, res) => {
        res.sendFile(path.join(__dirname, "../../frontend", "dist", "index.html"));
    })
}

const startServer = async () => {
    try {
        await connectDB();
        
        // Remove potentially problematic index if it exists
        try {
            // dynamic import User model to avoid circular dependency issues if any, though standard import is fine
            // actually let's use standard import.
            // But wait, I need to import it at top.
            // Let's just do it here. 
            const User = (await import("./models/User.js")).default;
            await User.collection.dropIndex("emale_1");
            console.log("Dropped problematic index: emale_1");
        } catch (error) {
            // ignore error if index doesn't exist
            if (error.code !== 27) {
                 console.log("Index drop error (expected if not exists):", error.message);
            }
        }

        app.listen(ENV.PORT, () => console.log(`server is running on port: ${ENV.PORT}`));
    } catch (error) {
        console.error(`Error starting the server: ${error}`);
    }
}

startServer();