import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
   server:{
  host:'94.72.124.184'
  },
});
