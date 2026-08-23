module.exports = {
  apps: [
    {
      name: "ct-admin",
      cwd: "/opt/chengtong-vision/ct-admin",
      script: "pnpm",
      args: "start",
      env: {
         NODE_ENV: "production",
        PORT: 3002,
      },
    },
  ],
}