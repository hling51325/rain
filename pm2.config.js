module.exports = {
    apps: [
        {
            name: "tokine",
            script: "./bin/run.js",
            watch: true,
            env: {
                "NODE_ENV": "development"
            },
            env_production: {
                "NODE_ENV": "production",
            }
        }
    ]
}