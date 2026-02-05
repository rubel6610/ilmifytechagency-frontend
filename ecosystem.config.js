// pm2.config.js
module.exports = {
  apps: [
    {
      name: "project-react",
      script: "npx",
      args: "serve -s build -l 3000",
      env: {
        NODE_ENV: "production",
        PORT: 3000
      }
    }
  ]
}