# 古田来信课堂阅读网页

一个面向手机扫码课堂教学的纯静态网页。打开后先播放历史信封动画，再进入《星星之火，可以燎原》全文阅读。

## 文件结构

- `index.html`：网页结构
- `style.css`：历史信封与阅读界面样式、动画
- `script.js`：交互与缩放
- `document.pdf`：原始 PDF
- `assets/pages/`：由原 PDF 高精度渲染出的 12 页 JPEG，用于提升微信 / Safari / 安卓浏览器兼容性

## 为什么默认显示高清页面，而不是直接嵌入 PDF

部分手机浏览器（尤其某些微信 WebView、二维码扫码浏览器）会把 PDF 当作下载文件，或使用兼容性不稳定的内置 PDF 查看器。当前项目把 PDF 每页预渲染成高清网页图片，因此扫码后不需要第二次跳转，也不需要下载即可上下滑动阅读，同时保留 `document.pdf` 作为原始文件。

## 本地预览

不要直接双击 `index.html` 测试，建议启动一个静态服务器：

```bash
python3 -m http.server 8080
```

然后访问 `http://localhost:8080/`。

## GitHub Pages 部署

将整个文件夹内容上传到 GitHub 仓库根目录，然后在仓库 `Settings → Pages` 中选择 `Deploy from a branch`，分支选 `main`，目录选 `/ (root)`。等待部署完成后即可得到 HTTPS 地址。
