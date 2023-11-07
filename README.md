# Hentai Comic Reader Backend

**处在测试阶段！使用时请关注仓库动态！**

## 前言

这是一个 ~~精神延续作品~~ 出于个人想法开发的一个图片阅读处理器的后台

**不适用于高并发场景**，推荐场景是私人部署+本地化使用

## 使用

环境要求：
- Nodejs v18.18.1
- pnpm 8.6.12

```cmd
git clone https://github.com/QingXia-Ela/hentai-comic-reader-backend.git
cd hentai-comic-reader-backend
pnpm i
pnpm H
```

## 增加图片集

可以参考 `book-example` 文件夹下的例子

存储方式如下：在项目根目录下新建 `book` 文件夹；随后在文件夹内继续新建一个文件夹，并将其命名为图片集名字，然后在图片文件夹下添加图片即可

**图片名字需要对应图片顺序！！你也不想图片是乱序的罢.jpg**

程序每5分钟都会自动处理 `book` 文件夹下的图片集并同步到接口

## TODO

- [ ] 图片及过长的响应启用响应体压缩
- [ ] 加密实现 aes 加密及 rust 加速处理
- [ ] 图片数据刷新策略优化
- [ ] 图片集生成 json 配置策略优化
- [ ] 允许迁移到 SQLite 或 MongoDB
- [ ] 搜索条件设置

## API

请启动项目并通过 `localhost:<your port>/doc` 访问文档

## License

[MIT](./LICENSE)

## 尾声

在这片大地上居然有这么多志同道合的勇士。他们抱着`“OO即为正义！”`的信念，向着未来前进，可喜可贺，可喜可贺，勇气可嘉。他们通过自己的双手与智慧创造出了一个充满光明的未来，在这片大地上带来了希望！这些悲壮但是又非凡的故事，应当被世人传颂与纪念！
