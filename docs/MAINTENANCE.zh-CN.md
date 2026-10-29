# WITH YOU 独立维护与恢复

原站：https://with-seokjin-phone.sacredzebra262144.chatgpt.site
Sites 项目 ID：appgprj_6adcf65dfab081919c474431c3704635
GitHub：pseebat0312-gif/iphone-withseokjin

## 当前权限与边界
账号在 Sites 返回 owner；GitHub 返回 admin、push、maintain。网站源码由 Sites 的独立 Git 仓库保存，GitHub 过去未随网站同步。旧对话里的发布成功只代表 Sites 发布成功。
新的 Work 若具有同账号的 Sites 连接，可用上述项目 ID 查询项目并重新申请源码凭证。当前会话已验证项目归属和重新签发凭证；未实际从另一个 Work 对话发起发布，不保证未来所有模型、界面和授权状态都支持同样操作。latest_edit_context 是最近编辑记录，不能单独据此判定权限绑死对话。

## 备份范围
src、scripts、tests、dialogue、assets、package.json、package-lock.json、原站 hosting 配置及生成的 Worker 均应包含。assets 为原始图片和音频；原站另有 R2 原图缓存，不能只下载一个 HTML 或只复制 app.js。
不备份运行时密钥、用户浏览器存档或第三方账户登录信息。浏览器存档应在游戏设置中另行导出，换域名不会自动迁移 localStorage。

## 新 Work 恢复原站
把项目 ID、原站 URL、GitHub 仓库交给新对话；要求先检查 owner 和当前已发布版本，再用 Sites source helper 拉取最新源码。不要把 GitHub 旧分支当作新版本覆盖原站。保留 R2=BUCKET 和现有运行时 Secrets。未经验证不要新建替代原站，不要删除旧站。

## 不依赖 Work 的免费部署准备
.github/workflows/deploy-independent.yml 会在 main 更新或手动执行时构建部署到你自己的 Cloudflare 账户。scripts/build-independent.mjs 把原站大包拆为小型 API Worker 与原始静态素材，保持同源 API 和界面，避免把 15 MB 内嵌素材包直接上传免费 Worker。

一次性由你完成：
1. 使用自己的 Cloudflare 免费账户，不开启付费计划，不创建付费 R2。
2. 在 GitHub 仓库 Settings > Secrets and variables > Actions 添加 CLOUDFLARE_ACCOUNT_ID、CLOUDFLARE_API_TOKEN。令牌仅授予你的目标账户 Workers 部署权限，不要写进代码或聊天。
3. 执行 Actions > Deploy independent WITH YOU > Run workflow。
4. 部署成功后到 Cloudflare 为独立 Worker 配置原有聊天服务所需 Secrets；没有配置时，预设剧情可运行，AI 自由聊天/站长设置等依赖原后端的功能不能视为已恢复。不要自动创建或购买新的 AI 套餐。
5. 新网址先验收；原 chatgpt.site 保留。需把旧域名浏览器存档手动导入新域名。

这套工作流已提供，不代表用户自己的 Cloudflare 账户已连接、密钥已配置或新网站已上线。缺少账户凭据时应明确显示配置步骤，不能报告部署成功。
