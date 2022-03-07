export default {
    port: 3000,
    dbUri: "mongodb://localhost:27017/rest-api-tutorial",
    saltWorkFactor: 10,
    accessTokenTTL: "1m",
    refreshTokenTTL: "1y",
    publicKey: `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCLc6MInuRfj7cLQDwvchdQvclF
m4PHiJuqQlR4shtwi/niF8cgeOXBEtziB+99t+DbiSzVT+BrNVtlHwagzSvCBoAX
acedyjjHSZ7ARhh66DdTvubtOEcaZorqJM29gLu/NGfn29I9SXtHjs6LrWUzQBpw
7Bockvomlz9ozCSSPQIDAQAB
-----END PUBLIC KEY-----`,
    privateKey: `-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQCLc6MInuRfj7cLQDwvchdQvclFm4PHiJuqQlR4shtwi/niF8cg
eOXBEtziB+99t+DbiSzVT+BrNVtlHwagzSvCBoAXacedyjjHSZ7ARhh66DdTvubt
OEcaZorqJM29gLu/NGfn29I9SXtHjs6LrWUzQBpw7Bockvomlz9ozCSSPQIDAQAB
AoGBAIn99J9sM8pIOTY96xB8EoxIMSnbGMzS5k7Vcic4/6QgLzZGlzoPyDKFCuP0
PE2oLi6vkBjJAOa1lun6iKGIRToxvktcxO27ZeRONsNAsae+LksAcWYH8zBV6Q6s
Z4Pm54maJVFfMsCpXbJ4jHiMNlxAyvLzfDqWroc4Hwaa0mghAkEA2EwAOxNY68Ut
3cVvs+XZTd5BxqCbbJUqNZcF+npf2IzCAoTItdm/BGLlKNYdVufB+vFV7Q2m45kr
rWoI93Kg2QJBAKUMm22AAYXsFyAZjwHOXN6YpusXpW8lEvvzrgP4jFevJp8NTX95
3ZUC3Pm20a2erLoZz1MiRfrRubGr2f++HgUCQAVcHMVZ/WIaSMCuG86Ba5kaYNbj
M/bE237odyV10toy4rvdPnwDIVCigrs4UxHMPGpTgKWXKQOK0CJD9mTrWkECQE5B
1ghrY01+jdB4jegLUtlwg+SAR76VU5UHC4FyfgitUaCkjBRfUgLvYps8Zdrum3N5
/WWroIa2nldx5mFuYYkCQQCQyksPMoemDGQTwkeKRbrcfLdmNinKIaVlLyTYDQmZ
m3hVX+WOrpgxme67ujdnA01SDZneM4JEaB7wmDYYvFxX
-----END RSA PRIVATE KEY-----`,
};
