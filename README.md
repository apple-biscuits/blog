name: GitHub Actions Build and Deploy

# 触发条件
on:
  # 手动触发
  workflow_dispatch:
  # push 到指定分支
  push:
    branches:
      - master
    # 只在下列路径变更时触发
    paths:
      - 'docs/**'
      - 'package.json'

# 设置权限
permissions:
  contents: write

# 设置上海时区
env:
  TZ: Asia/Shanghai

# 任务
jobs:
  build-and-deploy:
    # 服务器环境：最新版 ubuntu
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [20]
    steps:
      # 拉取代码
      - name: Checkout
        uses: actions/checkout@v3
        with:
          fetch-depth: 0

      # 安装 pnpm
      - name: Install pnpm
        uses: pnpm/action-setup@v3
        with:
          version: 8

      # 设置 node 版本
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'pnpm'

      # 打包静态文件
      - name: Build
        env:
          APP_BASE_PATH: /${{ github.repository }}
        run: pnpm install && pnpm run build

      # 部署
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          full_commit_message: Deploying to gh-pages from @ ${{ github.sha }} 🚀
          # GitHub Pages 读取的分支
          publish_branch: gh-pages
          # 静态文件所在目录
          publish_dir: dist
