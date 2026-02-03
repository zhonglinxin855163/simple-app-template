# storage/
> L2 文档 | 父级: [/src/CLAUDE.md](../CLAUDE.md) |
分形协议: 三层结构
---

**types.ts**: 存储服务类型定义(StorageConfig/StorageProvider/上传参数/错误类型)
**config/storage-config.ts**: 存储服务配置(从环境变量读取 S3/R2 配置)
**provider/s3.ts**: S3 兼容存储服务实现(文件上传/删除/预签名 URL)
**index.ts**: 存储服务实例导出(uploadFile/deleteFile/getPresignedUploadUrl/uploadFileFromBrowser)
**README.md**: 存储模块使用文档

**CLAUDE.md**: 本文档

**更新规范**: 每次更新 CLAUDE.md 文档时，必须检查是否与实际代码一致。
