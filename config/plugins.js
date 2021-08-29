module.exports = ({ env }) => ({
    upload: {
      provider: "azure-storage",
      providerOptions: {
        account: env("STORAGE_ACCOUNT"),
        accountKey: env("STORAGE_ACCOUNT_KEY"),
        serviceBaseURL: env("STORAGE_URL", null),
        containerName: env("STORAGE_CONTAINER_NAME"),
        cdnBaseURL: env("STORAGE_CDN_URL", null),
        defaultPath: "assets",
        maxConcurrent: 10,
      },
    },
  });
  