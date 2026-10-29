# WITH YOU 完结版 v103

源码提交：ab5d84104c72454ab0bb25a4056def3239030195
打包日期：2026-10-29

这是线上 v103 源码和全部受版本管理的原始素材备份。包含 src、dialogue、assets、构建脚本、编译产物、测试、GitHub Actions 工作流及独立部署说明。independent/ 是从最终编译产物提取的可部署目录，保留原图和原音频。未修改线上网站。

## 自己重新部署
可以脱离 Work，在自己的 Cloudflare 账号部署。详见 docs/MAINTENANCE.zh-CN.md。
已安装 Node.js 后，也可以在解压目录运行 npx wrangler deploy --config independent/wrangler.json，按提示登录自己的 Cloudflare 账号。此目录包含预编译最终版，无须先重新构建。
后续编辑 src 后执行 npm ci、npm run build、node scripts/build-independent.mjs，再部署；构建还需要 Python、Pillow、ffmpeg。
GitHub 自动部署需要自己添加 CLOUDFLARE_ACCOUNT_ID 和 CLOUDFLARE_API_TOKEN 两项 Actions Secrets。工作流文件位于 .github/workflows/deploy-independent.yml。未替你启用或购买任何服务。

## 手动上传 GitHub
先解压再上传，不要只上传 ZIP。请保留 .github、.openai 等目录。ZIP 不包含 node_modules、Git 历史及运行时密钥。

## 范围与限制
运行时密钥、服务账号、浏览器游戏存档不在源码里；换域名需另行导出导入存档。独立部署产物已生成并通过语法检查，但尚未在你的 Cloudflare 账号实际部署验收。聊天服务和站长后台等依赖后端密钥的功能需另行配置。
某些旧测试保留旧稿页码断言，不能把全套旧测试通过当作本备份的保证。
请下载到自己的硬盘并额外备份，在线文件可用性不能代替你自己的长期存档。
