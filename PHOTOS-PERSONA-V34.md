# 第 34 版：照片与自由聊天人物提示

使用本轮八张原图，源文件字节保留。八个音乐画面依次为咖啡馆、吃饭、黑白桌边、手遮眼、拼图、舞台含泪、抬头含泪、暗色收尾。普通柾国场景用本轮手遮眼照片。旧 performance URL 作为新照片别名继续可读，不重复嵌入旧图。

新图部署副本最大 1024×1536、WebP 质量 84；其他 JPEG 保持原部署尺寸，以质量 84 的 WebP 候选替代体积更大的 JPEG，文件响应使用真实 image/webp MIME。原图片、音频和视频源文件不改；所有音乐处理参数及原图水印保留。部署 gzip 体积仍通过既有限制。

人物提示重新组织为公开表达骨架、对话方式、恋爱亲昵、暧昧期和冲突处理。更亲密是作品设定，不能称作真人恋爱事实。保留玩家联系人偏好；未清除任何旧存档或自定义聊天风格。

公开一手采访参考：
- https://magazine.weverse.io/article/view/1148?lang=en
- https://magazine.weverse.io/article/view/211?lang=en
- https://magazine.weverse.io/article/view/431?lang=en
- https://www.vogue.co.jp/article/2024-december-cover-story-bts-jin-english

预设剧情、latest-chat-edits.json、reviewed-text.json 均未修改。本轮开始按用户要求直接在聊天内逐段发送当前台词，等用户回改后再合入。
