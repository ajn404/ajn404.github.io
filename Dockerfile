# 使用 Node.js 18 镜像作为基础
FROM node:18

# 设置工作目录
WORKDIR /app

# 将项目文件复制到容器中
COPY . .

# 安装依赖
RUN npm install

# 暴露端口
EXPOSE 3000

# 运行命令
CMD ["npm", "run", "dev"]
